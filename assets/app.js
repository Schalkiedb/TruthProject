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
      {
        title: "Bible Symbols Chart",
        file: "Study_guides/Bible_Symbols_Chart.md",
        icon: "🧭",
        tag: "Reference",
        tagClass: "blue",
        desc: "A quick-reference chart of core prophetic Bible symbols and their scriptural meanings for faster study and cross-checking.",
      },
      {
        title: "When the Spirit Is Withdrawn",
        file: "Study_guides/spirit-withdrawn.html",
        icon: "🕯️",
        tag: "Warning",
        tagClass: "red",
        desc: "A focused study on the progressive withdrawal of God's Spirit, prophetic warning signs, and practical spiritual preparation for the closing scenes.",
      },
      {
        title: "The Sabbath — A Delight, Not a Burden",
        file: "Study_guides/sabbath-keeping-guide.html",
        icon: "✨",
        tag: "Sabbath",
        tagClass: "green",
        desc: "A practical and devotional guide to Sabbath-keeping — what to do, how to prepare, and how to experience the Sabbath as the rest, delight, and holy time God intended.",
      },
      {
        title: "Sanctify — The Sabbath as God's Sign of Sanctification",
        file: "Study_guides/sanctify-sabbath-sanctification.html",
        icon: "✦",
        tag: "Sabbath",
        tagClass: "green",
        desc: "A deep word study on \"sanctify\" in Hebrew and Greek — how the Sabbath was the first thing God sanctified, and how it remains His covenant sign of sanctification in the life of the believer.",
      },
      {
        title: "Growing in Love for God — Expanded Edition",
        file: "Study_guides/growing-closer-to-god-expanded.html",
        icon: "❤️",
        tag: "Spiritual Growth",
        tagClass: "blue",
        desc: "An expanded devotional study on cultivating a deep, personal love for God — covering prayer, Scripture, surrender, and the disciplines that draw the soul closer to the Father.",
      },
      {
        title: "How Do I Know I Am Saved? — Assurance of Salvation",
        file: "Study_guides/salvation_assurance.html",
        icon: "🛡️",
        tag: "Spiritual Growth",
        tagClass: "blue",
        desc: "A biblical study on the assurance of salvation — how to know you are saved, the evidence of true conversion, the difference between presumption and genuine faith, and the security of the believer in Christ.",
      },
      {
        title: "When You Choose Obedience — God's Promises for the Tried & Faithful",
        file: "Study_guides/promises-obedience-trials.html",
        icon: "🌟",
        tag: "Promises",
        tagClass: "green",
        desc: "God's specific promises for those who choose obedience under trial — His presence, strength, provision, and protection for the faithful who stand firm when the cost is real.",
      },
      {
        title: "Galatians & the Two Laws — The Ceremonial Law, the Moral Law, and Grace",
        file: "Study_guides/galatians-two-laws.html",
        icon: "⚖️",
        tag: "Apologetics",
        tagClass: "blue",
        desc: "Paul's letter to the Galatians targets the Mosaic ceremonial ordinances — not the eternal moral law. A precision study of what Paul actually abolished, what he upheld, and how Galatians is most commonly misread to abolish the Sabbath.",
      },
      {
        title: "Sacred Union — A Biblical Marriage Guide",
        file: "Study_guides/marriage-guide.html",
        icon: "💍",
        tag: "Family",
        tagClass: "blue",
        desc: "A biblical and Spirit of Prophecy guide to Christian marriage — roles, covenant, communication, intimacy, and the spiritual principles that make a marriage reflect the relationship between Christ and His church.",
      },
      {
        title: "Speaking Truth in Love — Communication & the Unbelieving Spouse",
        file: "Study_guides/communication-unbelieving-spouse.html",
        icon: "🕊️",
        tag: "Family",
        tagClass: "blue",
        desc: "What the Bible and Ellen G. White teach about communication in marriage — destructive and healing patterns, navigating conflict, and walking faithfully when your spouse does not share your faith.",
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
        title: "Scripture Index — Find Studies by Bible Book",
        file: "__scripture-index__",
        icon: "📇",
        tag: "Study Tool",
        tagClass: "green",
        desc: "Every Bible book cited across the library, with the studies that reference it — trace any prophecy from Genesis to Revelation straight into the relevant study guides.",
      },
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
      {
        title: "The Measuring Reed — Denominations Weighed Against Scripture",
        file: "End_Time_Church/denominations_vs_bible_guide.html",
        icon: "⚖️",
        tag: "End Times",
        tagClass: "red",
        desc: "A comparative study measuring the major Christian denominations against the plain teaching of Scripture — doctrine by doctrine — exposing where tradition has replaced the Bible and what the faithful remnant is called to hold fast.",
      },
      {
        title: "When the State Forces Worship — A Historical & Prophetic Reference",
        file: "Sign_of_the_times/state-forced-worship-guide.html",
        icon: "🔥",
        tag: "End Times",
        tagClass: "red",
        desc: "Every time a state has compelled worship it has legislated on the first tablet of the law — from Nebuchadnezzar's golden image through the Edict of Decius, Council of Laodicea Canon 29, Theodosius, and Charlemagne's Sunday laws. With an interactive timeline, the resisters in each era, the 'son of perdition' and Mystery Babylon studies, and the verified O'Brien quotation.",
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
      {
        title: "Birds Forbidden Foods Guide",
        file: "Modern diet and disease/birds-forbidden-foods-guide.html",
        icon: "🐦",
        tag: "Health",
        tagClass: "green",
        desc: "A practical guide to biblical clean and unclean distinctions in bird categories, with scriptural references and health implications.",
      },
      {
        title: "The Forbidden Land — Complete Land Animal Dietary Guide",
        file: "Modern diet and disease/land-forbidden-foods-guide-v2.html",
        icon: "🐄",
        tag: "Health",
        tagClass: "green",
        desc: "The complete guide to all Levitically prohibited land animals — every biblically unclean creature identified, with scientific and toxicological context for each category.",
      },
      {
        title: "Ocean Forbidden Foods Guide",
        file: "Modern diet and disease/ocean-forbidden-foods-guide.html",
        icon: "🐟",
        tag: "Health",
        tagClass: "green",
        desc: "A clear reference for seafood categories in biblical dietary law, including fins-and-scales distinctions and modern health data.",
      },
      {
        title: "Pork Study Guide",
        file: "Modern diet and disease/pork-study-guide.html",
        icon: "🐷",
        tag: "Health",
        tagClass: "green",
        desc: "A dedicated study on pork in Scripture and science, covering biblical prohibitions, disease vectors, and toxicology findings.",
      },
      {
        title: "Shellfish Study Guide",
        file: "Modern diet and disease/shellfish-study-guide.html",
        icon: "🦐",
        tag: "Health",
        tagClass: "green",
        desc: "An evidence-based guide to shellfish risks and biblical dietary boundaries, with references from microbiology and food safety research.",
      },
      {
        title: "The Dietary-Pandemic Correlation",
        file: "Modern diet and disease/unclean-animals-pandemic-correlation.html",
        icon: "🦠",
        tag: "Health",
        tagClass: "red",
        desc: "A scientific study of the documented link between unclean animal consumption and pandemic disease emergence — from SARS to COVID-19, showing how biblical dietary law aligns with modern epidemiology.",
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

/* Source documents too large for GitHub (>100 MB per-file limit) are
   hosted on Google Drive (view access for anyone with the link) and
   open in a new tab. Folder:
   https://drive.google.com/drive/folders/1KFwulHXlwJGCsqqax-iYDmuIEf7fJwox */
/* Source documents over the 60 MB threshold in
   scripts/generate_source_manifest.py. These are not committed to the repo —
   they live in the shared Google Drive folder and open in a new tab. Where a
   direct per-file Drive link is known it is used; otherwise the entry points
   at the shared folder below. Keep in step with .gitignore. */
const SOURCE_DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1KFwulHXlwJGCsqqax-iYDmuIEf7fJwox?usp=sharing";

const EXTERNAL_SOURCE_DOCS = [
  {
    title: "Quote 52 - The Catholic Encyclopedia (1913, full volume)",
    file: "https://drive.google.com/file/d/1VVlRREvaSQlhlaDMbRU-egVVporgWZKF/view",
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "Primary Catholic source document (163 MB) — hosted on Google Drive; opens in a new tab.",
  },
  {
    title: "Sabbath History (complete volume)",
    file: "https://drive.google.com/file/d/108yf2w-o-LOPUWvfXx0s4KdLUfByoZ2Z/view",
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "Primary source document (205 MB) — hosted on Google Drive; opens in a new tab.",
  },
  {
    title:
      "Protestant Quote 36 - Jeremy Taylor, Ductor Dubitantium (complete volume)",
    file: SOURCE_DRIVE_FOLDER,
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "Bishop Jeremy Taylor's Ductor Dubitantium, containing the Sec. 51 and 59 admissions that the Lord's Day 'did not succeed in the place of the Sabbath' and was 'merely of Ecclesiastical institution' (133 MB) — hosted on Google Drive; opens in a new tab.",
  },
  {
    title: "Quote 49 - Patrologia Cursus Completus, Vol. 143 (complete volume)",
    file: "https://drive.google.com/file/d/1p3h-rXtiT_7m5nTdSoWtqUPLv-sQVZ9S/view",
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "Migne's Patrologia Latina Vol. 143, col. 937 (81 MB) — hosted on Google Drive; opens in a new tab. The cited column is also available as a page image in the repository.",
  },
  {
    title:
      "The Catholic Educator - A Library of Catholic Instruction and Devotion",
    file: "https://drive.google.com/file/d/1E8cmHBs2pcu6VtEVQDo_i72FdsXWvFoM/view",
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "Contains the claim that the Pope can change divine law (79 MB) — hosted on Google Drive; opens in a new tab.",
  },
  {
    title:
      "Early Church Quote 4 - Patrologiae Cursus Completus, Graeca Vol. 23 (complete volume)",
    file: SOURCE_DRIVE_FOLDER,
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "Eusebius in Migne's Patrologia Graeca Vol. 23, cols. 1171–1172 (65 MB) — hosted on Google Drive; opens in a new tab. The cited columns are also available as a page image in the repository.",
  },
  {
    title:
      "Protestant Quote 57 - Schaff-Herzog, A Religious Encyclopaedia, art. “Sunday”",
    file: SOURCE_DRIVE_FOLDER,
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "The Schaff-Herzog article stating that no regulations for Sunday observance are laid down in the New Testament, “nor, indeed, is its observance even enjoined” (71 MB) — hosted on Google Drive; opens in a new tab.",
  },
  {
    title:
      "Protestant Quote 61 - Charles Hodge, Systematic Theology, Vol. 3 (complete volume)",
    file: SOURCE_DRIVE_FOLDER,
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "Princeton's Systematic Theology, Vol. 3, pp. 321–348 on the origin and perpetual obligation of the Sabbath (106 MB) — hosted on Google Drive; opens in a new tab.",
  },
  {
    title:
      "Quote 25 - The Faith of Millions, 6th edition 1938 (complete volume)",
    file: SOURCE_DRIVE_FOLDER,
    icon: "☁️",
    tag: "Drive PDF",
    tagClass: "blue",
    desc: "John A. O'Brien's The Faith of Millions, p. 147 — the 'Saturday, not Sunday' admission (60 MB) — hosted on Google Drive; opens in a new tab. The 1974 edition page image remains in the repository.",
  },
];

function isExternalUrl(filePath) {
  return /^https?:\/\//i.test(String(filePath));
}

/* Large PDFs that still ship via GitHub but have a Google Drive fallback for
   slow connections or if GitHub serving fails. Documents over the 60 MB
   threshold are not in the repo at all — they belong in EXTERNAL_SOURCE_DOCS
   above, not here. */
const DRIVE_FALLBACKS = {
  "Supporting Documents/Quote_35-Sunday_Visitor_1950-02-05.pdf":
    "https://drive.google.com/file/d/1tezFOZcQwEm1aRSdr2uPbzJeDZmjxvFU/view",
};

/** Show/hide the "also on Google Drive" banner above the PDF viewer. */
function updateDriveFallbackBanner(filePath) {
  let banner = document.getElementById("drive-fallback-banner");
  const driveUrl = DRIVE_FALLBACKS[filePath];
  if (!driveUrl) {
    if (banner) banner.style.display = "none";
    return;
  }
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "drive-fallback-banner";
    const iframe = document.getElementById("doc-iframe");
    iframe.parentNode.insertBefore(banner, iframe);
  }
  banner.innerHTML =
    `☁️ Large document. Slow to load or not displaying? ` +
    `<a href="${driveUrl}" target="_blank" rel="noopener noreferrer">Open it on Google Drive ↗</a>`;
  banner.style.display = "";
}

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

  const localItems = sourceFiles.map((filePath) => {
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

  // Merge in Drive-hosted oversized documents, keeping natural title order
  sourceSection.items = [...localItems, ...EXTERNAL_SOURCE_DOCS].sort((a, b) =>
    naturalSortCompare(a.title, b.title),
  );

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
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-expanded", "false");
    header.innerHTML = `<span>${section.icon} ${section.section}</span><span class="section-chevron" aria-hidden="true">▾</span>`;
    const toggleSection = () => {
      const collapsed = sectionEl.classList.toggle("collapsed");
      header.setAttribute("aria-expanded", String(!collapsed));
    };
    header.addEventListener("click", toggleSection);
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSection(); }
    });

    // Start all sections collapsed — user expands what they need
    sectionEl.classList.add("collapsed");

    const itemsEl = document.createElement("div");
    itemsEl.className = "nav-section-items";

    section.items.forEach((item) => {
      const navItem = document.createElement("div");
      navItem.className = "nav-item";
      navItem.dataset.file = item.file;
      navItem.setAttribute("role", "link");
      navItem.setAttribute("tabindex", "0");
      navItem.innerHTML = `<span class="nav-item-icon" aria-hidden="true">${item.icon}</span><span class="nav-item-title">${item.title}</span>`;
      const openItem = () => {
        if (window.innerWidth <= 900) closeMobileSidebar();
        loadDocument(item.file);
      };
      navItem.addEventListener("click", openItem);
      navItem.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openItem(); }
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
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-expanded", "false");
    header.innerHTML = `<span>🎬 Video Library</span><span class="section-chevron" aria-hidden="true">▾</span>`;
    const toggleVideoSection = () => {
      const collapsed = sectionEl.classList.toggle("collapsed");
      header.setAttribute("aria-expanded", String(!collapsed));
    };
    header.addEventListener("click", toggleVideoSection);
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleVideoSection(); }
    });
    sectionEl.classList.add("collapsed");

    const itemsEl = document.createElement("div");
    itemsEl.className = "nav-section-items";

    _videosData.forEach((cat, idx) => {
      const navItem = document.createElement("div");
      navItem.className = "nav-item";
      navItem.dataset.videoCat = idx;
      navItem.setAttribute("role", "link");
      navItem.setAttribute("tabindex", "0");
      navItem.innerHTML = `<span class="nav-item-icon" aria-hidden="true">${cat.icon || "🎬"}</span><span class="nav-item-title">${escapeHtml(cat.category)} <span class="nav-video-count">${cat.videos.length}</span></span>`;
      const openCat = () => {
        if (window.innerWidth <= 900) closeMobileSidebar();
        showVideoCategory(idx);
      };
      navItem.addEventListener("click", openCat);
      navItem.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCat(); }
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
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.innerHTML = `
        <div class="card-icon" aria-hidden="true">${item.icon}</div>
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.desc}</div>
        <span class="card-tag ${item.tagClass || ""}">${item.tag}</span>
      `;
      card.addEventListener("click", () => loadDocument(item.file));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); loadDocument(item.file); }
      });

      // Show read-progress badge if this guide has been opened before
      const readDocs = JSON.parse(localStorage.getItem("readDocs") || "[]");
      if (readDocs.includes(item.file)) {
        card.classList.add("card-read");
        const badge = document.createElement("div");
        badge.className = "card-read-badge";
        badge.innerHTML = `✓ Read<button class="clear-read-btn" title="Clear read status" aria-label="Clear read status">×</button>`;
        badge.querySelector(".clear-read-btn").addEventListener("click", (e) => {
          e.stopPropagation(); // don't open the document
          clearReadStatus(item.file);
        });
        card.appendChild(badge);
      }

      grid.appendChild(card);
    });
  });

  // Activate scroll-reveal for card sections and staggered card entrance
  requestAnimationFrame(() => initScrollReveal());
}

