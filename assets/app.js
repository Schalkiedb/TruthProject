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
    section: "Source Documents (Catholic)",
    icon: "🏛️",
    id: "source-documents-catholic",
    items: [],
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
  {
    section: "False Doctrines Exposed",
    icon: "⚡",
    id: "false-doctrines",
    items: [
      {
        title: "Papal Titles and the Claim to Divine Authority",
        file: "False_Doctrines/01_Papal_Titles_and_Biblical_Blasphemy.md",
        icon: "👑",
        tag: "Doctrine",
        tagClass: "red",
        desc: "How the titles, claims, and actions of the papal system match the Bible's warnings of a power that would speak 'pompous words against the Most High.'",
      },
      {
        title: "The State of the Dead — Soul Sleep",
        file: "False_Doctrines/02_State_of_the_Dead_Soul_Sleep.md",
        icon: "💤",
        tag: "Doctrine",
        tagClass: "red",
        desc: "Are the dead conscious or unconscious? The answer determines whether spiritualism, prayers for the dead, purgatory, and saint invocation have any biblical basis.",
      },
      {
        title: "Hell — Eternal Torment or Final Destruction?",
        file: "False_Doctrines/03_Hell_and_Final_Punishment.md",
        icon: "🔥",
        tag: "Doctrine",
        tagClass: "red",
        desc: "The traditional doctrine of eternal conscious torment examined against what Scripture actually teaches about the final punishment of the wicked.",
      },
      {
        title: "The Immortal Soul — Does the Bible Teach It?",
        file: "False_Doctrines/04_The_Immortal_Soul.md",
        icon: "👻",
        tag: "Doctrine",
        tagClass: "red",
        desc: "Challenges the doctrine that every human possesses an indestructible soul surviving death — the phrase 'immortal soul' never appears in Scripture.",
      },
      {
        title: "The Mass and the Eucharist — Is Christ Re-Sacrificed?",
        file: "False_Doctrines/05_The_Mass_and_Eucharist.md",
        icon: "🍞",
        tag: "Doctrine",
        tagClass: "red",
        desc: "The Catholic teaching of transubstantiation — is Christ's sacrifice actually re-offered at every Mass? Examined against biblical evidence.",
      },
      {
        title: "The Trinity Doctrine — What Does Scripture Teach?",
        file: "False_Doctrines/06_The_Holy_Spirit_and_Trinity.md",
        icon: "🕊️",
        tag: "Doctrine",
        tagClass: "blue",
        desc: "Does the specific Trinitarian formulation defined at Nicaea (325 CE) and Constantinople (381 CE) reflect what Scripture teaches about the Godhead?",
      },
      {
        title: "The Millennium and the Secret Rapture",
        file: "False_Doctrines/07_The_Millennium_and_Rapture.md",
        icon: "☁️",
        tag: "End Times",
        tagClass: "red",
        desc: "The doctrines of the secret rapture and pre-tribulation removal of believers — examined against two centuries of evangelical teaching.",
      },
      {
        title: "Futurism and Preterism — Jesuit Counter-Reformation",
        file: "False_Doctrines/08_Futurism_and_Preterism.md",
        icon: "🎭",
        tag: "History",
        tagClass: "red",
        desc: "How Jesuit scholars created two prophetic systems specifically to deflect the Reformers' identification of the papacy as the Antichrist.",
      },
      {
        title: "Marian Doctrines — What Does Scripture Say?",
        file: "False_Doctrines/09_Marian_Doctrines.md",
        icon: "🌹",
        tag: "Doctrine",
        tagClass: "red",
        desc: "Four specific Catholic doctrines about Mary — distinguishing between honouring a chosen servant and elevating her beyond Scripture.",
      },
      {
        title: "Idol Worship and the Second Commandment",
        file: "False_Doctrines/10_Idol_Worship_and_Praying_to_Statues.md",
        icon: "🗿",
        tag: "Commandments",
        tagClass: "red",
        desc: "How the Catholic Church removed the Second Commandment — which directly forbids making and bowing down to images.",
      },
      {
        title: "The Rosary and Vain Repetitive Prayer",
        file: "False_Doctrines/11_Rosary_and_Vain_Repetitive_Prayer.md",
        icon: "📿",
        tag: "Doctrine",
        tagClass: "red",
        desc: "The practice of the Rosary was directly, explicitly, and specifically prohibited by Jesus in the very passage where He taught how to pray.",
      },
      {
        title: "Praying to Saints — Seeking the Dead",
        file: "False_Doctrines/12_Prayer_to_Saints_Intercession_of_Dead.md",
        icon: "🪦",
        tag: "Doctrine",
        tagClass: "red",
        desc: "Praying to saints combines two condemned biblical practices: seeking communication with the dead and bypassing Christ as sole mediator.",
      },
      {
        title: "Infant Baptism and Sprinkling",
        file: "False_Doctrines/13_Infant_Baptism_and_Sprinkling.md",
        icon: "💧",
        tag: "Doctrine",
        tagClass: "blue",
        desc: "Who is the proper candidate for baptism? What is the proper mode — immersion or sprinkling? Scripture answers both questions clearly.",
      },
      {
        title: "Sacred Tradition vs. Scripture Alone",
        file: "False_Doctrines/14_Sacred_Tradition_vs_Scripture.md",
        icon: "📜",
        tag: "Foundation",
        tagClass: "blue",
        desc: "The most foundational question: does God's Word alone have final authority, or does human tradition hold equal or greater weight?",
      },
      {
        title: "Indulgences and Confession to Priests",
        file: "False_Doctrines/15_Indulgences_and_Confession_to_Priests.md",
        icon: "💰",
        tag: "Doctrine",
        tagClass: "red",
        desc: "Can men forgive sins? The Catholic teaching that sins must be confessed to an ordained priest who grants absolution — examined by Scripture.",
      },
      {
        title: "Mandatory Priestly Celibacy",
        file: "False_Doctrines/16_Mandatory_Priestly_Celibacy.md",
        icon: "⛪",
        tag: "Doctrine",
        tagClass: "red",
        desc: "A doctrine Paul explicitly called a 'doctrine of demons' — specifically naming the forbidding of marriage (1 Timothy 4:1-3).",
      },
      {
        title: "Christmas and Easter — Pagan Origins",
        file: "False_Doctrines/17_Christmas_and_Easter_Pagan_Origins.md",
        icon: "🎄",
        tag: "History",
        tagClass: "red",
        desc: "The historical and pagan origins of Christmas and Easter — does God care how He is worshipped, not just that He is worshipped?",
      },
    ],
  },
];

