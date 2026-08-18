#!/usr/bin/env node
/*
 * backfill_evidence_dates.js — give prophecy_map.html evidence items an
 * explicit `date` field, derived from the date already stated in their text.
 *
 * WHY
 *   Evidence items carry their dates only in prose ("Jan 8, 2026", "March
 *   2022", "founded 1888"). Sorting by date therefore depends on re-parsing
 *   that prose on every page load, and it can only ever order the minority
 *   of items that state a date at all. This converts what is already
 *   parseable into a declared field, so the parser becomes a fallback for
 *   un-upgraded items rather than the mechanism.
 *
 * WHAT IT DOES NOT DO
 *   It never invents a date, never edits item text, and never touches an item
 *   that already declares one. An item whose prose states no date is left
 *   exactly as it is — a plain string — because guessing would be worse than
 *   the honest "no date" the UI already shows.
 *
 * WHY BARE YEARS ARE NOT WRITTEN BY DEFAULT
 *   A four-digit number in the text is not necessarily a date. "Project
 *   2025" is the name of a document published in 2023; "Rededicate 250",
 *   "Agenda 2030" and "Horizon 2020" are names too. On a first pass this
 *   script dated the Project 2025 item to 2025 — confidently, and wrongly.
 *   Month-name expressions ("Jan 8, 2026", "Dec 2025") carry no such
 *   ambiguity, so those are written automatically; bare years go to a review
 *   file for a human to confirm or discard.
 *
 * USAGE
 *   node scripts/backfill_evidence_dates.js --dry-run    # report only
 *   node scripts/backfill_evidence_dates.js              # write month/day dates
 *   node scripts/backfill_evidence_dates.js --review     # list bare-year candidates
 *   node scripts/backfill_evidence_dates.js --min-rank 1 # also write bare years (unsafe)
 *
 * The rewrite is textual and deliberately conservative: it only rewrites
 * single-line string items, and it verifies afterwards that the file still
 * parses.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "prophecy_map.html");
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const REVIEW = args.includes("--review");
/* Default 2 = month precision or better. See the header: bare years are too
   often part of a name to write without a human looking at them. */
const MIN_RANK = (() => {
  const i = args.indexOf("--min-rank");
  return i >= 0 ? parseInt(args[i + 1], 10) || 2 : 2;
})();

/* ── Date extraction — same rules as the page's parseEvidenceDate ────────
   rank 3 = day known, 2 = month known, 1 = year only.

   HEADING FIRST. Almost every item opens with a bolded heading that states
   the date of the thing being reported ("Ontario Right to Disconnect — Nov
   2021", "Charlie Kirk — … (posthumous, Dec 2025)"). The body then mentions
   other dates in passing — when a law took effect, when someone died, when a
   later manifesto appeared. Scanning the whole item and taking the most
   precise or latest date got four of these demonstrably wrong: the Kirk book
   was dated to his assassination, the Ontario bill to its commencement date,
   the European Sunday Alliance (founded 2011) to a 2026 date, and Pope Leo
   XIV's election to a later audience. So the heading is authoritative, and
   the body is only consulted when the heading carries no date at all.

   Within whichever text is being scanned, more precise beats less precise
   and, at equal precision, later beats earlier. */
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
const RE_MDY = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*((?:19|20)\d{2})\b/gi;
const RE_DMY = /\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?,?\s*((?:19|20)\d{2})\b/gi;
const RE_MY = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+((?:19|20)\d{2})\b/gi;
const RE_Y = /\b((?:19|20)\d{2})\b/g;

function pad(n) { return String(n).padStart(2, "0"); }

/**
 * The item's own heading: the leading <strong> if present, else the text up
 * to the first em-dash or colon. Returns "" when neither exists, which sends
 * the caller to the full-text fallback.
 */
function headingOf(html) {
  const bold = /^\s*<strong>([\s\S]*?)<\/strong>/i.exec(String(html));
  if (bold) return bold[1].replace(/<[^>]+>/g, " ");
  const plain = String(html).replace(/<[^>]+>/g, " ");
  const cut = plain.search(/—|:/);
  return cut > 0 ? plain.slice(0, cut) : "";
}

function scanForDate(text) {
  const plain = String(text);
  let best = null;
  const better = (c) => {
    if (!c) return;
    if (!best || c.rank > best.rank || (c.rank === best.rank && c.ts > best.ts)) best = c;
  };
  let m;
  RE_MDY.lastIndex = 0;
  while ((m = RE_MDY.exec(plain))) {
    const mo = MONTHS[m[1].toLowerCase().slice(0, 3)], d = +m[2];
    if (d >= 1 && d <= 31) better({ rank: 3, ts: Date.UTC(+m[3], mo, d), iso: `${m[3]}-${pad(mo + 1)}-${pad(d)}` });
  }
  RE_DMY.lastIndex = 0;
  while ((m = RE_DMY.exec(plain))) {
    const mo = MONTHS[m[2].toLowerCase().slice(0, 3)], d = +m[1];
    if (d >= 1 && d <= 31) better({ rank: 3, ts: Date.UTC(+m[3], mo, d), iso: `${m[3]}-${pad(mo + 1)}-${pad(d)}` });
  }
  RE_MY.lastIndex = 0;
  while ((m = RE_MY.exec(plain))) {
    const mo = MONTHS[m[1].toLowerCase().slice(0, 3)];
    better({ rank: 2, ts: Date.UTC(+m[2], mo, 1), iso: `${m[2]}-${pad(mo + 1)}` });
  }
  RE_Y.lastIndex = 0;
  while ((m = RE_Y.exec(plain))) {
    better({ rank: 1, ts: Date.UTC(+m[1], 0, 1), iso: m[1] });
  }
  return best;
}