/* ── Deep linking (shareable URLs / refresh-safe) ─────────────
   Every document gets a #doc=<path> hash so links can be shared,
   the browser back/forward buttons work, and a refresh returns
   the reader to the same study. Legacy "#<path>" links (used by
   prophecy_map.html) are also understood. */
/* Documents are addressed as "?doc=<path>" so each study has a real,
   crawlable URL that can appear in sitemap.xml — search engines do not
   index "#fragment" variants as separate pages. Legacy "#doc=<path>"
   and bare "#<path>" links (shared links, bookmarks, prophecy_map.html)
   are still understood and are upgraded to the query form on arrival. */
function resolveDocPath(raw) {
  if (!raw) return null;
  const path = raw.startsWith("doc=") ? raw.slice(4) : raw;
  if (!path) return null;
  const item = ALL_ITEMS.find((i) => normalise(i.file) === normalise(path));
  return item ? item.file : null;
}

function parseDocHash() {
  let raw = "";
  try {
    raw = new URLSearchParams(window.location.search || "").get("doc") || "";
  } catch { /* no URLSearchParams (very old browser) */ }
  if (raw) return resolveDocPath(raw);
  // Fall back to the legacy hash form.
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (!hash) return null;
  return resolveDocPath(decodeURIComponent(hash));
}

function docUrlFor(filePath) {
  return window.location.pathname + "?doc=" + encodeURIComponent(filePath);
}

function pushDocHash(filePath) {
  const target = docUrlFor(filePath);
  const current = window.location.pathname + window.location.search;
  if (current === target && !window.location.hash) return;
  try { history.pushState(null, "", target); } catch { /* file:// etc. */ }
}

function clearDocHash() {
  if (!window.location.search && !window.location.hash) return;
  try {
    const params = new URLSearchParams(window.location.search || "");
    params.delete("doc");
    const rest = params.toString();
    history.pushState(null, "", window.location.pathname + (rest ? "?" + rest : ""));
  } catch { /* ignore */ }
}

function routeFromLocation() {
  const file = parseDocHash();
  if (file) {
    // A legacy "#doc=" link resolved: rewrite the address bar to the
    // crawlable "?doc=" form without adding a history entry.
    if (window.location.hash && !window.location.search) {
      try { history.replaceState(null, "", docUrlFor(file)); } catch { /* ignore */ }
    }
    loadDocument(file, undefined, { fromHistory: true });
  } else showHome({ fromHistory: true });
}

window.addEventListener("popstate", routeFromLocation);

/* ── Show / Hide States ───────────────────────────────────── */
function showHome(opts) {
  if (!opts || !opts.fromHistory) clearDocHash();
  hideScriptureIndexPage();
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

  // Hide per-document reading UI
  const _homeAddBm = document.getElementById("btn-add-bookmark");
  if (_homeAddBm) _homeAddBm.style.display = "none";
  const _homeMeta = document.getElementById("doc-meta");
  if (_homeMeta) _homeMeta.style.display = "none";
  setReadingProgressVisible(false);

  // Refresh study path (marks completed steps) and continue reading
  buildStudyPath();
  buildContinueReading();

  // Re-trigger scroll reveal for sections that may not have been seen yet
  requestAnimationFrame(() => initScrollReveal());
}

function showLoading() {
  hideScriptureIndexPage();
  const _dfBanner = document.getElementById("drive-fallback-banner");
  if (_dfBanner) _dfBanner.style.display = "none";
  document.getElementById("home-page").style.display = "none";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "flex";
  document.getElementById("error-state").style.display = "none";
  const vcPage = document.getElementById("video-cat-page");
  if (vcPage) vcPage.style.display = "none";
}

function showError(msg) {
  hideScriptureIndexPage();
  document.getElementById("home-page").style.display = "none";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "none";
  document.getElementById("error-state").style.display = "flex";
  const vcPage = document.getElementById("video-cat-page");
  if (vcPage) vcPage.style.display = "none";
  if (msg) document.getElementById("error-msg").textContent = msg;
}

