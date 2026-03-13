/* ══════════════════════════════════════════════════════════════
   Babylon's Wine — Study Library
   Application Script
══════════════════════════════════════════════════════════════ */

"use strict";

/* ── Navigation Data ──────────────────────────────────────── */
const LIBRARY = [
  {
    section: "Study Guides",
    icon: "📖",
    id: "study-guides",
    items: [
      {
        title: "Daniel 2: The Prophecy of the Kingdoms",
        file: "Study_guides/Daniel_2_Prophecy_Study_Guide.md",
        icon: "🗿",
        tag: "Daniel Series",
        tagClass: "blue",
        desc: "603 BCE — four world empires foretold in a dream, fulfilled over 2,600 years. God's kingdom that will never pass away.",
      },
      {
        title: "Daniel 7 & 8: The Kingdoms Revealed",
        file: "Study_guides/Daniel_7_and_8_The_Kingdoms_Revealed_Study_Guide.md",
        icon: "🦁",
        tag: "Daniel Series",
        tagClass: "blue",
        desc: "The four beasts, the Little Horn, and the Heavenly Court — God's perspective on the same empires Daniel 2 described.",
      },
      {
        title: "Daniel 9 — Part 1: The Messiah Foretold",
        file: "Study_guides/Daniel_9_Prophecy_Messiah_Part_1_Study_Guide.md",
        icon: "✡️",
        tag: "Daniel Series",
        tagClass: "blue",
        desc: "The most mathematically precise prophecy in Scripture: the exact year of the Messiah's arrival, predicted 500 years in advance.",
      },
      {
        title: "Daniel 9 — Part 2: The Crucifixion & Resurrection",
        file: "Study_guides/Daniel_9_Prophecy_Messiah_Part_2_Study_Guide.md",
        icon: "✝️",
        tag: "Daniel Series",
        tagClass: "blue",
        desc: "The 70th week — Messiah cut off in 31 CE, the covenant confirmed, Jerusalem destroyed, and the gospel going to all nations.",
      },
      {
        title: "The Little Horn: Unmasking the Mystery Power",
        file: "Study_guides/The_Little_Horn_Complete_Study_Guide.md",
        icon: "📯",
        tag: "Revelation",
        tagClass: "red",
        desc: "11 biblical identifying marks, fulfilled by one power throughout history. 'Thinking to change times and laws' — Daniel 7:25.",
      },
      {
        title: "The Other Beast: America in Prophecy",
        file: "Study_guides/The_Other_Beast_Complete_Study_Guide.md",
        icon: "🦅",
        tag: "Revelation",
        tagClass: "red",
        desc: "Revelation 13's second beast — a nation that rises with lamb-like horns and ends by speaking as a dragon. America's prophetic role.",
      },
      {
        title: "The Mark of the Beast: The Final Test of Loyalty",
        file: "Study_guides/The_Mark_of_the_Beast_Complete_Study_Guide.md",
        icon: "⚠️",
        tag: "Urgent",
        tagClass: "red",
        desc: "What the mark is, who enforces it, how to avoid it — Catholic admissions, Sunday law history, and the final choice every person will face.",
      },
      {
        title: "God's Special Sign: The Sabbath Rest",
        file: "Study_guides/Gods_Special_Sign_Complete_Study_Guide.md",
        icon: "✨",
        tag: "Sabbath",
        tagClass: "green",
        desc: "The Sabbath as God's covenant sign — 'The Repairer of the Breach' and what it means to receive God's seal rather than the mark.",
      },
      {
        title: "The Creator Challenged: Evolution vs. the First Angel",
        file: "Study_guides/The_Creator_Challenged_Complete_Study_Guide.md",
        icon: "🌍",
        tag: "Creation",
        tagClass: "green",
        desc: "Worship is based on Creation. Evolution is the foundation of the final deception. The First Angel calls humanity back to the Creator.",
      },
      {
        title: "Battle at the End — Part 1: Armageddon & the Gathering",
        file: "Study_guides/Battle_at_the_End_Part_1_Complete_Study_Guide.md",
        icon: "⚔️",
        tag: "End Times",
        tagClass: "red",
        desc: "Revelation 19 — Christ with the sword of His Word, the three unclean spirits, and the gathering of the final battle over worship.",
      },
      {
        title: "Battle at the End — Part 2: Babylon's Fall & God's Final Call",
        file: "Study_guides/Battle_at_the_End_Part_2_Complete_Study_Guide.md",
        icon: "🔥",
        tag: "End Times",
        tagClass: "red",
        desc: "Belshazzar's feast, Revelation 18, the handwriting on the wall, and God's loud cry: 'Come out of her, My people.'",
      },
      {
        title: "Sabbath Study Guide: 39 Objections Answered",
        file: "Study_guides/Sabbath_study_guide.md",
        icon: "📅",
        tag: "Sabbath",
        tagClass: "green",
        desc: "The comprehensive Sabbath apologetics guide — 39 common objections answered; 2,000 years of documented Sabbath-keeping communities worldwide.",
      },
    ],
  },
  {
    section: "Interactive Tools",
    icon: "🗺️",
    id: "interactive-tools",
    items: [
      {
        title: "Prophecy Watch: Global Alert Map",
        file: "prophecy_map.html",
        icon: "🌍",
        tag: "Live Map",
        tagClass: "red",
        desc: "Interactive world map tracking Sunday law activity, CBDC rollout, digital surveillance, and religious liberty — country by country. Click any nation for a full prophetic briefing.",
      },
    ],
  },
  {
    section: "Main Library",
    icon: "📚",
    id: "main-library",
    items: [
      {
        title: "Babylon's Wine: The Hidden Legacy & God's Final Call",
        file: "Babylons_Wine_The_Hidden_Legacy_and_Gods_Final_Call.md",
        icon: "🍷",
        tag: "Core Document",
        tagClass: "",
        desc: "The master document of this series. Constantine's legacy, Rome's wine, and God's final call to His people before the crisis.",
      },
      {
        title: "The Vatican Empire: Complete Exposure",
        file: "The_Vatican_Empire_Complete_Exposure.md",
        icon: "🏛️",
        tag: "Prophecy",
        tagClass: "red",
        desc: "Vatican finances, diplomatic power, political structure, and the documented history of the Little Horn power identified in Daniel 7.",
      },
      {
        title: "The Beast System Infrastructure",
        file: "The_Beast_System_Infrastructure_Complete_Guide.md",
        icon: "🔗",
        tag: "End Times",
        tagClass: "red",
        desc: "Surveillance systems, digital payments, social credit, biometric ID — the modern infrastructure for Revelation 13's buy-and-sell enforcement.",
      },
      {
        title: "The Sabbath Rest: Biblical Reset for Body, Mind & Soul",
        file: "The_Sabbath_Rest_Complete_Guide.md",
        icon: "🕊️",
        tag: "Sabbath",
        tagClass: "green",
        desc: "The theology and practice of Sabbath rest — creation rest, covenant theology, Hebrews 4, and the eschatological meaning of the seventh day.",
      },
      {
        title:
          "The Ten Commandments: Catholic, Protestant & Biblical Comparison",
        file: "Commandments.md",
        icon: "📜",
        tag: "Reference",
        tagClass: "blue",
        desc: "Three-way commandment comparison, 18 direct admission quotes, MARK connection table, and the full historical timeline of the Sabbath change.",
      },
      {
        title: "The Daniel Diet: Complete Health Guide",
        file: "Daniel_Diet_Complete_Guide.md",
        icon: "🌿",
        tag: "Health",
        tagClass: "green",
        desc: "Biblical health principles from Daniel 1 — the three-part programme of diet, fasting, and lifestyle for body and mind.",
      },
      {
        title: "Is the SDA Church a Cult? Complete Response",
        file: "Is_SDA_a_Cult_Complete_Response.md",
        icon: "🛡️",
        tag: "Apologetics",
        tagClass: "blue",
        desc: "A thorough, evidence-based response to the cult accusation — doctrine, history, and biblical faithfulness examined.",
      },
      {
        title: "Media Influence: Complete Guide",
        file: "Media_Influence_Complete_Guide.md",
        icon: "📺",
        tag: "Culture",
        tagClass: "",
        desc: "How media shapes belief, normalises false worship, and prepares the world to accept the mark — the spiritual battle on the airwaves.",
      },
    ],
  },
  {
    section: "Reference & Source Documents",
    icon: "📋",
    id: "reference",
    items: [
      {
        title: "Quotes: Catholic & Protestant Admissions on the Sabbath",
        file: "Quotes_regarding_sabbath_change_catholic_and_protestant.md",
        icon: "💬",
        tag: "Primary Sources",
        tagClass: "blue",
        desc: "The most powerful direct-admission quotes from Catholic and Protestant authorities — in their own words — about the Sabbath-to-Sunday transfer.",
      },
      {
        title: "Source Documents: Catholic & Protestant Admissions",
        file: "Source_Documents_Catholic_Protestant_Admissions.md",
        icon: "🗄️",
        tag: "Primary Sources",
        tagClass: "blue",
        desc: "The complete archive: 75+ primary quotes with full citations, publication details, and access instructions.",
      },
      {
        title: "Document Verification Status",
        file: "DOCUMENT_VERIFICATION_STATUS.md",
        icon: "✅",
        tag: "Library Index",
        tagClass: "",
        desc: "Verification status, cross-references, and completeness tracker for the entire library.",
      },
    ],
  },
  {
    section: "Infographics",
    icon: "🗺️",
    id: "infographics",
    items: [
      {
        title: "Infographic I — Sabbath History Timeline",
        file: "infographics/infographic1_timeline.html",
        icon: "📅",
        tag: "Visual",
        tagClass: "blue",
        desc: "A visual timeline of the Sabbath from Creation through the present — every major event, council, and suppression mapped in sequence.",
      },
      {
        title: "Infographic II — World Map of Saturday Keeping",
        file: "infographics/infographic2_worldmap.html",
        icon: "🌍",
        tag: "Visual",
        tagClass: "blue",
        desc: "Global map showing where Saturday Sabbath was kept across every continent throughout history — and where it survives today.",
      },
      {
        title: "Infographic III — Sources & Key Testimony",
        file: "infographics/infographic3_sources.html",
        icon: "📚",
        tag: "Sources",
        tagClass: "blue",
        desc: "Every major source behind the Sabbath history: 22 fully-cited references, 9 key historical figures, all major councils, and 2026 legislative sources.",
      },
      {
        title: "Infographic IV — Hidden Roots of Sunday (Pagan Origins)",
        file: "infographics/infographic4_pagan_roots.html",
        icon: "☀️",
        tag: "History",
        tagClass: "red",
        desc: "The pagan layer nobody talks about: day name etymology in 12 languages, Sol Invictus, Constantine's coin timeline, and the 6-layer model of Sunday's origin.",
      },
      {
        title: "Infographic V — The Suppression Map",
        file: "infographics/infographic5_suppression.html",
        icon: "⚔️",
        tag: "History",
        tagClass: "red",
        desc: "Region-by-region suppression of Saturday across 13 regions — the specific tools, dates, and people used to erase 1,700 years of practice.",
      },
      {
        title: "Infographic VI — The Scripture Evidence",
        file: "infographics/infographic6_scripture.html",
        icon: "📖",
        tag: "Scripture",
        tagClass: "green",
        desc: "Every Bible verse on the Sabbath from Genesis to Revelation — Saturday-keeper and Sunday-keeper arguments for every disputed passage, with a final scorecard.",
      },
      {
        title: "Infographic VII — The Denominations Today (2025)",
        file: "infographics/infographic7_denominations.html",
        icon: "⛪",
        tag: "Current",
        tagClass: "green",
        desc: "Every major denomination's position on Saturday: SDA 23.7M, Ethiopian Orthodox 60M+, Catholics, Protestants, and the rapidly growing independent African movements.",
      },
      {
        title: "Infographic VIII — The Global Rest Day Push (2024–2026)",
        file: "infographics/infographic8_global_push.html",
        icon: "🌐",
        tag: "Current",
        tagClass: "red",
        desc: "The current legislative push: Heritage Foundation SR323, White House faith infrastructure, Italy's St Francis national holiday, and the full convergence of forces.",
      },
      {
        title: "Infographic IX — All Six Convergence Streams (2014–2026)",
        file: "infographics/infographic9_restday_push.html",
        icon: "🔀",
        tag: "Current",
        tagClass: "red",
        desc: "The six streams converging toward Sunday law: political, religious, labour, environmental, media, and geopolitical — all mapped from 2014 to 2026.",
      },
      {
        title: "Infographic X — The Saturday Persecution (1879–1896)",
        file: "infographics/infographic10_persecution.html",
        icon: "⛓️",
        tag: "History",
        tagClass: "red",
        desc: "American Adventists imprisoned on chain gangs for working on Sundays — the historical persecution cycle and its prophetic parallel to today.",
      },
    ],
  },
];

