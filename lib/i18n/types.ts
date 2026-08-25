/**
 * Shape of the per-locale content dictionary. Every locale under /content
 * must satisfy this type, so the compiler catches missing translations
 * as soon as a new key is introduced anywhere in the UI.
 */
export interface SiteDictionary {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    agencyType: string;
    statement: string;
    location: string;
    globalNote: string;
  };
  ui: {
    skipToContent: string;
    languageSwitcherLabel: string;
    back: string;
  };
  header: {
    locationShort: string;
    nav: {
      work: string;
      services: string;
      about: string;
      thinking: string;
    };
    cta: string;
    mobileMenu: {
      openLabel: string;
      closeLabel: string;
      ariaLabel: string;
      menuEyebrow: string;
      nav: {
        work: string;
        services: string;
        about: string;
        thinking: string;
        contact: string;
      };
      social: {
        instagram: string;
        linkedin: string;
        behance: string;
        email: string;
      };
    };
  };
  hero: {
    indexLabel: string;
    /** Each line is a list of segments so a single word within a line can be accented in yellow without altering the copy. */
    headline: Array<Array<{ text: string; accent?: boolean }>>;
    primaryCta: string;
    secondaryCta: string;
    capabilities: string[];
    showreelLabel: string;
    nextSectionHint: {
      number: string;
      title: string;
    };
  };
  work: {
    indexLabel: string;
    /** Small supporting line, kept as separate lines like the hero headline. */
    supportingLines: string[];
    featuredLabel: string;
    statusOngoing: string;
    nextSectionHint: {
      number: string;
      title: string;
    };
    projects: Array<{
      number: string;
      name: string;
      services: string[];
      ongoing?: boolean;
      featured?: boolean;
    }>;
  };
  capabilities: {
    indexLabel: string;
    supportingLines: string[];
    microCopy: string;
    /** Each group is one couplet of the closing statement; only one is typically accented. */
    closingStatement: Array<{ lines: string[]; accent?: boolean }>;
    nextSectionHint: {
      number: string;
      title: string;
    };
    items: Array<{
      number: string;
      title: string;
      services: string[];
    }>;
  };
  manifesto: {
    folioNumber: string;
    /** Plain lines (no accent) — desktop and mobile recompose the breaks differently. */
    statement1: { desktop: string[]; mobile: string[] };
    /** Segmented per line so a whole line/word can be accented, same shape as hero.headline. */
    statement2: {
      desktop: Array<Array<{ text: string; accent?: boolean }>>;
      mobile: Array<Array<{ text: string; accent?: boolean }>>;
    };
    secondaryStatement: string[];
    microAnnotations: string[];
    nextSectionHint: {
      number: string;
      title: string;
    };
  };
  kite: {
    folioNumber: string;
    microLabel: string;
    primaryStatement: string[];
    citiesLabel: string;
    aboutCopy: string[];
    cities: Array<{
      name: string;
      descriptors: string[];
      coordinates: string;
    }>;
    microAnnotation: string;
    processLabel: string;
    process: Array<{ number: string; title: string }>;
    nextSectionHint: {
      number: string;
      title: string;
    };
  };
  thinking: {
    mainStatement: string[];
    articles: Array<{
      number: string;
      title: string[];
      /** Short supporting line under the title — not every article has one. */
      dek?: string;
      category: string;
      readTime: string;
      /** Reserved for a future article detail route; no page exists yet. */
      slug: string;
    }>;
    nextSectionHint: {
      number: string;
      title: string;
    };
  };
  designSystemPreview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    statusNote: string;
    sectionLabels: {
      typography: string;
      color: string;
      texture: string;
      buttons: string;
      links: string;
      numbering: string;
      borders: string;
      spacing: string;
      grid: string;
    };
    displaySampleHeadline: string;
    displaySampleSubline: string;
    bodySampleParagraph: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
}