/* ── Load & Render Document ───────────────────────────────── */
async function loadDocument(filePath, fragment, opts) {
  // Externally hosted documents (Google Drive) open in a new tab
  if (isExternalUrl(filePath)) {
    window.open(filePath, "_blank", "noopener,noreferrer");
    return;
  }

  // Scripture Index — an in-app view rather than a document
  if (filePath === SCRIPTURE_INDEX_FILE) {
    if (!opts || !opts.fromHistory) pushDocHash(filePath);
    showScriptureIndex();
    return;
  }

  // Mobile PDF behaviour: open in the browser's native viewer so users can
  // scroll all pages reliably (iOS Safari iframe PDF is often first-page only).
  if (isPdfFile(filePath) && shouldUseNativePdfViewer()) {
    openInNativeViewer(filePath);
    return;
  }

  showLoading();

  // Reset per-document reading UI (repopulated below for markdown docs)
  const docMetaEl = document.getElementById("doc-meta");
  if (docMetaEl) docMetaEl.style.display = "none";
  setReadingProgressVisible(false);
  const addBmBtn = document.getElementById("btn-add-bookmark");
  if (addBmBtn) addBmBtn.style.display = "none";

  // Find index in flat list
  const idx = ALL_ITEMS.findIndex((i) => i.file === filePath);
  currentIndex = idx;

  // Record the document in the URL so it can be shared / refreshed / navigated.
  // Full-page tools navigate away from the SPA, so recording them here would
  // trap the browser back button in a redirect loop — skip them.
  const isFullPageTool =
    filePath === "prophecy_map.html" ||
    filePath === "Sign_of_the_times/signs_of_the_times.html";
  if (idx >= 0 && !isFullPageTool && (!opts || !opts.fromHistory)) pushDocHash(filePath);

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

  // Source files (PDF/images) — iOS opens natively (iframes show black on Safari/iPad)
  if (isPdfFile(filePath) || isSourceImageFile(filePath)) {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
    if (isIOS) {
      const encodedPath = encodeURI(filePath).replace(/#/g, "%23");
      window.open(encodedPath, "_blank", "noopener,noreferrer");
      return;
    }

    updateDriveFallbackBanner(filePath);
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

    // Estimated reading time (~200 words/min) — shown above the document
    if (docMetaEl) {
      const words = (md.match(/\S+/g) || []).length;
      const minutes = Math.max(1, Math.round(words / 200));
      docMetaEl.textContent = `≈ ${minutes} min read · ${words.toLocaleString()} words`;
      docMetaEl.style.display = "";
    }
    setReadingProgressVisible(true);
    if (addBmBtn) addBmBtn.style.display = "";

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

    // Highlight Bible symbols inside quoted passages (hover for meaning)
    annotateBibleSymbols(contentEl, filePath);

    // Give every numbered entry a stable, citable id (#protestant-42) and a
    // click-to-copy link, so a single quote can be shared by URL
    annotateEntryAnchors(contentEl);

    // Build floating table of contents from headings
    buildTOC();

    // Track reading progress
    trackReadingProgress(filePath);

    // A "?doc=…#protestant-42" URL should land on that entry. Internal links
    // pass their own fragment, so only handle the address-bar case here.
    const urlAnchor = !fragment ? (window.location.hash || "").replace(/^#/, "") : "";
    if (urlAnchor && scrollToAnchor(decodeURIComponent(urlAnchor))) {
      // landed on the anchor — don't fight it with the saved scroll position
    } else if (!fragment) {
      // If the user is returning to a guide they previously read, jump them
      // back to approximately where they stopped. Fragment links take priority
      // (the fragment scroll is handled separately for each link type).
      restoreScrollPosition(filePath);
    }
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
      return;
    }

    // Direct source-document link (PDF/image) not tracked in ALL_ITEMS
    // (e.g. "Supporting Documents/Quote N - ....pdf"). Default browser
    // navigation works fine on desktop, but iOS home-screen (standalone
    // PWA) apps render non-HTML navigations as a black screen — escape
    // to Safari with window.open() instead, only on iOS.
    if (isPdfFile(resolvedFile) || isSourceImageFile(resolvedFile)) {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
      if (isIOS) {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          window.open(anchor.href, "_blank", "noopener,noreferrer");
        });
      }
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

/* ── Reading progress bar (markdown documents only) ───────── */
let _progressVisible = false;
let _progressTicking = false;

function setReadingProgressVisible(visible) {
  _progressVisible = visible;
  const bar = document.getElementById("reading-progress");
  if (bar) bar.classList.toggle("visible", visible);
  if (visible) updateReadingProgress();
}

function updateReadingProgress() {
  const fill = document.getElementById("reading-progress-fill");
  if (!fill) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
  fill.style.width = pct + "%";
}

window.addEventListener("scroll", () => {
  if (!_progressVisible || _progressTicking) return;
  _progressTicking = true;
  requestAnimationFrame(() => {
    updateReadingProgress();
    _progressTicking = false;
  });
}, { passive: true });

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

/* ── Citable entry anchors ───────────────────────────────────
   Numbered entries (quotes, objections, doctrines) are the unit people
   cite, but markdown gives <li> elements no id. After each render we
   stamp one on every numbered item: the first word of the enclosing
   section heading plus the number the reader sees — "#protestant-42",
   "#catholic-17". Deriving the prefix from the heading's first word
   keeps ids stable when the rest of the heading text changes (a source
   count, for instance). Documents with no heading above the list fall
   back to "#item-42". */
function entryAnchorPrefix(list) {
  // Only h1–h3 count as sections. Lower levels are sub-groupings inside a
  // section ("Lutheran Additional Quotes", "FURTHER DENOMINATIONAL
  // ADMISSIONS"), and inheriting those would split one numbered run across
  // several prefixes. A long section may put hundreds of siblings between
  // the heading and a later list, so the walk is not capped.
  let node = list.previousElementSibling;
  while (node) {
    if (/^H[1-3]$/.test(node.tagName)) {
      const slug = node.id || slugify(node.textContent || "");
      const word = String(slug).split("-").filter(Boolean)[0];
      if (word && !/^\d+$/.test(word)) return word.toLowerCase();
      return "item";
    }
    node = node.previousElementSibling;
  }
  // Nested or wrapped list: try the level above.
  const parent = list.parentElement;
  if (parent) {
    const outer = parent.closest("ol");
    if (outer && outer !== list) return entryAnchorPrefix(outer);
    if (parent.tagName !== "BODY" && parent.previousElementSibling !== undefined) {
      return entryAnchorPrefix(parent);
    }
  }
  return "item";
}

function annotateEntryAnchors(contentEl) {
  if (!contentEl) return;
  const used = new Set([...contentEl.querySelectorAll("[id]")].map((e) => e.id));
  contentEl.querySelectorAll("ol").forEach((list) => {
    // Only top-level lists carry citable numbering; nested ones restart at 1.
    if (list.parentElement && list.parentElement.closest("li")) return;
    const prefix = entryAnchorPrefix(list);
    const start = parseInt(list.getAttribute("start") || "1", 10) || 1;
    [...list.children].forEach((li, i) => {
      if (li.tagName !== "LI" || li.id) return;
      const number = start + i;
      // Real entries come first in document order and so keep the clean id.
      // Later short lists that restart at 1 (the closing summaries) fall
      // through to a suffixed form rather than stealing "#protestant-1".
      const base = `${prefix}-${number}`;
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      li.id = id;
      li.classList.add("has-entry-anchor");

      const link = document.createElement("a");
      link.className = "entry-anchor";
      link.href = "#" + id;
      link.textContent = "#";
      link.title = `Copy link to ${prefix} ${number}`;
      link.setAttribute("aria-label", link.title);
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url =
          window.location.origin +
          window.location.pathname +
          window.location.search +
          "#" + id;
        try { history.replaceState(null, "", "#" + id); } catch { /* ignore */ }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(
            () => showToast("Link copied"),
            () => showToast(url),
          );
        } else {
          showToast(url);
        }
      });
      li.insertBefore(link, li.firstChild);
    });
  });
}

/** Smooth-scroll to an id, allowing for the fixed topbar. */
function scrollToAnchor(hash) {
  if (!hash) return false;
  const target = findAnchorTarget(hash);
  if (!target) return false;
  const topbar = document.getElementById("topbar");
  const topbarH = topbar ? topbar.offsetHeight : 0;
  const y = target.getBoundingClientRect().top + window.scrollY - topbarH - 12;
  window.scrollTo({ top: y, behavior: "smooth" });
  target.classList.add("anchor-flash");
  setTimeout(() => target.classList.remove("anchor-flash"), 1600);
  return true;
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
  /* -- Local JSON translations (source: "local") --------------
     Read straight from Bible Translations Lookup/ : no API key, no rate
     limit, no token to run out, and faster than a network round trip.
     A remote API is used ONLY for translations with no local copy. -- */
  { id: "kjv",      label: "KJV",    desc: "King James Version (1611)",              source: "local", localDir: "KJV" },
  { id: "akjv",     label: "AKJV",   desc: "American King James Version",            source: "local", localDir: "AKJV" },
  { id: "kj21",     label: "KJ21",   desc: "21st Century King James Version",        source: "local", localDir: "KJ21" },
  { id: "brg",      label: "BRG",    desc: "BRG Bible (KJV colour-letter edition)",  source: "local", localDir: "BRG" },
  { id: "asv",      label: "ASV",    desc: "American Standard Version (1901)",       source: "local", localDir: "ASV" },
  { id: "eng_gnv",  label: "GNV",    desc: "Geneva Bible (1599)",                    source: "local", localDir: "GNV" },
  { id: "web",      label: "WEB",    desc: "World English Bible (Modern)",           source: "local", localDir: "WEB" },
  { id: "ylt",      label: "YLT",    desc: "Young’s Literal Translation",       source: "local", localDir: "YLT" },
  { id: "jub",      label: "JUB",    desc: "Jubilee Bible 2000",                     source: "local", localDir: "JUB" },
  { id: "rsv",      label: "RSV",    desc: "Revised Standard Version",               source: "local", localDir: "RSV" },
  { id: "nrsv",     label: "NRSV",   desc: "New Revised Standard Version",           source: "local", localDir: "NRSV" },
  { id: "nrsvue",   label: "NRSVue", desc: "NRSV Updated Edition",                   source: "local", localDir: "NRSVUE" },
  { id: "esv",      label: "ESV",    desc: "English Standard Version",               source: "local", localDir: "ESV" },
  { id: "esvuk",    label: "ESVUK",  desc: "English Standard Version (Anglicised)",  source: "local", localDir: "ESVUK" },
  { id: "nasb",     label: "NASB",   desc: "New American Standard Bible (2020)",     source: "local", localDir: "NASB" },
  { id: "nasb1995", label: "NASB95", desc: "New American Standard Bible (1995)",     source: "local", localDir: "NASB1995" },
  { id: "lsb",      label: "LSB",    desc: "Legacy Standard Bible",                  source: "local", localDir: "LSB" },
  { id: "nkjv",     label: "NKJV",   desc: "New King James Version",                 source: "local", localDir: "NKJV" },
  { id: "mev",      label: "MEV",    desc: "Modern English Version",                 source: "local", localDir: "MEV" },
  { id: "niv",      label: "NIV",    desc: "New International Version",              source: "local", localDir: "NIV" },
  { id: "nivuk",    label: "NIVUK",  desc: "New International Version (Anglicised)", source: "local", localDir: "NIVUK" },
  { id: "nlt",      label: "NLT",    desc: "New Living Translation",                 source: "local", localDir: "NLT" },
  { id: "csb",      label: "CSB",    desc: "Christian Standard Bible",               source: "local", localDir: "CSB" },
  { id: "net",      label: "NET",    desc: "New English Translation",                source: "local", localDir: "NET" },
  { id: "leb",      label: "LEB",    desc: "Lexham English Bible",                   source: "local", localDir: "LEB" },
  { id: "isv",      label: "ISV",    desc: "International Standard Version",         source: "local", localDir: "ISV" },
  { id: "ehv",      label: "EHV",    desc: "Evangelical Heritage Version",           source: "local", localDir: "EHV" },
  { id: "amp",      label: "AMP",    desc: "Amplified Bible",                        source: "local", localDir: "AMP" },
  { id: "gw",       label: "GW",     desc: "GOD’S WORD Translation",            source: "local", localDir: "GW" },
  { id: "nog",      label: "NOG",    desc: "Names of God Bible",                     source: "local", localDir: "NOG" },
  { id: "nlv",      label: "NLV",    desc: "New Life Version (simple English)",      source: "local", localDir: "NLV" },

  /* -- Remote sources: only translations with no local copy -- */
  // Free via bible-api.com (no API key needed)
  { id: "bbe",    label: "BBE",   desc: "Bible in Basic English",       source: "free" },
  { id: "oeb-us", label: "OEB",   desc: "Open English Bible (Modern)",  source: "free" },
  { id: "darby",  label: "Darby", desc: "Darby Translation",            source: "free" },
  // Free via bible.helloao.org (no API key, no rate limits)
  { id: "BSB",     label: "BSB",  desc: "Berean Standard Bible (2020) — berean.bible", source: "helloao", helloaoId: "BSB" },
  { id: "eng_fbv", label: "FBV",  desc: "Free Bible Version (Modern English)",              source: "helloao", helloaoId: "eng_fbv" },
  // NT-only link-out translations (open Bible Gateway in a new tab)
  { id: "dlnt", label: "DLNT", desc: "Disciples\u2019 Literal New Testament (NT only) \u2014 opens Bible Gateway", source: "biblegateway", ntOnly: true },
];