/* Flat list of all items for linear prev/next navigation */
const ALL_ITEMS = LIBRARY.flatMap((section) =>
  section.items.map((item) => ({ ...item, sectionLabel: section.section })),
);

let currentIndex = -1;
let infographicRefitTimer = null;

function applyInfographicMobileStyles(frameDoc) {
  const styleId = "infographic-mobile-overrides";
  const existing = frameDoc.getElementById(styleId);
  const isMobile = window.innerWidth <= 900;

  if (!isMobile) {
    if (existing) existing.remove();
    return;
  }

  if (existing) return;

  const styleEl = frameDoc.createElement("style");
  styleEl.id = styleId;
  styleEl.textContent = `
    html, body {
      width: 100% !important;
      max-width: 100% !important;
      overflow-x: auto !important;
    }

    .page, .broadsheet {
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
    }

    .content {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .page, .broadsheet {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .g2, .g3, .g4, .g6,
    .two-col, .three-col,
    .regions-grid, .denom-grid,
    .status-legend, .methods-legend,
    .days-grid, .ag,
    .dispute-grid, .sup-row,
    .tn {
      grid-template-columns: 1fr !important;
    }

    .tna {
      display: none !important;
    }

    .timeline {
      padding-left: 0 !important;
    }

    .timeline::before {
      display: none !important;
    }

    .era-dot,
    .tld {
      left: 0 !important;
      position: static !important;
      display: inline-block !important;
      margin-bottom: 8px !important;
    }

    .tlw {
      padding-left: 12px !important;
      border-left-width: 2px !important;
    }

    .sec-head {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 8px !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
      margin-left: -16px !important;
      margin-right: -16px !important;
    }

    [style*="grid-template-columns:repeat(6,1fr)"],
    [style*="grid-template-columns:repeat(4,1fr)"],
    [style*="grid-template-columns:1fr 1fr 1fr"],
    [style*="grid-template-columns:1fr 1fr"] {
      grid-template-columns: 1fr !important;
    }

    [style*="padding:0 42px"], [style*="padding: 0 42px"],
    [style*="padding:0 44px"], [style*="padding: 0 44px"] {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    [style*="margin:0 -42px"], [style*="margin: 0 -42px"],
    [style*="margin:0 -44px"], [style*="margin: 0 -44px"] {
      margin-left: -16px !important;
      margin-right: -16px !important;
    }

    img, svg, table, iframe, video {
      max-width: 100% !important;
      height: auto !important;
    }

    h1 {
      font-size: clamp(24px, 7vw, 34px) !important;
      line-height: 1.15 !important;
      letter-spacing: 0 !important;
      word-break: break-word !important;
    }

    h2 {
      font-size: clamp(18px, 5.5vw, 26px) !important;
      line-height: 1.25 !important;
    }

    h3 {
      font-size: clamp(13px, 4vw, 18px) !important;
      line-height: 1.35 !important;
      letter-spacing: 0.5px !important;
    }

    p, li, .subtitle, .header-sub, .deck, .quote-text, .sup-text, .denom-text {
      font-size: clamp(13px, 3.6vw, 16px) !important;
      line-height: 1.6 !important;
    }

    .quote-box,
    .verse-card,
    .quote-block,
    .denom-card,
    .region-card,
    .method-badge,
    .sl-item,
    .sup-content,
    .sup-region,
    .sup-date,
    .panel-body,
    .dispute-col,
    .day-card {
      padding: 12px !important;
    }

    [style*="padding:30px 42px"], [style*="padding: 30px 42px"],
    [style*="padding:32px 44px"], [style*="padding: 32px 44px"],
    [style*="padding:48px 50px"], [style*="padding: 48px 50px"] {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    @media (max-width: 430px) {
      .content {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }

      .sec-head {
        padding-left: 12px !important;
        padding-right: 12px !important;
        margin-left: -12px !important;
        margin-right: -12px !important;
      }

      h1 { font-size: clamp(22px, 8vw, 30px) !important; }
      h2 { font-size: clamp(17px, 6vw, 22px) !important; }
      h3 { font-size: clamp(12px, 4.5vw, 16px) !important; }

      p, li, .subtitle, .header-sub, .deck, .quote-text, .sup-text, .denom-text {
        font-size: 13px !important;
        line-height: 1.58 !important;
      }

      .quote-box,
      .verse-card,
      .quote-block,
      .denom-card,
      .region-card,
      .method-badge,
      .sl-item,
      .sup-content,
      .sup-region,
      .sup-date,
      .panel-body,
      .dispute-col,
      .day-card {
        padding: 10px !important;
      }
    }
  `;

  frameDoc.head.appendChild(styleEl);
}

