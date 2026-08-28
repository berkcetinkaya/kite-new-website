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
      contact: string;
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
    /** Short two-line couplet under the primary headline's rule — each line is fully one color, unlike headline's per-segment accents. */
    secondaryStatement: Array<{ text: string; accent?: boolean }>;
    supportingCopy: string[];
    primaryCta: string;
    secondaryCta: string;
    capabilities: string[];
    showreelLabel: string;
    /** Vertical "scroll to explore" edge label beside the artwork. */
    scrollLabel: string;
    /** Two-line circular stamp overlaid on the artwork. */
    stampLines: string[];
    nextSectionHint: {
      number: string;
      title: string;
      viewAllLabel: string;
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
    /** Large editorial opening statement — the transition from Selected Work into the capability index. */
    introStatement: string;
    introSupport: string;
    /** Small system/index line under the intro — discipline tokens, not a slogan. */
    systemLine: string[];
    /**
     * One editorial "chapter" per discipline. `groups` holds the capability
     * list — a single unlabelled group for a flat list, or several labelled
     * groups when a discipline splits internally (e.g. Creative's Brand
     * Content vs Performance Creative). `secondary` is the smaller layer
     * some chapters carry beneath the main list (outputs, what's measured,
     * the AI production note) — omitted entirely where there isn't one.
     */
    items: Array<{
      number: string;
      title: string;
      /** Segmented like the hero headline — one fragment per chapter may carry the kite accent, the rest stays plain. */
      statement: Array<{ text: string; accent?: boolean }>;
      supportingCopy?: string;
      groups: Array<{ label?: string; items: string[] }>;
      secondary?: { label: string; items: string[]; note?: string };
    }>;
  };
  /**
   * "004 / SORUŞTURMA" — the interrogation board replacing the old closing
   * manifesto block at the bottom of the capabilities section. Tonally
   * distinct from the rest of the homepage on purpose: dry, blunt, fast.
   */
  investigation: {
    folioNumber: string;
    title: string;
    /** Explicit line breaks, like the hero headline — not left to wrap. */
    introLines: string[];
    /** Two or three tiny annotations scattered sparingly around the layout — never all at once. */
    investigationDetails: string[];
    questions: Array<{
      number: string;
      question: string;
      /** Two short lines, each segmented so a punchline fragment can carry the kite accent — same shape as hero.headline. */
      answerLines: Array<Array<{ text: string; accent?: boolean }>>;
      label: string;
    }>;
    /** Two lines; only the second is typically accented. */
    ending: Array<{ text: string; accent?: boolean }>;
    endingNote: string;
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
  finalCta: {
    folioNumber: string;
    mainStatement: string[];
    secondaryLine: string[];
    ctaLabel: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
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