/* ══════════════════════════════════════════════════════════════
   LOCAL JSON BIBLE LOOKUP

   Layout on disk:
     Bible Translations Lookup/<DIR>/<DIR>_books/<Book>.json
   File shape:
     { "<Book>": { "<chapter>": { "<verse>": "text", ... }, ... },
       "Info":   { "Translation": "KJV", "Copyright": "...", ... } }

   Books are fetched lazily, one file at a time (2 KB - 260 KB, median
   ~33 KB) and cached for the session, so a full translation is never
   downloaded just to show one verse.
══════════════════════════════════════════════════════════════ */

const LOCAL_BIBLE_ROOT = "Bible Translations Lookup";

/* Resolve against app.js's own URL so lookups work from any folder depth. */
const APP_BASE = (function () {
  const s = document.currentScript || document.querySelector('script[src*="app.js"]');
  if (s && s.src) return s.src.replace(/assets\/app\.js.*$/, "");
  return "";
})();

/* Exact on-disk filenames. Two differ from the API book names:
   "Psalm" (not Psalms) and "Song Of Solomon" (capital Of). */
const LOCAL_BOOK_FILES = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
  "1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles",
  "Ezra","Nehemiah","Esther","Job","Psalm","Proverbs","Ecclesiastes",
  "Song Of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel",
  "Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk",
  "Zephaniah","Haggai","Zechariah","Malachi",
  "Matthew","Mark","Luke","John","Acts","Romans",
  "1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians",
  "Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy",
  "Titus","Philemon","Hebrews","James","1 Peter","2 Peter",
  "1 John","2 John","3 John","Jude","Revelation",
];

const LOCAL_BOOK_BY_KEY = (function () {
  const m = {};
  LOCAL_BOOK_FILES.forEach(function (n) { m[n.toLowerCase()] = n; });
  // Aliases the API layer produces, or that readers may write.
  m["psalms"] = "Psalm";
  m["song of songs"] = "Song Of Solomon";
  m["canticles"] = "Song Of Solomon";
  return m;
})();

/* "DIR|Book" -> Promise<{chapters, info, bookName}> */
const _localBookCache = new Map();

function localBibleUrl(dir, file) {
  return APP_BASE
    + encodeURIComponent(LOCAL_BIBLE_ROOT) + "/"
    + encodeURIComponent(dir) + "/"
    + encodeURIComponent(dir + "_books") + "/"
    + encodeURIComponent(file) + ".json";
}

function loadLocalBook(dir, file) {
  const key = dir + "|" + file;
  if (_localBookCache.has(key)) return _localBookCache.get(key);

  const p = fetch(localBibleUrl(dir, file))
    .then(function (res) {
      if (!res.ok) throw new Error("LOCAL_MISSING");
      return res.json();
    })
    .then(function (json) {
      const bookName = Object.keys(json).find(function (k) { return k !== "Info"; });
      if (!bookName || !json[bookName]) throw new Error("LOCAL_MISSING");
      return { chapters: json[bookName], info: json.Info || null, bookName: bookName };
    })
    .catch(function (err) {
      // Never cache a failure, so a transient error can be retried.
      _localBookCache.delete(key);
      throw err;
    });

  _localBookCache.set(key, p);
  return p;
}

/**
 * Parse a reference into { file, chapter, verses } for local lookup.
 * verses === null means "the whole chapter".
 * Returns null for anything this layer should not answer - notably
 * cross-chapter ranges like "Genesis 2:1-3:5" - so the caller can fall back.
 */
function parseLocalReference(ref) {
  const normalized = normalizeReferenceForBibleApi(String(ref).trim());
  const m = normalized.match(/^(.+?)\s+(\d+)(?::(.+))?$/);
  if (!m) return null;

  const file = LOCAL_BOOK_BY_KEY[m[1].trim().toLowerCase()];
  if (!file) return null;

  const chapter = parseInt(m[2], 10);
  if (!chapter) return null;

  const spec = (m[3] || "").trim();
  if (!spec) return { file: file, chapter: chapter, verses: null };
  if (spec.indexOf(":") !== -1) return null;   // cross-chapter range

  const verses = [];
  const parts = spec.split(",");
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    const range = part.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (range) {
      const a = parseInt(range[1], 10), b = parseInt(range[2], 10);
      if (!a || !b || b < a || b - a > 200) return null;
      for (let v = a; v <= b; v++) verses.push(v);
    } else {
      const single = part.match(/^(\d+)$/);
      if (!single) return null;
      verses.push(parseInt(single[1], 10));
    }
  }
  return verses.length ? { file: file, chapter: chapter, verses: verses } : null;
}

/**
 * Look a reference up in the local JSON files.
 * Returns the same shape as the bible-api.com response, so the rest of the
 * verse UI needs no changes.
 */
async function fetchVerseLocal(reference, dir, label) {
  const parsed = parseLocalReference(reference);
  if (!parsed) throw new Error("LOCAL_UNSUPPORTED");

  const book = await loadLocalBook(dir, parsed.file);
  const chap = book.chapters[String(parsed.chapter)];
  if (!chap) throw new Error("Verse not found in this translation.");

  const wanted = parsed.verses || Object.keys(chap)
    .map(Number).filter(function (n) { return n; }).sort(function (a, b) { return a - b; });

  const verses = [];
  for (let i = 0; i < wanted.length; i++) {
    const text = chap[String(wanted[i])];
    if (text) {
      verses.push({
        book_name: book.bookName,
        chapter: parsed.chapter,
        verse: wanted[i],
        text: String(text),
      });
    }
  }
  if (!verses.length) throw new Error("Verse not found in this translation.");

  const out = {
    reference: reference,
    verses: verses,
    text: verses.map(function (v) { return v.text; }).join(" "),
    translation_name: label,
    translation_id: dir,
  };
  // The modal renders data.copyright when present — surface the attribution
  // recorded in each file's Info block.
  if (book.info && book.info.Copyright) {
    out.copyright = label + " — " + book.info.Copyright;
  }
  return out;
}

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

/**
 * Fetch a verse from bible.helloao.org (free, no API key, no rate limits).
 * The API is chapter-based: fetch the whole chapter, extract the target verse(s).
 */
