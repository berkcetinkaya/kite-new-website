import type { SiteDictionary } from "@/lib/i18n/types";

const en: SiteDictionary = {
  meta: {
    title: "KITE Growth Agency — Design System",
    description:
      "Internal preview of the editorial design system built for KITE Growth Agency.",
  },
  brand: {
    name: "KITE",
    agencyType: "GROWTH AGENCY",
    statement: "We're the wind behind your brand.",
    location: "ISTANBUL & BALI BASED",
    globalNote: "WORKING GLOBALLY",
  },
  ui: {
    skipToContent: "Skip to content",
    languageSwitcherLabel: "Switch language",
    back: "Back",
  },
  header: {
    locationShort: "ISTANBUL & BALI",
    nav: {
      work: "WORK",
      services: "SERVICES",
      about: "ABOUT",
      thinking: "THINKING",
      contact: "CONTACT",
    },
    cta: "START A PROJECT",
    mobileMenu: {
      openLabel: "Menu",
      closeLabel: "Close",
      ariaLabel: "Main menu",
      menuEyebrow: "MENU",
      nav: {
        work: "WORK",
        services: "SERVICES",
        about: "ABOUT",
        thinking: "THINKING",
        contact: "CONTACT",
      },
      social: {
        instagram: "Instagram",
        linkedin: "LinkedIn",
        behance: "Behance",
        email: "Email",
      },
    },
  },
  hero: {
    indexLabel: "HERO",
    headline: [
      [{ text: "GOOD BRANDS" }],
      [{ text: "DON'T NEED" }],
      [{ text: "MORE NOISE." }],
    ],
    secondaryStatement: [{ text: "THEY NEED" }, { text: "DIRECTION.", accent: true }],
    supportingCopy: [
      "We're a creative growth agency building brands that move, connect and grow.",
      "—",
      "Strategy. Creativity. Technology. Growth.",
    ],
    primaryCta: "LET'S TALK",
    secondaryCta: "SEE OUR WORK",
    capabilities: ["CREATIVE", "MEDIA", "WEB", "AI", "CRM"],
    showreelLabel: "PLAY SHOWREEL",
    scrollLabel: "SCROLL TO EXPLORE",
    stampLines: ["MOVE BRANDS", "FORWARD"],
    nextSectionHint: {
      number: "002",
      title: "SELECTED WORK",
      viewAllLabel: "VIEW ALL PROJECTS",
    },
  },
  work: {
    indexLabel: "SELECTED WORK",
    supportingLines: ["DIFFERENT INDUSTRIES.", "ONE QUESTION:", "THE RIGHT DIRECTION."],
    featuredLabel: "FEATURED",
    statusOngoing: "ONGOING",
    nextSectionHint: {
      number: "003",
      title: "WHAT WE DO",
    },
    projects: [
      {
        number: "01",
        name: "DESETOUR",
        services: ["Website", "Ads", "Social Media", "CRM"],
      },
      {
        number: "02",
        name: "ECRU ATELIER",
        services: ["Ads", "Social Media"],
      },
      {
        number: "03",
        name: "TITOCAR",
        services: ["Ad Management"],
      },
      {
        number: "04",
        name: "LYXASKIN",
        services: ["Social Media", "Ads"],
        ongoing: true,
      },
      {
        number: "05",
        name: "PETCANVAS",
        services: ["Ad Management"],
      },
    ],
  },
  capabilities: {
    indexLabel: "WHAT WE DO",
    introStatement: "We don't treat growth as a single service.",
    introSupport:
      "From what your brand says, to who your ads reach, to which page users land on, to what happens next in your CRM — we take on the whole journey together.",
    systemLine: ["STRATEGY", "CREATIVE", "MEDIA", "WEB", "DATA", "CRM"],
    items: [
      {
        number: "01",
        title: "STRATEGY & GROWTH",
        statement: [
          { text: "We decide what to say, who to say it to, and " },
          { text: "what to test at every stage.", accent: true },
        ],
        groups: [
          {
            items: [
              "Growth Audit",
              "Market & Competitor Analysis",
              "Audience Research",
              "Positioning",
              "Messaging",
              "Offer Strategy",
              "Campaign Planning",
              "Channel Strategy",
              "Testing Roadmap",
            ],
          },
        ],
        secondary: {
          label: "OUTPUTS",
          items: ["Growth Roadmap", "Campaign Architecture", "Messaging Framework", "Test Plan", "Channel Plan"],
        },
      },
      {
        number: "02",
        title: "PERFORMANCE MEDIA",
        statement: [
          { text: "Not spending the budget — directing it to " },
          { text: "the right place.", accent: true },
        ],
        supportingCopy: "We evaluate every campaign as part of the funnel, not on its own.",
        groups: [
          {
            items: [
              "Meta Ads",
              "Google Ads",
              "TikTok Ads",
              "YouTube",
              "Search",
              "Performance Max",
              "Retargeting",
              "Lookalike Audiences",
              "Audience Testing",
              "Creative Testing",
              "Budget Optimisation",
              "Campaign Scaling",
            ],
          },
        ],
        secondary: {
          label: "WHAT WE MEASURE",
          items: ["CPA", "CAC", "ROAS", "CTR", "Conversion Rate", "Creative Performance", "Audience Saturation"],
        },
      },
      {
        number: "03",
        title: "CREATIVE & CONTENT",
        statement: [
          { text: "Good creative doesn't just look good. " },
          { text: "It makes people act.", accent: true },
        ],
        groups: [
          {
            label: "BRAND CONTENT",
            items: [
              "Social Content",
              "Campaign Concepts",
              "Editorial Content",
              "Product Storytelling",
              "Reels",
              "Short Form Video",
              "Motion Design",
            ],
          },
          {
            label: "PERFORMANCE CREATIVE",
            items: [
              "Static Ads",
              "Motion Ads",
              "Video Ads",
              "Creative Variations",
              "Multiple Hooks",
              "Multiple Angles",
              "Retargeting Creative",
              "UGC Concepts",
            ],
          },
        ],
        secondary: {
          label: "AI-ASSISTED PRODUCTION",
          items: ["AI Imagery", "AI Video", "Rapid Prototyping", "Creative Variation", "Concept Development"],
          note: "AI scales production capacity. The idea still makes the decision.",
        },
      },
      {
        number: "04",
        title: "WEB & CONVERSION",
        statement: [
          { text: "What happens after the click is " },
          { text: "still part of the ad.", accent: true },
        ],
        supportingCopy: "We turn the attention an ad earns into conversion through a deliberately designed user journey.",
        groups: [
          {
            items: [
              "Website",
              "Landing Page",
              "E-Commerce",
              "Campaign Page",
              "Product Page",
              "UX Architecture",
              "Conversion Copy",
              "CTA Hierarchy",
              "Lead Forms",
              "Checkout Flow",
              "CRO",
              "A/B Testing",
              "Responsive Design",
            ],
          },
        ],
      },
      {
        number: "05",
        title: "DATA, CRM & LIFECYCLE",
        statement: [
          { text: "If we can't see what happens after the click, we can't " },
          { text: "grow what happens before it in a healthy way.", accent: true },
        ],
        groups: [
          { label: "MEASUREMENT", items: ["GA4", "Google Tag Manager", "Meta Pixel", "Conversions API", "Event Tracking"] },
          { label: "CRM", items: ["CRM Setup", "Lead Routing", "Customer Segmentation", "CRM Integrations"] },
          { label: "LIFECYCLE", items: ["Email Flows", "Retargeting Audiences", "Lead Nurturing", "Customer Reactivation"] },
          {
            label: "REPORTING",
            items: ["Performance Dashboards", "Channel Reporting", "Funnel Visibility", "Campaign Learning"],
          },
        ],
      },
    ],
  },
  investigation: {
    folioNumber: "004",
    title: "INVESTIGATION",
    introLines: ["WHEN WE MEET A BRAND FOR THE FIRST TIME,", "WE ASK THESE 13 QUESTIONS FIRST."],
    investigationDetails: ["STATUS: UNDER REVIEW", "EVIDENCE: DATA", "NOTE: A FEELING ISN'T ENOUGH"],
    questions: [
      {
        number: "01",
        question: "WHO?",
        answerLines: [[{ text: "Who is the brand?" }], [{ text: "Really, who?" }]],
        label: "BRAND / POSITIONING",
      },
      {
        number: "02",
        question: "TO WHOM?",
        answerLines: [
          [{ text: "Who are we talking to?" }],
          [{ text: "'Everyone'", accent: true }, { text: " doesn't count." }],
        ],
        label: "AUDIENCE",
      },
      {
        number: "03",
        question: "WHAT?",
        answerLines: [[{ text: "What are we actually selling?" }], [{ text: "The product, or the idea?" }]],
        label: "OFFER",
      },
      {
        number: "04",
        question: "WHY?",
        answerLines: [
          [{ text: "Why buy from you?" }],
          [{ text: "'We're better quality'", accent: true }, { text: " doesn't count." }],
        ],
        label: "VALUE PROPOSITION",
      },
      {
        number: "05",
        question: "WHERE?",
        answerLines: [[{ text: "Where do we show up?" }], [{ text: "Being everywhere isn't a strategy." }]],
        label: "CHANNEL",
      },
      {
        number: "06",
        question: "WITH WHAT?",
        answerLines: [
          [{ text: "With which creative?" }],
          [{ text: "Not the pretty one — " }, { text: "the one that works.", accent: true }],
        ],
        label: "CREATIVE",
      },
      {
        number: "07",
        question: "WHEN?",
        answerLines: [[{ text: "When do we show up?" }], [{ text: "Showing up constantly isn't an answer." }]],
        label: "TIMING / FREQUENCY",
      },
      {
        number: "08",
        question: "AT WHAT COST?",
        answerLines: [
          [{ text: "What does one customer cost us?" }],
          [{ text: "'The budget's going'", accent: true }, { text: " isn't a metric." }],
        ],
        label: "CAC / CPA",
      },
      {
        number: "09",
        question: "TO WHERE?",
        answerLines: [[{ text: "Where does the click go?" }], [{ text: "And why does it stay there?" }]],
        label: "LANDING / CONVERSION",
      },
      {
        number: "10",
        question: "WHERE DID IT BREAK?",
        answerLines: [[{ text: "Where do they give up?" }], [{ text: "Somewhere, it always breaks." }]],
        label: "FUNNEL",
      },
      {
        number: "11",
        question: "WHO CAME BACK?",
        answerLines: [[{ text: "Who came back?" }], [{ text: "The first sale doesn't close the file." }]],
        label: "RETENTION / CRM",
      },
      {
        number: "12",
        question: "WHAT ACTUALLY WORKED?",
        answerLines: [[{ text: "What actually worked?" }], [{ text: "Not what it felt like.", accent: true }]],
        label: "PERFORMANCE / DATA",
      },
      {
        number: "13",
        question: "NOW WHAT?",
        answerLines: [
          [{ text: "What do we change next?" }],
          [{ text: "'A bit more budget'", accent: true }, { text: " isn't the only answer." }],
        ],
        label: "OPTIMISATION",
      },
    ],
    ending: [{ text: "If the answers aren't clear," }, { text: "we don't touch the budget.", accent: true }],
    endingNote: "Now we can start.",
  },
  kite: {
    folioNumber: "005",
    microLabel: "INDEPENDENT CREATIVE GROWTH AGENCY",
    primaryStatement: ["TWO CITIES.", "TWO DIFFERENT ENERGIES.", "ONE DIRECTION."],
    citiesLabel: "ISTANBUL × BALI",
    aboutCopy: [
      "KITE is an independent growth agency that brings strategy, creative, media and technology to the same table.",
      "We don't just want brands to be seen more — we want them to be seen right, to work smarter, and to grow sustainably.",
    ],
    cities: [
      {
        name: "ISTANBUL",
        descriptors: ["Strategy.", "Tempo.", "Culture.", "Momentum."],
        coordinates: "41.0082° N / 28.9784° E",
      },
      {
        name: "BALI",
        descriptors: ["Perspective.", "Creativity.", "Space.", "Freedom."],
        coordinates: "8.3405° S / 115.0920° E",
      },
    ],
    microAnnotation: "UTC+3 / UTC+8",
    processLabel: "HOW WE WORK",
    process: [
      { number: "01", title: "UNDERSTAND" },
      { number: "02", title: "SET DIRECTION" },
      { number: "03", title: "PRODUCE" },
      { number: "04", title: "PUBLISH" },
      { number: "05", title: "MEASURE & IMPROVE" },
    ],
    nextSectionHint: {
      number: "006",
      title: "THINKING",
    },
  },
  thinking: {
    mainStatement: ["IDEAS ARE PART", "OF GROWTH", "TOO."],
    articles: [
      {
        number: "01",
        title: ["STRATEGY COMES BEFORE CREATIVE."],
        dek: "Because good design can't save the wrong direction.",
        category: "STRATEGY",
        readTime: "5 MIN",
        slug: "strategy-comes-before-creative",
      },
      {
        number: "02",
        title: ["THE NEW RULES OF", "PERFORMANCE MARKETING."],
        category: "PERFORMANCE",
        readTime: "7 MIN",
        slug: "the-new-rules-of-performance-marketing",
      },
      {
        number: "03",
        title: ["AI ISN'T THE FUTURE.", "IT'S TODAY'S TOOL."],
        category: "AI & TECHNOLOGY",
        readTime: "4 MIN",
        slug: "ai-isnt-the-future-its-todays-tool",
      },
    ],
    nextSectionHint: {
      number: "007",
      title: "LET'S WORK TOGETHER",
    },
  },
  finalCta: {
    folioNumber: "007",
    mainStatement: ["LET'S BUILD", "SOMETHING", "GOOD TOGETHER."],
    secondaryLine: ["Wherever your brand wants to go,", "let's turn the wind that way."],
    ctaLabel: "START A PROJECT",
  },
  footer: {
    copyright: "© KITE GROWTH AGENCY",
    privacy: "Privacy",
    terms: "Terms",
  },
  designSystemPreview: {
    eyebrow: "INTERNAL PREVIEW",
    title: "Design System",
    subtitle:
      "This is not the homepage. It's an editorial breakdown of the typography, color, component and layout foundations.",
    statusNote: "The homepage has not been built yet — sections will be approved one at a time.",
    sectionLabels: {
      typography: "TYPOGRAPHY",
      color: "COLOR SYSTEM",
      texture: "PAPER TEXTURE",
      buttons: "BUTTONS",
      links: "TEXT LINKS",
      numbering: "SECTION NUMBERING",
      borders: "BORDER LANGUAGE",
      spacing: "SPACING SYSTEM",
      grid: "GRID BEHAVIOR",
    },
    displaySampleHeadline: "TYPOGRAPHY IS STRUCTURE.",
    displaySampleSubline: "THIS IS A DISPLAY SPECIMEN.",
    bodySampleParagraph:
      "This is a body copy sample. Its purpose is to demonstrate interface typography readability and editorial rhythm across scales.",
    primaryCtaLabel: "PRIMARY CTA",
    secondaryCtaLabel: "SECONDARY CTA",
  },
};

export default en;