/* Flat list of all items for linear prev/next navigation */
let ALL_ITEMS = [];

const SOURCE_DOCS_SECTION_ID = "source-documents-catholic";
const SOURCE_DOCS_ROOT = "Supporting Documents/";
const SOURCE_DOCS_MANIFEST = "assets/source-documents-catholic.json";
const SOURCE_DOCS_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"];
const INFOGRAPHICS_SECTION_ID = "infographics";
const INFOGRAPHICS_ROOT = "infographics/";
const INFOGRAPHICS_MANIFEST = "assets/infographics-manifest.json";

function isPdfFile(filePath) {
  return String(filePath).toLowerCase().endsWith(".pdf");
}

function isSourceImageFile(filePath) {
  const lower = String(filePath).toLowerCase();
  return SOURCE_DOCS_IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function isSourceDocumentFile(filePath) {
  return isPdfFile(filePath) || isSourceImageFile(filePath);
}

function getSourceDocumentKind(filePath) {
  return isPdfFile(filePath) ? "pdf" : isSourceImageFile(filePath) ? "image" : "file";
}

function isInfographicFile(filePath) {
  return String(filePath).toLowerCase().endsWith(".html");
}

function toTitleCase(value) {
  return String(value)
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

function formatInfographicTitle(filePath) {
  const fileName = decodeURIComponent(filePath.split("/").pop() || filePath).replace(/\.html$/i, "");
  const cleaned = fileName.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  const match = cleaned.match(/^infographic\s*(\d+)\s*(.*)$/i);

  if (match) {
    const number = match[1];
    const remainder = match[2] ? ` — ${toTitleCase(match[2])}` : "";
    return `Infographic ${number}${remainder}`;
  }

  return toTitleCase(cleaned);
}

function sortInfographicFiles(paths) {
  return [...paths].sort((a, b) => {
    const aName = decodeURIComponent(a.split("/").pop() || a).toLowerCase();
    const bName = decodeURIComponent(b.split("/").pop() || b).toLowerCase();
    const aMatch = aName.match(/^infographic(\d+)/);
    const bMatch = bName.match(/^infographic(\d+)/);

    if (aMatch && bMatch) {
      const aNum = Number(aMatch[1]);
      const bNum = Number(bMatch[1]);
      if (aNum !== bNum) return aNum - bNum;
      return aName.localeCompare(bName);
    }
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return aName.localeCompare(bName);
  });
}

function shouldUseNativePdfViewer() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const hasTouch = (navigator.maxTouchPoints || 0) > 0;
  const coarsePointer =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  const smallViewport =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(max-width: 1024px)").matches;

  return isIOS || isAndroid || (hasTouch && (coarsePointer || smallViewport));
}

function openInNativeViewer(filePath) {
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const encodedPath = encodeURI(filePath).replace(/#/g, "%23");

  if (isIOS) {
    window.location.href = encodedPath;
    return;
  }

  const popup = window.open(encodedPath, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.href = encodedPath;
  }
}

function rebuildAllItems() {
  ALL_ITEMS = LIBRARY.flatMap((section) =>
    section.items.map((item) => ({ ...item, sectionLabel: section.section })),
  );
}

function formatSourceDocTitle(filePath) {
  const fileName = decodeURIComponent(filePath.split("/").pop() || filePath);
  const withoutExt = fileName.replace(/\.(pdf|png|jpe?g)$/i, "");
  return withoutExt.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

async function discoverSourceDocumentFiles(rootDir) {
  const visitedDirs = new Set();
  const foundFiles = new Set();
  const rootNormalized = decodeURIComponent(rootDir).replace(/\\/g, "/");

  async function crawl(dirPath) {
    const normalizedDir = decodeURIComponent(dirPath)
      .replace(/\\/g, "/")
      .replace(/\/+$/, "") + "/";

    if (visitedDirs.has(normalizedDir)) return;
    visitedDirs.add(normalizedDir);

    let html = "";
    try {
      const response = await fetch(encodeURI(normalizedDir), { cache: "no-store" });
      if (!response.ok) return;
      html = await response.text();
    } catch {
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const hrefs = [...doc.querySelectorAll("a[href]")]
      .map((anchor) => anchor.getAttribute("href") || "")
      .filter(Boolean);

    const baseUrl = new URL(encodeURI(normalizedDir), window.location.href);

    for (const href of hrefs) {
      if (
        href.startsWith("../") ||
        href.startsWith("#") ||
        href.startsWith("?") ||
        /^[a-z]+:/i.test(href)
      ) {
        continue;
      }

      let resolvedPath = "";
      try {
        resolvedPath = decodeURIComponent(
          new URL(href, baseUrl).pathname.replace(/^\/+/, ""),
        );
      } catch {
        continue;
      }

      if (!resolvedPath.toLowerCase().startsWith(rootNormalized.toLowerCase())) {
        continue;
      }

      if (href.endsWith("/") || resolvedPath.endsWith("/")) {
        await crawl(resolvedPath);
      } else if (isSourceDocumentFile(resolvedPath)) {
        foundFiles.add(resolvedPath);
      }
    }
  }

  await crawl(rootDir);
  return [...foundFiles].sort((a, b) =>
    formatSourceDocTitle(a).localeCompare(formatSourceDocTitle(b)),
  );
}

async function loadSourceDocumentManifest() {
  try {
    const response = await fetch(SOURCE_DOCS_MANIFEST, { cache: "no-store" });
    if (!response.ok) return [];

    const json = await response.json();
    if (!Array.isArray(json)) return [];

    return json
      .map((entry) => String(entry || "").trim().replace(/\\/g, "/"))
      .filter((entry) => isSourceDocumentFile(entry));
  } catch {
    return [];
  }
}

async function discoverInfographicFiles(rootDir) {
  const visitedDirs = new Set();
  const foundFiles = new Set();
  const rootNormalized = decodeURIComponent(rootDir).replace(/\\/g, "/");

  async function crawl(dirPath) {
    const normalizedDir = decodeURIComponent(dirPath)
      .replace(/\\/g, "/")
      .replace(/\/+$/, "") + "/";

    if (visitedDirs.has(normalizedDir)) return;
    visitedDirs.add(normalizedDir);

    let html = "";
    try {
      const response = await fetch(encodeURI(normalizedDir), { cache: "no-store" });
      if (!response.ok) return;
      html = await response.text();
    } catch {
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const hrefs = [...doc.querySelectorAll("a[href]")]
      .map((anchor) => anchor.getAttribute("href") || "")
      .filter(Boolean);

    const baseUrl = new URL(encodeURI(normalizedDir), window.location.href);

    for (const href of hrefs) {
      if (
        href.startsWith("../") ||
        href.startsWith("#") ||
        href.startsWith("?") ||
        /^[a-z]+:/i.test(href)
      ) {
        continue;
      }

      let resolvedPath = "";
      try {
        resolvedPath = decodeURIComponent(
          new URL(href, baseUrl).pathname.replace(/^\/+/, ""),
        );
      } catch {
        continue;
      }

      if (!resolvedPath.toLowerCase().startsWith(rootNormalized.toLowerCase())) {
        continue;
      }

      if (href.endsWith("/") || resolvedPath.endsWith("/")) {
        await crawl(resolvedPath);
      } else if (isInfographicFile(resolvedPath)) {
        foundFiles.add(resolvedPath);
      }
    }
  }

  await crawl(rootDir);
  return sortInfographicFiles(foundFiles);
}

async function loadInfographicsManifest() {
  try {
    const response = await fetch(INFOGRAPHICS_MANIFEST, { cache: "no-store" });
    if (!response.ok) return [];

    const json = await response.json();
    if (!Array.isArray(json)) return [];

    return json
      .map((entry) => String(entry || "").trim().replace(/\\/g, "/"))
      .filter((entry) => isInfographicFile(entry));
  } catch {
    return [];
  }
}

async function populateSourceDocumentsSection() {
  const sourceSection = LIBRARY.find((section) => section.id === SOURCE_DOCS_SECTION_ID);
  if (!sourceSection) return;

  let discovered = [];
  let manifestFiles = [];

  try {
    discovered = await discoverSourceDocumentFiles(SOURCE_DOCS_ROOT);
  } catch (error) {
    console.warn("Source folder discovery failed:", error);
  }

  try {
    manifestFiles = await loadSourceDocumentManifest();
  } catch (error) {
    console.warn("Source manifest load failed:", error);
  }

  const sourceFiles = [...new Set([...discovered, ...manifestFiles])].sort((a, b) =>
    formatSourceDocTitle(a).localeCompare(formatSourceDocTitle(b)),
  );

  sourceSection.items = sourceFiles.map((filePath) => {
    const kind = getSourceDocumentKind(filePath);
    const isImage = kind === "image";
    return {
    title: formatSourceDocTitle(filePath),
    file: filePath,
    icon: isImage ? "🖼️" : "📄",
    tag: isImage ? "Source Image" : "Source PDF",
    tagClass: "blue",
    desc: "Primary Catholic source document.",
  };
  });

  rebuildAllItems();
}

async function populateInfographicsSection() {
  const section = LIBRARY.find((entry) => entry.id === INFOGRAPHICS_SECTION_ID);
  if (!section) return;

  const existingMeta = new Map(section.items.map((item) => [normalise(item.file), item]));
  const existingFiles = section.items.map((item) => item.file);

  let discovered = [];
  let manifestFiles = [];

  try {
    discovered = await discoverInfographicFiles(INFOGRAPHICS_ROOT);
  } catch (error) {
    console.warn("Infographic discovery failed:", error);
  }

  try {
    manifestFiles = await loadInfographicsManifest();
  } catch (error) {
    console.warn("Infographic manifest load failed:", error);
  }

  const mergedFiles = sortInfographicFiles(
    new Set([...existingFiles, ...discovered, ...manifestFiles]),
  );

  section.items = mergedFiles.map((filePath) => {
    const existing = existingMeta.get(normalise(filePath));
    if (existing) return { ...existing, file: filePath };

    return {
      title: formatInfographicTitle(filePath),
      file: filePath,
      icon: "🗺️",
      tag: "Visual",
      tagClass: "blue",
      desc: "Auto-discovered infographic.",
    };
  });

  rebuildAllItems();
}

let currentIndex = -1;
let infographicRefitTimer = null;
let sourceRefreshInProgress = false;

function setSourceRefreshButtonState(isBusy) {
  const button = document.getElementById("btn-refresh-sources");
  if (!button) return;
  button.disabled = isBusy;
  button.textContent = isBusy ? "↻ Refreshing…" : "↻ Refresh Sources";
}

async function refreshSourceDocuments() {
  if (sourceRefreshInProgress) return;
  sourceRefreshInProgress = true;
  setSourceRefreshButtonState(true);

  const activeFile = currentIndex >= 0 && ALL_ITEMS[currentIndex]
    ? ALL_ITEMS[currentIndex].file
    : null;

  try {
    await populateSourceDocumentsSection();
    await populateInfographicsSection();
    buildSidebar();
    buildHomeCards();

    if (activeFile) {
      const activeNav = document.querySelector(
        `.nav-item[data-file="${CSS.escape(activeFile)}"]`,
      );
      if (activeNav) {
        activeNav.classList.add("active");
        const section = activeNav.closest(".nav-section");
        if (section) section.classList.remove("collapsed");
      }
    }
  } catch (error) {
    console.warn("Failed to refresh source documents:", error);
  } finally {
    sourceRefreshInProgress = false;
    setSourceRefreshButtonState(false);
  }
}

function applyInfographicMobileStyles(frameDoc, frameUrl = "") {
  const styleId = "infographic-mobile-overrides";
  const existing = frameDoc.getElementById(styleId);
  const isMobile = window.innerWidth <= 900;
  const source = String(frameUrl || frameDoc.URL || "").toLowerCase();
  const isScaleOnly =
    source.includes("infographic8_global_push.html") ||
    source.includes("infographic9_restday_push.html") ||
    source.includes("infographic10_persecution.html");
  const mode = isScaleOnly ? "scale-only" : "reflow";

  if (!isMobile) {
    if (existing) existing.remove();
    return;
  }

  if (existing && existing.dataset.mode === mode) return;
  if (existing) existing.remove();

  const styleEl = frameDoc.createElement("style");
  styleEl.id = styleId;
  styleEl.dataset.mode = mode;

  if (isScaleOnly) {
    styleEl.textContent = `
      html, body {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: visible !important;
      }

      img, svg, table, iframe, video {
        max-width: 100% !important;
        height: auto !important;
      }
    `;
    frameDoc.head.appendChild(styleEl);
    return;
  }

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

    .wide,
    [style*="grid-column: span 3"],
    [style*="grid-column:span 3"] {
      grid-column: auto !important;
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

    .region-card {
      padding: 0 !important;
      overflow: visible !important;
    }

    .region-header {
      padding: 12px !important;
    }

    .region-body {
      padding: 12px !important;
    }

    .status-badge {
      position: static !important;
      display: inline-block !important;
      margin-top: 8px !important;
      right: auto !important;
      top: auto !important;
      white-space: normal !important;
      max-width: 100% !important;
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

      .region-header,
      .region-body {
        padding: 10px !important;
      }
    }
  `;

  frameDoc.head.appendChild(styleEl);
}

function fitInfographicViewport(iframe) {
  try {
    const frameDoc = iframe.contentWindow.document;
    applyInfographicMobileStyles(frameDoc, iframe.src || frameDoc.URL || "");

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
      "interactive-tools": "interactive-tools-cards",
      "false-doctrines": "false-doctrines-cards",
    };
    const grid = document.getElementById(gridMap[section.id]);
    if (!grid) return;
    grid.innerHTML = "";

    section.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "topic-card";
      if (item.tagClass) card.dataset.accent = item.tagClass;
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

  // Activate scroll-reveal for card sections and staggered card entrance
  requestAnimationFrame(() => initScrollReveal());
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

  // Hide the Bible verse translation pill on home page
  const pill = document.getElementById("verse-translation-pill");
  if (pill) pill.style.display = "none";

  // Re-trigger scroll reveal for sections that may not have been seen yet
  requestAnimationFrame(() => initScrollReveal());
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
  // Mobile PDF behaviour: open in the browser's native viewer so users can
  // scroll all pages reliably (iOS Safari iframe PDF is often first-page only).
  if (isPdfFile(filePath) && shouldUseNativePdfViewer()) {
    openInNativeViewer(filePath);
    return;
  }

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

  // Source files (PDF/images) — desktop keeps in-app iframe viewer
  if (isPdfFile(filePath) || isSourceImageFile(filePath)) {
    const iframe = document.getElementById("doc-iframe");
    const contentEl = document.getElementById("doc-content");
    const docPage = document.getElementById("doc-page");

    contentEl.style.display = "none";
    iframe.style.display = "block";
    iframe.setAttribute("scrolling", "auto");
    iframe.style.height = window.innerWidth <= 900 ? "68vh" : "calc(100vh - 210px)";
    const encodedPath = encodeURI(filePath).replace(/#/g, "%23");
    iframe.src = isPdfFile(filePath) ? `${encodedPath}#view=FitH` : encodedPath;

    docPage.classList.remove("infographic-mode");
    docPage.classList.add("pdf-mode");
    document.getElementById("home-page").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("doc-page").style.display = "";

    const _prev = ALL_ITEMS[currentIndex - 1];
    const _next = ALL_ITEMS[currentIndex + 1];
    document.getElementById("btn-prev").textContent = _prev
      ? `← ${truncate(_prev.title, 30)}`
      : "← Home";
    document.getElementById("btn-next").textContent = _next
      ? `${truncate(_next.title, 30)} →`
      : "";
    document.getElementById("btn-next").style.visibility = _next ? "" : "hidden";

    window.scrollTo({ top: 0 });
    return;
  }

  // Infographic HTML files — load in iframe instead of parsing markdown
  if (filePath.endsWith(".html")) {
    const iframe = document.getElementById("doc-iframe");
    const contentEl = document.getElementById("doc-content");
    const docPage = document.getElementById("doc-page");
    contentEl.style.display = "none";
    iframe.style.display = "block";
    iframe.setAttribute("scrolling", "no");
    iframe.style.height = "80vh"; // initial height while loading
    iframe.src = filePath;
    iframe.onload = () => {
      fitInfographicViewport(iframe);
      setTimeout(() => fitInfographicViewport(iframe), 250);
      setTimeout(() => fitInfographicViewport(iframe), 900);
    };
    docPage.classList.remove("pdf-mode");
    docPage.classList.add("infographic-mode");
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
    document.getElementById("doc-page").classList.remove("pdf-mode");
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

    // Embed YouTube and Google Drive video links as inline players
    wireVideoEmbeds(contentEl);

    // Wire up Bible verse references for translation comparison
    wireVerseReferences(contentEl);
  } catch (err) {
    console.error("Failed to load document:", err);
    if (
      err.message.includes("Failed to fetch") ||
      err.message.includes("NetworkError")
    ) {
      const currentOrigin =
        window.location.origin && window.location.origin !== "null"
          ? window.location.origin
          : "";
      showError(
        "Could not fetch the document. The local server appears to be unreachable. " +
          (currentOrigin ? `Current preview URL: ${currentOrigin}. ` : "") +
          "Run start_server.bat (Windows) or " +
          '"python -m http.server 3030" in this folder, then open http://localhost:3030',
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

/**
 * Scan rendered content for YouTube and Google Drive video links and replace
 * them with responsive embedded players.
 *
 * Supported link formats in markdown:
 *   YouTube:
 *     https://www.youtube.com/watch?v=VIDEO_ID
 *     https://youtu.be/VIDEO_ID
 *     https://www.youtube.com/shorts/VIDEO_ID
 *
 *   Google Drive video (shared as "Anyone with the link"):
 *     https://drive.google.com/file/d/FILE_ID/view
 *     https://drive.google.com/open?id=FILE_ID
 *
 * A link is embedded when it is the ONLY content in its paragraph
 * (i.e. a bare URL on its own line), so prose links are never replaced.
 */
function wireVideoEmbeds(container) {
  if (!container) return;

  const YT_REGEX = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const DRIVE_REGEX = /drive\.google\.com\/(?:file\/d\/([A-Za-z0-9_-]+)\/(?:view|preview)|open\?(?:.*&)?id=([A-Za-z0-9_-]+))/;

  // Look for <p> tags that contain exactly one <a> and nothing else
  container.querySelectorAll("p").forEach((p) => {
    const anchors = p.querySelectorAll("a");
    if (anchors.length !== 1) return;
    // The paragraph text must essentially just be the link (trim whitespace/newlines)
    const paraText = p.textContent.trim();
    const linkText = anchors[0].textContent.trim();
    if (paraText !== linkText && paraText !== anchors[0].href) return;

    const href = anchors[0].href || "";

    let embedUrl = null;
    let title = "";

    // YouTube
    const ytMatch = href.match(YT_REGEX);
    if (ytMatch) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0`;
      title = "YouTube video";
    }

    // Google Drive
    if (!embedUrl) {
      const drMatch = href.match(DRIVE_REGEX);
      if (drMatch) {
        const fileId = drMatch[1] || drMatch[2];
        embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        title = "Google Drive video";
      }
    }

    if (!embedUrl) return;

    // Build responsive wrapper + iframe
    const wrapper = document.createElement("div");
    wrapper.className = "video-embed-wrapper";
    wrapper.innerHTML = `<iframe src="${embedUrl}" title="${title}" allowfullscreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="lazy" frameborder="0"></iframe>`;
    p.replaceWith(wrapper);
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

/* ── Scroll Reveal for Card Sections ──────────────────────── */
function initScrollReveal() {
  const sections = document.querySelectorAll(".card-section");
  if (!sections.length) return;

  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything
    sections.forEach((s) => {
      s.classList.add("revealed");
      s.querySelectorAll(".topic-card").forEach((c) => c.classList.add("card-visible"));
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target;
        section.classList.add("revealed");
        // Stagger card entrance
        const cards = section.querySelectorAll(".topic-card");
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add("card-visible"), i * 60);
        });
        observer.unobserve(section);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ══════════════════════════════════════════════════════════════
   BIBLE VERSE TRANSLATION LOOKUP
   Detects Bible references in rendered markdown, makes them
   clickable, and shows a modal with the verse in multiple
   translations via bible-api.com (free, CORS-enabled).
══════════════════════════════════════════════════════════════ */

const BIBLE_TRANSLATIONS = [
  // Free translations via bible-api.com (no API key needed)
  { id: "kjv",    label: "KJV",   desc: "King James Version (1611)",    source: "free" },
  { id: "web",    label: "WEB",   desc: "World English Bible (Modern)", source: "free" },
  { id: "asv",    label: "ASV",   desc: "American Standard (1901)",     source: "free" },
  { id: "bbe",    label: "BBE",   desc: "Bible in Basic English",       source: "free" },
  { id: "oeb-us", label: "OEB",   desc: "Open English Bible (Modern)",  source: "free" },
  { id: "darby",  label: "Darby", desc: "Darby Translation",            source: "free" },
  // Copyrighted translations via api.bible (requires free API key)
  { id: "niv",  label: "NIV",  desc: "New International Version",  source: "api.bible", bibleId: "78a9f6124f344018-01" },
  { id: "nlt",  label: "NLT",  desc: "New Living Translation",     source: "api.bible", bibleId: "d6e14a625393b4da-01" },
  { id: "nkjv", label: "NKJV", desc: "New King James Version",     source: "api.bible", bibleId: "63097d2a0a2f7db3-01" },
];

/* ── api.bible API key management ────────────────────────── */
const API_BIBLE_KEY_STORAGE = "apiBibleApiKey";
// Built-in key — works for all visitors out of the box (free non-commercial tier).
// Override via the ⚙️ settings button if you have your own key.
const API_BIBLE_BUILTIN_KEY = "IYyhVb_8ypT1jinjBioh9";

function getApiBibleKey() {
  // Prefer a user-supplied key from localStorage, fall back to the built-in key
  return localStorage.getItem(API_BIBLE_KEY_STORAGE) || API_BIBLE_BUILTIN_KEY;
}
function setApiBibleKey(key) {
  localStorage.setItem(API_BIBLE_KEY_STORAGE, key.trim());
}

/**
 * Book name → api.bible 3-letter code mapping.
 */
const BOOK_TO_API_CODE = {
  "genesis":"GEN","exodus":"EXO","leviticus":"LEV","numbers":"NUM","deuteronomy":"DEU",
  "joshua":"JOS","judges":"JDG","ruth":"RUT",
  "1 samuel":"1SA","2 samuel":"2SA","1 kings":"1KI","2 kings":"2KI",
  "1 chronicles":"1CH","2 chronicles":"2CH",
  "ezra":"EZR","nehemiah":"NEH","esther":"EST","job":"JOB",
  "psalm":"PSA","psalms":"PSA","proverbs":"PRO","ecclesiastes":"ECC",
  "song of solomon":"SNG",
  "isaiah":"ISA","jeremiah":"JER","lamentations":"LAM","ezekiel":"EZK","daniel":"DAN",
  "hosea":"HOS","joel":"JOL","amos":"AMO","obadiah":"OBA","jonah":"JON",
  "micah":"MIC","nahum":"NAM","habakkuk":"HAB","zephaniah":"ZEP",
  "haggai":"HAG","zechariah":"ZEC","malachi":"MAL",
  "matthew":"MAT","mark":"MRK","luke":"LUK","john":"JHN",
  "acts":"ACT","romans":"ROM",
  "1 corinthians":"1CO","2 corinthians":"2CO",
  "galatians":"GAL","ephesians":"EPH","philippians":"PHP","colossians":"COL",
  "1 thessalonians":"1TH","2 thessalonians":"2TH",
  "1 timothy":"1TI","2 timothy":"2TI","titus":"TIT","philemon":"PHM",
  "hebrews":"HEB","james":"JAS",
  "1 peter":"1PE","2 peter":"2PE","1 john":"1JN","2 john":"2JN","3 john":"3JN",
  "jude":"JUD","revelation":"REV",
  // Common abbreviations
  "gen":"GEN","exo":"EXO","exod":"EXO","lev":"LEV","num":"NUM","deut":"DEU",
  "josh":"JOS","judg":"JDG","sam":"1SA",
  "kgs":"1KI","chr":"1CH","neh":"NEH","esth":"EST",
  "psa":"PSA","ps":"PSA","prov":"PRO","eccl":"ECC",
  "isa":"ISA","jer":"JER","lam":"LAM","ezek":"EZK","dan":"DAN",
  "hos":"HOS","mic":"MIC","zech":"ZEC","mal":"MAL",
  "matt":"MAT","mat":"MAT","mk":"MRK","lk":"LUK","jn":"JHN",
  "rom":"ROM","cor":"1CO","gal":"GAL","eph":"EPH","phil":"PHP",
  "col":"COL","thess":"1TH","tim":"1TI","heb":"HEB","jas":"JAS",
  "pet":"1PE","rev":"REV",
};

/**
 * Convert a human-readable reference like "Genesis 2:1-3" to
 * api.bible passage ID format like "GEN.2.1-GEN.2.3".
 */
function toApiBiblePassageId(reference) {
  const ref = reference.trim();
  // Match: "Book Chapter:VerseStart[-VerseEnd]"
  const m = ref.match(/^(.+?)\s+(\d+)\s*:\s*(\d+)(?:\s*[-–]\s*(\d+))?/);
  if (!m) return null;

  const bookRaw = m[1].trim().toLowerCase().replace(/\.$/, "");
  const chapter = m[2];
  const verseStart = m[3];
  const verseEnd = m[4] || null;

  const code = BOOK_TO_API_CODE[bookRaw];
  if (!code) return null;

  if (verseEnd) {
    return `${code}.${chapter}.${verseStart}-${code}.${chapter}.${verseEnd}`;
  }
  return `${code}.${chapter}.${verseStart}`;
}

/**
 * Fetch a passage from api.bible.
 * Returns a normalised object matching the bible-api.com shape.
 */
async function fetchVerseApiBible(reference, bibleId) {
  const apiKey = getApiBibleKey();
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const passageId = toApiBiblePassageId(reference);
  if (!passageId) throw new Error("Could not parse reference for api.bible.");

  const url = `https://rest.api.bible/v1/bibles/${bibleId}/passages/${passageId}`
    + `?content-type=text&include-verse-numbers=true&include-titles=false&include-chapter-numbers=false`;

  const res = await fetch(url, {
    headers: { "api-key": apiKey },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Invalid API key. Check your api.bible key in settings.");
    if (res.status === 403) throw new Error("This Bible version is not available for your API key.");
    if (res.status === 404) throw new Error("Verse not found in this translation.");
    throw new Error(`api.bible error (${res.status})`);
  }

  const json = await res.json();
  const data = json.data || {};

  // Handle FUMS tracking (required by api.bible terms)
  if (json.meta && json.meta.fumsId && typeof _BAPI !== "undefined" && _BAPI.t) {
    try { _BAPI.t(json.meta.fumsId); } catch (_) { /* non-critical */ }
  }

  // Parse plain-text content into verse-like structure
  const text = (data.content || "").trim();
  const copyright = data.copyright || "";
  return { text, reference: data.reference || reference, copyright, _raw: data };
}

/** Cache for fetched verses: key = "ref|translation" */
const _verseCache = new Map();

/**
 * Bible book names — used for detecting verse references.
 * Includes full names and common abbreviations.
 */
const BIBLE_BOOKS_PATTERN = (function () {
  const books = [
    "Genesis","Exodus","Leviticus","Numbers","Deuteronomy",
    "Joshua","Judges","Ruth",
    "1 Samuel","2 Samuel","1 Kings","2 Kings",
    "1 Chronicles","2 Chronicles",
    "Ezra","Nehemiah","Esther",
    "Job","Psalms?","Proverbs","Ecclesiastes","Song of Solomon",
    "Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel",
    "Hosea","Joel","Amos","Obadiah","Jonah","Micah",
    "Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
    "Matthew","Mark","Luke","John",
    "Acts","Romans",
    "1 Corinthians","2 Corinthians",
    "Galatians","Ephesians","Philippians","Colossians",
    "1 Thessalonians","2 Thessalonians",
    "1 Timothy","2 Timothy","Titus","Philemon",
    "Hebrews","James",
    "1 Peter","2 Peter","1 John","2 John","3 John",
    "Jude","Revelation",
    // Abbreviations
    "Gen","Exod?","Lev","Num","Deut","Josh","Judg","Sam","Kgs",
    "Chr","Neh","Esth","Psa?","Prov","Eccl","Isa","Jer","Lam",
    "Ezek","Dan","Hos","Mic","Zech","Mal",
    "Matt?","Mk","Lk","Jn","Rom","Cor","Gal","Eph","Phil",
    "Col","Thess","Tim","Heb","Jas","Pet","Rev",
  ];
  return books.join("|");
})();

/**
 * Regex to detect Bible references inside <strong> tags.
 * Matches patterns like: Genesis 2:1-3, Psalm 119:105, 1 John 2:15-17
 * Also handles comma-separated verses like Matthew 25:31-33,46
 */
const VERSE_REF_REGEX = new RegExp(
  "\\b((?:" + BIBLE_BOOKS_PATTERN + ")\\.?\\s*\\d+\\s*:\\s*\\d+(?:\\s*[-–]\\s*\\d+)?(?:\\s*,\\s*\\d+(?:\\s*[-–]\\s*\\d+)?)*)\\b",
  "gi"
);

/**
 * After the markdown is rendered, scan the document for Bible references
 * inside <strong> tags and make them clickable.
 */
function wireVerseReferences(container) {
  if (!container) return;

  // Find all <strong> tags that contain Bible references
  const strongs = container.querySelectorAll("strong");
  let count = 0;

  strongs.forEach((el) => {
    const text = el.textContent.trim();
    // Quick check: does it look like a verse reference?
    // Must contain a book name, chapter number, and colon+verse
    if (!/\d+\s*:\s*\d+/.test(text)) return;
    if (!VERSE_REF_REGEX.test(text)) return;
    VERSE_REF_REGEX.lastIndex = 0; // Reset regex state

    // Extract just the reference part (strip trailing punctuation like ":" or "-")
    const refMatch = text.match(VERSE_REF_REGEX);
    if (!refMatch) return;

    const ref = refMatch[0].trim();

    // Don't double-wrap
    if (el.closest(".verse-ref")) return;

    // Wrap in a clickable span
    el.classList.add("verse-ref");
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("title", `Click to compare translations: ${ref}`);
    el.dataset.verseRef = ref;

    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openBibleModal(ref);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openBibleModal(ref);
      }
    });

    count++;
  });

  // Show the floating pill if we found verses
  const pill = document.getElementById("verse-translation-pill");
  if (pill && count > 0) {
    pill.style.display = "flex";
  }
}

/**
 * Fetch a Bible verse — routes to the correct API based on translation source.
 * Returns { text, verses[], reference, translation } or throws.
 */
async function fetchVerse(reference, translationId) {
  const cacheKey = `${reference}|${translationId}`;
  if (_verseCache.has(cacheKey)) return _verseCache.get(cacheKey);

  const t = BIBLE_TRANSLATIONS.find((x) => x.id === translationId);

  let data;
  if (t && t.source === "api.bible") {
    // Copyrighted translations via api.bible
    data = await fetchVerseApiBible(reference, t.bibleId);
  } else {
    // Free translations via bible-api.com
    const apiRef = encodeURIComponent(reference.trim());
    const url = `https://bible-api.com/${apiRef}?translation=${translationId}`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw new Error("Verse not found in this translation.");
      throw new Error(`API error (${res.status})`);
    }
    data = await res.json();
    if (data.error) throw new Error(data.error);
  }

  _verseCache.set(cacheKey, data);
  return data;
}

/**
 * Open the verse comparison modal for a given reference.
 */
function openBibleModal(reference) {
  const overlay = document.getElementById("verse-modal-overlay");
  const refEl = document.getElementById("verse-modal-ref");
  const tabsEl = document.getElementById("verse-modal-tabs");
  const textEl = document.getElementById("verse-text");
  const loadEl = document.getElementById("verse-loading");
  const errEl = document.getElementById("verse-error");

  // Set reference title
  refEl.textContent = reference;

  // Build translation tabs
  const defaultTranslation = document.getElementById("verse-default-translation")?.value || "web";
  const hasApiKey = !!getApiBibleKey();
  tabsEl.innerHTML = "";
  BIBLE_TRANSLATIONS.forEach((t) => {
    const tab = document.createElement("div");
    const isLocked = t.source === "api.bible" && !hasApiKey;
    tab.className = "vm-tab" + (t.id === defaultTranslation ? " active" : "") + (isLocked ? " locked" : "");
    tab.textContent = t.label + (isLocked ? " 🔒" : "");
    tab.title = isLocked ? `${t.desc} — requires free api.bible key (click to set up)` : t.desc;
    tab.dataset.translation = t.id;
    tab.addEventListener("click", () => {
      if (isLocked) {
        openApiBibleSettings();
        return;
      }
      tabsEl.querySelectorAll(".vm-tab").forEach((el) => el.classList.remove("active"));
      tab.classList.add("active");
      // Keep the pill dropdown in sync with the tab
      const pill = document.getElementById("verse-default-translation");
      if (pill) pill.value = t.id;
      loadVerseInModal(reference, t.id);
    });
    tabsEl.appendChild(tab);
  });

  // Show modal
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Load default translation (fall back to 'web' if the default is a locked api.bible one)
  let startTranslation = defaultTranslation;
  const startT = BIBLE_TRANSLATIONS.find((x) => x.id === defaultTranslation);
  if (startT && startT.source === "api.bible" && !hasApiKey) startTranslation = "web";
  loadVerseInModal(reference, startTranslation);

  // Close on overlay click
  overlay.onclick = (e) => {
    if (e.target === overlay) closeBibleModal();
  };

  // Close on Escape
  document._verseEscHandler = (e) => {
    if (e.key === "Escape") closeBibleModal();
  };
  document.addEventListener("keydown", document._verseEscHandler);
}

/**
 * Load a specific translation into the modal body.
 */
async function loadVerseInModal(reference, translationId) {
  const textEl = document.getElementById("verse-text");
  const loadEl = document.getElementById("verse-loading");
  const errEl = document.getElementById("verse-error");

  textEl.innerHTML = "";
  errEl.innerHTML = "";
  loadEl.style.display = "flex";

  try {
    const data = await fetchVerse(reference, translationId);
    loadEl.style.display = "none";

    // Render verse text with verse numbers
    if (data.verses && data.verses.length > 0) {
      // bible-api.com response with individual verses
      const html = data.verses.map((v) => {
        const num = v.verse || "";
        return `<span class="verse-num">${num}</span>${escapeHtml(v.text.trim())} `;
      }).join("");
      textEl.innerHTML = sanitize(html);
    } else if (data.text) {
      // api.bible returns plain text or bible-api.com single text
      textEl.textContent = data.text;
    } else {
      errEl.textContent = "No verse text returned.";
    }

    // Show copyright notice for api.bible translations
    if (data.copyright) {
      const copy = document.createElement("div");
      copy.className = "verse-copyright";
      copy.textContent = data.copyright.replace(/<[^>]+>/g, "");
      textEl.appendChild(copy);
    }
  } catch (err) {
    loadEl.style.display = "none";
    if (err.message === "API_KEY_MISSING") {
      errEl.innerHTML = `Could not connect to api.bible. Please try again shortly.`;
      return;
    }
    errEl.innerHTML = err.message.includes("not found")
      ? `This verse may not be available in this translation. Try KJV or WEB.`
      : `Could not fetch verse: ${escapeHtml(err.message)}`;
  }
}

/**
 * Open the api.bible API key settings dialog.
 */
function openApiBibleSettings() {
  const existing = document.getElementById("api-bible-settings-overlay");
  if (existing) existing.remove();

  const storedKey = localStorage.getItem(API_BIBLE_KEY_STORAGE) || "";
  const overlay = document.createElement("div");
  overlay.id = "api-bible-settings-overlay";
  overlay.innerHTML = `
    <div class="api-settings-panel">
      <h3>⚙️ api.bible API Key</h3>
      <p>NIV, NLT, and NKJV are already enabled for all visitors using the built-in key.</p>
      <p>If you have your own <a href="https://scripture.api.bible/signup" target="_blank" rel="noopener">api.bible</a> key and want to use it instead, paste it below. Leave blank to use the default.</p>
      <input type="text" id="api-bible-key-input" placeholder="Paste your own API key (optional)…"
             value="${escapeHtml(storedKey)}" spellcheck="false" autocomplete="off" />
      <div class="api-settings-buttons">
        <button id="api-bible-save-btn" class="btn-gold">Save</button>
        <button id="api-bible-clear-btn" class="btn-ghost">Use Default</button>
        <button id="api-bible-cancel-btn" class="btn-ghost">Cancel</button>
      </div>
      <p class="api-settings-note">A custom key is stored in this browser's localStorage only.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  // Focus input
  const input = document.getElementById("api-bible-key-input");
  setTimeout(() => input.focus(), 100);

  // Save
  document.getElementById("api-bible-save-btn").addEventListener("click", () => {
    const key = input.value.trim();
    if (key) {
      setApiBibleKey(key);
      // Clear cache for api.bible translations so they re-fetch
      for (const [k] of _verseCache) {
        const tId = k.split("|")[1];
        const t = BIBLE_TRANSLATIONS.find((x) => x.id === tId);
        if (t && t.source === "api.bible") _verseCache.delete(k);
      }
    }
    overlay.remove();
    // Refresh modal tabs if the verse modal is open
    const verseOverlay = document.getElementById("verse-modal-overlay");
    if (verseOverlay && verseOverlay.classList.contains("active")) {
      const ref = document.getElementById("verse-modal-ref")?.textContent;
      if (ref) openBibleModal(ref);
    }
  });

  // Cancel
  document.getElementById("api-bible-cancel-btn").addEventListener("click", () => overlay.remove());

  // Clear override — revert to built-in key
  document.getElementById("api-bible-clear-btn").addEventListener("click", () => {
    localStorage.removeItem(API_BIBLE_KEY_STORAGE);
    for (const [k] of _verseCache) {
      const tId = k.split("|")[1];
      const t = BIBLE_TRANSLATIONS.find((x) => x.id === tId);
      if (t && t.source === "api.bible") _verseCache.delete(k);
    }
    overlay.remove();
  });

  // Close on overlay click
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });

  // Close on Escape
  const escHandler = (e) => {
    if (e.key === "Escape") { overlay.remove(); document.removeEventListener("keydown", escHandler); }
  };
  document.addEventListener("keydown", escHandler);
}

/** Escape HTML entities */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/** Close the verse modal */
function closeBibleModal() {
  const overlay = document.getElementById("verse-modal-overlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  if (document._verseEscHandler) {
    document.removeEventListener("keydown", document._verseEscHandler);
    document._verseEscHandler = null;
  }
}

/* ── Init ─────────────────────────────────────────────────── */
async function initApp() {
  rebuildAllItems();
  try {
    await populateSourceDocumentsSection();
  } catch (error) {
    console.warn("Could not auto-load source PDFs:", error);
  }
  try {
    await populateInfographicsSection();
  } catch (error) {
    console.warn("Could not auto-load infographics:", error);
  }
  buildSidebar();
  buildHomeCards();
  showHome();

  // When the pill dropdown changes, keep everything in sync.
  // Works whether the modal is open or closed.
  document.getElementById("verse-default-translation")?.addEventListener("change", (e) => {
    const newTranslation = e.target.value;
    const overlay = document.getElementById("verse-modal-overlay");
    const isOpen = overlay && overlay.classList.contains("active");

    if (isOpen) {
      // Update the active tab highlight
      const tabsEl = document.getElementById("verse-modal-tabs");
      tabsEl?.querySelectorAll(".vm-tab").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.translation === newTranslation);
      });
      // Reload the verse in the new translation
      const ref = document.getElementById("verse-modal-ref")?.textContent;
      if (ref) loadVerseInModal(ref, newTranslation);
    }
    // If modal is closed, the new value is stored in the select element and
    // will be picked up automatically the next time a verse is clicked.
  });
}

initApp();