async function fetchVerseHelloAO(reference, helloaoId) {
  // Parse reference: "John 3:16" or "Romans 8:28-30" or "Isaiah 56:2,6-7"
  const m = reference.trim().match(/^(.+?)\s+(\d+)\s*:\s*(\d+)(?:\s*[-\u2013]\s*(\d+))?/);
  if (!m) throw new Error("Could not parse reference for this Bible API.");

  const bookRaw = m[1].trim().toLowerCase().replace(/\.$/, "");
  const chapter  = m[2];
  const verseStart = parseInt(m[3], 10);
  let   verseEnd   = m[4] ? parseInt(m[4], 10) : verseStart;

  // Widen range to cover comma-separated extra references: "Isaiah 56:2,6-7"
  const commaMatches = reference.match(/,\s*(\d+)(?:\s*[-\u2013]\s*(\d+))?/g);
  if (commaMatches) {
    for (const cm of commaMatches) {
      const parts = cm.match(/(\d+)(?:\s*[-\u2013]\s*(\d+))?/);
      if (parts) {
        const last = parseInt(parts[2] || parts[1], 10);
        if (last > verseEnd) verseEnd = last;
      }
    }
  }

  const bookCode = BOOK_TO_API_CODE[bookRaw];
  if (!bookCode) throw new Error("Book not recognised: " + m[1]);

  const url = `https://bible.helloao.org/api/${helloaoId}/${bookCode}/${chapter}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Verse not found in this translation.");
    throw new Error(`Bible API error (${res.status})`);
  }

  const json = await res.json();
  const content = (json.chapter && json.chapter.content) || [];

  // Walk chapter content and collect verse objects in the requested range
  const verses = [];
  for (const item of content) {
    if (item.type === "verse" && item.number >= verseStart && item.number <= verseEnd) {
      // Content array can hold: plain string | {text, poem?} | {lineBreak:true} | {noteId}
      const text = (item.content || []).map(c => {
        if (typeof c === "string") return c;
        if (c && typeof c.text === "string") return c.text;
        if (c && c.lineBreak) return " ";
        return ""; // skip footnote {noteId} objects
      }).join("").trim();
      verses.push({ verse: item.number, text });
    }
  }

  if (verses.length === 0) throw new Error("Verse not found in this translation.");

  const fullText  = verses.map(v => v.text).join(" ");
  const tName     = (json.translation && json.translation.name) || helloaoId;
  const licenseUrl = json.translation && json.translation.licenseUrl;
  const copyright = licenseUrl ? `${tName} — ${licenseUrl}` : tName;

  return { verses, text: fullText, reference, copyright };
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
      while (
        insertAfter.nextElementSibling &&
        (insertAfter.nextElementSibling.classList.contains("verse-inline-text") ||
          insertAfter.nextElementSibling.classList.contains("symbol-toggle-btn") ||
          insertAfter.nextElementSibling.classList.contains("symbol-swap-view"))
      ) {
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
      // Highlight Bible symbols in the fetched verse text.
      // Reset any previous annotation/toggle (translation switch re-renders).
      delete preview.dataset.symbolsAnnotated;
      delete preview.dataset.symbolToggleAttached;
      let sib = preview.nextElementSibling;
      while (sib && (sib.classList.contains("symbol-toggle-btn") || sib.classList.contains("symbol-swap-view"))) {
        const nx = sib.nextElementSibling;
        sib.remove();
        sib = nx;
      }
      annotateBibleSymbols(preview);
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
  if (t && t.source === "local") {
    // Local JSON: no key, no rate limit, no network round trip.
    try {
      data = await fetchVerseLocal(cleanRef, t.localDir, t.label);
    } catch (err) {
      // Only references this layer cannot express (cross-chapter ranges) or a
      // missing file fall back — and to a Bible Gateway link-out rather than an
      // API, so no key is ever needed. localDir doubles as the BG version code.
      if (err && (err.message === "LOCAL_UNSUPPORTED" || err.message === "LOCAL_MISSING")) {
        throw Object.assign(
          new Error("BIBLEGATEWAY_LINK"),
          { bgUrl: buildBibleGatewayUrl(cleanRef, t.localDir), translation: t.label }
        );
      }
      throw err;
    }
  } else if (t && t.source === "biblegateway") {
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
        try {
          data = await _fetchQueue.enqueue(doFetch);
        } catch (err2) {
          // On second failure, fall back to Bible Gateway link-out
          throw Object.assign(
            new Error("BIBLEGATEWAY_LINK"),
            { bgUrl: buildBibleGatewayUrl(cleanRef, t.label), translation: t.label }
          );
        }
      } else if (err.message && err.message.includes("429")) {
        // Quota exceeded — fall back to Bible Gateway link-out immediately
        throw Object.assign(
          new Error("BIBLEGATEWAY_LINK"),
          { bgUrl: buildBibleGatewayUrl(cleanRef, t.label), translation: t.label }
        );
      } else {
        throw err;
      }
    }
  } else if (t && t.source === "helloao") {
    // Free translations via bible.helloao.org (no API key, no rate limits)
    data = await fetchVerseHelloAO(cleanRef, t.helloaoId);
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
 * Build the translation pill dropdown from BIBLE_TRANSLATIONS, so it can never
 * drift out of sync with the registry the way a hand-written list does.
 */
function populateTranslationPill() {
  const sel = document.getElementById("verse-default-translation");
  if (!sel) return;

  const previous = sel.value;
  const localOnes = BIBLE_TRANSLATIONS.filter((t) => t.source === "local");
  const remoteOnes = BIBLE_TRANSLATIONS.filter((t) => t.source !== "local");

  sel.innerHTML = "";
  [["Hosted on site", localOnes], ["Online", remoteOnes]].forEach(([label, list]) => {
    if (!list.length) return;
    const g = document.createElement("optgroup");
    g.label = label;
    list.forEach((t) => {
      const o = document.createElement("option");
      o.value = t.id;
      o.textContent = t.label
        + (t.source === "api.bible" ? " ⚷" : "")
        + (t.source === "biblegateway" ? " ↗" : "");
      o.title = t.desc;
      g.appendChild(o);
    });
    sel.appendChild(g);
  });

  const keep = BIBLE_TRANSLATIONS.some((t) => t.id === previous) ? previous : "nlt";
  sel.value = keep;
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

  // Show modal — remember focus origin, move focus into the dialog
  document._verseModalReturnFocus = document.activeElement;
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  const closeBtn = document.getElementById("verse-modal-close");
  if (closeBtn) closeBtn.focus();

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

    // Highlight Bible symbols in the modal verse text (reset first —
    // the same element is reused across translations/references)
    delete textEl.dataset.symbolsAnnotated;
    delete textEl.dataset.symbolToggleAttached;
    let _symSib = textEl.nextElementSibling;
    while (_symSib && (_symSib.classList.contains("symbol-toggle-btn") || _symSib.classList.contains("symbol-swap-view"))) {
      const _nx = _symSib.nextElementSibling;
      _symSib.remove();
      _symSib = _nx;
    }
    annotateBibleSymbols(textEl);
  } catch (err) {
    loadEl.style.display = "none";
    if (err.message === "BIBLEGATEWAY_LINK") {
      const isDlnt = err.translation === "DLNT";
      const msg = isDlnt
        ? "The DLNT is not available via a direct text API."
        : `The ${err.translation} API limit has been reached. You can still read the verse on Bible Gateway:`;
      errEl.innerHTML =
        `<p style="margin:0 0 12px">${escapeHtml(msg)}</p>` +
        `<a href="${err.bgUrl}" target="_blank" rel="noopener" class="btn-gold" style="display:inline-block;text-decoration:none;padding:8px 16px;border-radius:6px">` +
        `\uD83D\uDCD6\u2009View ${escapeHtml(err.translation || "")} on Bible Gateway \u2197</a>`;
      if (isDlnt) {
        errEl.innerHTML += `<p style="margin:10px 0 0;font-size:11px;color:var(--text-muted)">DLNT covers New Testament books only. Copyright \u00A9 2011 Michael J. Magill.</p>`;
      }
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
  // Return focus to the verse reference that opened the dialog
  if (document._verseModalReturnFocus && document._verseModalReturnFocus.focus) {
    try { document._verseModalReturnFocus.focus(); } catch { /* detached */ }
  }
  document._verseModalReturnFocus = null;
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
  const thumbEl = card.querySelector(".video-card-thumb");
  thumbEl.setAttribute("role", "button");
  thumbEl.setAttribute("tabindex", "0");
  thumbEl.setAttribute("aria-label", `Play video: ${v.title}`);
  const playVideo = () => {
    thumbEl.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${escapeHtml(v.youtubeId)}?autoplay=1&rel=0"
      title="${escapeHtml(v.title)}" allowfullscreen loading="lazy" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
    </iframe>`;
    thumbEl.classList.add("playing");
  };
  thumbEl.addEventListener("click", playVideo);
  thumbEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); playVideo(); }
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
  hideScriptureIndexPage();

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

function resetAllProgress() {
  // Collect every scrollPos_ key first
  const scrollKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("scrollPos_")) scrollKeys.push(k);
  }
  scrollKeys.forEach((k) => localStorage.removeItem(k));

  localStorage.removeItem("readDocs");
  localStorage.removeItem("lastReadDoc");
  localStorage.removeItem("lastReadTime");

  // Refresh all read-state UI
  buildHomeCards();
  buildStudyPath();
  buildContinueReading();
}

function buildStudyPath() {
  const container = document.getElementById("study-path");
  if (!container) return;
  container.innerHTML = "";

  // Wire the reset button every time the study path rebuilds
  const resetBtn = document.getElementById("reset-progress-btn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm("Clear all read history and scroll positions? This cannot be undone.")) {
        resetAllProgress();
      }
    };
  }

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
    el.setAttribute("role", "link");
    el.setAttribute("tabindex", "0");
    if (readDocs.includes(step.file)) el.classList.add("completed");
    el.innerHTML = `<span class="step-number" aria-hidden="true">${i + 1}</span><span class="step-title">${escapeHtml(step.title)}</span>`;
    el.addEventListener("click", () => loadDocument(step.file));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); loadDocument(step.file); }
    });
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