function fitInfographicViewport(iframe) {
  try {
    const frameDoc = iframe.contentWindow.document;
    applyInfographicMobileStyles(frameDoc);

    const root =
      frameDoc.querySelector(".page, .broadsheet") ||
      frameDoc.body.firstElementChild ||
      frameDoc.body;
    if (!root) return;

    root.style.transform = "";
    root.style.transformOrigin = "";
    root.style.width = "";
    root.style.maxWidth = "";

    const viewportWidth = Math.max(iframe.clientWidth, 1);
    const contentWidth = Math.max(
      root.scrollWidth,
      frameDoc.body.scrollWidth,
      frameDoc.documentElement.scrollWidth,
    );
    let scale = 1;
    const isMobile = window.innerWidth <= 900;

    if (isMobile && contentWidth > viewportWidth + 2) {
      scale = viewportWidth / contentWidth;
      root.style.transformOrigin = "top left";
      root.style.transform = `scale(${scale})`;
      root.style.width = `${contentWidth}px`;
      root.style.maxWidth = "none";
    }

    const contentHeight = Math.max(
      root.scrollHeight,
      frameDoc.body.scrollHeight,
      frameDoc.documentElement.scrollHeight,
    );
    iframe.style.height = Math.max(Math.ceil(contentHeight * scale) + 8, 600) + "px";
  } catch (err) {
    iframe.style.height = "2400px";
  }
}

