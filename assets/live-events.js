/* ══════════════════════════════════════════════════════════════
   LIVE EVENT CHECKER — Prophecy Watch Global Alert Map
   ──────────────────────────────────────────────────────────
   Monitors global news for prophetically significant events:
   CBDC, Sunday Laws, Digital ID, Religious Liberty,
   Church-State merger, Beast System infrastructure.
   
   Sources:
     • GDELT Project API (proxied via rss2json — English filter + 1-month window)
     • Google News RSS via rss2json proxy
     • Bing News RSS via rss2json proxy
     • Vatican News RSS (papal encyclicals, Sunday rest, church-state)
     • Christian Post RSS (US religious liberty, Sunday law, church-state)
     • Reddit public JSON endpoints
     • Curated/pinned events (manually verified high-impact items)
   
   Categories:
     • sl  — Sunday Laws / Rest Day legislation
     • cs  — Church & State merger signals
     • cbdc — Central Bank Digital Currency
     • did — Digital ID & Surveillance
     • rl  — Religious Liberty threats
     • bs  — Beast System infrastructure
   
   Caches in localStorage. Auto-refreshes every 30 minutes.
══════════════════════════════════════════════════════════════ */

"use strict";

const LiveEvents = (function () {

  /* ── Configuration ─────────────────────────────────────── */
  const CONFIG = {
    refreshInterval: 30 * 60 * 1000,   // 30 minutes
    cacheKey: "prophecy_live_events",
    cacheTimestampKey: "prophecy_live_events_ts",
    maxEventsPerCategory: 25,
    maxTotalEvents: 150,
    gdeltMaxRecords: 75,
    requestTimeout: 12000,

    // Optional free key from https://rss2json.com/ — without one, the public
    // endpoint is heavily throttled and Google News/Bing News requests will
    // silently fail under load. Paste a key here once you have one.
    rss2jsonApiKey: "",

    // When false (default), only the primary query per category + Reddit is
    // fetched — ~24 requests per scan. When true, also fires the secondary
    // query set (queries[3]/[4] per category + the extra cross-cutting
    // searches) for deeper coverage — ~45 requests per scan. Only turn this
    // on once rss2jsonApiKey is set, or the extra requests will just get
    // throttled.
    deepScan: false,

    // Requests are fired in small waves instead of all at once, to avoid
    // bursting past rate limits on the free proxies.
    requestBatchSize: 8,
    requestBatchDelay: 400, // ms between waves
  };

  /* ── Keyword groups mapped to prophecy categories ──────── */
  const KEYWORD_GROUPS = {
    sl: {
      label: "Sunday Laws / Rest Day",
      icon: "📅",
      queries: [
        '"Sunday law" OR "Sunday rest" OR "blue law" OR "Sunday closing"',
        '"Lord\'s Day" legislation OR "Lord\'s Day Alliance" OR "Lord\'s Day" observance law',
        '"Dies Domini" OR "mandatory day of rest" OR "national rest day" legislation OR mandate',
        '"Sabbath law" OR "sabbath legislation" OR "blue law" passed OR signed 2025 OR 2026',
        '"Sunday trading" ban OR restrict',
        '"day of worship" mandate OR legislation',
        '"national day of rest" OR "national rest day" OR "national Shabbat"',
        '"day of rest" president OR government OR legislation OR national',
        '"rest day" law OR bill OR mandate OR executive order',
        '"Sabbath" law OR legislation OR national OR government OR proclamation',
      ],
    },
    cs: {
      label: "Church & State",
      icon: "⛪",
      queries: [
        '"church and state" OR "church-state" merge OR combine OR unite OR end separation',
        '"Christian nation" OR "Christian nationalism" OR "national religion"',
        'president OR government "day of prayer" OR "day of rest" OR "religious observance"',
        '"faith-based" executive order OR legislation OR government',
        '"religious" endorsement OR establishment OR government mandate',
        'Trump OR president "Shabbat" OR "Sabbath" OR "day of rest" OR "national prayer"',
        '"theocracy" OR "theocratic" OR "God\'s law" legislation OR government',
        'pope OR Vatican president OR congress OR "White House" meeting OR agreement',
        '"national prayer" OR "national worship" OR "national faith" proclamation OR decree',
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
        '"stablecoin" regulation OR government OR federal',
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
        '"real ID" OR "national ID" mandatory OR required OR deadline',
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
        '"conscience" objection OR rights OR denied OR mandatory worship',
        '"Sabbath" keeper OR observer discrimination OR fired OR forced',
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
        '"global governance" OR "world government" economy OR religion',
        '"Laudato Si" OR encyclical OR papal decree environment OR rest',
      ],
    },
  };

  /* ── Content-based category re-tagging ──────────────────────
     Previously an event's `category` was just whatever query/source first
     pulled it in, so an article that's genuinely both Sunday-law AND
     church-state would only ever keep one tag — and which one depended on
     unpredictable Promise resolution order. These simplified patterns
     (deliberately broader/looser than the precise search-engine queries
     above) test the actual article text so an event can carry multiple
     legitimate category tags. `category` is left as-is for backward
     compatibility; `categories` is the new array to filter/count on. */
  const CATEGORY_TAGS = {
    sl: /\b(sunday law|blue law|day of rest|national rest day|mandatory rest|sabbath legislation|sunday closing|sunday trading)\b/i,
    cs: /\b(church and state|church-state|separation of church and state|establishment clause|christian nationalism|christian nation|faith.based (government|policy|office)|vatican|pope|papal)\b/i,
    cbdc: /\b(cbdc|central bank digital currency|digital (dollar|euro|yuan|pound|rupee)|cashless society|digital currency (pilot|rollout|launch))\b/i,
    did: /\b(digital id|digital identity|biometric id|national id card|vaccine passport|digital passport|e[- ]?id|real[- ]id)\b/i,
    rl: /\b(religious liberty|religious freedom|religious discrimination|sabbath keeper|conscientious objector|faith.based exemption)\b/i,
    bs: /\b(mark of the beast|beast system|social credit|surveillance state|global governance|one world (government|currency|religion)|great reset)\b/i,
  };

  function deriveCategories(text, originCategory) {
    const matched = Object.keys(CATEGORY_TAGS).filter((cat) => CATEGORY_TAGS[cat].test(text));
    if (matched.indexOf(originCategory) === -1) matched.push(originCategory);
    return matched.length ? matched : [originCategory];
  }

  /* ── Post-fetch relevance guard ─────────────────────────────
     Broad queries (especially GDELT and Vatican News RSS) can return
     false positives — e.g. an article about "law enforcement" matching
     a Lord's Day query, or a general Vatican article matching "cs".
     These patterns test the actual title + snippet against the minimum
     threshold for genuine prophetic relevance before the event is kept.
     Curated events bypass this check (they are pre-verified). */
  const RELEVANCE_PATTERNS = {
    sl: /sunday law|blue law|sabbath (law|legislat|mandate|bill|act|enforcement)|lord.?s day (law|legislat|bill|observ|alliance)|day of rest (law|bill|legislat|mandate)|sunday trading (law|ban|restrict|bill)|sunday closing|sunday rest (law|bill)|rest day law|national rest day|mandatory (sunday|sabbath) (rest|law|closing)|compulsory sunday|sunday protection|sr323|blue law restoration/i,
    cs: /church.{0,20}state|christian nation|theocra|national (prayer day|sabbath|shabbat|worship event|faith day)|pope.{0,25}(president|government|congress|white house|legislat|world leader)|faith.{0,10}(office|based govern|based legislat)|establishment clause|white house.{0,20}(faith|prayer|religion|worship)|christian nationalism.{0,20}(law|legislat|govern|bill)|church state (separat|merger|union|breach)|rededicate 250/i,
    cbdc: /cbdc|central bank digital currency|digital (dollar|euro|yuan|ruble|rupee|pound|krona).{0,20}(pilot|launch|rollout|deploy|govern|national|mandator|program)|programmable (money|currency)|digital currency (pilot|launch|rollout|govern|mandate|ban)|cashless society|ban.{0,10}cash|eliminate cash|digital ruble|digital euro|sand dollar cbdc|jam.?dex|drex cbdc/i,
    did: /digital (id|identity).{0,20}(national|government|mandator|system|card|deploy|pilot|rollout|program)|biometric (id|mandator|surveillance|database|register|national|passport)|facial recognition.{0,20}(government|mandator|national|deploy|police|law enforcement)|real.?id (mandator|required|deadline|enforce)|national id card|vaccine passport|digital passport|digital wallet (govern|national|mandator)/i,
    rl: /religious (liberty|freedom).{0,20}(threat|restrict|attack|violat|crisis|under|erode|sued|bill|law|legislation|ruling)|sabbath (keeper|observ|discriminat|fired|denied|forced).{0,20}(court|law|sue|discrim|fine|fired|ruling)|conscientious objector|faith.?based (exempt|discrim|fired)|church (ban|clos|shutt|fined|criminali|raid)|pastor (arrest|imprison|fine|jail|charge|criminali)|religious minority.{0,20}(attack|persec|restrict)/i,
    bs: /cashless (society|payment|economy|world)|social credit (system|score|china|expand|adopt|implement)|financial (surveillance|control|restrict|monitor).{0,20}(govern|law|bill|mandate|implement)|buy.{0,15}sell.{0,15}(restrict|ban|digital|require)|global governance.{0,20}(financ|econom|religio)|great reset|laudato si|papal (decree|encyclical).{0,20}(rest|sunday|govern|law)|pope.{0,20}encyclical/i,
  };

  function isEventRelevant(event) {
    if (event.origin === "curated") return true; // curated events are pre-verified
    const filter = RELEVANCE_PATTERNS[event.category];
    if (!filter) return true;
    return filter.test(`${event.title} ${event.snippet}`);
  }

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

    /* Added to close the gap with COUNTRIES on the map — previously only
       ~32 of 54 tracked countries could ever be matched to a live event. */
    AT: /\b(Austria|Vienna|Austrian)\b/i,
    BE: /\b(Belgium|Brussels|Belgian)\b/i,
    BS: /\b(Bahamas|Nassau|Bahamian)\b/i,
    CH: /\b(Switzerland|Swiss|Bern|Geneva)\b/i,
    CL: /\b(Chile|Santiago|Chilean)\b/i,
    DK: /\b(Denmark|Copenhagen|Danish)\b/i,
    EG: /\b(Egypt|Cairo|Egyptian)\b/i,
    ES: /\b(Spain|Madrid|Spanish)\b/i,
    ET: /\b(Ethiopia|Addis Ababa|Ethiopian)\b/i,
    FI: /\b(Finland|Helsinki|Finnish)\b/i,
    GR: /\b(Greece|Athens|Greek)\b/i,
    HR: /\b(Croatia|Zagreb|Croatian)\b/i,
    HU: /\b(Hungary|Budapest|Hungarian|Orb[aá]n)\b/i,
    IR: /\b(Iran|Tehran|Iranian)\b/i,
    JM: /\b(Jamaica|Kingston|Jamaican)\b/i,
    KP: /\b(North Korea|Pyongyang|DPRK|Kim Jong)\b/i,
    KZ: /\b(Kazakhstan|Astana|Kazakh)\b/i,
    ME: /\b(Montenegro|Podgorica|Montenegrin)\b/i,
    NL: /\b(Netherlands|Amsterdam|Dutch|The Hague)\b/i,
    NO: /\b(Norway|Oslo|Norwegian)\b/i,
    PK: /\b(Pakistan|Islamabad|Pakistani)\b/i,
    PT: /\b(Portugal|Lisbon|Portuguese)\b/i,
    SI: /\b(Slovenia|Ljubljana|Slovenian)\b/i,
    SK: /\b(Slovakia|Bratislava|Slovak)\b/i,
    TR: /\b(Turkey|Ankara|Turkish|Erdogan)\b/i,
    UG: /\b(Uganda|Kampala|Ugandan)\b/i,
    VE: /\b(Venezuela|Caracas|Venezuelan|Maduro)\b/i,
  };

  /* ── Severity scoring keywords ─────────────────────────── */
  const HIGH_SEVERITY = [
    /\b(mandatory|enforce(?:d|ment)?|pass(?:ed)?|signed into law|approved|implement(?:ed)?)\b/i,
    /\b(criminal|penalty|fine|arrest|imprison)\b/i,
    /\b(ban(?:ned)?|restrict(?:ed|ion)?|prohibit(?:ed)?|forbid(?:den)?)\b/i,
    /\b(church.{0,15}state|establishment clause)\b/i,
    /\b(president|executive order|proclamation|decree).{0,30}(rest|worship|prayer|Sabbath|Sunday)\b/i,
    /\b(national).{0,15}(Shabbat|Sabbath|rest day|day of rest|prayer)\b/i,
    /\b(Vatican|Pope).{0,20}(president|congress|government|legislation)\b/i,
  ];
  const MEDIUM_SEVERITY = [
    /\b(propos(?:e|al|ed)|bill|draft|resolution|legislation)\b/i,
    /\b(pilot|trial|test|phase|rollout)\b/i,
    /\b(expand|extend|accelerat)\b/i,
    /\b(Vatican|Pope|papal)\b/i,
    /\b(faith.based|religious).{0,15}(government|policy|initiative|office)\b/i,
    /\b(Christian nation|Christian nationalism)\b/i,
    /\b(day of rest|rest day).{0,15}(call|urge|promote|advocate)\b/i,
    // Moved down from HIGH_SEVERITY: "national"/"federal" alone are far too
    // common in ordinary government reporting to imply high severity on
    // their own — they were making it trivially easy to hit "critical".
    /\b(nationwide|all citizens)\b/i,
  ];

  /* ── State ─────────────────────────────────────────────── */
  let _events = [];
  let _refreshTimer = null;
  let _onUpdate = null;
  let _fetching = false;
  let _sourceHealth = {
    gdelt: { ok: 0, fail: 0 },
    google_news: { ok: 0, fail: 0 },
    bing_news: { ok: 0, fail: 0 },
    reddit: { ok: 0, fail: 0 },
    vatican_news: { ok: 0, fail: 0 },
    christian_post: { ok: 0, fail: 0 },
  };

  function resetSourceHealth() {
    Object.keys(_sourceHealth).forEach((k) => { _sourceHealth[k] = { ok: 0, fail: 0 }; });
  }
  function recordHealth(origin, ok) {
    if (!_sourceHealth[origin]) _sourceHealth[origin] = { ok: 0, fail: 0 };
    _sourceHealth[origin][ok ? "ok" : "fail"]++;
  }

  /* ── Utility: timeout-wrapped fetch ────────────────────── */
  function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);
    return fetch(url, { signal: controller.signal })
      .finally(() => clearTimeout(id));
  }

  /* ── Utility: rss2json passthrough URL, with optional API key ──── */
  function rss2jsonUrl(rssUrl) {
    let url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    if (CONFIG.rss2jsonApiKey) url += `&api_key=${encodeURIComponent(CONFIG.rss2jsonApiKey)}`;
    return url;
  }

  /* ── Utility: run task factories in small delayed waves ────────
     Avoids bursting every request at once, which is what trips the
     free-tier rate limits on rss2json / Reddit. */
  async function runBatched(factories, batchSize, delayMs) {
    const results = [];
    for (let i = 0; i < factories.length; i += batchSize) {
      const batch = factories.slice(i, i + batchSize).map((fn) => fn());
      const settled = await Promise.allSettled(batch);
      results.push(...settled);
      if (i + batchSize < factories.length && delayMs) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
    return results;
  }

  /* ── GDELT API (proxied via rss2json for CORS reliability) ───
     Routing through rss2json eliminates the intermittent CORS errors that
     occur when hitting api.gdeltproject.org directly from a browser context.
     `sourcelang:english` filters non-English articles at the GDELT level;
     `timespan=1month` limits results to recent news and reduces stale noise. */
  async function queryGDELT(searchQuery, category) {
    const encoded = encodeURIComponent(searchQuery + ' sourcelang:english');
    const gdeltRss =
      `https://api.gdeltproject.org/api/v2/doc/doc` +
      `?query=${encoded}&mode=artlist` +
      `&maxrecords=${CONFIG.gdeltMaxRecords}` +
      `&format=rss&sort=datedesc&timespan=1month`;
    const apiUrl = rss2jsonUrl(gdeltRss);

    try {
      const resp = await fetchWithTimeout(apiUrl, CONFIG.requestTimeout);
      if (!resp.ok) { recordHealth("gdelt", false); return []; }
      const data = await resp.json();
      if (data.status !== "ok" || !data.items) { recordHealth("gdelt", false); return []; }
      recordHealth("gdelt", true);

      return data.items.map((item) => ({
        id: hashCode(item.link || item.guid || item.title),
        title: stripHtml(item.title) || "Untitled",
        url: item.link,
        source: extractDomain(item.link) || "GDELT",
        date: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        snippet: stripHtml(item.description || item.content || "").slice(0, 300),
        image: item.thumbnail || item.enclosure?.link || null,
        category: category,
        origin: "gdelt",
        language: "English",
      }));
    } catch (e) {
      recordHealth("gdelt", false);
      console.warn(`[LiveEvents] GDELT query failed: ${searchQuery}`, e.message);
      return [];
    }
  }

  /* ── Google News RSS via rss2json ──────────────────────── */
  async function queryGoogleNews(searchQuery, category) {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=en-US&gl=US&ceid=US:en`;
    const apiUrl = rss2jsonUrl(rssUrl);

    try {
      const resp = await fetchWithTimeout(apiUrl, CONFIG.requestTimeout);
      if (!resp.ok) { recordHealth("google_news", false); return []; }
      const data = await resp.json();
      if (data.status !== "ok" || !data.items) { recordHealth("google_news", false); return []; }
      recordHealth("google_news", true);

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
      recordHealth("google_news", false);
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
      if (!resp.ok) { recordHealth("reddit", false); return []; }
      const data = await resp.json();
      if (!data.data || !data.data.children) { recordHealth("reddit", false); return []; }
      recordHealth("reddit", true);

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
      // Note: Reddit's public JSON endpoints don't reliably send
      // Access-Control-Allow-Origin for arbitrary origins. If this is
      // always failing, check the browser console for a CORS error
      // specifically (it won't always surface as a normal fetch rejection
      // message) — that would mean Reddit needs to be dropped or proxied.
      recordHealth("reddit", false);
      console.warn(`[LiveEvents] Reddit query failed: ${searchQuery}`, e.message);
      return [];
    }
  }

  /* ── Bing News RSS (no API key needed) ───────────────── */
  async function queryBingNews(searchQuery, category) {
    const rssUrl = `https://www.bing.com/news/search?q=${encodeURIComponent(searchQuery)}&format=rss`;
    const apiUrl = rss2jsonUrl(rssUrl);

    try {
      const resp = await fetchWithTimeout(apiUrl, CONFIG.requestTimeout);
      if (!resp.ok) { recordHealth("bing_news", false); return []; }
      const data = await resp.json();
      if (data.status !== "ok" || !data.items) { recordHealth("bing_news", false); return []; }
      recordHealth("bing_news", true);

      return data.items.map((item) => ({
        id: hashCode(item.link || item.guid),
        title: stripHtml(item.title) || "Untitled",
        url: item.link,
        source: item.author || extractDomain(item.link) || "Bing News",
        date: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        snippet: stripHtml(item.description || item.content || "").slice(0, 300),
        image: item.thumbnail || item.enclosure?.link || null,
        category: category,
        origin: "bing_news",
        language: "English",
      }));
    } catch (e) {
      recordHealth("bing_news", false);
      console.warn(`[LiveEvents] Bing News query failed: ${searchQuery}`, e.message);
      return [];
    }
  }

  /* ── Generic RSS feed query via rss2json ────────────────────
     Used for Vatican News, Christian Post and any other public RSS.
     The post-fetch relevance filter removes off-topic articles. */
  async function queryRSSFeed(rssUrl, category, originTag) {
    const apiUrl = rss2jsonUrl(rssUrl);
    try {
      const resp = await fetchWithTimeout(apiUrl, CONFIG.requestTimeout);
      if (!resp.ok) { recordHealth(originTag, false); return []; }
      const data = await resp.json();
      if (data.status !== "ok" || !data.items) { recordHealth(originTag, false); return []; }
      recordHealth(originTag, true);
      return data.items.slice(0, 20).map((item) => ({
        id: hashCode(item.link || item.guid || item.title),
        title: stripHtml(item.title) || "Untitled",
        url: item.link,
        source: item.author || extractDomain(item.link) || originTag,
        date: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        snippet: stripHtml(item.description || item.content || "").slice(0, 300),
        image: item.thumbnail || item.enclosure?.link || null,
        category: category,
        origin: originTag,
        language: "English",
      }));
    } catch (e) {
      recordHealth(originTag, false);
      console.warn(`[LiveEvents] RSS feed failed: ${rssUrl}`, e.message);
      return [];
    }
  }

  /* ── Curated / Pinned Events (manually verified, high-impact) ── */
  const CURATED_EVENTS = [
    {
      id: "curated_trump_national_shabbat_2025",
      title: "Trump Becomes First U.S. President to Call for National Shabbat",
      url: "https://www.ifcj.org/news/stand-for-israel-blog/donald-trump-become-first-u-s-president-to-call-for-national-shabbat",
      source: "IFCJ / Stand for Israel",
      date: "2025-03-28T00:00:00Z",
      snippet: "President Trump called on Americans to observe a national day of rest (Shabbat), marking the first time a U.S. president has issued such a call. A significant church-state development — government endorsing religious rest day observance.",
      image: null,
      category: "cs",
      origin: "curated",
      language: "English",
    },
    {
      id: "curated_white_house_faith_office_2025",
      title: "Trump Establishes White House Faith Office and Anti-Christian Bias Task Force",
      url: "https://www.whitehouse.gov/presidential-actions/2025/02/establishing-white-house-faith-office/",
      source: "White House",
      date: "2025-02-07T00:00:00Z",
      snippet: "Executive order establishing the White House Faith Office (directed by Paula White-Cain) and a DOJ-funded Task Force to Eradicate Anti-Christian Bias — a permanent institutional pipeline from religious lobbies to the Oval Office and Department of Justice, creating a church-state architecture with no modern precedent in the United States.",
      image: null,
      category: "cs",
      origin: "curated",
      language: "English",
    },
    {
      id: "curated_pope_leo_xiv_elected_2025",
      title: "Pope Leo XIV Elected — First American Pope; Name Signals Continuity with Sunday Rest Encyclical Legacy",
      url: "https://www.vaticannews.va/en/pope/news/2025-05/pope-leo-xiv-elected-first-american-pope.html",
      source: "Vatican News",
      date: "2025-05-08T00:00:00Z",
      snippet: "Cardinal Robert Prevost elected as Pope Leo XIV — the first American pope. Taking the name Leo XIV signals continuity with Leo XIII's Rerum Novarum (1891), which first enshrined Sunday rest as a worker's right and formed the doctrinal foundation for all subsequent papal Sunday law calls. The 135th anniversary of Rerum Novarum falls in May 2026.",
      image: null,
      category: "bs",
      origin: "curated",
      language: "English",
    },
    {
      id: "curated_heritage_sr323_2026",
      title: "Heritage Foundation SR323: Blue Law Restoration Called 'Culture-Wide Manhattan Project'",
      url: "https://www.heritage.org/sites/default/files/2026-01/SR323.pdf",
      source: "Heritage Foundation",
      date: "2026-01-08T00:00:00Z",
      snippet: "Heritage Foundation Special Report SR323 'Saving America by Saving the Family' proposes amending FLSA to require time-and-a-half for Sunday work. Authors Roger Severino and Jay W. Richards use explicitly theological language: 'God ordained the Sabbath.' SDA Church formally responded within 10 days. Most significant US Sunday law proposal in over a century.",
      image: null,
      category: "sl",
      origin: "curated",
      language: "English",
    },
    {
      id: "curated_eu_digital_euro_pilot_2026",
      title: "ECB Advances Digital Euro to Retail Pilot Phase Across Eurozone",
      url: "https://www.ecb.europa.eu/euro/digital_euro/html/index.en.html",
      source: "European Central Bank",
      date: "2026-01-15T00:00:00Z",
      snippet: "The European Central Bank advanced the digital euro to a retail pilot with banks and merchants in Germany, France, Italy, Spain and the Netherlands. The programmable digital euro can include spending controls, geographic restrictions, and expiry dates — the technical infrastructure for Revelation 13:17 economic control. 340 million Eurozone citizens would be covered by a full rollout.",
      image: null,
      category: "cbdc",
      origin: "curated",
      language: "English",
    },
    {
      id: "curated_montenegro_sunday_law_2026",
      title: "Montenegro Parliament Votes to Legally Reinstate Sunday as Mandatory Day of Rest",
      url: "https://www.vijesti.me/vijesti/politika/784000/crna-gora-nedjelja-dan-odmora",
      source: "Vijesti News (Montenegro)",
      date: "2026-02-16T00:00:00Z",
      snippet: "Montenegro's parliament voted to legally reinstate Sunday as a mandatory day of rest — the first new national Sunday law enacted in Europe in the modern era. Both left-wing and right-wing parties voted together, framed as a worker-health measure. This mirrors Constantine's 321 AD Sunday edict where secular and religious interests converged under one political outcome, 1,700 years later.",
      image: null,
      category: "sl",
      origin: "curated",
      language: "English",
    },
    {
      id: "curated_magnifica_humanitas_2026",
      title: "Pope Leo XIV Issues 'Magnifica Humanitas' — Calls for Protection of Sunday Rest in the Age of AI",
      url: "https://www.vaticannews.va/en/pope/news/2026-05/magnifica-humanitas-encyclical-pope-leo-xiv.html",
      source: "Vatican News",
      date: "2026-05-15T00:00:00Z",
      snippet: "Pope Leo XIV's encyclical 'Magnifica Humanitas', released on the 135th anniversary of Rerum Novarum, calls for protecting 'authentic human time' and Sunday rest against AI and digital work encroachment. Released two days before the Rededicate 250 National Mall worship event — the Vatican Sunday-rest agenda and the US government faith agenda converge in the same week.",
      image: null,
      category: "cs",
      origin: "curated",
      language: "English",
    },
    {
      id: "curated_rededicate_250_2026",
      title: "'Rededicate 250': Presidential 12-Hour Christian Worship Event on National Mall — Sunday May 17, 2026",
      url: "https://www.whitehouse.gov/briefings-statements/rededicate-250/",
      source: "White House",
      date: "2026-05-17T00:00:00Z",
      snippet: "A 12-hour presidential Christian worship event on the National Mall, announced by President Trump at the 74th National Prayer Breakfast flanked by Speaker Mike Johnson. The second federal Christian observance event within 10 days (after National Day of Prayer, May 7) — unprecedented in modern US history. Direct church-state convergence with a Sunday focus.",
      image: null,
      category: "cs",
      origin: "curated",
      language: "English",
    },
  ];

  function getCuratedEvents() {
    return CURATED_EVENTS.map((e) => ({ ...e }));
  }

  /* ── Enrichment: detect country & severity ─────────────── */
  function enrichEvent(event) {
    const text = `${event.title} ${event.snippet}`;

    // Detect countries
    event.countries = [];
    for (const [code, rx] of Object.entries(COUNTRY_PATTERNS)) {
      if (rx.test(text)) event.countries.push(code);
    }

    // Multi-category tagging based on actual content, not just whichever
    // query/source happened to fetch the article first.
    event.categories = deriveCategories(text, event.category);

    // Severity scoring
    let score = 0;
    HIGH_SEVERITY.forEach((rx) => { if (rx.test(text)) score += 3; });
    MEDIUM_SEVERITY.forEach((rx) => { if (rx.test(text)) score += 1; });
    if (event.upvotes && event.upvotes > 500) score += 1;
    if (event.upvotes && event.upvotes > 2000) score += 2;

    // Church-State special flag
    event.churchStateFlag = /church.{0,20}state|establishment clause|theocra|christian nation|national.{0,10}(shabbat|sabbath|rest|prayer|worship)|president.{0,30}(prayer|rest|sabbath|worship)|pope.{0,20}(president|congress|white house)/i.test(text);
    if (event.churchStateFlag) score += 3;
    if (event.category === "cs") {
      event.churchStateFlag = true;
      score += 2;
    }

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

  /* ── Per-category cap ─────────────────────────────────────
     CONFIG.maxEventsPerCategory previously existed but was never enforced,
     so a high-volume category (e.g. CBDC) could fill the entire
     maxTotalEvents budget and crowd out quieter categories (e.g. Beast
     System) once everything got sorted severity-first. This keeps every
     category represented, each capped and internally sorted by severity. */
  function capPerCategory(events) {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    const byCategory = {};
    events.forEach((e) => {
      (byCategory[e.category] = byCategory[e.category] || []).push(e);
    });
    let capped = [];
    Object.keys(byCategory).forEach((cat) => {
      const group = byCategory[cat].sort((a, b) => {
        if (a.severity !== b.severity) return (order[a.severity] || 3) - (order[b.severity] || 3);
        return new Date(b.date) - new Date(a.date);
      });
      capped = capped.concat(group.slice(0, CONFIG.maxEventsPerCategory));
    });
    return capped;
  }

  /* ── Main fetch orchestrator ───────────────────────────── */
  async function fetchAllEvents() {
    if (_fetching) return _events;
    _fetching = true;
    resetSourceHealth();

    console.log("[LiveEvents] Starting global event scan...");
    const startTime = Date.now();
    let allEvents = [];

    // Build deferred task factories — multiple queries per group across
    // multiple sources. Using factories (not promises) means each fetch
    // only actually starts when runBatched() gets to it, which is what
    // lets us stagger the burst instead of firing everything at once.
    const taskFactories = [];

    for (const [cat, group] of Object.entries(KEYWORD_GROUPS)) {
      // Primary query per source — always runs.
      if (group.queries[0]) taskFactories.push(() => queryGDELT(group.queries[0], cat));
      if (group.queries[1]) taskFactories.push(() => queryGoogleNews(group.queries[1], cat));
      if (group.queries[2]) taskFactories.push(() => queryBingNews(group.queries[2], cat));
      const redditQuery = getRedditQuery(cat);
      if (redditQuery) taskFactories.push(() => queryReddit(redditQuery, cat));

      // Secondary queries — only when deepScan is on (see CONFIG comment).
      if (CONFIG.deepScan) {
        if (group.queries[3]) taskFactories.push(() => queryGDELT(group.queries[3], cat));
        if (group.queries[4]) taskFactories.push(() => queryGoogleNews(group.queries[4], cat));
      }
    }

    if (CONFIG.deepScan) {
      // Additional Church-State specific searches (expanded)
      taskFactories.push(() => queryGDELT('"church and state" OR "church state separation" removal OR end OR threat', "cs"));
      taskFactories.push(() => queryGoogleNews('"church state separation" threatened OR removed OR violated', "cs"));
      taskFactories.push(() => queryBingNews('president "day of rest" OR "national prayer" OR "national Sabbath" OR "national Shabbat"', "cs"));
      taskFactories.push(() => queryGDELT('Trump OR president "Shabbat" OR "Sabbath" OR "day of rest" proclamation', "cs"));
      taskFactories.push(() => queryGoogleNews('"Christian nationalism" OR "Christian nation" government OR legislation', "cs"));
      taskFactories.push(() => queryBingNews('Vatican OR Pope meeting president OR congress OR "world leader"', "cs"));

      // Rest-day / Sabbath law specific (critical intersection)
      taskFactories.push(() => queryGDELT('"national rest day" OR "national day of rest" OR "mandatory rest" OR "universal rest day"', "sl"));
      taskFactories.push(() => queryGoogleNews('"Sabbath" OR "Shabbat" legislation OR law OR national OR government', "sl"));
      taskFactories.push(() => queryBingNews('"Sunday law" OR "blue law" 2025 OR 2026 OR new OR passed', "sl"));
    }

    // Targeted RSS feeds — prophetically relevant outlets that don't need API
    // keys. Vatican News covers papal encyclicals and Sunday-rest calls directly.
    // Christian Post covers US church-state and religious liberty from an
    // evangelical perspective. The relevance filter below removes off-topic
    // articles so adding broad feeds doesn't pollute the event list.
    taskFactories.push(() => queryRSSFeed("https://www.vaticannews.va/en.rss.xml", "cs", "vatican_news"));
    taskFactories.push(() => queryRSSFeed("https://www.vaticannews.va/en/pope.rss.xml", "bs", "vatican_news"));
    taskFactories.push(() => queryRSSFeed("https://www.christianpost.com/rss/", "rl", "christian_post"));
    taskFactories.push(() => queryRSSFeed("https://www.christianpost.com/rss/", "cs", "christian_post"));

    // Execute in staggered waves rather than all requests at once
    const results = await runBatched(taskFactories, CONFIG.requestBatchSize, CONFIG.requestBatchDelay);
    results.forEach((r) => {
      if (r.status === "fulfilled" && Array.isArray(r.value)) {
        allEvents = allEvents.concat(r.value);
      }
    });

    // Inject curated/pinned events (manually verified high-impact items)
    allEvents = allEvents.concat(getCuratedEvents());

    // Post-fetch relevance guard — discard false positives before enrichment
    // (e.g. "law enforcement" matching a Lord's Day query, general Vatican
    // articles matching "cs", day-of-rest articles that aren't actually laws).
    allEvents = allEvents.filter(isEventRelevant);

    // Enrich, deduplicate, balance across categories, sort
    allEvents = allEvents.map(enrichEvent);
    allEvents = deduplicateEvents(allEvents);
    allEvents = capPerCategory(allEvents);
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
    console.log("[LiveEvents] Source health this scan:", JSON.stringify(_sourceHealth));

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
      sl: "Sunday law OR blue law OR Sunday rest law OR national day of rest",
      cs: "church state OR Christian nationalism OR national prayer OR national Shabbat OR national Sabbath",
      cbdc: "CBDC OR central bank digital currency",
      did: "digital ID OR biometric surveillance",
      rl: "religious liberty OR religious freedom persecution OR Sabbath discrimination",
      bs: "cashless society OR financial surveillance OR Vatican political",
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

    const ts = parseInt(localStorage.getItem(CONFIG.cacheTimestampKey) || "0", 10);
    const age = ts ? Date.now() - ts : Infinity;
    const cached = loadFromCache(); // null if missing or already stale

    if (cached && cached.length) {
      _events = cached;
      console.log(`[LiveEvents] Loaded ${cached.length} events from cache (${Math.round(age / 60000)}m old)`);
      if (_onUpdate) _onUpdate(_events);
    }

    if (cached) {
      // Cache is still fresh — every previous version of this code re-ran
      // the full ~45-request scan on every single page load regardless of
      // cache age, which is most of why the free-tier sources were getting
      // throttled. Now we just wait until the cache would actually go
      // stale before scanning again.
      const remaining = Math.max(CONFIG.refreshInterval - age, 0);
      _refreshTimer = setTimeout(function () {
        fetchAllEvents();
        _refreshTimer = setInterval(fetchAllEvents, CONFIG.refreshInterval);
      }, remaining);
    } else {
      // No usable cache — scan now
      fetchAllEvents();
      _refreshTimer = setInterval(fetchAllEvents, CONFIG.refreshInterval);
    }
  }

  function destroy() {
    if (_refreshTimer) { clearInterval(_refreshTimer); clearTimeout(_refreshTimer); }
  }

  function getEvents() {
    return _events;
  }

  function getSourceHealth() {
    return _sourceHealth;
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
    getSourceHealth,
    KEYWORD_GROUPS,
    CATEGORY_TAGS,
    CONFIG,
  };
})();