function clearReadStatus(filePath) {
  // Remove from readDocs
  const readDocs = JSON.parse(localStorage.getItem("readDocs") || "[]");
  const updated = readDocs.filter((f) => f !== filePath);
  localStorage.setItem("readDocs", JSON.stringify(updated));

  // Remove saved scroll position
  localStorage.removeItem("scrollPos_" + filePath);

  // If this was the lastReadDoc, clear that too
  if (localStorage.getItem("lastReadDoc") === filePath) {
    localStorage.removeItem("lastReadDoc");
    localStorage.removeItem("lastReadTime");
  }

  // Rebuild the home page so the badge and study path both update
  buildHomeCards();
  buildStudyPath();
  buildContinueReading();
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
  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");
  card.innerHTML = `
    <div class="card-icon" aria-hidden="true">${item.icon}</div>
    <div class="card-title">${item.title}</div>
    <div class="card-desc">Last read ${timeAgo}. Click to resume where you left off.</div>
    <span class="card-tag ${item.tagClass || ""}">Continue Reading</span>
  `;
  const resumeReading = () => {
    loadDocument(item.file);
    setTimeout(() => restoreScrollPosition(item.file), 500);
  };
  card.addEventListener("click", resumeReading);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); resumeReading(); }
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
  // No explicit choice yet → respect the visitor's system preference
  const preferLight =
    stored === "light" ||
    (!stored &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: light)").matches);
  if (preferLight) {
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

  const mdItems = ALL_ITEMS.filter((item) =>
    !isExternalUrl(item.file) &&
    !/\.(html|pdf|png|jpe?g|gif)$/i.test(item.file)); // only index markdown

  // Fetch with limited concurrency — much faster than one-at-a-time,
  // without flooding the connection.
  const CONCURRENCY = 4;
  let cursor = 0;
  async function worker() {
    while (cursor < mdItems.length) {
      const item = mdItems[cursor++];
      try {
        const res = await fetch(item.file);
        if (!res.ok) continue;
        const text = await res.text();
        _searchIndex.set(item.file, {
          title: item.title,
          section: item.sectionLabel || "",
          content: text.substring(0, 50000), // cap to prevent memory issues
        });
        // Feed the Scripture index from the FULL text (before truncation)
        indexScriptureRefs(item, text);
      } catch {
        // Skip files that can't be fetched
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
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
    <div class="search-result-item" data-file="${escapeHtml(r.file)}" role="link" tabindex="0">
      <div class="search-result-title">${escapeHtml(r.title)}</div>
      <div class="search-result-section">${escapeHtml(r.section)}</div>
      ${r.snippet ? `<div class="search-result-snippet">${highlightSnippet(escapeHtml(r.snippet), query)}</div>` : ""}
    </div>
  `).join("");

  panel.querySelectorAll(".search-result-item").forEach((el) => {
    const openResult = () => {
      const file = el.dataset.file;
      if (file) {
        panel.classList.remove("visible");
        document.getElementById("nav-search").value = "";
        if (window.innerWidth <= 900) closeMobileSidebar();
        loadDocument(file);
      }
    };
    el.addEventListener("click", openResult);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openResult(); }
    });
  });

  panel.classList.add("visible");
}

/* ══════════════════════════════════════════════════════════════
   SCRIPTURE INDEX
   Maps every Bible book → the studies that cite it, using the
   same verse-reference detector as the translation lookup. The
   index is built from the full document texts during the search
   index pass (background/idle) — no build step required.
══════════════════════════════════════════════════════════════ */
const SCRIPTURE_INDEX_FILE = "__scripture-index__";

const CANONICAL_BOOKS = [
  // Old Testament
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
  "1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles",
  "Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon",
  "Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah",
  "Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
  // New Testament (index 39+)
  "Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians",
  "Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians",
  "1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter",
  "1 John","2 John","3 John","Jude","Revelation",
];
const NT_START_INDEX = 39;

const _CANONICAL_LOOKUP = (() => {
  const map = new Map();
  CANONICAL_BOOKS.forEach((b) => map.set(b.toLowerCase(), b));
  map.set("psalm", "Psalms");
  Object.entries(ABBREV_TO_FULL_NAME).forEach(([abbr, full]) => {
    const canon = full === "Psalms" ? "Psalms" : full;
    if (CANONICAL_BOOKS.includes(canon)) map.set(abbr, canon);
  });
  return map;
})();

function canonicalBookName(raw) {
  const key = String(raw).trim().toLowerCase().replace(/\.$/, "").replace(/\s+/g, " ");
  return _CANONICAL_LOOKUP.get(key) || null;
}

/** book → Map(file → { count, chapters:Set<number> }) */
const _scriptureIndex = new Map();

function indexScriptureRefs(item, text) {
  VERSE_REF_REGEX.lastIndex = 0;
  let m;
  while ((m = VERSE_REF_REGEX.exec(text)) !== null) {
    const ref = m[1];
    const bm = ref.match(/^((?:\d\s+)?[A-Za-z. ]+?)\s*(\d+)\s*:/);
    if (!bm) continue;
    const book = canonicalBookName(bm[1]);
    if (!book) continue;
    const chapter = parseInt(bm[2], 10);

    let perFile = _scriptureIndex.get(book);
    if (!perFile) { perFile = new Map(); _scriptureIndex.set(book, perFile); }
    let entry = perFile.get(item.file);
    if (!entry) {
      entry = { title: item.title, section: item.sectionLabel || "", count: 0, chapters: new Set() };
      perFile.set(item.file, entry);
    }
    entry.count++;
    if (!Number.isNaN(chapter)) entry.chapters.add(chapter);
  }
}

function hideScriptureIndexPage() {
  const page = document.getElementById("scripture-index-page");
  if (page) page.style.display = "none";
}

async function showScriptureIndex() {
  // Hide other views
  document.getElementById("home-page").style.display = "none";
  document.getElementById("doc-page").style.display = "none";
  document.getElementById("loading").style.display = "none";
  document.getElementById("error-state").style.display = "none";
  const vcPage = document.getElementById("video-cat-page");
  if (vcPage) vcPage.style.display = "none";
  const pill = document.getElementById("verse-translation-pill");
  if (pill) pill.style.display = "none";
  hideTOC();
  setReadingProgressVisible(false);
  const addBmBtn = document.getElementById("btn-add-bookmark");
  if (addBmBtn) addBmBtn.style.display = "none";

  const page = document.getElementById("scripture-index-page");
  page.style.display = "";

  // Breadcrumb + sidebar highlight
  document.getElementById("breadcrumb-section").textContent = "Interactive Tools";
  document.getElementById("breadcrumb-sep").style.display = "";
  document.getElementById("breadcrumb-title").textContent = "Scripture Index";
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.file === SCRIPTURE_INDEX_FILE);
  });
  window.scrollTo({ top: 0 });

  // Build (or wait for) the index, then render
  const loadingEl = document.getElementById("si-loading");
  if (_scriptureIndex.size === 0) {
    loadingEl.style.display = "flex";
    await buildSearchIndex();
    loadingEl.style.display = "none";
  }
  renderScriptureIndex();
}

let _siSelectedBook = null;

function renderScriptureIndex() {
  const cont = document.getElementById("si-content");
  if (!cont) return;
  cont.innerHTML = "";

  if (_scriptureIndex.size === 0) {
    cont.innerHTML = '<p class="bm-empty">No Scripture references could be indexed. Please check that the site is served over HTTP (not file://).</p>';
    return;
  }

  const groups = [
    { label: "Old Testament", books: CANONICAL_BOOKS.slice(0, NT_START_INDEX) },
    { label: "New Testament", books: CANONICAL_BOOKS.slice(NT_START_INDEX) },
  ];

  groups.forEach((group) => {
    const present = group.books.filter((b) => _scriptureIndex.has(b));
    if (present.length === 0) return;

    const h = document.createElement("h2");
    h.className = "si-group-heading";
    h.textContent = group.label;
    cont.appendChild(h);

    const grid = document.createElement("div");
    grid.className = "si-book-grid";
    present.forEach((book) => {
      const perFile = _scriptureIndex.get(book);
      let total = 0;
      perFile.forEach((e) => { total += e.count; });
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "si-book" + (book === _siSelectedBook ? " active" : "");
      btn.innerHTML = `<span class="si-book-name">${escapeHtml(book)}</span><span class="si-book-count">${total}</span>`;
      btn.setAttribute("aria-pressed", String(book === _siSelectedBook));
      btn.addEventListener("click", () => {
        _siSelectedBook = book === _siSelectedBook ? null : book;
        renderScriptureIndex();
        if (_siSelectedBook) {
          const detail = document.getElementById("si-detail");
          if (detail) detail.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      });
      grid.appendChild(btn);

      // Render the detail panel directly after the selected book's group
      if (book === _siSelectedBook) grid.dataset.hasSelection = "1";
    });
    cont.appendChild(grid);

    if (_siSelectedBook && present.includes(_siSelectedBook)) {
      cont.appendChild(buildScriptureDetail(_siSelectedBook));
    }
  });
}

function buildScriptureDetail(book) {
  const perFile = _scriptureIndex.get(book);
  const wrap = document.createElement("div");
  wrap.id = "si-detail";
  wrap.className = "si-detail";

  const docs = [...perFile.entries()]
    .map(([file, e]) => ({ file, ...e, chapterList: [...e.chapters].sort((a, b) => a - b) }))
    .sort((a, b) => b.count - a.count);

  wrap.innerHTML = `<h3 class="si-detail-heading">${escapeHtml(book)} — cited in ${docs.length} ${docs.length === 1 ? "study" : "studies"}</h3>`;

  docs.forEach((doc) => {
    const row = document.createElement("div");
    row.className = "si-doc";
    row.setAttribute("role", "link");
    row.setAttribute("tabindex", "0");
    const chapters = doc.chapterList.length
      ? `ch. ${doc.chapterList.slice(0, 18).join(", ")}${doc.chapterList.length > 18 ? "…" : ""}`
      : "";
    row.innerHTML = `
      <div class="si-doc-main">
        <div class="si-doc-title">${escapeHtml(doc.title)}</div>
        <div class="si-doc-sub">${escapeHtml(doc.section)}${chapters ? " · " + escapeHtml(chapters) : ""}</div>
      </div>
      <span class="si-doc-count">${doc.count} ref${doc.count === 1 ? "" : "s"}</span>
    `;
    const open = () => loadDocument(doc.file);
    row.addEventListener("click", open);
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    wrap.appendChild(row);
  });

  return wrap;
}

/* ══════════════════════════════════════════════════════════════
   BIBLE SYMBOL HIGHLIGHTER & SWAPPER
   Data source: Study_guides/Bible_Symbols_Chart.md (parsed at
   runtime — edit the chart and this feature updates itself).
   Symbol words inside quoted Bible passages (blockquotes, inline
   verse previews, and the translation modal) are highlighted;
   hovering shows the symbolic meaning, and a "Symbolic reading"
   toggle re-renders the verse with symbols replaced by meanings.
   The document text itself is never modified.
══════════════════════════════════════════════════════════════ */
const SYMBOLS_CHART_FILE = "Study_guides/Bible_Symbols_Chart.md";

/** matchTerm (lowercase) → [{ label, meaning, refs }] (multiple senses allowed) */
let _symbolsMap = null;
let _symbolsRegex = null;
let _symbolsLoadPromise = null;

function loadBibleSymbols() {
  if (_symbolsLoadPromise) return _symbolsLoadPromise;
  _symbolsLoadPromise = (async () => {
    try {
      const res = await fetch(SYMBOLS_CHART_FILE);
      if (!res.ok) return;
      const md = await res.text();

      const map = new Map();
      const addSense = (term, sense) => {
        const key = term.toLowerCase();
        if (key.length < 3) return;
        if (!map.has(key)) map.set(key, []);
        const senses = map.get(key);
        if (!senses.some((s) => s.label === sense.label)) senses.push(sense);
      };

      const rowRe = /^\|([^|\n]+)\|([^|\n]+)\|([^|\n]+)\|\s*$/gm;
      let m;
      while ((m = rowRe.exec(md)) !== null) {
        const label = m[1].trim();
        const meaning = m[2].trim();
        const refs = m[3].trim();
        // Skip header and separator rows
        if (/^Symbol$|^Number$|^Meaning$/i.test(label)) continue;
        if (/^[-\s:]+$/.test(label)) continue;

        const sense = { label, meaning, refs, scope: parseSenseRefs(refs) };
        // Derive match terms: strip parentheticals and split "/" variants.
        const base = label.replace(/\([^)]*\)/g, " ");
        base.split("/").forEach((part) => {
          let term = part.trim();
          if (!term) return;
          // Cut a trailing ", Doctrine of"-style qualifier ONLY when there
          // is a single comma (e.g. "Balaam, Doctrine of" → "Balaam").
          // Multi-comma entries are phrases and must stay whole —
          // "Time, Times, Half a Time" must NOT collapse to "Time",
          // or the bare word "time" wrongly inherits the 1260-year sense.
          const commas = (term.match(/,/g) || []).length;
          if (commas === 1) term = term.replace(/,.*$/, "").trim();
          if (!term) return;
          addSense(term, sense);
          // Simple singular/plural variants (single words only)
          if (!term.includes(",")) {
            if (term.endsWith("s")) addSense(term.slice(0, -1), sense);
            else addSense(term + "s", sense);
          }
        });
      }

      if (map.size === 0) return;
      _symbolsMap = map;

      // Longest terms first so "white robes" wins over "white"
      const patterns = [...map.keys()]
        .sort((a, b) => b.length - a.length)
        .map((t) =>
          t
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            .replace(/'/g, "['’]") // straight or curly apostrophe
            .replace(/\s+/g, "\\s+"),
        );
      _symbolsRegex = new RegExp("\\b(?:" + patterns.join("|") + ")\\b", "gi");
    } catch {
      /* chart unavailable — feature silently off */
    }
  })();
  return _symbolsLoadPromise;
}

/**
 * Parse a sense's Scriptural References column into its "applies-in" scope:
 * the set of books and book+chapter pairs the chart cites for that sense.
 * Handles inherited book names ("Daniel 8:16; 9:21" → Daniel 8, Daniel 9).
 */
function parseSenseRefs(refs) {
  const books = new Set();
  const chapters = new Set();
  let lastBook = null;
  String(refs).split(";").forEach((part) => {
    const p = part.trim();
    if (!p) return;
    const m = p.match(/^((?:\d\s+)?[A-Za-z. ]+?)?\s*(\d+)\s*(?::|$)/);
    if (!m) return;
    const book = m[1] ? canonicalBookName(m[1]) : lastBook;
    if (!book) return;
    lastBook = book;
    books.add(book);
    chapters.add(book + "|" + parseInt(m[2], 10));
  });
  return { books, chapters };
}

/** How well a sense fits the passage context: 2 = chapter, 1 = book, 0 = none. */
function senseScore(sense, ctx) {
  if (!ctx || !sense.scope) return 0;
  if (sense.scope.chapters.has(ctx.book + "|" + ctx.chapter)) return 2;
  if (sense.scope.books.has(ctx.book)) return 1;
  return 0;
}

function getSymbolSenses(matchedText) {
  if (!_symbolsMap) return null;
  const key = matchedText.toLowerCase().replace(/’/g, "'").replace(/\s+/g, " ");
  return _symbolsMap.get(key) || null;
}

/**
 * Resolve the best symbol interpretation for a matched term in a passage.
 * If the matched (longer) term doesn't fit the context but a contained
 * dictionary term does — e.g. "four beasts" in Daniel 7, where "beast"
 * (kingdom, Daniel 7:17) fits but "Four Beasts / Living Creatures"
 * (Revelation 4-6) doesn't — the contained term wins.
 * Returns { term, senses (sorted by fit), score } or null.
 */
function resolveSymbol(matchedText, ctx) {
  const clean = matchedText.toLowerCase().replace(/’/g, "'").replace(/\s+/g, " ");
  const candidates = [];
  const direct = _symbolsMap && _symbolsMap.get(clean);
  if (direct) candidates.push({ term: clean, senses: direct });

  if (ctx && _symbolsMap) {
    for (const key of _symbolsMap.keys()) {
      if (key === clean) continue;
      if (clean.includes(key) &&
          new RegExp("\\b" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(clean)) {
        candidates.push({ term: key, senses: _symbolsMap.get(key) });
      }
    }
  }
  if (candidates.length === 0) return null;

  let best = null;
  candidates.forEach((c) => {
    const score = Math.max(...c.senses.map((s) => senseScore(s, ctx)));
    // Prefer higher context fit; on ties prefer the longer (more specific) term
    if (!best || score > best.score || (score === best.score && c.term.length > best.term.length)) {
      best = { term: c.term, senses: c.senses, score };
    }
  });

  const sorted = [...best.senses].sort((a, b) => senseScore(b, ctx) - senseScore(a, ctx));
  return { term: best.term, senses: sorted, score: best.score };
}

/**
 * Determine which passage a verse container quotes (book + chapter),
 * using the clickable reference inside it, the preview's stored ref,
 * or the modal's title.
 */
function getPassageContext(el) {
  let ref = null;
  if (el.classList && el.classList.contains("verse-inline-text")) {
    ref = el.dataset.for;
  } else if (el.id === "verse-text") {
    const refEl = document.getElementById("verse-modal-ref");
    ref = refEl ? refEl.textContent : null;
  } else {
    const vr = el.querySelector && el.querySelector(".verse-ref[data-verse-ref]");
    if (vr) ref = vr.dataset.verseRef;
    else {
      VERSE_REF_REGEX.lastIndex = 0;
      const m = VERSE_REF_REGEX.exec(el.textContent || "");
      ref = m && m[1];
    }
  }
  if (!ref) return null;
  const bm = String(ref).match(/^((?:\d\s+)?[A-Za-z. ]+?)\s*(\d+)\s*:/);
  if (!bm) return null;
  const book = canonicalBookName(bm[1]);
  if (!book) return null;
  return { book, chapter: parseInt(bm[2], 10) };
}

/** Short substitution text for the swapper — best-fit sense, first clause. */
function symbolSwapText(sense) {
  const short = sense.meaning.split(";")[0].trim();
  return short.charAt(0).toLowerCase() + short.slice(1);
}

/** Wrap symbol words in one element's text nodes. Returns count of
 *  context-swappable symbols (book-level match or unknown context). */
function annotateSymbolElement(el, ctx) {
  if (!_symbolsRegex || el.dataset.symbolsAnnotated) return 0;
  el.dataset.symbolsAnnotated = "1";
  const ctxKey = ctx ? ctx.book + "|" + ctx.chapter : "";

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      if (p.closest("a, button, .bible-symbol, .verse-inline-tag, .verse-inline-copy, .verse-num"))
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  let swappable = 0;
  nodes.forEach((node) => {
    const text = node.nodeValue;
    _symbolsRegex.lastIndex = 0;
    if (!_symbolsRegex.test(text)) return;
    _symbolsRegex.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let last = 0;
    let m;
    let wrapped = 0;
    while ((m = _symbolsRegex.exec(text)) !== null) {
      const matched = m[0];
      const resolved = resolveSymbol(matched, ctx);
      if (!resolved) continue;
      frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const span = document.createElement("span");
      span.className = "bible-symbol";
      span.textContent = matched;
      span.dataset.ctx = ctxKey;
      span.dataset.term = resolved.term;
      span.dataset.score = String(resolved.score);
      span.setAttribute("tabindex", "0");
      span.setAttribute("role", "note");
      span.setAttribute("aria-label", "Bible symbol: " + matched);
      frag.appendChild(span);
      last = m.index + matched.length;
      wrapped++;
      // Swap only when the chart explicitly references this symbol in the
      // passage's own chapter. Book-level matches are NOT enough — "time"
      // is prophetic in Revelation 12 but literal in Revelation 1:3.
      if (resolved.score >= 2) swappable++;
    }
    if (wrapped === 0) return;
    frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });
  return swappable;
}

/** Add the "Symbolic reading" toggle after a verse container. */
function attachSymbolToggle(el) {
  if (el.dataset.symbolToggleAttached) return;
  el.dataset.symbolToggleAttached = "1";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "symbol-toggle-btn";
  btn.textContent = "🔁 Symbolic reading";
  btn.title = "Show this passage again with each symbol replaced by its biblical meaning";
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    const existing = btn.nextElementSibling;
    if (existing && existing.classList.contains("symbol-swap-view")) {
      existing.remove();
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "🔁 Symbolic reading";
      return;
    }
    const view = document.createElement("div");
    view.className = "symbol-swap-view";
    const clone = el.cloneNode(true);
    // Clean the clone: strip ids/toggles, swap each symbol for its meaning
    clone.removeAttribute("id");
    clone.querySelectorAll(".symbol-toggle-btn, .symbol-swap-view").forEach((n) => n.remove());
    clone.querySelectorAll(".bible-symbol").forEach((s) => {
      const original = s.textContent;
      const ctx = parseCtxKey(s.dataset.ctx);
      const resolved = resolveSymbol(original, ctx);
      if (!resolved) return;
      // Strict context guard: substitute ONLY when the chart references
      // this symbol in the passage's own chapter. Book-level or unknown
      // context stays untouched — highlighting and the tooltip still
      // present the possible meanings without asserting them.
      if (!ctx || resolved.score < 2) return;
      const bestSense = resolved.senses[0];
      // Replace only the resolved term within the matched text, preserving
      // qualifiers — "four beasts" (Daniel 7) → "four <kingdoms…>".
      const termRe = new RegExp(
        "\\b" + resolved.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+") + "(s)?\\b", "i");
      const swapped = original.replace(termRe, symbolSwapText(bestSense));
      s.textContent = swapped === original ? symbolSwapText(bestSense) : swapped;
      s.classList.add("swapped");
      s.dataset.original = original;
      s.title = "Original word: " + original;
      s.setAttribute("aria-label", original + " symbolically means " + s.textContent);
    });
    view.innerHTML = `<div class="symbol-swap-label">Symbolic reading — symbols replaced with their biblical meaning (see <span class="symbol-swap-chart-link" role="link" tabindex="0">Bible Symbols Chart</span>)</div>`;
    view.appendChild(clone);
    const chartLink = view.querySelector(".symbol-swap-chart-link");
    chartLink.addEventListener("click", () => loadDocument(SYMBOLS_CHART_FILE));
    chartLink.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); loadDocument(SYMBOLS_CHART_FILE); }
    });
    btn.after(view);
    btn.setAttribute("aria-expanded", "true");
    btn.textContent = "🔁 Hide symbolic reading";
  });

  el.after(btn);
}

function parseCtxKey(ctxKey) {
  if (!ctxKey) return null;
  const [book, chapter] = ctxKey.split("|");
  if (!book || !chapter) return null;
  return { book, chapter: parseInt(chapter, 10) };
}

/** Annotate all verse containers inside a rendered document / preview / modal. */
async function annotateBibleSymbols(container, currentFile) {
  if (!container) return;
  if (currentFile === SYMBOLS_CHART_FILE) return; // don't annotate the chart itself
  await loadBibleSymbols();
  if (!_symbolsRegex) return;

  const targets = container.matches && container.matches("blockquote, .verse-inline-text, #verse-text")
    ? [container]
    : [...container.querySelectorAll("blockquote")];

  targets.forEach((el) => {
    const ctx = getPassageContext(el);
    const swappable = annotateSymbolElement(el, ctx);
    // Only offer the symbolic-reading toggle when at least one symbol
    // actually applies to this passage per the chart's references.
    if (swappable > 0) attachSymbolToggle(el);
  });
}

/* ── Symbol tooltip (shared, event-delegated) ─────────────── */
function getSymbolTooltip() {
  let tip = document.getElementById("symbol-tooltip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "symbol-tooltip";
    tip.setAttribute("role", "tooltip");
    document.body.appendChild(tip);
  }
  return tip;
}

function showSymbolTooltip(target) {
  const word = target.dataset.original || target.textContent.trim();
  const ctx = parseCtxKey(target.dataset.ctx);
  const resolved = resolveSymbol(word, ctx);
  if (!resolved) return;

  const tip = getSymbolTooltip();
  const sensesHtml = resolved.senses.map((s) => {
    const score = senseScore(s, ctx);
    const badge = score === 2
      ? `<span class="st-badge st-badge-strong">✓ referenced in ${escapeHtml(ctx.book + " " + ctx.chapter)}</span>`
      : score === 1
        ? `<span class="st-badge">✓ referenced in ${escapeHtml(ctx.book)}</span>`
        : "";
    return `
    <div class="st-sense${score > 0 ? " st-sense-fit" : ""}">
      <div class="st-label">${escapeHtml(s.label)} ${badge}</div>
      <div class="st-meaning">${escapeHtml(s.meaning)}</div>
      <div class="st-refs">${escapeHtml(s.refs)}</div>
    </div>`;
  }).join("");

  let literalNote = "";
  if (ctx && resolved.score === 0) {
    literalNote = `<div class="st-note">The chart lists no reference in ${escapeHtml(ctx.book + " " + ctx.chapter)} — this word may be literal in this passage.</div>`;
  } else if (ctx && resolved.score === 1) {
    literalNote = `<div class="st-note">The chart references this symbol elsewhere in ${escapeHtml(ctx.book)}, but not in chapter ${escapeHtml(String(ctx.chapter))} — it may be literal here.</div>`;
  }

  tip.innerHTML = sensesHtml + literalNote + `<div class="st-footer">Bible Symbols Chart</div>`;

  const rect = target.getBoundingClientRect();
  tip.style.display = "block";
  // Position after display so dimensions are measurable
  const tw = tip.offsetWidth;
  const th = tip.offsetHeight;
  let left = rect.left + rect.width / 2 - tw / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
  let top = rect.top - th - 8;
  if (top < 8) top = rect.bottom + 8;
  tip.style.left = left + "px";
  tip.style.top = top + "px";
}

function hideSymbolTooltip() {
  const tip = document.getElementById("symbol-tooltip");
  if (tip) tip.style.display = "none";
}

document.addEventListener("mouseover", (e) => {
  const sym = e.target.closest && e.target.closest(".bible-symbol");
  if (sym) showSymbolTooltip(sym);
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest && e.target.closest(".bible-symbol")) hideSymbolTooltip();
});
document.addEventListener("focusin", (e) => {
  const sym = e.target.closest && e.target.closest(".bible-symbol");
  if (sym) showSymbolTooltip(sym);
});
document.addEventListener("focusout", (e) => {
  if (e.target.closest && e.target.closest(".bible-symbol")) hideSymbolTooltip();
});
// Tap toggles on touch devices
document.addEventListener("click", (e) => {
  const sym = e.target.closest && e.target.closest(".bible-symbol");
  if (!sym) { hideSymbolTooltip(); return; }
  const tip = document.getElementById("symbol-tooltip");
  if (tip && tip.style.display === "block") hideSymbolTooltip();
  else showSymbolTooltip(sym);
});
window.addEventListener("scroll", hideSymbolTooltip, { passive: true });

/* ══════════════════════════════════════════════════════════════
   BOOKMARKS & PERSONAL NOTES
   Stored in localStorage only (this browser). Exportable as a
   JSON or plain-text file. No document content is ever modified.
══════════════════════════════════════════════════════════════ */
const BOOKMARKS_KEY = "studyBookmarks";
const NOTES_KEY = "studyNotes";

function getBookmarks() {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]"); }
  catch { return []; }
}
function saveBookmarks(list) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
}
function getNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "{}"); }
  catch { return {}; }
}
function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function currentDocFile() {
  return currentIndex >= 0 && ALL_ITEMS[currentIndex]
    ? ALL_ITEMS[currentIndex].file
    : null;
}

/** Small transient confirmation toast */
function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove("visible"), 2200);
}

/** Bookmark the reader's current position in the open markdown document. */
function addBookmark() {
  const file = currentDocFile();
  const contentEl = document.getElementById("doc-content");
  if (!file || !contentEl || contentEl.style.display === "none") {
    showToast("Open a study guide first to bookmark it.");
    return;
  }

  // Nearest heading above the current viewport position
  const topbarH = document.getElementById("topbar").offsetHeight;
  let heading = null;
  contentEl.querySelectorAll("h1[id], h2[id], h3[id]").forEach((h) => {
    if (h.getBoundingClientRect().top < topbarH + 80) heading = h;
  });

  const item = ALL_ITEMS[currentIndex];
  const bookmarks = getBookmarks();
  bookmarks.unshift({
    file,
    docTitle: item ? item.title : file,
    headingId: heading ? heading.id : "",
    headingText: heading ? heading.textContent.trim() : "Top of document",
    scrollY: Math.round(window.scrollY),
    created: Date.now(),
  });
  saveBookmarks(bookmarks);
  showToast("🔖 Bookmarked: " + (heading ? heading.textContent.trim() : "top of document"));
}

function deleteBookmark(created) {
  saveBookmarks(getBookmarks().filter((b) => b.created !== created));
  renderBookmarksPanel();
}

function goToBookmark(bm) {
  closeBookmarksPanel();
  loadDocument(bm.file);
  // Progressive rendering means the heading may appear a moment later —
  // poll briefly for it, then fall back to the stored scroll offset.
  let tries = 0;
  const attempt = () => {
    tries++;
    const target = bm.headingId ? findAnchorTarget(bm.headingId) : null;
    if (target) {
      const topbarH = document.getElementById("topbar").offsetHeight;
      const y = target.getBoundingClientRect().top + window.scrollY - topbarH - 12;
      window.scrollTo({ top: y });
    } else if (tries < 12) {
      setTimeout(attempt, 250);
      return;
    } else if (bm.scrollY) {
      window.scrollTo({ top: bm.scrollY });
    }
  };
  setTimeout(attempt, 400);
}

/* ── Export ───────────────────────────────────────────────── */
function downloadFile(filename, mime, content) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

function exportStudyDataJson() {
  const data = {
    exported: new Date().toISOString(),
    site: "Babylon's Wine — Study Library",
    bookmarks: getBookmarks(),
    notes: getNotes(),
  };
  downloadFile("study-bookmarks-notes.json", "application/json", JSON.stringify(data, null, 2));
}

function exportStudyDataText() {
  const bookmarks = getBookmarks();
  const notes = getNotes();
  let out = "BABYLON'S WINE — STUDY BOOKMARKS & NOTES\nExported: " + new Date().toLocaleString() + "\n\n";
  out += "══ BOOKMARKS (" + bookmarks.length + ") ══\n\n";
  bookmarks.forEach((b) => {
    out += "• " + b.docTitle + "\n  ↳ " + b.headingText + "\n  (" + new Date(b.created).toLocaleString() + ")\n\n";
  });
  out += "══ NOTES ══\n\n";
  Object.keys(notes).forEach((file) => {
    if (!notes[file] || !notes[file].trim()) return;
    const item = ALL_ITEMS.find((i) => i.file === file);
    out += "── " + (item ? item.title : file) + " ──\n" + notes[file].trim() + "\n\n";
  });
  downloadFile("study-bookmarks-notes.txt", "text/plain", out);
}

/* ── Panel UI ─────────────────────────────────────────────── */
function closeBookmarksPanel() {
  const overlay = document.getElementById("bookmarks-overlay");
  if (overlay) overlay.remove();
  if (document._bmEscHandler) {
    document.removeEventListener("keydown", document._bmEscHandler);
    document._bmEscHandler = null;
  }
  if (document._bmReturnFocus && document._bmReturnFocus.focus) {
    try { document._bmReturnFocus.focus(); } catch { /* detached */ }
  }
  document._bmReturnFocus = null;
}

let _noteSaveTimer = null;

function renderBookmarksPanel() {
  const listEl = document.getElementById("bm-list");
  if (!listEl) return;
  const bookmarks = getBookmarks();

  if (bookmarks.length === 0) {
    listEl.innerHTML =
      '<p class="bm-empty">No bookmarks yet. While reading a study guide, press the <strong>🔖+</strong> button in the top bar to save your place.</p>';
  } else {
    listEl.innerHTML = "";
    bookmarks.forEach((bm) => {
      const row = document.createElement("div");
      row.className = "bm-item";
      row.innerHTML = `
        <div class="bm-item-main" role="link" tabindex="0">
          <div class="bm-item-doc">${escapeHtml(bm.docTitle)}</div>
          <div class="bm-item-heading">↳ ${escapeHtml(bm.headingText)}</div>
          <div class="bm-item-date">${new Date(bm.created).toLocaleString()}</div>
        </div>
        <button class="bm-item-del" title="Delete bookmark" aria-label="Delete bookmark">✕</button>
      `;
      const main = row.querySelector(".bm-item-main");
      main.addEventListener("click", () => goToBookmark(bm));
      main.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goToBookmark(bm); }
      });
      row.querySelector(".bm-item-del").addEventListener("click", () => deleteBookmark(bm.created));
      listEl.appendChild(row);
    });
  }

  // Notes section for the currently open document
  const notesWrap = document.getElementById("bm-notes-wrap");
  const file = currentDocFile();
  if (notesWrap) {
    const notes = getNotes();
    if (file && !file.endsWith(".html") && !isPdfFile(file)) {
      const item = ALL_ITEMS[currentIndex];
      notesWrap.innerHTML = `
        <h4 class="bm-subhead">📝 Notes — ${escapeHtml(item ? item.title : file)}</h4>
        <textarea id="bm-note-input" rows="5" placeholder="Write your personal study notes for this document… (saved automatically in this browser)">${escapeHtml(notes[file] || "")}</textarea>
        <div class="bm-note-status" id="bm-note-status"></div>
      `;
      const input = document.getElementById("bm-note-input");
      input.addEventListener("input", () => {
        clearTimeout(_noteSaveTimer);
        _noteSaveTimer = setTimeout(() => {
          const all = getNotes();
          all[file] = input.value;
          saveNotes(all);
          const status = document.getElementById("bm-note-status");
          if (status) {
            status.textContent = "Saved ✓";
            setTimeout(() => { if (status.textContent === "Saved ✓") status.textContent = ""; }, 1500);
          }
        }, 400);
      });
    } else {
      notesWrap.innerHTML =
        '<h4 class="bm-subhead">📝 Notes</h4><p class="bm-empty">Open a study guide to write notes for it. Existing notes are included in exports.</p>';
    }

    // All other saved notes (jump links)
    const notesAll = getNotes();
    const otherFiles = Object.keys(notesAll).filter((f) => f !== file && notesAll[f] && notesAll[f].trim());
    if (otherFiles.length > 0) {
      const list = document.createElement("div");
      list.className = "bm-other-notes";
      list.innerHTML = '<h4 class="bm-subhead">All documents with notes</h4>';
      otherFiles.forEach((f) => {
        const item = ALL_ITEMS.find((i) => i.file === f);
        const link = document.createElement("button");
        link.type = "button";
        link.className = "bm-note-link";
        link.textContent = "📄 " + (item ? item.title : f);
        link.addEventListener("click", () => { closeBookmarksPanel(); loadDocument(f); });
        list.appendChild(link);
      });
      notesWrap.appendChild(list);
    }
  }
}

function openBookmarksPanel() {
  closeBookmarksPanel();
  document._bmReturnFocus = document.activeElement;

  const overlay = document.createElement("div");
  overlay.id = "bookmarks-overlay";
  overlay.innerHTML = `
    <div id="bookmarks-panel" role="dialog" aria-label="Bookmarks and notes">
      <div class="bm-header">
        <span class="bm-title">🔖 Bookmarks &amp; Notes</span>
        <button id="bm-close" title="Close" aria-label="Close bookmarks panel">✕</button>
      </div>
      <div class="bm-body">
        <div id="bm-list"></div>
        <div id="bm-notes-wrap"></div>
      </div>
      <div class="bm-footer">
        <button id="bm-export-json" class="btn-ghost">⬇ Export JSON</button>
        <button id="bm-export-txt" class="btn-ghost">⬇ Export Text</button>
        <span class="bm-footer-hint">Stored only in this browser</span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  renderBookmarksPanel();

  document.getElementById("bm-close").addEventListener("click", closeBookmarksPanel);
  document.getElementById("bm-export-json").addEventListener("click", exportStudyDataJson);
  document.getElementById("bm-export-txt").addEventListener("click", exportStudyDataText);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeBookmarksPanel(); });

  document._bmEscHandler = (e) => { if (e.key === "Escape") closeBookmarksPanel(); };
  document.addEventListener("keydown", document._bmEscHandler);

  document.getElementById("bm-close").focus();
}

/* ══════════════════════════════════════════════════════════════
   INIT APP
══════════════════════════════════════════════════════════════ */
async function initApp() {
  applyStoredTheme();
  rebuildAllItems();

  // Paint the UI immediately from the static catalog…
  buildSidebar();
  buildHomeCards();
  buildStudyPath();
  buildContinueReading();
  if (!parseDocHash()) showHome({ fromHistory: true });

  // …then discover dynamic content (source PDFs, infographics, videos)
  // in parallel and refresh the UI once, instead of a serial waterfall.
  await Promise.all([
    populateSourceDocumentsSection().catch((e) => console.warn("Could not auto-load source PDFs:", e)),
    populateInfographicsSection().catch((e) => console.warn("Could not auto-load infographics:", e)),
    populateVideoSection().catch((e) => console.warn("Could not load video library:", e)),
  ]);
  buildSidebar();
  buildHomeCards();

  // Deep link: if the URL names a document, open it now that the
  // full catalog (including discovered items) is available.
  const deepLink = parseDocHash();
  if (deepLink) loadDocument(deepLink, undefined, { fromHistory: true });

  // Build full-text search index + Bible symbols map in background
  requestIdleCallback ? requestIdleCallback(() => buildSearchIndex()) : setTimeout(buildSearchIndex, 2000);
  requestIdleCallback ? requestIdleCallback(() => loadBibleSymbols()) : setTimeout(loadBibleSymbols, 1500);

  // Enhanced search — full-text when index is ready, title-only otherwise
  let searchDebounce = null;
  // Enter opens the first search result; Escape dismisses the panel
  document.getElementById("nav-search").addEventListener("keydown", (e) => {
    const panel = document.getElementById("search-results-panel");
    if (e.key === "Enter") {
      const first = panel && panel.querySelector(".search-result-item[data-file]");
      if (first) { e.preventDefault(); first.click(); }
    } else if (e.key === "Escape" && panel) {
      panel.classList.remove("visible");
    }
  });
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

  // Build the translation dropdown from the registry (never hand-maintained).
  populateTranslationPill();

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
