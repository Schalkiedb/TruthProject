"""Authenticated client for the EGW Writings API.

Credentials are read from the environment or a gitignored file — never from
source. This repository is published by GitHub Pages, so anything committed
here is served at a public URL; a secret in a tracked file would be readable
by anyone who guessed the path.

    setx EGW_CLIENT_ID     "..."        (Windows, new shell after)
    setx EGW_CLIENT_SECRET "..."

or create egw-credentials.json in the repository root (already gitignored):

    {"client_id": "...", "client_secret": "..."}

Endpoints are resolved through OpenID Connect discovery rather than hard-coded,
so a change on their side does not silently break this.

Usage:
    python scripts/egw_api.py --check          # authenticate only
    python scripts/egw_api.py --probe          # dump response shapes
    python scripts/egw_api.py --get /content/languages
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[1]
CREDENTIALS_FILE = REPO_ROOT / "egw-credentials.json"
TOKEN_CACHE = Path(__file__).resolve().parent / ".egw-token-cache.json"

DISCOVERY_URL = "https://cpanel.egwwritings.org/.well-known/openid-configuration"
API_BASE = "https://a.egwwritings.org"
# Only what the extraction actually needs. Asking for more than that is both
# poor practice and more to justify if anyone reviews the application.
SCOPES = "writings search"

USER_AGENT = "TruthProject-EGW-Extractor/1.0 (+https://schalkiedb.github.io/TruthProject/)"


class EgwApiError(RuntimeError):
    pass


# ─────────────────────────────────────────────────────────────────
# Credentials
# ─────────────────────────────────────────────────────────────────
def load_credentials() -> tuple[str, str]:
    cid = os.environ.get("EGW_CLIENT_ID", "").strip()
    secret = os.environ.get("EGW_CLIENT_SECRET", "").strip()
    if cid and secret:
        return cid, secret

    if CREDENTIALS_FILE.exists():
        data = json.loads(CREDENTIALS_FILE.read_text(encoding="utf-8"))
        cid = str(data.get("client_id", "")).strip()
        secret = str(data.get("client_secret", "")).strip()
        if cid and secret:
            return cid, secret

    raise EgwApiError(
        "No credentials found.\n"
        "  Set EGW_CLIENT_ID and EGW_CLIENT_SECRET, or create "
        f"{CREDENTIALS_FILE.name} in the repository root "
        '({"client_id": "...", "client_secret": "..."}).\n'
        "  That filename is already gitignored — do not commit it."
    )


# ─────────────────────────────────────────────────────────────────
# HTTP
# ─────────────────────────────────────────────────────────────────
def _request(
    url: str,
    *,
    data: bytes | None = None,
    headers: dict[str, str] | None = None,
    timeout: int = 45,
) -> Any:
    req = urllib.request.Request(url, data=data, headers=headers or {})
    req.add_header("User-Agent", USER_AGENT)
    req.add_header("Accept", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as err:
        body = err.read().decode("utf-8", errors="replace")[:600]
        raise EgwApiError(f"HTTP {err.code} for {url}\n{body}") from err
    except urllib.error.URLError as err:
        raise EgwApiError(f"Could not reach {url}: {err.reason}") from err
    if not raw.strip():
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return raw


_discovery: dict | None = None


def discovery() -> dict:
    global _discovery
    if _discovery is None:
        _discovery = _request(DISCOVERY_URL)
    return _discovery


# ─────────────────────────────────────────────────────────────────
# Tokens
# ─────────────────────────────────────────────────────────────────
def _cached_token() -> str | None:
    if not TOKEN_CACHE.exists():
        return None
    try:
        blob = json.loads(TOKEN_CACHE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None
    # 60s of slack so a token cannot expire mid-run.
    if blob.get("expires_at", 0) - 60 > time.time():
        return blob.get("access_token")
    return None


def _store_token(token: str, expires_in: int) -> None:
    TOKEN_CACHE.write_text(
        json.dumps({"access_token": token, "expires_at": time.time() + expires_in}),
        encoding="utf-8",
    )


def access_token(force: bool = False) -> str:
    """Client-credentials token. The discovery document lists this grant, so
    the extraction needs no browser login and no redirect URI."""
    if not force:
        cached = _cached_token()
        if cached:
            return cached

    cid, secret = load_credentials()
    token_url = discovery().get("token_endpoint")
    if not token_url:
        raise EgwApiError("Discovery document has no token_endpoint")

    payload = urllib.parse.urlencode(
        {
            "grant_type": "client_credentials",
            "client_id": cid,
            "client_secret": secret,
            "scope": SCOPES,
        }
    ).encode()
    result = _request(
        token_url,
        data=payload,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    token = (result or {}).get("access_token")
    if not token:
        raise EgwApiError(f"No access_token in response: {str(result)[:300]}")
    _store_token(token, int(result.get("expires_in", 3600)))
    return token


def api_get(path: str, **params: Any) -> Any:
    url = API_BASE + ("" if path.startswith("/") else "/") + path
    if params:
        url += "?" + urllib.parse.urlencode(params)
    return _request(url, headers={"Authorization": f"Bearer {access_token()}"})


# ─────────────────────────────────────────────────────────────────
# Probe — learn the real response shapes
# ─────────────────────────────────────────────────────────────────
def _shape(value: Any, depth: int = 0, max_depth: int = 3) -> Any:
    """Structure of a response with the content stripped out, so field names
    can be read without dumping the text itself."""
    if depth >= max_depth:
        return "…"
    if isinstance(value, dict):
        return {k: _shape(v, depth + 1, max_depth) for k, v in list(value.items())[:25]}
    if isinstance(value, list):
        return [_shape(value[0], depth + 1, max_depth), f"…×{len(value)}"] if value else []
    if isinstance(value, str):
        return f"<str len={len(value)}>"
    return type(value).__name__


PROBE_PATHS = [
    ("languages", "/content/languages", {}),
    ("books (en)", "/content/books/by_lang/en", {}),
    ("books paged", "/content/books", {"lang": "en", "limit": 3}),
]


def probe() -> int:
    print("Resolving endpoints via OpenID discovery…")
    disc = discovery()
    print(f"  issuer         : {disc.get('issuer')}")
    print(f"  token endpoint : {disc.get('token_endpoint')}")
    print(f"  grants         : {', '.join(disc.get('grant_types_supported', []))}")

    print("\nAuthenticating (client_credentials)…")
    token = access_token(force=True)
    print(f"  token acquired, {len(token)} chars")

    for label, path, params in PROBE_PATHS:
        # Plain ASCII: the Windows console defaults to cp1252 and box-drawing
        # characters raise UnicodeEncodeError before any output is seen.
        print(f"\n--- {label}  ({path}) ---")
        try:
            data = api_get(path, **params)
        except EgwApiError as err:
            print(f"  unavailable: {str(err).splitlines()[0]}")
            continue
        print(json.dumps(_shape(data), indent=2, ensure_ascii=False)[:1800])
    print(
        "\nPaste this output back and the extractor's field mapping can be "
        "finalised against the real shapes rather than guessed."
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="authenticate only")
    parser.add_argument("--probe", action="store_true", help="dump response shapes")
    parser.add_argument("--get", metavar="PATH", help="GET an API path and print JSON")
    args = parser.parse_args()

    try:
        if args.probe:
            return probe()
        if args.check:
            access_token(force=True)
            print("Authenticated. Credentials and scopes are working.")
            return 0
        if args.get:
            print(json.dumps(api_get(args.get), indent=2, ensure_ascii=False)[:4000])
            return 0
    except EgwApiError as err:
        print(f"ERROR: {err}", file=sys.stderr)
        return 1

    parser.print_help()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