function scheduleInfographicRefit() {
  const iframe = document.getElementById("doc-iframe");
  if (!iframe || iframe.style.display === "none" || !iframe.src) return;

  if (infographicRefitTimer) clearTimeout(infographicRefitTimer);
  infographicRefitTimer = setTimeout(() => {
    fitInfographicViewport(iframe);
  }, 90);
}

/* ── Build Sidebar ────────────────────────────────────────── */
function buildSidebar() {
  const nav = document.getElementById("sidebar-nav");
  nav.innerHTML = "";

  LIBRARY.forEach((section) => {
    const sectionEl = document.createElement("div");
    sectionEl.className = "nav-section";
    sectionEl.dataset.sectionId = section.id;

    const header = document.createElement("div");
    header.className = "nav-section-header";
    header.innerHTML = `<span>${section.icon} ${section.section}</span><span class="section-chevron">▾</span>`;
    header.addEventListener("click", () => {
      sectionEl.classList.toggle("collapsed");
    });

    // Start all sections collapsed — user expands what they need
    sectionEl.classList.add("collapsed");

    const itemsEl = document.createElement("div");
    itemsEl.className = "nav-section-items";

    section.items.forEach((item) => {
      const navItem = document.createElement("div");
      navItem.className = "nav-item";
      navItem.dataset.file = item.file;
      navItem.innerHTML = `<span class="nav-item-icon">${item.icon}</span><span class="nav-item-title">${item.title}</span>`;
      navItem.addEventListener("click", () => {
        if (window.innerWidth <= 900) closeMobileSidebar();
        loadDocument(item.file);
      });
      itemsEl.appendChild(navItem);
    });

    sectionEl.appendChild(header);
    sectionEl.appendChild(itemsEl);
    nav.appendChild(sectionEl);
  });
}

