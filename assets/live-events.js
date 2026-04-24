/* ══════════════════════════════════════════════════════════════
   LIVE EVENT CHECKER — Prophecy Watch Global Alert Map
   ──────────────────────────────────────────────────────────
   Monitors global news for prophetically significant events:
   CBDC, Sunday Laws, Digital ID, Religious Liberty,
   Church-State separation, Beast System infrastructure.
   
   Sources:
     • GDELT Project API (free, CORS-enabled, real-time global news)
     • Google News RSS via rss2json proxy
     • Reddit public JSON endpoints
   
   Caches in localStorage. Auto-refreshes every 30 minutes.
══════════════════════════════════════════════════════════════ */

"use strict";

const LiveEvents = (function () {

  /* ── Configuration ─────────────────────────────────────── */
  const CONFIG = {
    refreshInterval: 30 * 60 * 1000,   // 30 minutes
    cacheKey: "prophecy_live_events",
    cacheTimestampKey: "prophecy_live_events_ts",
    maxEventsPerCategory: 20,
    maxTotalEvents: 100,
    gdeltMaxRecords: 75,
    requestTimeout: 12000,
  };

  /* ── Keyword groups mapped to prophecy categories ──────── */
  const KEYWORD_GROUPS = {
    sl: {
      label: "Sunday Laws",
      icon: "📅",
      queries: [
        '"Sunday law" OR "Sunday rest" OR "blue law" OR "Sunday closing"',
        '"Lord\'s Day" legislation OR enforcement',
        '"Dies Domini" OR "day of rest" legislation',
        '"Sunday trading" ban OR restrict',
        '"day of worship" mandate OR legislation',
      ],
    },
    cbdc: {
      label: "CBDC / Digital Currency",
      icon: "💳",
      queries: [
        "CBDC OR \"central bank digital currency\"",
        '"digital dollar" OR "digital euro" OR "digital yuan" OR "e-CNY"',
        '"programmable money" OR "programmable currency"',
        "CBDC pilot OR launch OR rollout",
      ],
    },
    did: {
      label: "Digital ID & Surveillance",
      icon: "👁",
      queries: [
        '"digital ID" OR "digital identity" national OR government',
        '"biometric" surveillance OR mandatory',
        '"facial recognition" government OR mandatory',
        '"social credit" system OR score',
        '"digital passport" OR "vaccine passport" OR "health passport"',
      ],
    },
    rl: {
      label: "Religious Liberty",
      icon: "✝",
      queries: [
        '"religious liberty" OR "religious freedom" threat OR restrict',
        '"freedom of worship" OR "freedom of conscience"',
        '"church state" separation OR violation',
        '"persecution" Christian OR religious',
        '"hate speech" religion OR Christian OR pastor',
      ],
    },
    bs: {
      label: "Beast System",
      icon: "🔗",
      queries: [
        '"cashless society" OR "ban cash" OR "eliminate cash"',
        'Vatican OR Pope political OR legislation OR decree',
        '"new world order" OR "great reset" financial',
        '"financial surveillance" OR "transaction monitoring"',
        '"buy or sell" restriction OR digital OR ID',
      ],
    },
  };

  /* ── Country code detection from article text ──────────── */
  const COUNTRY_PATTERNS = {
    US: /\b(United States|USA|U\.S\.|America|Washington D\.C\.|Congress|Senate|White House)\b/i,
    GB: /\b(United Kingdom|Britain|UK|England|London|Parliament)\b/i,
    EU: /\b(European Union|EU|Brussels|European Commission|European Parliament)\b/i,
    DE: /\b(Germany|Berlin|Bundestag|German)\b/i,
    FR: /\b(France|Paris|Macron|French)\b/i,
    IT: /\b(Italy|Rome|Italian|Vatican)\b/i,
    VA: /\b(Vatican|Pope|Holy See|Papal|Pontiff)\b/i,
    CN: /\b(China|Beijing|Chinese|CCP|PRC)\b/i,
    RU: /\b(Russia|Moscow|Kremlin|Russian|Putin)\b/i,
    IN: /\b(India|New Delhi|Modi|Indian|BJP)\b/i,
    JP: /\b(Japan|Tokyo|Japanese)\b/i,
    AU: /\b(Australia|Canberra|Australian)\b/i,
    CA: /\b(Canada|Ottawa|Canadian|Trudeau)\b/i,
    BR: /\b(Brazil|Brasilia|Brazilian|Lula)\b/i,
    NG: /\b(Nigeria|Abuja|Nigerian|Lagos)\b/i,
    ZA: /\b(South Africa|Pretoria|Johannesburg)\b/i,
    KE: /\b(Kenya|Nairobi|Kenyan)\b/i,
    IL: /\b(Israel|Jerusalem|Israeli|Tel Aviv|Knesset)\b/i,
    SA: /\b(Saudi Arabia|Riyadh|Saudi)\b/i,
    AE: /\b(UAE|United Arab Emirates|Dubai|Abu Dhabi)\b/i,
    KR: /\b(South Korea|Seoul|Korean)\b/i,
    MX: /\b(Mexico|Mexico City|Mexican)\b/i,
    AR: /\b(Argentina|Buenos Aires|Argentine)\b/i,
    CO: /\b(Colombia|Bogota|Colombian)\b/i,
    PH: /\b(Philippines|Manila|Filipino|Duterte)\b/i,
    ID: /\b(Indonesia|Jakarta|Indonesian)\b/i,
    MY: /\b(Malaysia|Kuala Lumpur|Malaysian)\b/i,
    SG: /\b(Singapore|Singaporean)\b/i,
    TH: /\b(Thailand|Bangkok|Thai)\b/i,
    SE: /\b(Sweden|Stockholm|Swedish)\b/i,
    NZ: /\b(New Zealand|Wellington|Kiwi)\b/i,
    PL: /\b(Poland|Warsaw|Polish)\b/i,
  };

  /* ── Severity scoring keywords ─────────────────────────── */
  const HIGH_SEVERITY = [
    /\b(mandatory|enforce|pass(?:ed)?|signed into law|approved|implement)\b/i,
    /\b(nationwide|national|federal|all citizens)\b/i,
    /\b(criminal|penalty|fine|arrest|imprison)\b/i,
    /\b(ban|restrict|prohibit|forbid)\b/i,
    /\b(church.{0,15}state|establishment clause)\b/i,
  ];
  const MEDIUM_SEVERITY = [
    /\b(propos(?:e|al|ed)|bill|draft|resolution|legislation)\b/i,
    /\b(pilot|trial|test|phase|rollout)\b/i,
    /\b(expand|extend|accelerat)\b/i,
    /\b(Vatican|Pope|papal)\b/i,
  ];

  /* ── State ─────────────────────────────────────────────── */
  let _events = [];
  let _refreshTimer = null;
  let _onUpdate = null;
  let _fetching = false;

  /* ── Utility: timeout-wrapped fetch ────────────────────── */
  function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);
    return fetch(url, { signal: controller.signal })
      .finally(() => clearTimeout(id));
  }

  /* ── GDELT API ─────────────────────────────────────────── */
  async function queryGDELT(searchQuery, category) {
    const encoded = encodeURIComponent(searchQuery);
    const url =
      `https://api.gdeltproject.org/api/v2/doc/doc` +
      `?query=${encoded}&mode=artlist` +
      `&maxrecords=${CONFIG.gdeltMaxRecords}` +
      `&format=json&sort=datedesc`;

    try {
      const resp = await fetchWithTimeout(url, CONFIG.requestTimeout);
      if (!resp.ok) return [];
      const data = await resp.json();
      if (!data.articles) return [];

      return data.articles.map((a) => ({
        id: hashCode(a.url),
        title: a.title || "Untitled",
        url: a.url,
        source: a.domain || "Unknown",
        date: a.seendate
          ? parseGDELTDate(a.seendate)
          : new Date().toISOString(),
        snippet: a.title || "",
        image: a.socialimage || null,
        category: category,
        origin: "gdelt",
        language: a.language || "English",
      }));
    } catch (e) {
      console.warn(`[LiveEvents] GDELT query failed: ${searchQuery}`, e.message);
      return [];
    }
  }

  /* ── Google News RSS via rss2json ──────────────────────── */
  async function queryGoogleNews(searchQuery, category) {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=en-US&gl=US&ceid=US:en`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
      const resp = await fetchWithTimeout(apiUrl, CONFIG.requestTimeout);
      if (!resp.ok) return [];
      const data = await resp.json();
      if (data.status !== "ok" || !data.items) return [];

      return data.items.map((item) => ({
        id: hashCode(item.link),
        title: stripHtml(item.title) || "Untitled",
        url: item.link,
        source: item.author || extractDomain(item.link) || "Google News",
        date: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        snippet: stripHtml(item.description || item.content || "").slice(0, 300),
        image: item.thumbnail || item.enclosure?.link || null,
        category: category,
        origin: "google_news",
        language: "English",
      }));
    } catch (e) {
      console.warn(`[LiveEvents] Google News query failed: ${searchQuery}`, e.message);
      return [];
    }
  }

  /* ── Reddit public JSON ────────────────────────────────── */
  async function queryReddit(searchQuery, category) {
    const url =
      `https://www.reddit.com/r/worldnews+news+technology+privacy/search.json` +
      `?q=${encodeURIComponent(searchQuery)}&sort=new&limit=10&restrict_sr=on&t=month`;

    try {
      const resp = await fetchWithTimeout(url, CONFIG.requestTimeout);
      if (!resp.ok) return [];
      const data = await resp.json();
      if (!data.data || !data.data.children) return [];

      return data.data.children
        .filter((c) => c.data && c.data.title)
        .map((c) => ({
          id: hashCode("reddit_" + c.data.id),
          title: c.data.title,
          url: c.data.url_overridden_by_dest || `https://reddit.com${c.data.permalink}`,
          source: `r/${c.data.subreddit}`,
          date: new Date(c.data.created_utc * 1000).toISOString(),
          snippet: (c.data.selftext || "").slice(0, 300),
          image: null,
          category: category,
          origin: "reddit",
          upvotes: c.data.ups || 0,
          language: "English",
        }));
    } catch (e) {
      console.warn(`[LiveEvents] Reddit query failed: ${searchQuery}`, e.message);
      return [];
    }
  }

  /* ── Enrichment: detect country & severity ─────────────── */
  function enrichEvent(event) {
    const text = `${event.title} ${event.snippet}`;

    // Detect countries
    event.countries = [];
    for (const [code, rx] of Object.entries(COUNTRY_PATTERNS)) {
      if (rx.test(text)) event.countries.push(code);
    }

    // Severity scoring
    let score = 0;
    HIGH_SEVERITY.forEach((rx) => { if (rx.test(text)) score += 3; });
    MEDIUM_SEVERITY.forEach((rx) => { if (rx.test(text)) score += 1; });
    if (event.upvotes && event.upvotes > 500) score += 1;
    if (event.upvotes && event.upvotes > 2000) score += 2;

    // Church-State special flag
    event.churchStateFlag = /church.{0,20}state|establishment clause|theocra|christian nation/i.test(text);
    if (event.churchStateFlag) score += 3;

    event.severity = score >= 6 ? "critical" : score >= 3 ? "high" : score >= 1 ? "medium" : "low";
    event.severityScore = score;

    return event;
  }

  /* ── Deduplication ──────────────────────────────────────── */
  function deduplicateEvents(events) {
    const seen = new Map();
    return events.filter((e) => {
      // Dedupe by URL hash
      if (seen.has(e.id)) return false;
      // Also fuzzy-match titles (first 60 chars lowercase)
      const titleKey = e.title.toLowerCase().slice(0, 60);
      if (seen.has(titleKey)) return false;
      seen.set(e.id, true);
      seen.set(titleKey, true);
      return true;
    });
  }

  /* ── Main fetch orchestrator ───────────────────────────── */
  async function fetchAllEvents() {
    if (_fetching) return _events;
    _fetching = true;

    console.log("[LiveEvents] Starting global event scan...");
    const startTime = Date.now();
    let allEvents = [];

    // Build fetch tasks — one per keyword group, rotate sources
    const tasks = [];

    for (const [cat, group] of Object.entries(KEYWORD_GROUPS)) {
      // Use first query for GDELT (most comprehensive)
      if (group.queries[0]) {
        tasks.push(queryGDELT(group.queries[0], cat));
      }
      // Use second query for Google News (different angle)
      if (group.queries[1]) {
        tasks.push(queryGoogleNews(group.queries[1], cat));
      }
      // Use a simpler keyword for Reddit
      const redditQuery = getRedditQuery(cat);
      if (redditQuery) {
        tasks.push(queryReddit(redditQuery, cat));
      }
    }

    // Additional Church-State specific searches
    tasks.push(queryGDELT('"church and state" OR "church state separation" removal OR end OR threat', "rl"));
    tasks.push(queryGoogleNews('"church state separation" threatened OR removed OR violated', "rl"));

    // Execute all in parallel
    const results = await Promise.allSettled(tasks);
    results.forEach((r) => {
      if (r.status === "fulfilled" && Array.isArray(r.value)) {
        allEvents = allEvents.concat(r.value);
      }
    });

    // Enrich, deduplicate, sort
    allEvents = allEvents.map(enrichEvent);
    allEvents = deduplicateEvents(allEvents);
    allEvents.sort((a, b) => {
      // Critical items first, then by date
      if (a.severity !== b.severity) {
        const order = { critical: 0, high: 1, medium: 2, low: 3 };
        return (order[a.severity] || 3) - (order[b.severity] || 3);
      }
      return new Date(b.date) - new Date(a.date);
    });

    // Trim to max
    allEvents = allEvents.slice(0, CONFIG.maxTotalEvents);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(
      `[LiveEvents] Scan complete: ${allEvents.length} events in ${elapsed}s ` +
      `(${allEvents.filter((e) => e.severity === "critical").length} critical, ` +
      `${allEvents.filter((e) => e.churchStateFlag).length} church-state alerts)`
    );

    _events = allEvents;
    _fetching = false;

    // Cache
    try {
      localStorage.setItem(CONFIG.cacheKey, JSON.stringify(allEvents));
      localStorage.setItem(CONFIG.cacheTimestampKey, Date.now().toString());
    } catch (e) {
      console.warn("[LiveEvents] Cache write failed", e.message);
    }

    if (_onUpdate) _onUpdate(_events);
    return _events;
  }

  /* ── Simplified Reddit queries per category ────────────── */
  function getRedditQuery(cat) {
    const map = {
      sl: "Sunday law OR blue law OR Sunday rest law",
      cbdc: "CBDC OR central bank digital currency",
      did: "digital ID OR biometric surveillance",
      rl: "religious liberty OR religious freedom persecution",
      bs: "cashless society OR financial surveillance OR Vatican",
    };
    return map[cat] || null;
  }

  /* ── Cache loading ─────────────────────────────────────── */
  function loadFromCache() {
    try {
      const ts = parseInt(localStorage.getItem(CONFIG.cacheTimestampKey) || "0", 10);
      if (Date.now() - ts > CONFIG.refreshInterval) return null;
      const raw = localStorage.getItem(CONFIG.cacheKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  /* ── Public API ────────────────────────────────────────── */
  function init(onUpdate) {
    _onUpdate = onUpdate;

    // Try cache first
    const cached = loadFromCache();
    if (cached && cached.length) {
      _events = cached;
      console.log(`[LiveEvents] Loaded ${cached.length} events from cache`);
      if (_onUpdate) _onUpdate(_events);
    }

    // Fetch fresh (even if cached — async update)
    fetchAllEvents();

    // Auto-refresh
    _refreshTimer = setInterval(fetchAllEvents, CONFIG.refreshInterval);
  }

  function destroy() {
    if (_refreshTimer) clearInterval(_refreshTimer);
  }

  function getEvents() {
    return _events;
  }

  function getEventsByCategory(cat) {
    return _events.filter((e) => e.category === cat);
  }

  function getCriticalEvents() {
    return _events.filter((e) => e.severity === "critical" || e.severity === "high");
  }

  function getChurchStateAlerts() {
    return _events.filter((e) => e.churchStateFlag);
  }

  function getEventsForCountry(countryCode) {
    return _events.filter((e) => e.countries && e.countries.includes(countryCode));
  }

  function forceRefresh() {
    return fetchAllEvents();
  }

  function getLastUpdateTime() {
    const ts = parseInt(localStorage.getItem(CONFIG.cacheTimestampKey) || "0", 10);
    return ts ? new Date(ts) : null;
  }

  /* ── Helpers ───────────────────────────────────────────── */
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return "ev_" + Math.abs(hash).toString(36);
  }

  function parseGDELTDate(dateStr) {
    // GDELT dates: "20260424T120000Z" format
    try {
      const y = dateStr.slice(0, 4);
      const m = dateStr.slice(4, 6);
      const d = dateStr.slice(6, 8);
      const h = dateStr.slice(9, 11) || "00";
      const mi = dateStr.slice(11, 13) || "00";
      return new Date(`${y}-${m}-${d}T${h}:${mi}:00Z`).toISOString();
    } catch (e) {
      return new Date().toISOString();
    }
  }

  function stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  function extractDomain(url) {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch (e) {
      return null;
    }
  }

  /* ── Expose ────────────────────────────────────────────── */
  return {
    init,
    destroy,
    getEvents,
    getEventsByCategory,
    getCriticalEvents,
    getChurchStateAlerts,
    getEventsForCountry,
    forceRefresh,
    getLastUpdateTime,
    KEYWORD_GROUPS,
    CONFIG,
  };
})();
