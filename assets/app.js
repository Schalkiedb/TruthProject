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
      {
        title: "Prophet, Priest & King — Biblical Definitions of the Prophetic Office",
        file: "Study_guides/prophet-priest-definitions.html",
        icon: "📯",
        tag: "Biblical Foundation",
        tagClass: "blue",
        desc: "The biblical definitions of prophet, priest, and king — the Old Testament office of the prophet, the tests Scripture gives, and the framework for evaluating any claim to prophetic ministry.",
      },
      {
        title: "The Obedient Faith — Obedience, False Prophets & the Biblical Tests",
        file: "Study_guides/obedience-and-false-prophets.html",
        icon: "⚖️",
        tag: "Apologetics",
        tagClass: "blue",
        desc: "Part I: Scripture's complete testimony that obedience is necessary but does not save. Part II: The six biblical tests for identifying a false prophet — Deuteronomy 13, Isaiah 8:20, Matthew 7, Jeremiah 23, and more.",
      },
    ],
  },
  {
    section: "Biblical Typology",
    icon: "🔁",
    id: "typology",
    items: [
      {
        title: "Biblical Typology: Israel, Babylon & The Seven Churches",
        file: "Typology/biblical-typology-study-guide.html",
        icon: "🔁",
        tag: "Typology",
        tagClass: "blue",
        desc: "History always repeats — the antitypical framework of prophecy. Israel's patterns in the Church, Babylon old and new, Daniel inside Babylon, the Seven Churches, and Jezebel's thread through all of history.",
      },
      {
        title: "The Shadow & The Substance: Biblical Typology — Complete Reference",
        file: "Typology/biblical-typology-expanded.html",
        icon: "🕯️",
        tag: "Typology",
        tagClass: "blue",
        desc: "The complete typological reference — persons, events, covenants, and the entire Levitical system mapped as types pointing to Christ. Adam, Isaac, Joseph, Moses, and the Exodus antitypes, with a full cross-reference table of every major type and New Testament fulfilment.",
      },
      {
        title: "One Prophet, Four Voices: Isaiah · Ezekiel · Daniel · Revelation",
        file: "Typology/prophetic-parallels-guide.html",
        icon: "🎼",
        tag: "Typology",
        tagClass: "blue",
        desc: "Isaiah, Ezekiel, Daniel, and Revelation are one prophetic symphony in four movements — each book building consciously on the last across 700 years. Seven major parallel themes mapped side-by-side: the throne room, Babylon's fall, the mark on the forehead, the beasts, the 1260-day prophecy, the scroll, and the resurrection.",
      },
      {
        title: "The Divine Seven: God's Sabbath Cycle Through Scripture",
        file: "Typology/The_Divine_Seven.html",
        icon: "✦",
        tag: "Sabbath",
        tagClass: "green",
        desc: "The 6+1 Sabbath rhythm woven into every scale of Scripture — the Creation week, the Sabbatical year, the Jubilee, the Babylonian exile, Daniel's 70 weeks, and the Cosmic Week of 7,000 years. God's signature on time itself.",
      },
      {
        title: "The Close of Probation: The Mercy Seat & the Sealing",
        file: "Typology/probation-mercy-seat-guide.html",
        icon: "🚪",
        tag: "Typology",
        tagClass: "blue",
        desc: "The Mercy Seat, the Day of Atonement, and the Close of Probation as sanctuary typology — every Scripture witness to the sealing of mercy, when Christ's intercession ends, the harvest is reaped, and God's Spirit ceases to strive.",
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
      {
        title: "Signs of the Times: Historical Escalation",
        file: "Sign_of_the_times/signs_of_the_times.html",
        icon: "⚡",
        tag: "Interactive",
        tagClass: "red",
        desc: "A comprehensive chronicle of war, pestilence, earthquakes, and the explosion of knowledge — from 1 AD to 2026. Interactive world conflict map, heatmaps, and prophecy correlation tables.",
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
        title: "Ellen G. White: Applying the Biblical Tests",
        file: "egw-prophet-test.html",
        icon: "🔍",
        tag: "Apologetics",
        tagClass: "blue",
        desc: "A fair, evidence-based evaluation of Ellen G. White against the seven biblical tests for a prophet — Isaiah 8:20, Matthew 7:20, Deuteronomy 18, 1 John 4:2, and the conditional prophecy framework of Jeremiah 18.",
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
    section: "Primary Sources & Admissions",
    icon: "💬",
    id: "primary-sources",
    items: [
      {
        title: "Quotes: Catholic & Protestant Admissions on the Sabbath",
        file: "Quotes_regarding_sabbath_change_catholic_and_protestant.md",
        icon: "💬",
        tag: "Primary Sources",
        tagClass: "blue",
        desc: "The most powerful direct-admission quotes from Catholic and Protestant authorities — in their own words — about the Sabbath-to-Sunday transfer.",
      }
    ],
  },
  {
    section: "Source Documents (Catholic)",
    icon: "🏛️",
    id: "source-documents-catholic",
    items: [],
  },
  {
    section: "Creation vs. Evolution",
    icon: "🌍",
    id: "creation-vs-evolution",
    items: [
      {
        title: "Genesis Conflict — Prof. Walter Veith",
        file: "Evolution deception/Genesis_Conflict_Study_Guide.md",
        icon: "🧬",
        tag: "Creation",
        tagClass: "green",
        desc: "The Genesis Conflict lecture series by Prof. Walter Veith (Amazing Discoveries) — scientific evidence for creation, the flood, genetics, and the archaeological record.",
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
      {
        title: "Infographic XI — The Reformers' Witness",
        file: "infographics/infographic11_reformers.html",
        icon: "🕯️",
        tag: "History",
        tagClass: "blue",
        desc: "Key Reformation figures and their statements on the Sabbath — what the Reformers actually said about Saturday vs. Sunday, and why most stopped short of restoring it.",
      },
      {
        title: "Infographic XI-B — Witnesses Through the Ages",
        file: "infographics/infographic11b_witnesses.html",
        icon: "📜",
        tag: "History",
        tagClass: "blue",
        desc: "Faithful Sabbath-keeping communities from the apostolic era through the Reformation — Nazarenes, Waldensians, Paulicians, Lollards, and others who preserved the truth.",
      },
      {
        title: "Infographic XII — The Sabbath in Every Language",
        file: "infographics/infographic12_language_evidence.html",
        icon: "🗣️",
        tag: "Linguistic",
        tagClass: "green",
        desc: "105+ languages where the word for Saturday derives from 'Sabbath' — grouped by language family. The linguistic fossil record proves global Sabbath awareness predating Christianity.",
      },
      {
        title: "Infographic XIII — The Forgotten Sabbath-Keepers",
        file: "infographics/infographic13_forgotten_keepers.html",
        icon: "🌍",
        tag: "History",
        tagClass: "red",
        desc: "30+ communities history overlooked — Nestorians, Jacobites, Armenians, Bogomils, Russian Subotniki, St. Thomas Christians of India, True Jesus Church of China, and more across 6 continents.",
      },
      {
        title: "Infographic XIV — Every Decree Against the Sabbath",
        file: "infographics/infographic14_councils_decrees.html",
        icon: "⚖️",
        tag: "History",
        tagClass: "red",
        desc: "The 1,900-year institutional war on Saturday: every known council, canon, imperial edict, inquisition, and modern law targeting Sabbath observance from 135 AD to 2026.",
      },
            {
        title: "The Sunday Convergence: Leo XIV's Magnifica Humanitas (2026)",
        file: "Sign_of_the_times/sunday_law_convergence_guide.html",
        icon: "⚡",
        tag: "End Times",
        tagClass: "red",
        desc: "How Pope Leo XIV's 2026 AI encyclical Magnifica Humanitas extends a 135-year doctrinal chain — from Rerum Novarum (1891) to civil Sunday enforcement. The Heritage Foundation's legislative arm, the language of rest and rhythm embedded in social welfare framing, and Ellen White's prophetic framework applied to the convergence.",
      },
      {
        title: "Sabbath World Infographic",
        file: "infographics/sabbath_world_infographic.html",
        icon: "🌐",
        tag: "Visual",
        tagClass: "green",
        desc: "Interactive global view of Sabbath-keeping communities worldwide — historical and present-day Saturday observance mapped across every continent.",
      },
      {
        title: "World Map — Global Saturday Keeping",
        file: "infographics/worldmap.html",
        icon: "🗺️",
        tag: "Visual",
        tagClass: "blue",
        desc: "Full-page interactive world map showing the geographic spread of Saturday Sabbath observance throughout history and today.",
      },
    ],
  },
  {
    section: "History — The Reformation",
    icon: "🕯️",
    id: "history-reformation",
    items: [
      {
        title: "History of Sabbath Observance",
        file: "History/Reformation/History of Sabbath Observance.pdf",
        icon: "📅",
        tag: "Primary Source",
        tagClass: "blue",
        desc: "A documented history of Saturday Sabbath observance through the centuries — from the early church through the Reformation era.",
      },
      {
        title: "Foxe's Book of Martyrs",
        file: "History/Reformation/Foxe39s-Book-Of-Martyrs.pdf",
        icon: "⛓️",
        tag: "History",
        tagClass: "red",
        desc: "John Foxe's landmark 1563 work documenting the persecution and martyrdom of Protestant Christians by the Roman Catholic Inquisition.",
      },
      {
        title: "History of the Reformation",
        file: "History/Reformation/History-Of-The-Reformation.pdf",
        icon: "🕯️",
        tag: "History",
        tagClass: "blue",
        desc: "A comprehensive history of the Protestant Reformation — the key figures, events, and movements that challenged papal authority and restored biblical truth.",
      },
      {
        title: "Romanism and the Reformation",
        file: "History/Reformation/Romanism-And-The-Reformation.pdf",
        icon: "🏛️",
        tag: "History",
        tagClass: "red",
        desc: "H. Grattan Guinness's classic examination of the Reformation's identification of Rome as the prophetic Antichrist power of Daniel and Revelation.",
      },
      {
        title: "History of the Waldenses",
        file: "History/Reformation/The-History-Of-The-Waldenses.pdf",
        icon: "🏔️",
        tag: "History",
        tagClass: "blue",
        desc: "The story of the Waldensians — Alpine Christians who preserved the Bible, the Sabbath, and the true gospel through centuries of persecution.",
      },
      {
        title: "History of the Jesuits",
        file: "History/Reformation/History-Of-The-Jesuits.pdf",
        icon: "⚔️",
        tag: "Counter-Reformation",
        tagClass: "red",
        desc: "The history of the Society of Jesus — its founding by Ignatius of Loyola, its methods, its infiltration of Protestant nations, and its role in the Counter-Reformation.",
      },
      {
        title: "Reformers' Admission of the Papal Antichrist",
        file: "History/Reformation/Reformers admission of Papal antichrist throughout centuries.pdf",
        icon: "📜",
        tag: "Primary Source",
        tagClass: "red",
        desc: "Direct quotes from Reformation-era scholars and theologians identifying the papacy as the Antichrist of Bible prophecy — in their own words.",
      },
      {
        title: "History of Protestantism — Volume 1",
        file: "History/Reformation/The-History-Of-Protestantism-01.pdf",
        icon: "📖",
        tag: "History",
        tagClass: "blue",
        desc: "J.A. Wylie's monumental History of Protestantism, Volume 1 — from the earliest seeds of reform through the life of John Wycliffe and the Lollards.",
      },
      {
        title: "History of Protestantism — Volume 2",
        file: "History/Reformation/The-History-Of-Protestantism-02.pdf",
        icon: "📖",
        tag: "History",
        tagClass: "blue",
        desc: "J.A. Wylie's History of Protestantism, Volume 2 — Huss, Jerome, Luther, Zwingli, and the dramatic events of the early sixteenth century Reformation.",
      },
      {
        title: "History of Protestantism — Volume 3",
        file: "History/Reformation/The-History-Of-Protestantism-03.pdf",
        icon: "📖",
        tag: "History",
        tagClass: "blue",
        desc: "J.A. Wylie's History of Protestantism, Volume 3 — Calvin, the Huguenots, the Reformed churches of Scotland and England, and the Thirty Years' War.",
      },
      {
        title: "History of the Christian Church — Vol. 1",
        file: "History/Reformation/History-Of-The-Christian-Church-01.pdf",
        icon: "⛪",
        tag: "History",
        tagClass: "blue",
        desc: "Philip Schaff's definitive History of the Christian Church, Volume 1 — the apostolic era, the early church, and the first three centuries.",
      },
      {
        title: "History of the Christian Church — Vol. 2",
        file: "History/Reformation/History-Of-The-Christian-Church-02.pdf",
        icon: "⛪",
        tag: "History",
        tagClass: "blue",
        desc: "Philip Schaff's History of the Christian Church, Volume 2 — Ante-Nicene Christianity, the church fathers, and the rise of Catholic tradition.",
      },
      {
        title: "History of the Christian Church — Vol. 3",
        file: "History/Reformation/History-Of-The-Christian-Church-03.pdf",
        icon: "⛪",
        tag: "History",
        tagClass: "blue",
        desc: "Philip Schaff's History of the Christian Church, Volume 3 — Nicene and post-Nicene Christianity, Constantine, and the councils of the 4th–6th centuries.",
      },
      {
        title: "History of the Christian Church — Vol. 4",
        file: "History/Reformation/History-Of-The-Christian-Church-04.pdf",
        icon: "⛪",
        tag: "History",
        tagClass: "blue",
        desc: "Philip Schaff's History of the Christian Church, Volume 4 — Mediaeval Christianity from Gregory I through the Crusades.",
      },
      {
        title: "History of the Christian Church — Vol. 5",
        file: "History/Reformation/History-Of-The-Christian-Church-05.pdf",
        icon: "⛪",
        tag: "History",
        tagClass: "blue",
        desc: "Philip Schaff's History of the Christian Church, Volume 5 — the Middle Ages, the papal system at its height, and the seeds of the Reformation.",
      },
      {
        title: "History of the Christian Church — Vol. 6",
        file: "History/Reformation/History-Of-The-Christian-Church-06.pdf",
        icon: "⛪",
        tag: "History",
        tagClass: "blue",
        desc: "Philip Schaff's History of the Christian Church, Volume 6 — the Middle Ages through John Huss and the pre-Reformation movements.",
      },
      {
        title: "History of the Christian Church — Vol. 7",
        file: "History/Reformation/History-Of-The-Christian-Church-07.pdf",
        icon: "⛪",
        tag: "History",
        tagClass: "blue",
        desc: "Philip Schaff's History of the Christian Church, Volume 7 — the Reformation era: Luther, Zwingli, and the German and Swiss Reformation.",
      },
      {
        title: "History of the Christian Church — Vol. 8",
        file: "History/Reformation/History-Of-The-Christian-Church-08.pdf",
        icon: "⛪",
        tag: "History",
        tagClass: "blue",
        desc: "Philip Schaff's History of the Christian Church, Volume 8 — the Swiss Reformation, Calvin, and the spread of Reformed Christianity.",
      },
    ],
  },
  {
    section: "History — Jesuit Counter-Reformation",
    icon: "⚔️",
    id: "history-jesuits",
    items: [
      {
        title: "Extreme Oath of the Jesuits",
        file: "History/Jesuits(Counter Reformation)/Extreme Oath of Jesuits.pdf",
        icon: "🔏",
        tag: "Primary Source",
        tagClass: "red",
        desc: "The documented extreme Jesuit oath — sworn by high-ranking members, requiring absolute obedience to the Pope above all temporal and spiritual authority.",
      },
      {
        title: "Jesuit Oath (Image Document)",
        file: "History/Jesuits(Counter Reformation)/Jesuit Oath.jpg",
        icon: "📋",
        tag: "Primary Source",
        tagClass: "red",
        desc: "Photographic reproduction of the Jesuit Oath document — a primary-source image showing the original text of the oath sworn by Jesuit agents.",
      },
      {
        title: "Secret Instructions of the Jesuits",
        file: "History/Jesuits(Counter Reformation)/secretinstructio460lond.pdf",
        icon: "📜",
        tag: "Primary Source",
        tagClass: "red",
        desc: "The Monita Secreta — the secret instructions of the Society of Jesus, revealing the covert methods and goals of Jesuit operation published in 1612.",
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
  {
    section: "End-Time Church & Apostasy",
    icon: "⚠️",
    id: "end-time-church",
    items: [
      {
        title: "The Name Without the Nature — End-Time Apostasy in Scripture",
        file: "End_Time_Church/name-without-character.html",
        icon: "⚠️",
        tag: "End Times",
        tagClass: "red",
        desc: "Seven biblical themes on end-time apostasy: nominal Christianity, the narrow way, Laodicea, the form without the power, the ten virgins, and the great falling away — with Greek word studies, EGW quotes, and a prophetic symbol decoder.",
      },
    ],
  },
  {
    section: "Battle for the Frontal Lobe",
    icon: "🧠",
    id: "battle-frontal-lobe",
    items: [
      {
        title: "Battle for the Frontal Lobe",
        file: "Battle for frontal lobe/Battle for the Frontal lobe.html",
        icon: "🧠",
        tag: "Media & Mind",
        tagClass: "red",
        desc: "How entertainment, media, and modern culture are deliberately targeting the brain's decision-making centre — the frontal lobe — to neutralise spiritual discernment and moral reasoning.",
      },
      {
        title: "Jesuit Hollywood",
        file: "Battle for frontal lobe/JesuitHollywood.pdf",
        icon: "🎬",
        tag: "Media & Mind",
        tagClass: "red",
        desc: "Documented evidence of Jesuit and Catholic influence over Hollywood — how the entertainment industry shapes culture, morality, and religious attitudes in service of a hidden agenda.",
      },
    ],
  },
  {
    section: "Modern Diet and Disease",
    icon: "🌿",
    id: "modern-diet-disease",
    items: [
      {
        title: "Cancer, Disease & the Modern Diet",
        file: "Modern diet and disease/cancer_disease_guide.html",
        icon: "🔬",
        tag: "Health",
        tagClass: "green",
        desc: "The documented link between modern dietary habits and the explosion of degenerative disease — what the science says and what the Bible prescribed thousands of years earlier.",
      },
      {
        title: "Daniel Fast Recipes",
        file: "Modern diet and disease/daniel-fast-recipes.html",
        icon: "🥗",
        tag: "Health",
        tagClass: "green",
        desc: "Practical plant-based recipes based on the Daniel fast — delicious, nutritious meals aligned with the biblical health principles of Daniel chapter 1.",
      },
      {
        title: "Why Science Confirms the Biblical Prohibition on Unclean Animals",
        file: "Modern diet and disease/unclean_animals_scientific_supplement.html",
        icon: "🐖",
        tag: "Health",
        tagClass: "green",
        desc: "A deep scientific study confirming the dietary laws of Leviticus 11 and Deuteronomy 14 — parasitology, toxicology, and modern research showing why God's clean/unclean distinction maps precisely onto modern health science.",
      },
    ],
  },
  {
    section: "Promises of God",
    icon: "🌟",
    id: "promises",
    items: [
      {
        title: "Promises of God — A Biblical Guide",
        file: "Promises/biblical-promises v2.html",
        icon: "🌟",
        tag: "Promises",
        tagClass: "blue",
        desc: "A comprehensive biblical guide to the promises of God — covering salvation, healing, provision, protection, and eternal life. Every major covenant promise catalogued with Scripture references.",
      },
    ],
  },
  {
    section: "Additional Reading",
    icon: "📚",
    id: "additional-reading",
    items: [
      {
        title: "Daniel and the Revelation — Uriah Smith",
        file: "Additional Reading/Daniel and The Revelation Uria Smith.pdf",
        icon: "📖",
        tag: "Classic",
        tagClass: "blue",
        desc: "Uriah Smith's landmark commentary on the prophecies of Daniel and Revelation — verse-by-verse exposition from a historicist perspective. One of the most thorough prophetic works of the 19th century.",
      },
      {
        title: "Ten Commandments Twice Removed",
        file: "Additional Reading/ten_commandments_twice_removed.pdf",
        icon: "📜",
        tag: "Commandments",
        tagClass: "red",
        desc: "How the Ten Commandments have been systematically altered and removed from Catholic catechisms — documented evidence of the deliberate removal of the Second Commandment and the Sabbath.",
      },
      {
        title: "The Pilgrim's Progress",
        file: "Additional Reading/the-pilgrim-s-progress-en.pdf",
        icon: "🚶",
        tag: "Classic",
        tagClass: "blue",
        desc: "John Bunyan's allegorical masterpiece of the Christian walk — the journey of Christian from the City of Destruction to the Celestial City. One of the most widely read books after the Bible.",
      },
      {
        title: "The Present Truth",
        file: "Additional Reading/ThePresentTruth.pdf",
        icon: "📰",
        tag: "Classic",
        tagClass: "blue",
        desc: "James White's landmark periodical presenting the present truth for the remnant church — Sabbath, state of the dead, sanctuary, and the Three Angels' Messages in their original 19th-century presentation.",
      },
      {
        title: "National Sunday Law",
        file: "Additional Reading/National Sunday Law book.pdf",
        icon: "⚖️",
        tag: "Prophecy",
        tagClass: "red",
        desc: "A. Jan Marcussen's compelling study on the prophesied national Sunday law — tracing the legislative, religious, and political forces converging toward the enforcement of Sunday worship as Revelation 13 describes.",
      },
      {
        title: "Aliens, Angels & Ancestors — Unmasking the Deception",
        file: "Additional Reading/Aliens Angels Ancestors unmasking the deception.pdf",
        icon: "👁️",
        tag: "Deception",
        tagClass: "red",
        desc: "A biblical investigation into the supernatural deception behind alien and ancestral contact narratives — exposing how these phenomena connect to the end-time delusion Scripture warns about.",
      },
      {
        title: "Non-Human Intelligence — Unmasking the UAP Deception",
        file: "Additional Reading/Non Human intelligence unmasking the uap deception.pdf",
        icon: "🛸",
        tag: "Deception",
        tagClass: "red",
        desc: "A Christian apologetic examination of the UAP/UFO phenomenon — tracing the spiritual and prophetic dimensions of 'non-human intelligence' disclosures and their role in the great end-time deception.",
      },
      {
        title: "The Truth About Angels",
        file: "Additional Reading/Truth about Angels.pdf",
        icon: "✨",
        tag: "Angels",
        tagClass: "blue",
        desc: "A thorough biblical study on the nature, role, and ministry of angels — countering popular myths and occult distortions with what Scripture actually reveals about the heavenly messengers.",
      },
      {
        title: "A Trip into the Supernatural",
        file: "Additional Reading/A TRIP INTO THE SUPERNATURAL.pdf",
        icon: "🌌",
        tag: "Deception",
        tagClass: "red",
        desc: "Roger Morneau's gripping personal testimony of his involvement in a secret society of spirit worshippers and his dramatic deliverance — a firsthand account of Satanic strategy, the power of intercessory prayer, and the reality of the great controversy.",
      },
    ],
  },
];

/* Flat list of all items for linear prev/next navigation */
let ALL_ITEMS = [];

const SOURCE_DOCS_SECTION_ID = "source-documents-catholic";
const SOURCE_DOCS_ROOT = "Supporting Documents/";
const SOURCE_DOCS_MANIFEST = "assets/source-documents-catholic.json";
const SOURCE_DOCS_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif"];
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
  const withoutExt = fileName.replace(/\.(pdf|png|jpe?g|gif)$/i, "");
  return withoutExt.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Natural sort comparator — handles embedded numbers correctly
 * so "Quote 2" sorts before "Quote 11".
 */
function naturalSortCompare(a, b) {
  const aParts = a.match(/(\d+|\D+)/g) || [];
  const bParts = b.match(/(\d+|\D+)/g) || [];
  const len = Math.min(aParts.length, bParts.length);
  for (let i = 0; i < len; i++) {
    const aIsNum = /^\d+$/.test(aParts[i]);
    const bIsNum = /^\d+$/.test(bParts[i]);
    if (aIsNum && bIsNum) {
      const diff = Number(aParts[i]) - Number(bParts[i]);
      if (diff !== 0) return diff;
    } else {
      const cmp = aParts[i].localeCompare(bParts[i]);
      if (cmp !== 0) return cmp;
    }
  }
  return aParts.length - bParts.length;
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
    naturalSortCompare(formatSourceDocTitle(a), formatSourceDocTitle(b)),
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
    naturalSortCompare(formatSourceDocTitle(a), formatSourceDocTitle(b)),
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

  // ── Document sections from LIBRARY ──────────────────────
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

  // ── Video Library section (from videos.json) ─────────────
  if (_videosData.length > 0) {
    const sectionEl = document.createElement("div");
    sectionEl.className = "nav-section";
    sectionEl.dataset.sectionId = "videos";

    const header = document.createElement("div");
    header.className = "nav-section-header";
    header.innerHTML = `<span>🎬 Video Library</span><span class="section-chevron">▾</span>`;
    header.addEventListener("click", () => sectionEl.classList.toggle("collapsed"));
    sectionEl.classList.add("collapsed");

    const itemsEl = document.createElement("div");
    itemsEl.className = "nav-section-items";

    _videosData.forEach((cat, idx) => {
      const navItem = document.createElement("div");
      navItem.className = "nav-item";
      navItem.dataset.videoCat = idx;
      navItem.innerHTML = `<span class="nav-item-icon">${cat.icon || "🎬"}</span><span class="nav-item-title">${escapeHtml(cat.category)} <span class="nav-video-count">${cat.videos.length}</span></span>`;
      navItem.addEventListener("click", () => {
        if (window.innerWidth <= 900) closeMobileSidebar();
        showVideoCategory(idx);
      });
      itemsEl.appendChild(navItem);
    });

    sectionEl.appendChild(header);
    sectionEl.appendChild(itemsEl);
    nav.appendChild(sectionEl);
  }
}

/* ── Build Home Cards ─────────────────────────────────────── */
function buildHomeCards() {
  LIBRARY.forEach((section) => {
    const containerId = section.id.replace(/-/g, "_") + "_cards";
    // Map section ids to card grid ids
    const gridMap = {
      "main-library": "main-library-cards",
      "study-guides": "study-guide-cards",
      "typology": "typology-cards",
      "primary-sources": "primary-sources-cards",
      "creation-vs-evolution": "creation-vs-evolution-cards",
      infographics: "infographics-cards",
      "interactive-tools": "interactive-tools-cards",
      "false-doctrines": "false-doctrines-cards",
      "history-reformation": "history-reformation-cards",
      "history-jesuits": "history-jesuits-cards",
      "battle-frontal-lobe": "battle-frontal-lobe-cards",
      "modern-diet-disease": "modern-diet-disease-cards",
      "promises": "promises-cards",
      "additional-reading": "additional-reading-cards",
      "end-time-church": "end-time-church-cards",
    };
    const grid = document.getElementById(gridMap[section.id]);
    if (!grid) return;
    grid.innerHTML = "";

    section.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "topic-card";
      if (item.tagClass) card.dataset.accent = item.tagClass;
      card.innerHTML = `
        <div class="card-icon" role="img" aria-label="${escapeHtml(item.title)} icon">${item.icon}</div>
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
  const vcPage = document.getElementById("video-cat-page");
  if (vcPage) vcPage.style.display = "none";

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

  // Hide floating TOC
  hideTOC();

  // Refresh study path (marks completed steps) and continue reading
  buildStudyPath();
  buildContinueReading();

  // Re-trigger scroll reveal for sections that may not have been seen yet
  requestAnimationFrame(() => initScrollReveal());
}

function showLoading() {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "flex";
  document.getElementById("error-state").style.display = "none";
  const vcPage = document.getElementById("video-cat-page");
  if (vcPage) vcPage.style.display = "none";
}

function showError(msg) {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "none";
  document.getElementById("error-state").style.display = "flex";
  const vcPage = document.getElementById("video-cat-page");
  if (vcPage) vcPage.style.display = "none";
  if (msg) document.getElementById("error-msg").textContent = msg;
}

/* ── Load & Render Document ───────────────────────────────── */
async function loadDocument(filePath, fragment) {
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
  if (filePath === "prophecy_map.html" || filePath === "Sign_of_the_times/signs_of_the_times.html") {
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
    // Use #search= fragment if provided (for jumping to quote text), otherwise default to #view=FitH
    const hasSearch = fragment && fragment.startsWith("#search=");
    // Load PDF without search first; apply search only after PDF is fully loaded
    iframe.src = isPdfFile(filePath) ? `${encodedPath}#view=FitH` : encodedPath;
    if (isPdfFile(filePath) && hasSearch) {
      iframe.onload = () => {
        // Give the PDF viewer time to fully render before triggering search
        setTimeout(() => {
          iframe.src = `${encodedPath}${fragment}`;
        }, 1500);
      };
    }

    docPage.classList.remove("infographic-mode");
    docPage.classList.add("pdf-mode");
    document.getElementById("home-page").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("doc-page").style.display = "";
    const _vcPage1 = document.getElementById("video-cat-page");
    if (_vcPage1) _vcPage1.style.display = "none";

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
      // Force all scroll-reveal / IntersectionObserver animations to show
      // immediately — they can't fire normally inside a no-scroll iframe.
      // Also neutralize vh-based heights that cause circular iframe growth.
      try {
        const fd = iframe.contentWindow.document;
        const forceStyle = fd.createElement("style");
        forceStyle.id = "iframe-force-visible";
        forceStyle.textContent = `
          /* 1. Complete ALL CSS animations instantly to their final state */
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
          }

          /* 2. Force reveal/section elements to visible state */
          .reveal, .section, .cat-section {
            opacity: 1 !important;
            transform: none !important;
            visibility: visible !important;
          }

          /* 3. Neutralize vh-based heights on hero/cover sections
                to prevent circular iframe growth */
          .cover, .hero, .hero-wrap, .hero-section {
            min-height: auto !important;
            height: auto !important;
          }
          html, body {
            min-height: 0 !important;
            height: auto !important;
          }

          /* 4. Hide elements meant for standalone viewing (fixed nav, toggles) */
          #theme-toggle, .nav-dots, #translation-selector, #prog {
            display: none !important;
          }
          nav.sticky, nav[style*="sticky"] {
            position: relative !important;
          }
        `;
        fd.head.appendChild(forceStyle);
      } catch(e) { /* cross-origin fallback */ }

      fitInfographicViewport(iframe);
      setTimeout(() => fitInfographicViewport(iframe), 300);
      setTimeout(() => fitInfographicViewport(iframe), 1000);
    };
    docPage.classList.remove("pdf-mode");
    docPage.classList.add("infographic-mode");
    // Hide the parent verse-translation-pill when showing HTML iframe content
    const _vtPill = document.getElementById("verse-translation-pill");
    if (_vtPill) _vtPill.style.display = "none";
    document.getElementById("home-page").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("doc-page").style.display = "";
    const _vcPage2 = document.getElementById("video-cat-page");
    if (_vcPage2) _vcPage2.style.display = "none";
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
    // For very large documents (>5000 lines), split more aggressively
    // at h3 headings too to prevent main-thread jank.
    const isLargeDoc = md.length > 100000; // ~5000+ lines
    const splitPattern = isLargeDoc ? /(?=\n#{1,3} )/ : /(?=\n#{1,2} )/;
    const sections = md.split(splitPattern);

    // First section → paint it now
    contentEl.innerHTML = sanitize(marked.parse(sections[0]));
    document.getElementById("home-page").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("doc-page").style.display = "";
    const _vcPage3 = document.getElementById("video-cat-page");
    if (_vcPage3) _vcPage3.style.display = "none";
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

    // Remaining sections — append one at a time in idle time.
    // Store a flush function so TOC link clicks can force-render
    // all pending sections if the user clicks before rendering completes.
    let _nextSectionIdx = 1;
    let _renderingComplete = false;

    function flushPendingSections() {
      if (_renderingComplete) return;
      for (let i = _nextSectionIdx; i < sections.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = sanitize(marked.parse(sections[i]));
        contentEl.appendChild(div);
      }
      _nextSectionIdx = sections.length;
      _renderingComplete = true;
    }

    // Process links on the first (TOC) section immediately so
    // anchor clicks work before progressive rendering finishes.
    // The click handler will force-render remaining sections if
    // the target heading hasn't been rendered yet.
    processLinks(contentEl, filePath, flushPendingSections);

    // Progressively render remaining sections during idle time
    for (let i = 1; i < sections.length; i++) {
      if (_renderingComplete) break; // already flushed by a link click
      await idle(() => {
        if (_renderingComplete) return; // flushed while waiting
        const div = document.createElement("div");
        div.innerHTML = sanitize(marked.parse(sections[i]));
        contentEl.appendChild(div);
        _nextSectionIdx = i + 1;
      });
    }
    _renderingComplete = true;

    // Re-process links on all newly rendered sections
    processLinks(contentEl, filePath, null);

    // Embed YouTube and Google Drive video links as inline players
    wireVideoEmbeds(contentEl);

    // Wire up Bible verse references for translation comparison
    wireVerseReferences(contentEl);

    // Build floating table of contents from headings
    buildTOC();

    // Track reading progress
    trackReadingProgress(filePath);
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

/** Wire up in-page anchors, external links, and internal .md links.
 *  @param {Function|null} flushFn — if provided, called to force-render
 *    all pending progressive sections when an anchor target is not yet in the DOM.
 */
function processLinks(contentEl, filePath, flushFn) {
  contentEl.querySelectorAll("a").forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href) return;
    // Skip links that already have a click handler attached
    if (anchor.dataset.linked) return;
    anchor.dataset.linked = "1";

    // In-page anchor (e.g. TOC → #the-7-day-week-cycle)
    if (href.startsWith("#")) {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        let target = findAnchorTarget(href.slice(1));
        // If the target isn't in the DOM yet, force-render all pending sections
        if (!target && flushFn) {
          flushFn();
          target = findAnchorTarget(href.slice(1));
        }
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
    // Separate any #fragment (e.g. #search=...) from the file path
    const hashIdx = resolved.indexOf("#");
    const resolvedFile = hashIdx >= 0 ? resolved.substring(0, hashIdx) : resolved;
    const resolvedFragment = hashIdx >= 0 ? resolved.substring(hashIdx) : "";
    const targetItem = ALL_ITEMS.find(
      (i) => normalise(i.file) === normalise(resolvedFile),
    );
    if (targetItem) {
      anchor.href = "#";
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        loadDocument(targetItem.file, resolvedFragment);
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

/* ── Nav Search — handled in initApp() ────────────────────── */

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
  // Don't intercept arrow keys when the user is typing in an input or textarea
  const tag = document.activeElement?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
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
  // NT-only link-out translations (open Bible Gateway in a new tab)
  { id: "dlnt", label: "DLNT", desc: "Disciples\u2019 Literal New Testament (NT only) \u2014 opens Bible Gateway", source: "biblegateway", ntOnly: true },
];

/* ── Bible Gateway link-out helpers ──────────────────────── */

/**
 * NT book names/abbreviations used to validate NT-only translations.
 */
const NT_BOOK_NAMES = new Set([
  "matthew","mark","luke","john","acts","romans",
  "1 corinthians","2 corinthians","galatians","ephesians","philippians","colossians",
  "1 thessalonians","2 thessalonians","1 timothy","2 timothy","titus","philemon",
  "hebrews","james","1 peter","2 peter","1 john","2 john","3 john","jude","revelation",
  // common abbreviations
  "matt","mat","mk","lk","jn","rom","cor","gal","eph","phil","col","thess","tim",
  "heb","jas","pet","rev",
]);

function isNtReference(reference) {
  const m = reference.match(/^((?:\d\s+)?[A-Za-z]+)/);
  if (!m) return false;
  return NT_BOOK_NAMES.has(m[1].trim().toLowerCase());
}

function buildBibleGatewayUrl(reference, version) {
  return "https://www.biblegateway.com/passage/?search="
    + encodeURIComponent(reference) + "&version=" + encodeURIComponent(version);
}

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
 * Handles comma-separated verses like "Isaiah 56:2,6-7" by using the
 * widest range (first verse to last verse mentioned).
 */
function toApiBiblePassageId(reference) {
  const ref = reference.trim();
  // Match: "Book Chapter:VerseStart[-VerseEnd][,VerseStart[-VerseEnd]]*"
  const m = ref.match(/^(.+?)\s+(\d+)\s*:\s*(\d+)(?:\s*[-–]\s*(\d+))?/);
  if (!m) return null;

  const bookRaw = m[1].trim().toLowerCase().replace(/\.$/, "");
  const chapter = m[2];
  const verseStart = m[3];
  let verseEnd = m[4] || null;

  const code = BOOK_TO_API_CODE[bookRaw];
  if (!code) return null;

  // If there are comma-separated additional verse numbers, find the last one
  // to create a single range spanning the entire reference.
  // e.g. "Isaiah 56:2,6-7" → ISA.56.2-ISA.56.7
  const commaMatches = ref.match(/,\s*(\d+)(?:\s*[-–]\s*(\d+))?/g);
  if (commaMatches) {
    for (const cm of commaMatches) {
      const parts = cm.match(/(\d+)(?:\s*[-–]\s*(\d+))?/);
      if (parts) {
        const lastNum = parts[2] || parts[1];
        if (!verseEnd || parseInt(lastNum) > parseInt(verseEnd)) {
          verseEnd = lastNum;
        }
      }
    }
  }

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
    if (res.status === 429) throw new Error("api.bible error (429)");
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
 * Throttled fetch queue — limits concurrent requests to bible-api.com
 * to avoid rate limiting on pages with many verse references.
 */
const _fetchQueue = {
  maxConcurrent: 4,
  active: 0,
  queue: [],
  enqueue(fn) {
    return new Promise((resolve, reject) => {
      const run = () => {
        this.active++;
        fn().then(resolve, reject).finally(() => {
          this.active--;
          if (this.queue.length > 0) {
            const next = this.queue.shift();
            next();
          }
        });
      };
      if (this.active < this.maxConcurrent) {
        run();
      } else {
        this.queue.push(run);
      }
    });
  }
};

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
 * and letter-suffixed sub-verse references like Daniel 7:1b, Daniel 2:39a
 */
const VERSE_REF_REGEX = new RegExp(
  "\\b((?:" + BIBLE_BOOKS_PATTERN + ")\\.?\\s*\\d+\\s*:\\s*\\d+[a-f]?(?:\\s*[-–]\\s*\\d+[a-f]?)?(?:\\s*,\\s*\\d+[a-f]?(?:\\s*[-–]\\s*\\d+[a-f]?)?)*)(?=[^a-zA-Z]|$)",
  "gi"
);

/**
 * Strip sub-verse letter suffixes (a–f) from a reference before
 * sending to Bible APIs, which don't understand them.
 * e.g. "Daniel 7:1b" → "Daniel 7:1", "Daniel 2:39a" → "Daniel 2:39"
 */
function stripVerseSuffix(ref) {
  return ref.replace(/(\d+)[a-f]\b/g, "$1");
}

/**
 * Normalize a Bible reference for bible-api.com.
 * Converts abbreviations to full book names that the API recognizes,
 * and strips trailing periods from abbreviations.
 */
const ABBREV_TO_FULL_NAME = {
  "gen":"Genesis","exo":"Exodus","exod":"Exodus","lev":"Leviticus","num":"Numbers",
  "deut":"Deuteronomy","josh":"Joshua","judg":"Judges","sam":"1 Samuel",
  "kgs":"1 Kings","chr":"1 Chronicles","neh":"Nehemiah","esth":"Esther",
  "psa":"Psalms","ps":"Psalms","psalm":"Psalms","prov":"Proverbs","eccl":"Ecclesiastes",
  "isa":"Isaiah","jer":"Jeremiah","lam":"Lamentations","ezek":"Ezekiel","dan":"Daniel",
  "hos":"Hosea","mic":"Micah","zech":"Zechariah","mal":"Malachi",
  "matt":"Matthew","mat":"Matthew","mk":"Mark","lk":"Luke","jn":"John",
  "rom":"Romans","cor":"1 Corinthians","gal":"Galatians","eph":"Ephesians",
  "phil":"Philippians","col":"Colossians","thess":"1 Thessalonians",
  "tim":"1 Timothy","heb":"Hebrews","jas":"James","pet":"1 Peter","rev":"Revelation",
  // With numbers prefixed
  "1 sam":"1 Samuel","2 sam":"2 Samuel","1 kgs":"1 Kings","2 kgs":"2 Kings",
  "1 chr":"1 Chronicles","2 chr":"2 Chronicles",
  "1 cor":"1 Corinthians","2 cor":"2 Corinthians",
  "1 thess":"1 Thessalonians","2 thess":"2 Thessalonians",
  "1 tim":"1 Timothy","2 tim":"2 Timothy",
  "1 pet":"1 Peter","2 pet":"2 Peter",
  "1 jn":"1 John","2 jn":"2 John","3 jn":"3 John",
};

function normalizeReferenceForBibleApi(ref) {
  // Strip trailing period from book abbreviation (e.g. "Rev. 14:9" → "Rev 14:9")
  let cleaned = ref.replace(/^(\d?\s*[A-Za-z]+)\.\s*/, "$1 ");
  // Normalize whitespace around commas and dashes in verse numbers
  // "Psalm 119:142, 151" → "Psalm 119:142,151"
  cleaned = cleaned.replace(/\s*,\s*/g, ",").replace(/\s*[-–]\s*/g, "-");
  // Collapse multiple spaces to single space
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  // Extract book name portion (everything before the chapter:verse)
  const m = cleaned.match(/^(.+?)\s+(\d+\s*:\s*.+)$/);
  if (!m) return cleaned;
  const bookRaw = m[1].trim().toLowerCase();
  const rest = m[2];
  // Look up the abbreviation in our mapping
  const fullName = ABBREV_TO_FULL_NAME[bookRaw];
  if (fullName) {
    return fullName + " " + rest;
  }
  return cleaned;
}

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

  // Auto-expand all verse references in the currently selected translation
  if (count > 0) {
    const sel = document.getElementById("verse-default-translation");
    if (sel) expandAllInlineVerses(container, sel.value);
  }
}

/**
 * Expand all .verse-ref elements in a container to show the verse text
 * inline in the given translation. Creates or updates a .verse-inline-text
 * block after each reference.
 */
async function expandAllInlineVerses(container, translationId) {
  if (!container) return;
  const refs = container.querySelectorAll(".verse-ref[data-verse-ref]");
  if (refs.length === 0) return;

  // Give each verse-ref a unique ID so duplicate references each get their own preview
  refs.forEach((el, idx) => {
    if (!el.dataset.verseIdx) el.dataset.verseIdx = String(idx);
  });

  for (const el of refs) {
    const ref = el.dataset.verseRef;
    if (!ref) continue;
    const uid = el.dataset.verseIdx;

    // Find or create the inline preview block for THIS specific occurrence.
    // Use a data-uid lookup to avoid DOM ordering issues when multiple refs share a parent.
    let preview = container.querySelector(`.verse-inline-text[data-uid="${uid}"]`);
    if (!preview) {
      preview = document.createElement("div");
      preview.className = "verse-inline-text";
      preview.dataset.for = ref;
      preview.dataset.uid = uid;
      // Insert after the parent <p> or after the element itself
      const anchor = (el.parentElement && el.parentElement.tagName === "P") ? el.parentElement : el;
      // Find the correct insertion point: after any existing previews that follow the anchor
      let insertAfter = anchor;
      while (insertAfter.nextElementSibling && insertAfter.nextElementSibling.classList.contains("verse-inline-text")) {
        insertAfter = insertAfter.nextElementSibling;
      }
      insertAfter.after(preview);
    }

    // Show loading state
    const tLabel = BIBLE_TRANSLATIONS.find((t) => t.id === translationId)?.label || translationId.toUpperCase();
    preview.innerHTML = `<span class="verse-inline-tag">${escapeHtml(tLabel)}</span> <span class="verse-inline-loading">Loading…</span>`;

    // Fetch and display (don't await each one — fire them in parallel)
    fetchVerse(ref, translationId).then((data) => {
      let text = "";
      if (data.verses && data.verses.length > 0) {
        text = data.verses.map((v) => {
          const num = v.verse ? `${v.verse} ` : "";
          return num + (v.text || "").trim();
        }).join(" ").trim();
      }
      if (!text && data.text) {
        text = data.text.trim();
      }
      if (!text) {
        preview.innerHTML = `<span class="verse-inline-tag">${escapeHtml(tLabel)}</span> <em class="verse-inline-err">Unavailable in this translation</em>`;
        return;
      }
      preview.innerHTML = `<span class="verse-inline-tag">${escapeHtml(tLabel)}</span> ${escapeHtml(text)}`;
      if (data.copyright) {
        preview.innerHTML += ` <span class="verse-inline-copy">${escapeHtml(data.copyright.replace(/<[^>]+>/g, ""))}</span>`;
      }
    }).catch((err) => {
      if (err && err.message === "BIBLEGATEWAY_LINK") {
        preview.innerHTML = `<span class="verse-inline-tag">${escapeHtml(tLabel)}</span>` +
          ` <a href="${err.bgUrl}" target="_blank" rel="noopener" class="verse-inline-link">View on Bible Gateway \u2197</a>`;
        return;
      }
      if (err && err.message === "NT_ONLY") {
        preview.innerHTML = `<span class="verse-inline-tag">${escapeHtml(tLabel)}</span> <em class="verse-inline-err">NT only \u2014 no OT coverage</em>`;
        return;
      }
      preview.innerHTML = `<span class="verse-inline-tag">${escapeHtml(tLabel)}</span> <em class="verse-inline-err">Unavailable in this translation</em>`;
    });
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

  // Strip sub-verse letter suffixes (a/b/c) before calling APIs
  const cleanRef = stripVerseSuffix(reference);

  let data;
  if (t && t.source === "biblegateway") {
    // NT-only check
    if (t.ntOnly && !isNtReference(cleanRef)) {
      throw Object.assign(new Error("NT_ONLY"), { translation: t.label });
    }
    throw Object.assign(
      new Error("BIBLEGATEWAY_LINK"),
      { bgUrl: buildBibleGatewayUrl(cleanRef, t.id.toUpperCase()), translation: t.label }
    );
  } else if (t && t.source === "api.bible") {
    // Copyrighted translations via api.bible — throttled with retry
    const doFetch = () => fetchVerseApiBible(cleanRef, t.bibleId);
    try {
      data = await _fetchQueue.enqueue(doFetch);
    } catch (err) {
      if (err.message && (err.message.includes("api.bible error") || err.name === "TypeError")) {
        // Wait and retry once on transient errors
        await new Promise(r => setTimeout(r, 1500));
        data = await _fetchQueue.enqueue(doFetch);
      } else {
        throw err;
      }
    }
  } else {
    // Free translations via bible-api.com — throttled with retry
    const normalizedRef = normalizeReferenceForBibleApi(cleanRef.trim());
    const apiRef = encodeURIComponent(normalizedRef);
    const url = `https://bible-api.com/${apiRef}?translation=${translationId}`;

    const doFetch = async () => {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Verse not found in this translation.");
        if (res.status === 429) throw new Error("RATE_LIMITED");
        throw new Error(`API error (${res.status})`);
      }
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      return json;
    };

    // Use throttled queue with one retry on rate-limit or network error
    try {
      data = await _fetchQueue.enqueue(doFetch);
    } catch (err) {
      if (err.message === "RATE_LIMITED" || err.name === "TypeError") {
        // Wait and retry once
        await new Promise(r => setTimeout(r, 1500));
        data = await _fetchQueue.enqueue(doFetch);
      } else {
        throw err;
      }
    }
  }

  // Validate that we actually got verse text back
  const hasVerseText = (data.verses && data.verses.length > 0 && data.verses.some(v => v.text && v.text.trim()));
  const hasText = data.text && data.text.trim();
  if (!hasVerseText && !hasText) {
    throw new Error("Verse not found in this translation.");
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
    if (err.message === "BIBLEGATEWAY_LINK") {
      errEl.innerHTML =
        `<p style="margin:0 0 12px">The DLNT is not available via a direct text API.</p>` +
        `<a href="${err.bgUrl}" target="_blank" rel="noopener" class="btn-gold" style="display:inline-block;text-decoration:none;padding:8px 16px;border-radius:6px">` +
        `\uD83D\uDCD6\u2009View in DLNT on Bible Gateway \u2197</a>` +
        `<p style="margin:10px 0 0;font-size:11px;color:var(--text-muted)">DLNT covers New Testament books only. Copyright \u00A9 2011 Michael J. Magill.</p>`;
      return;
    }
    if (err.message === "NT_ONLY") {
      errEl.textContent = "The Disciples\u2019 Literal New Testament (DLNT) covers New Testament books only. This reference appears to be from the Old Testament.";
      return;
    }
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

/* ══════════════════════════════════════════════════════════════
   VIDEO LIBRARY
   Reads assets/videos.json and renders category-grouped players
   on the home page and in the sidebar.
   TO ADD VIDEOS: just edit assets/videos.json.
   TO ADD A CATEGORY: add a new object to the top-level array in videos.json.
══════════════════════════════════════════════════════════════ */

/** Loaded video categories — shared between sidebar and page views. */
let _videosData = [];

async function populateVideoSection() {
  let categories = [];
  try {
    const res = await fetch("assets/videos.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    categories = await res.json();
  } catch (err) {
    console.warn("Could not load videos.json:", err);
    return;
  }

  _videosData = categories.filter((c) => c.videos && c.videos.length > 0);

  // ── Home page video section ──────────────────────────────
  const container = document.getElementById("video-library-container");
  if (container) {
    container.innerHTML = "";
    _videosData.forEach((cat, catIdx) => {
      const heading = document.createElement("h3");
      heading.className = "video-category-heading";
      heading.innerHTML = `<span>${cat.icon || "🎬"}</span> ${escapeHtml(cat.category)}`;
      // Make the heading clickable — navigates to the category page
      heading.style.cursor = "pointer";
      heading.title = `View all videos in "${cat.category}"`;
      heading.addEventListener("click", () => showVideoCategory(catIdx));
      container.appendChild(heading);

      const grid = document.createElement("div");
      grid.className = "video-card-grid";
      cat.videos.forEach((v) => grid.appendChild(buildVideoCard(v)));
      container.appendChild(grid);
    });
  }

  const section = document.getElementById("video-library-section");
  if (section) section.style.display = _videosData.length > 0 ? "" : "none";

  // Rebuild the sidebar now that we have video data
  buildSidebar();
}

/** Build a single video card DOM element. */
function buildVideoCard(v) {
  const card = document.createElement("div");
  card.className = "video-card";
  card.innerHTML = `
    <div class="video-card-thumb">
      <img src="https://i.ytimg.com/vi/${escapeHtml(v.youtubeId)}/hqdefault.jpg"
           alt="${escapeHtml(v.title)}" loading="lazy" />
      <div class="video-card-play">▶</div>
    </div>
    <div class="video-card-info">
      <div class="video-card-title">${escapeHtml(v.title)}</div>
      <div class="video-card-desc">${escapeHtml(v.desc || "")}</div>
      <div class="video-card-tags">${(v.tags || []).map((t) => `<span class="video-tag">${escapeHtml(t)}</span>`).join("")}</div>
    </div>
  `;
  card.querySelector(".video-card-thumb").addEventListener("click", () => {
    const thumb = card.querySelector(".video-card-thumb");
    thumb.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${escapeHtml(v.youtubeId)}?autoplay=1&rel=0"
      title="${escapeHtml(v.title)}" allowfullscreen loading="lazy" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
    </iframe>`;
    thumb.classList.add("playing");
  });
  return card;
}

/**
 * Show the video category page for a given category index.
 * Called from sidebar nav items and from the category headings on home page.
 */
function showVideoCategory(catIdx) {
  const cat = _videosData[catIdx];
  if (!cat) return;

  // Hide other views
  document.getElementById("home-page").style.display = "none";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "none";
  document.getElementById("error-state").style.display = "none";
  document.getElementById("video-cat-page").style.display = "";

  // Set heading
  document.getElementById("video-cat-icon").textContent = cat.icon || "🎬";
  document.getElementById("video-cat-title").textContent = cat.category;

  // Build the grid
  const grid = document.getElementById("video-cat-grid");
  grid.innerHTML = "";
  cat.videos.forEach((v) => grid.appendChild(buildVideoCard(v)));

  // Update breadcrumb
  document.getElementById("breadcrumb-section").textContent = "Videos";
  document.getElementById("breadcrumb-sep").style.display = "";
  document.getElementById("breadcrumb-title").textContent = cat.category;

  // Mark active in sidebar
  document.querySelectorAll(".nav-item").forEach((el) => el.classList.remove("active"));
  const navItem = document.querySelector(`.nav-item[data-video-cat="${catIdx}"]`);
  if (navItem) {
    navItem.classList.add("active");
    navItem.scrollIntoView({ block: "nearest" });
  }

  window.scrollTo({ top: 0 });

  // Hide the verse pill (not a document)
  const pill = document.getElementById("verse-translation-pill");
  if (pill) pill.style.display = "none";
}

/* ── Init ─────────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════════════
   B1 — RECOMMENDED STUDY PATH
══════════════════════════════════════════════════════════════ */
const STUDY_PATH = [
  { title: "Daniel 2: The Prophecy of the Kingdoms", file: "Study_guides/Daniel_2_Prophecy_Study_Guide.md" },
  { title: "Daniel 7 & 8: The Kingdoms Revealed", file: "Study_guides/Daniel_7_and_8_The_Kingdoms_Revealed_Study_Guide.md" },
  { title: "Daniel 9 Part 1: The Messiah Foretold", file: "Study_guides/Daniel_9_Prophecy_Messiah_Part_1_Study_Guide.md" },
  { title: "Daniel 9 Part 2: Crucifixion & Resurrection", file: "Study_guides/Daniel_9_Prophecy_Messiah_Part_2_Study_Guide.md" },
  { title: "The Little Horn: Unmasking the Mystery", file: "Study_guides/The_Little_Horn_Complete_Study_Guide.md" },
  { title: "The Other Beast: America in Prophecy", file: "Study_guides/The_Other_Beast_Complete_Study_Guide.md" },
  { title: "The Mark of the Beast", file: "Study_guides/The_Mark_of_the_Beast_Complete_Study_Guide.md" },
  { title: "God's Special Sign: The Sabbath", file: "Study_guides/Gods_Special_Sign_Complete_Study_Guide.md" },
  { title: "Battle at the End — Part 1", file: "Study_guides/Battle_at_the_End_Part_1_Complete_Study_Guide.md" },
  { title: "Battle at the End — Part 2", file: "Study_guides/Battle_at_the_End_Part_2_Complete_Study_Guide.md" },
];

function buildStudyPath() {
  const container = document.getElementById("study-path");
  if (!container) return;
  container.innerHTML = "";

  const readDocs = JSON.parse(localStorage.getItem("readDocs") || "[]");

  STUDY_PATH.forEach((step, i) => {
    if (i > 0) {
      const arrow = document.createElement("span");
      arrow.className = "step-arrow";
      arrow.textContent = "→";
      container.appendChild(arrow);
    }

    const el = document.createElement("div");
    el.className = "study-path-step";
    if (readDocs.includes(step.file)) el.classList.add("completed");
    el.innerHTML = `<span class="step-number">${i + 1}</span><span class="step-title">${escapeHtml(step.title)}</span>`;
    el.addEventListener("click", () => loadDocument(step.file));
    container.appendChild(el);
  });
}

/* ══════════════════════════════════════════════════════════════
   B3 — READING PROGRESS TRACKING
══════════════════════════════════════════════════════════════ */
function trackReadingProgress(filePath) {
  if (!filePath || filePath.endsWith(".html")) return;

  const readDocs = JSON.parse(localStorage.getItem("readDocs") || "[]");
  if (!readDocs.includes(filePath)) {
    readDocs.push(filePath);
    localStorage.setItem("readDocs", JSON.stringify(readDocs));
  }

  localStorage.setItem("lastReadDoc", filePath);
  localStorage.setItem("lastReadTime", Date.now().toString());
}

function saveScrollPosition() {
  const lastDoc = localStorage.getItem("lastReadDoc");
  if (lastDoc && document.getElementById("doc-page").style.display !== "none") {
    localStorage.setItem("scrollPos_" + lastDoc, window.scrollY.toString());
  }
}

function restoreScrollPosition(filePath) {
  const saved = localStorage.getItem("scrollPos_" + filePath);
  if (saved) {
    setTimeout(() => window.scrollTo({ top: parseInt(saved, 10) }), 100);
  }
}

function buildContinueReading() {
  const section = document.getElementById("continue-reading-section");
  const grid = document.getElementById("continue-reading-cards");
  if (!section || !grid) return;

  const lastDoc = localStorage.getItem("lastReadDoc");
  const lastTime = localStorage.getItem("lastReadTime");
  if (!lastDoc || !lastTime) {
    section.style.display = "none";
    return;
  }

  const item = ALL_ITEMS.find((i) => i.file === lastDoc);
  if (!item) {
    section.style.display = "none";
    return;
  }

  const elapsed = Date.now() - parseInt(lastTime, 10);
  const minutes = Math.floor(elapsed / 60000);
  let timeAgo = "just now";
  if (minutes >= 60 * 24) timeAgo = `${Math.floor(minutes / (60 * 24))} day(s) ago`;
  else if (minutes >= 60) timeAgo = `${Math.floor(minutes / 60)} hour(s) ago`;
  else if (minutes > 0) timeAgo = `${minutes} min ago`;

  grid.innerHTML = "";
  const card = document.createElement("div");
  card.className = "topic-card";
  if (item.tagClass) card.dataset.accent = item.tagClass;
  card.innerHTML = `
    <div class="card-icon">${item.icon}</div>
    <div class="card-title">${item.title}</div>
    <div class="card-desc">Last read ${timeAgo}. Click to resume where you left off.</div>
    <span class="card-tag ${item.tagClass || ""}">Continue Reading</span>
  `;
  card.addEventListener("click", () => {
    loadDocument(item.file);
    setTimeout(() => restoreScrollPosition(item.file), 500);
  });
  grid.appendChild(card);
  section.style.display = "";
}

/* ══════════════════════════════════════════════════════════════
   B4 — FLOATING TABLE OF CONTENTS
══════════════════════════════════════════════════════════════ */
let _tocVisible = false;
let _tocScrollHandler = null;

function buildTOC() {
  const contentEl = document.getElementById("doc-content");
  const tocList = document.getElementById("doc-toc-list");
  const tocPanel = document.getElementById("doc-toc");
  const tocToggle = document.getElementById("doc-toc-toggle");

  if (!contentEl || !tocList || !tocPanel || !tocToggle) return;

  const headings = contentEl.querySelectorAll("h2[id], h3[id]");
  tocList.innerHTML = "";

  if (headings.length < 3) {
    tocPanel.classList.remove("visible");
    tocToggle.style.display = "none";
    _tocVisible = false;
    return;
  }

  headings.forEach((h) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent.replace(/^#+\s*/, "");
    if (h.tagName === "H3") a.classList.add("toc-h3");
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const topbarH = document.getElementById("topbar").offsetHeight;
      const targetY = h.getBoundingClientRect().top + window.scrollY - topbarH - 12;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });

  tocToggle.style.display = "block";

  // Highlight active heading on scroll
  if (_tocScrollHandler) window.removeEventListener("scroll", _tocScrollHandler);
  _tocScrollHandler = () => {
    const topbarH = document.getElementById("topbar").offsetHeight + 20;
    let activeId = "";
    headings.forEach((h) => {
      if (h.getBoundingClientRect().top < topbarH + 60) activeId = h.id;
    });
    tocList.querySelectorAll("a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + activeId);
    });
  };
  window.addEventListener("scroll", _tocScrollHandler, { passive: true });
}

function toggleTOC() {
  const tocPanel = document.getElementById("doc-toc");
  if (!tocPanel) return;
  _tocVisible = !_tocVisible;
  tocPanel.classList.toggle("visible", _tocVisible);
}

function hideTOC() {
  const tocPanel = document.getElementById("doc-toc");
  const tocToggle = document.getElementById("doc-toc-toggle");
  if (tocPanel) tocPanel.classList.remove("visible");
  if (tocToggle) tocToggle.style.display = "none";
  _tocVisible = false;
}

/* ══════════════════════════════════════════════════════════════
   B5 — DARK / LIGHT THEME TOGGLE
══════════════════════════════════════════════════════════════ */
function toggleTheme() {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  const btn = document.getElementById("btn-theme-toggle");
  if (btn) btn.textContent = isLight ? "☾" : "☀";
}

function applyStoredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light") {
    document.body.classList.add("light-theme");
    const btn = document.getElementById("btn-theme-toggle");
    if (btn) btn.textContent = "☾";
  }
}

/* ══════════════════════════════════════════════════════════════
   B2 — FULL-TEXT SEARCH
══════════════════════════════════════════════════════════════ */
const _searchIndex = new Map(); // file → { title, section, content }
let _searchIndexBuilt = false;

async function buildSearchIndex() {
  if (_searchIndexBuilt) return;
  _searchIndexBuilt = true;

  for (const item of ALL_ITEMS) {
    if (item.file.endsWith(".html") || item.file.endsWith(".pdf") ||
        item.file.endsWith(".png") || item.file.endsWith(".jpg") || item.file.endsWith(".jpeg")) {
      // Only index markdown files
      continue;
    }
    try {
      const res = await fetch(item.file);
      if (!res.ok) continue;
      const text = await res.text();
      _searchIndex.set(item.file, {
        title: item.title,
        section: item.sectionLabel || "",
        content: text.substring(0, 50000), // cap to prevent memory issues
      });
    } catch {
      // Skip files that can't be fetched
    }
  }
}

function searchContent(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const results = [];

  for (const [file, data] of _searchIndex) {
    const titleMatch = data.title.toLowerCase().includes(q);
    const contentLower = data.content.toLowerCase();
    const contentIdx = contentLower.indexOf(q);

    if (titleMatch || contentIdx >= 0) {
      let snippet = "";
      if (contentIdx >= 0) {
        const start = Math.max(0, contentIdx - 60);
        const end = Math.min(data.content.length, contentIdx + query.length + 80);
        snippet = (start > 0 ? "…" : "") +
          data.content.substring(start, end).replace(/\n/g, " ").trim() +
          (end < data.content.length ? "…" : "");
      }
      results.push({
        file,
        title: data.title,
        section: data.section,
        snippet,
        titleMatch,
      });
    }
  }

  // Title matches first, then content matches
  results.sort((a, b) => (b.titleMatch ? 1 : 0) - (a.titleMatch ? 1 : 0));
  return results.slice(0, 15);
}

function highlightSnippet(snippet, query) {
  if (!snippet || !query) return snippet;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return snippet.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

function showSearchResults(query) {
  const panel = document.getElementById("search-results-panel");
  if (!panel) return;

  if (!query || query.length < 2) {
    panel.classList.remove("visible");
    panel.innerHTML = "";
    return;
  }

  const results = searchContent(query);

  if (results.length === 0) {
    panel.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
    panel.classList.add("visible");
    return;
  }

  panel.innerHTML = results.map((r) => `
    <div class="search-result-item" data-file="${escapeHtml(r.file)}">
      <div class="search-result-title">${escapeHtml(r.title)}</div>
      <div class="search-result-section">${escapeHtml(r.section)}</div>
      ${r.snippet ? `<div class="search-result-snippet">${highlightSnippet(escapeHtml(r.snippet), query)}</div>` : ""}
    </div>
  `).join("");

  panel.querySelectorAll(".search-result-item").forEach((el) => {
    el.addEventListener("click", () => {
      const file = el.dataset.file;
      if (file) {
        panel.classList.remove("visible");
        document.getElementById("nav-search").value = "";
        if (window.innerWidth <= 900) closeMobileSidebar();
        loadDocument(file);
      }
    });
  });

  panel.classList.add("visible");
}

/* ══════════════════════════════════════════════════════════════
   INIT APP
══════════════════════════════════════════════════════════════ */
async function initApp() {
  applyStoredTheme();
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
  try {
    await populateVideoSection();
  } catch (error) {
    console.warn("Could not load video library:", error);
  }
  buildSidebar();
  buildHomeCards();
  buildStudyPath();
  buildContinueReading();
  showHome();

  // Build full-text search index in background
  requestIdleCallback ? requestIdleCallback(() => buildSearchIndex()) : setTimeout(buildSearchIndex, 2000);

  // Enhanced search — full-text when index is ready, title-only otherwise
  let searchDebounce = null;
  document.getElementById("nav-search").addEventListener("input", function () {
    const q = this.value.trim();
    // Always filter sidebar items by title
    const qLower = q.toLowerCase();
    document.querySelectorAll(".nav-item").forEach((el) => {
      const title = el.querySelector(".nav-item-title").textContent.toLowerCase();
      el.classList.toggle("hidden", q.length > 0 && !title.includes(qLower));
    });
    if (q.length > 0) {
      document.querySelectorAll(".nav-section").forEach((section) => {
        const hasVisible = [...section.querySelectorAll(".nav-item")].some(
          (el) => !el.classList.contains("hidden"),
        );
        section.classList.toggle("collapsed", !hasVisible);
      });
    }
    // Full-text search with debounce
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => showSearchResults(q), 200);
  });

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".sidebar-search")) {
      const panel = document.getElementById("search-results-panel");
      if (panel) panel.classList.remove("visible");
    }
  });

  // Save scroll position periodically
  let scrollSaveTimer = null;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollSaveTimer);
    scrollSaveTimer = setTimeout(saveScrollPosition, 500);
  }, { passive: true });

  // When the pill dropdown changes, keep everything in sync.
  document.getElementById("verse-default-translation")?.addEventListener("change", (e) => {
    const newTranslation = e.target.value;
    const contentEl = document.getElementById("doc-content");
    if (contentEl) expandAllInlineVerses(contentEl, newTranslation);
    const overlay = document.getElementById("verse-modal-overlay");
    const isOpen = overlay && overlay.classList.contains("active");
    if (isOpen) {
      const tabsEl = document.getElementById("verse-modal-tabs");
      tabsEl?.querySelectorAll(".vm-tab").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.translation === newTranslation);
      });
      const ref = document.getElementById("verse-modal-ref")?.textContent;
      if (ref) loadVerseInModal(ref, newTranslation);
    }
  });
}

initApp();