/* ── Build Home Cards ─────────────────────────────────────── */
function buildHomeCards() {
  LIBRARY.forEach((section) => {
    const containerId = section.id.replace(/-/g, "_") + "_cards";
    // Map section ids to card grid ids
    const gridMap = {
      "main-library": "main-library-cards",
      "study-guides": "study-guide-cards",
      reference: "reference-cards",
      infographics: "infographics-cards",
    };
    const grid = document.getElementById(gridMap[section.id]);
    if (!grid) return;
    grid.innerHTML = "";

    section.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "topic-card";
      card.innerHTML = `
        <div class="card-icon">${item.icon}</div>
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.desc}</div>
        <span class="card-tag ${item.tagClass || ""}">${item.tag}</span>
      `;
      card.addEventListener("click", () => loadDocument(item.file));
      grid.appendChild(card);
    });
  });
}

/* ── Show / Hide States ───────────────────────────────────── */
function showHome() {
  document.getElementById("home-page").style.display = "";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "none";
  document.getElementById("error-state").style.display = "none";

  // Clear active nav
  document
    .querySelectorAll(".nav-item")
    .forEach((el) => el.classList.remove("active"));
  currentIndex = -1;

  // Breadcrumb
  document.getElementById("breadcrumb-section").textContent = "Home";
  document.getElementById("breadcrumb-sep").style.display = "none";
  document.getElementById("breadcrumb-title").textContent = "";

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showLoading() {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "flex";
  document.getElementById("error-state").style.display = "none";
}

function showError(msg) {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "none";
  document.getElementById("error-state").style.display = "flex";
  if (msg) document.getElementById("error-msg").textContent = msg;
}

/* ── Load & Render Document ───────────────────────────────── */
async function loadDocument(filePath) {
  showLoading();

  // Find index in flat list
  const idx = ALL_ITEMS.findIndex((i) => i.file === filePath);
  currentIndex = idx;

  // Update active nav item
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.file === filePath);
  });

  // Scroll active item into view in sidebar
  const activeNav = document.querySelector(
    `.nav-item[data-file="${CSS.escape(filePath)}"]`,
  );
  if (activeNav) {
    // Make sure its section is not collapsed
    const section = activeNav.closest(".nav-section");
    if (section) section.classList.remove("collapsed");
    activeNav.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  // Breadcrumb
  const item = ALL_ITEMS[idx];
  if (item) {
    document.getElementById("breadcrumb-section").textContent =
      item.sectionLabel;
    document.getElementById("breadcrumb-sep").style.display = "";
    document.getElementById("breadcrumb-title").textContent = item.title;
  }

  // Full-page interactive tools — navigate directly (they need full viewport)
  if (filePath === "prophecy_map.html") {
    window.location.href = filePath;
    return;
  }

  // Infographic HTML files — load in iframe instead of parsing markdown
  if (filePath.endsWith(".html")) {
    const iframe = document.getElementById("doc-iframe");
    const contentEl = document.getElementById("doc-content");
    contentEl.style.display = "none";
    iframe.style.display = "block";
    iframe.style.height = "80vh"; // initial height while loading
    iframe.src = filePath;
    iframe.onload = () => {
      fitInfographicViewport(iframe);
      setTimeout(() => fitInfographicViewport(iframe), 250);
      setTimeout(() => fitInfographicViewport(iframe), 900);
    };
    document.getElementById("doc-page").classList.add("infographic-mode");
    document.getElementById("home-page").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("doc-page").style.display = "";
    // Update prev/next buttons
    const _prev = ALL_ITEMS[currentIndex - 1];
    const _next = ALL_ITEMS[currentIndex + 1];
    document.getElementById("btn-prev").textContent = _prev
      ? `← ${truncate(_prev.title, 30)}`
      : "← Home";
    document.getElementById("btn-next").textContent = _next
      ? `${truncate(_next.title, 30)} →`
      : "";
    document.getElementById("btn-next").style.visibility = _next
      ? ""
      : "hidden";
    window.scrollTo({ top: 0 });
    return;
  }

  // Fetch the markdown file
  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    let md = await res.text();

    // Fix relative image paths for files inside Study_guides/
    // Handles both markdown syntax ![alt](images/...) and HTML <img src="images/...">
    if (filePath.startsWith("Study_guides/")) {
      md = md.replace(/!\[([^\]]*)\]\(images\//g, "![$1](Study_guides/images/");
      md = md.replace(/(<img\s[^>]*src=["'])images\//gi, "$1Study_guides/images/");
    }

    // Set up DOM — show markdown view, hide iframe
    const contentEl = document.getElementById("doc-content");
    document.getElementById("doc-page").classList.remove("infographic-mode");
    contentEl.style.display = "";
    document.getElementById("doc-iframe").style.display = "none";
    document.getElementById("doc-iframe").src = "";
    contentEl.innerHTML = "";

    // ── Progressive rendering ─────────────────────────────────────────
    // Split the markdown at top-level headings so we can render the first
    // section immediately and append the rest during idle time.
    // On slow mobile connections / CPUs this prevents the page from
    // appearing frozen — the user sees content within ~1 second.
    const sections = md.split(/(?=\n#{1,2} )/);

    // First section → paint it now
    contentEl.innerHTML = sanitize(marked.parse(sections[0]));
    document.getElementById("home-page").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("doc-page").style.display = "";
    window.scrollTo({ top: 0 });

    // Update prev/next immediately (don't wait for full render)
    const prevItem = ALL_ITEMS[currentIndex - 1];
    const nextItem = ALL_ITEMS[currentIndex + 1];
    document.getElementById("btn-prev").textContent = prevItem
      ? `← ${truncate(prevItem.title, 30)}`
      : "← Home";
    document.getElementById("btn-next").textContent = nextItem
      ? `${truncate(nextItem.title, 30)} →`
      : "";
    document.getElementById("btn-next").style.visibility = nextItem ? "" : "hidden";

    // Remaining sections — append one at a time in idle time
    for (let i = 1; i < sections.length; i++) {
      await idle(() => {
        const div = document.createElement("div");
        div.innerHTML = sanitize(marked.parse(sections[i]));
        contentEl.appendChild(div);
      });
    }

    // Wire up all links now that every section is in the DOM
    processLinks(contentEl, filePath);
  } catch (err) {
    console.error("Failed to load document:", err);
    if (
      err.message.includes("Failed to fetch") ||
      err.message.includes("NetworkError")
    ) {
      showError(
        "Could not fetch the document. This website must be served through a local server " +
          "(not opened directly as a file). Run start_server.bat (Windows) or " +
          '"python -m http.server 8080" in this folder, then open http://localhost:8080',
      );
    } else {
      showError(err.message);
    }
  }
}

/* ── Render helpers ───────────────────────────────────────── */

/** Sanitize HTML through DOMPurify when available */
function sanitize(html) {
  return typeof DOMPurify !== "undefined"
    ? DOMPurify.sanitize(html, { ADD_ATTR: ["align"], ADD_TAGS: ["center"] })
    : html;
}

/** Schedule work during browser idle time (iOS fallback: setTimeout) */
function idle(fn) {
  return new Promise((resolve) => {
    const run = () => { fn(); resolve(); };
    if (window.requestIdleCallback) requestIdleCallback(run, { timeout: 400 });
    else setTimeout(run, 0);
  });
}

/** Wire up in-page anchors, external links, and internal .md links */
function processLinks(contentEl, filePath) {
  contentEl.querySelectorAll("a").forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href) return;

    // In-page anchor (e.g. TOC → #the-7-day-week-cycle)
    if (href.startsWith("#")) {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = findAnchorTarget(href.slice(1));
        if (target) {
          const topbarH = document.getElementById("topbar").offsetHeight;
          const targetY =
            target.getBoundingClientRect().top + window.scrollY - topbarH - 12;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      });
      return;
    }

    // External link — open in new tab
    if (href.startsWith("http://") || href.startsWith("https://")) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
      return;
    }

    // Internal .md link — resolve and load via SPA
    const dir = filePath.includes("/")
      ? filePath.substring(0, filePath.lastIndexOf("/") + 1)
      : "";
    const resolved = resolveRelativePath(dir, href);
    const targetItem = ALL_ITEMS.find(
      (i) => normalise(i.file) === normalise(resolved),
    );
    if (targetItem) {
      anchor.href = "#";
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        loadDocument(targetItem.file);
      });
    }
  });
}