function extractDate(html) {
  const fromHeading = scanForDate(headingOf(html));
  if (fromHeading) return fromHeading;
  return scanForDate(String(html).replace(/<[^>]+>/g, " "));
}

/* ── Locate item strings inside the COUNTRIES literal ──────────────────
   Matches a whole line that is exactly one double-quoted string followed by
   an optional comma, inside an `items: [` block. Anything else — an object
   item, a multi-line string, a template literal — is skipped rather than
   guessed at. */
function run() {
  const original = fs.readFileSync(FILE, "utf8");
  const lines = original.split("\n");

  let inItems = false;
  let depth = 0;
  const changes = [];
  const deferred = [];   // below MIN_RANK — reported, never written

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inItems) {
      if (/\bitems:\s*\[/.test(line)) { inItems = true; depth = 0; }
      continue;
    }
    if (/^\s*\]\}?,?\s*$/.test(line) || /^\s*\]\},?\s*$/.test(line)) { inItems = false; continue; }

    // One quoted string on its own line, optional trailing comma.
    const m = /^(\s*)"((?:[^"\\]|\\.)*)"(,?)\s*$/.exec(line);
    if (!m) continue;

    const [, indent, body, comma] = m;
    const d = extractDate(body.replace(/\\"/g, '"'));
    if (!d) continue;
    if (d.rank < MIN_RANK) { deferred.push({ line: i, body, iso: d.iso, rank: d.rank }); continue; }

    changes.push({ line: i, indent, body, comma, iso: d.iso, rank: d.rank });
  }

  const byRank = { 3: 0, 2: 0, 1: 0 };
  changes.forEach((c) => { byRank[c.rank]++; });

  console.log(`scanned ${lines.length} lines of ${path.basename(FILE)}`);
  console.log(`items with a parseable date at rank >= ${MIN_RANK}: ${changes.length}`);
  console.log(`  day-precision   : ${byRank[3]}`);
  console.log(`  month-precision : ${byRank[2]}`);
  console.log(`  year-only       : ${byRank[1]}`);

  console.log(`held back for review (below rank ${MIN_RANK}): ${deferred.length}`);

  if (REVIEW) {
    const out = path.join(__dirname, "..", "evidence-date-review.txt");
    const body = [
      "Bare-year date candidates held back from automatic backfill.",
      "",
      "Each line is a guess taken from a four-digit number in the item text.",
      "A number like this is NOT reliably a date: \"Project 2025\" is a document",
      "published in 2023, and \"Agenda 2030\" / \"Rededicate 250\" are names too.",
      "Confirm or correct each one, then add it to the item as:",
      '    { date: "YYYY", t: "…original text unchanged…" }',
      "",
      "guess  line   item text",
      "-----  -----  ---------------------------------------------------------",
      ...deferred.map((d) =>
        `${d.iso.padEnd(6)} ${String(d.line + 1).padEnd(6)} ${d.body.replace(/<[^>]+>/g, "").slice(0, 100)}`),
      "",
    ].join("\n");
    fs.writeFileSync(out, body, "utf8");
    console.log(`\nwrote ${deferred.length} candidates to ${path.basename(out)} for manual confirmation`);
    return;
  }

  if (!changes.length) { console.log("nothing to write"); return; }

  console.log("\nfirst 8 conversions:");
  changes.slice(0, args.includes("--all") ? 999 : 8).forEach((c) => {
    const preview = c.body.replace(/<[^>]+>/g, "").slice(0, 62);
    console.log(`  ${c.iso.padEnd(11)} ${preview}`);
  });

  if (DRY) { console.log("\n--dry-run: no file written"); return; }

  // Rewrite from the bottom up so earlier line indices stay valid.
  for (let k = changes.length - 1; k >= 0; k--) {
    const c = changes[k];
    lines[c.line] = `${c.indent}{ date: "${c.iso}", t: "${c.body}" }${c.comma}`;
  }
  const updated = lines.join("\n");

  // Verify before committing to disk: the inline scripts must still parse.
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  let sm, n = 0;
  while ((sm = re.exec(updated))) {
    n++;
    try { new Function(sm[1]); }
    catch (e) {
      console.error(`\nABORTED — inline script #${n} would not parse: ${e.message}`);
      process.exit(1);
    }
  }

  fs.writeFileSync(FILE, updated, "utf8");
  console.log(`\nwrote ${changes.length} date fields to ${path.basename(FILE)} (${n} inline scripts re-verified)`);
}

run();
