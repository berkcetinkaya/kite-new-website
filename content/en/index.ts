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
      [{ text: "WE'RE THE " }, { text: "WIND", accent: true }],
      [{ text: "BEHIND YOUR" }],
      [{ text: "BRAND." }],
    ],
    primaryCta: "LET'S TALK",
    secondaryCta: "SELECTED WORK",
    capabilities: ["CREATIVE", "MEDIA", "WEB", "AI", "CRM"],
    showreelLabel: "PLAY SHOWREEL",
    nextSectionHint: {
      number: "002",
      title: "SELECTED WORK",
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
        services: ["Website", "Advertising", "Social Media", "CRM Systems"],
        featured: true,
      },
      {
        number: "02",
        name: "ECRUATELIER",
        services: ["Advertising", "Social Media"],
      },
      {
        number: "03",
        name: "TITOCAR",
        services: ["Advertising"],
      },
      {
        number: "04",
        name: "LYXASKIN",
        services: ["Social Media", "Advertising"],
        ongoing: true,
      },
      {
        number: "05",
        name: "PETCANVAS",
        services: ["Advertising"],
      },
    ],
  },
  capabilities: {
    indexLabel: "WHAT WE DO",
    supportingLines: ["WE BUILD THE SYSTEM", "YOUR BRAND NEEDS", "TO GROW DIGITALLY."],
    microCopy: "WE RUN STRATEGY, CREATIVE AND TECHNOLOGY IN ONE DIRECTION.",
    closingStatement: [
      { lines: ["FROM IDEA", "TO INFRASTRUCTURE."] },
      { lines: ["FROM CREATIVE", "TO GROWTH."] },
      { lines: ["ONE SINGLE", "DIRECTION."], accent: true },
    ],
    nextSectionHint: {
      number: "004",
      title: "MANIFESTO",
    },
    items: [
      {
        number: "01",
        title: "STRATEGY & CREATIVE",
        services: ["Brand Strategy", "Creative Direction", "Social Media", "Content Production", "AI Image & Video"],
      },
      {
        number: "02",
        title: "MEDIA & PERFORMANCE",
        services: ["Meta Ads", "Google Ads", "TikTok Ads", "Media Planning", "Performance Optimization"],
      },
      {
        number: "03",
        title: "WEB & DIGITAL EXPERIENCE",
        services: ["Websites", "Landing Pages", "UI / UX", "Conversion Design", "Digital Experiences"],
      },
      {
        number: "04",
        title: "AI & AUTOMATION",
        services: [
          "AI Assistants",
          "Content Systems",
          "Workflow Automations",
          "Lead Automations",
          "AI-Powered Business Systems",
        ],
      },
      {
        number: "05",
        title: "CRM & GROWTH SYSTEMS",
        services: ["CRM Setup", "Lead Management", "Automated Follow-up", "Customer Journeys", "Growth Infrastructure"],
      },
    ],
  },
  manifesto: {
    folioNumber: "004",
    statement1: {
      desktop: ["WE'RE NOT HERE", "TO MAKE MORE", "NOISE."],
      mobile: ["WE'RE NOT", "HERE TO MAKE", "MORE NOISE."],
    },
    statement2: {
      desktop: [
        [{ text: "WE'RE HERE TO" }],
        [{ text: "MOVE BRANDS", accent: true }],
        [{ text: "FORWARD." }],
      ],
      mobile: [
        [{ text: "WE'RE HERE" }],
        [{ text: "TO MOVE", accent: true }],
        [{ text: "BRANDS", accent: true }, { text: " FORWARD." }],
      ],
    },
    secondaryStatement: ["WE RUN STRATEGY, CREATIVE", "AND TECHNOLOGY", "IN ONE DIRECTION."],
    microAnnotations: ["ISTANBUL × BALI", "WORKING GLOBALLY"],
    nextSectionHint: {
      number: "005",
      title: "KITE",
    },
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