/* ── Navigation helpers ───────────────────────────────────── */
function navigatePrev() {
  if (currentIndex <= 0) {
    showHome();
    return;
  }
  loadDocument(ALL_ITEMS[currentIndex - 1].file);
}

function navigateNext() {
  if (currentIndex < 0 || currentIndex >= ALL_ITEMS.length - 1) return;
  loadDocument(ALL_ITEMS[currentIndex + 1].file);
}

/* ── Sidebar Toggle ───────────────────────────────────────── */
function closeMobileSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").classList.remove("visible");
}

function toggleSidebar(event) {
  if (event) event.stopPropagation();
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const isMobile = window.innerWidth <= 900;
  if (isMobile) {
    const isOpening = !sidebar.classList.contains("open");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("visible", isOpening);
  } else {
    sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-collapsed");
  }
}

/* ── Nav Search ───────────────────────────────────────────── */
document.getElementById("nav-search").addEventListener("input", function () {
  const q = this.value.trim().toLowerCase();
  document.querySelectorAll(".nav-item").forEach((el) => {
    const title = el.querySelector(".nav-item-title").textContent.toLowerCase();
    el.classList.toggle("hidden", q.length > 0 && !title.includes(q));
  });
  // Auto-expand sections that have matches
  if (q.length > 0) {
    document.querySelectorAll(".nav-section").forEach((section) => {
      const hasVisible = [...section.querySelectorAll(".nav-item")].some(
        (el) => !el.classList.contains("hidden"),
      );
      section.classList.toggle("collapsed", !hasVisible);
    });
  }
});

/* ── Back to Top ──────────────────────────────────────────── */
window.addEventListener("scroll", () => {
  const btn = document.getElementById("back-to-top");
  btn.classList.toggle("visible", window.scrollY > 400);
});

/* ── Helpers ──────────────────────────────────────────────── */
function truncate(str, max) {
  return str.length <= max ? str : str.slice(0, max) + "…";
}

function normalise(path) {
  return decodeURIComponent(path.replace(/\\/g, "/").toLowerCase());
}

function resolveRelativePath(base, relative) {
  // Handle ../ navigation
  const parts = (base + relative).split("/");
  const resolved = [];
  for (const part of parts) {
    if (part === "..") resolved.pop();
    else if (part !== ".") resolved.push(part);
  }
  return resolved.join("/");
}

/* ── Keyboard Navigation ──────────────────────────────────── */
document.addEventListener("keydown", (e) => {
  // Escape: close mobile sidebar
  if (e.key === "Escape") {
    closeMobileSidebar();
  }
  // Left/Right arrow keys for prev/next when doc is open
  if (document.getElementById("doc-page").style.display !== "none") {
    if (e.key === "ArrowLeft" && !e.ctrlKey) navigatePrev();
    if (e.key === "ArrowRight" && !e.ctrlKey) navigateNext();
  }
});

/* ── Click outside sidebar to close on mobile ─────────────── */
document.getElementById("sidebar-overlay").addEventListener("click", closeMobileSidebar);
document.getElementById("main-wrapper").addEventListener("click", (event) => {
  if (window.innerWidth > 900) return;
  if (!document.getElementById("sidebar").classList.contains("open")) return;
  if (event.target.closest("#topbar")) return;
  closeMobileSidebar();
});

window.addEventListener("resize", scheduleInfographicRefit);

/* ── Slug helper (GitHub-compatible anchor IDs) ────────────
   Matches the algorithm GitHub and most markdown processors use
   for heading IDs, so TOC links like #the-7-day-week-cycle work. */
function decodeEntities(str) {
  // Use a textarea to safely decode HTML entities (e.g. &#39; → ', &amp; → &)
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

function slugify(text) {
  return decodeEntities(String(text))
    .replace(/<[^>]+>/g, "") // strip HTML tags
    .replace(/\//g, "-") // forward slash → hyphen (e.g. Print/Book → print-book)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove remaining punctuation (keep word chars, spaces, hyphens)
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-") // collapse consecutive hyphens
    .trim();
}

/* ── Fuzzy anchor lookup ─────────────────────────────────────
   Some TOC links use abbreviated IDs (e.g. #objection-1) that don't
   exactly match the full slug our renderer generates. We fall back
   through three progressively looser strategies. */
function findAnchorTarget(hash) {
  // 1. Exact match (getElementById is case-sensitive in HTML)
  let el = document.getElementById(hash);
  if (el) return el;

  // 2. Case-insensitive exact match
  const lower = hash.toLowerCase();
  el =
    document.querySelector(`[id="${CSS.escape(hash)}"]`) ||
    [...document.querySelectorAll("[id]")].find(
      (e) => e.id.toLowerCase() === lower,
    );
  if (el) return el;

  // 3. Prefix match: id starts with hash + '-'  (handles #objection-1 → objection-1-the-sabbath...)
  //    Add trailing hyphen so #objection-1 doesn't match #objection-10
  const prefix = lower + "-";
  el = [...document.querySelectorAll("[id]")].find((e) =>
    e.id.toLowerCase().startsWith(prefix),
  );
  if (el) return el;

  // 4. Contains match: id contains hash (handles #biblical-evidence → the-biblical-evidence-for-the-sabbath)
  el = [...document.querySelectorAll("[id]")].find((e) =>
    e.id.toLowerCase().includes(lower),
  );
  return el || null;
}

/* ── Configure marked with a custom heading renderer ───────
   Adds id="slug" to every heading so #anchor links jump correctly.
   marked v5+ passes a token object; older versions pass (text, level).
   We handle both. */
(function initMarked() {
  const renderer = new marked.Renderer();

  // marked v5+ API: single token object argument
  renderer.heading = function (token) {
    // Normalise: token object (v5+) or legacy (text, level) string call
    let text, level;
    if (token && typeof token === "object" && "text" in token) {
      text = token.text;
      level = token.depth;
    } else {
      // Fallback for older marked where first arg is a string
      text = token;
      level = arguments[1];
    }
    const plainText = String(text).replace(/<[^>]+>/g, "");
    const id = slugify(plainText);
    return `<h${level} id="${id}">${text}</h${level}>\n`;
  };

  // Wrap tables in a scrollable div so wide tables scroll horizontally
  // on mobile instead of expanding the page and triggering iOS zoom.
  renderer.table = function (header, body) {
    // marked v4: header and body are already-rendered HTML strings
    // (header includes <tr><th>...</th></tr>, body includes <tr><td>...</td></tr>)
    return `<div class="table-scroll"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>\n`;
  };

  marked.use({ renderer, breaks: true, gfm: true });
})();

/* ── Init ─────────────────────────────────────────────────── */
buildSidebar();
buildHomeCards();
showHome();
