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
  /**
   * "005 / TEŞHİS" — the perspective shift after Soruşturma: not what Kite
   * does or how Kite thinks, but the six business problems that actually
   * bring a brand in the door. Back on the paper surface after 004's black
   * interruption. Six diagnosis rows, each carrying its own optional fields
   * (`stages`, `diagnosticQuestions`, `supportingLines`, `systemLine`) so a
   * single shared type covers every row's real content without forcing rows
   * that don't need a field to fake one — see DiagnosisRow.tsx for which
   * variant renders which combination.
   */
  diagnosis: {
    folioNumber: string;
    title: string;
    /** Explicit line breaks, like the hero headline — not left to wrap. */
    introLines: string[];
    introSupport: string;
    problems: Array<{
      number: string;
      /** Sparse diagnostic tag — most rows don't carry one. */
      label?: string;
      /** Two lines, segmented so a punch fragment can carry the kite accent. */
      statement: Array<Array<{ text: string; accent?: boolean }>>;
      secondaryLine?: string;
      /** Possible causes / diagnostic terms — absent on the finale row (06), which uses `supportingLines` + `systemLine` instead. */
      causes?: string[];
      /** Row 02 only: the DİKKAT → İLGİ → AKSİYON stage line. */
      stages?: string[];
      /** Row 05 only: small diagnostic questions under the data sources. */
      diagnosticQuestions?: string[];
      /** Row 06 only: the disconnected-systems checklist replacing a secondary line. */
      supportingLines?: string[];
      /** Row 06 only: the Creative/Media/Web/Data/CRM signal line. */
      systemLine?: string[];
      /** One or two lines, segmented like `statement`. */
      conclusion: Array<Array<{ text: string; accent?: boolean }>>;
    }>;
  };
  /**
   * "006 / SİSTEM" — answers 005's closing problem (disconnected disciplines)
   * with the operating loop that connects them: ANLA → KONUMLANDIR → ÜRET →
   * DAĞIT → DÖNÜŞTÜR → ÖĞREN, then back to ANLA. `canvasDetails` is the same
   * sparse scattered-metadata pattern as investigation.investigationDetails —
   * 1–2 tiny technical annotations on the black canvas, never more.
   */
  system: {
    folioNumber: string;
    title: string;
    /** Explicit line breaks, like the hero headline — not left to wrap. */
    introLines: string[];
    introSupport: string;
    canvasDetails: string[];
    stages: Array<{
      number: string;
      name: string;
      term: string;
      question: string;
      details: string[];
      outcome: string;
    }>;
    /** Small mobile-only note marking the 06 → 01 loop, e.g. "↳ 01'e döner." */
    loopNote: string;
    /** Three lines; only the last is typically accented. */
    closing: Array<{ text: string; accent?: boolean }>;
    closingNote: string;
  };
  /**
   * "007 / İlk 30 Gün" — what actually happens in the first month of a Kite
   * engagement, as one continuous editorial timeline rather than four cards.
   * Phases 01–03 share a shape (areas/output/note); phase 04 ("Döngü
   * Başlıyor") is structurally different on purpose — no areas or output,
   * just the loop sequence and the four standing questions — and is the
   * one deliberate black interruption, so its fields are optional rather
   * than forcing every phase into one rigid template.
   */
  firstMonth: {
    folioNumber: string;
    title: string;
    /** Two statements back to back, four lines total; one fragment carries the kite accent. */
    introLines: Array<Array<{ text: string; accent?: boolean }>>;
    introSupport: string;
    phases: Array<{
      number: string;
      timeLabel: string;
      title: string;
      statement: string;
      /** Absent on phase 04. */
      areasLabel?: string;
      areas?: string[];
      outputLabel?: string;
      output?: string;
      note?: string;
      /** Sparse operational tag — only two of the four phases carry one. */
      microLabel?: string;
      /** Phase 04 only: DATA → HİPOTEZ → CREATIVE → TEST → SONUÇ → YENİ KARAR. */
      loopSequence?: string[];
      /** Phase 04 only: the four standing questions, kept visually prominent. */
      questions?: string[];
    }>;
    /** Four lines; only the last is typically accented. */
    closing: Array<{ text: string; accent?: boolean }>;
  };
  /**
   * "008 / İşin Arkasındaki İş" — not another portfolio grid (Selected Work
   * already shows the work visually); three real client engagements shown
   * as full editorial features, one per case, alternating image side and
   * with Ecru Atelier as the section's one dark interruption. Shared field
   * labels (`scopeLabel` etc.) live once at the section level since the
   * same word heads that field on every case. No case carries invented
   * performance numbers — where hard data isn't available the content
   * stays about scope, system and what was actually built.
   */
  caseStudies: {
    folioNumber: string;
    title: string;
    /** Two statements back to back, four lines total; one fragment carries the kite accent. */
    introLines: Array<Array<{ text: string; accent?: boolean }>>;
    introSupport: string;
    scopeLabel: string;
    contextLabel: string;
    workLabel: string;
    systemLabel: string;
    ongoingLabel: string;
    cases: Array<{
      number: string;
      client: string;
      category: string;
      /** Two lines, segmented so a punch fragment can carry the kite accent. */
      statement: Array<{ text: string; accent?: boolean }>;
      context: string;
      scope: string[];
      workItems: string[];
      systemSequence: string[];
      /** "arrow" for a linear/looping flow, "plus" for parts that combine rather than proceed in sequence (Ecru). */
      systemJoiner: "arrow" | "plus";
      /** Loops the sequence's last step back to its first (Lyxaskin). */
      systemLoop?: boolean;
      /** Short editorial punch line — Desetour and Ecru only. */
      smallLine?: Array<{ text: string; accent?: boolean }>;
      /** Two-line close — Lyxaskin only. */
      closingLine?: Array<{ text: string; accent?: boolean }>;
      ongoing?: boolean;
      /** Ecru only — the section's one dark case. */
      dark?: boolean;
      imageAlign: "left" | "right";
    }>;
    /** Five lines across two statements; one fragment carries the kite accent. */
    closing: Array<{ text: string; accent?: boolean }>;
  };
  /**
   * "009 / Bizimle Nasıl Çalışabilirsiniz?" — four collaboration models, not
   * pricing tiers: no price, no "starting from", no packages. Model 01
   * (Growth Partnership) carries `priority` for its slightly stronger
   * visual treatment; model 02 (Creative Performance) carries `dark` for
   * the section's one inversion. Shared field labels live once at the
   * section level, same reasoning as caseStudies.
   */
  collaboration: {
    folioNumber: string;
    title: string;
    /** Two statements back to back, four lines total. */
    introLines: Array<Array<{ text: string; accent?: boolean }>>;
    introSupport: string;
    /** Small tag shown only on the priority model, e.g. "EN KAPSAMLI MODEL". */
    priorityLabel: string;
    bestForLabel: string;
    scopeLabel: string;
    workingModelLabel: string;
    models: Array<{
      number: string;
      title: string;
      description: string;
      bestFor: string[];
      scope: string[];
      workingModel: string;
      /** Two lines, segmented so a punch fragment can carry the kite accent. */
      smallLine: Array<{ text: string; accent?: boolean }>;
      /** Model 01 only. */
      priority?: boolean;
      /** Model 02 only — the section's one dark inversion. */
      dark?: boolean;
    }>;
    /** Three lines; only the last is typically accented. */
    ctaHeadline: Array<{ text: string; accent?: boolean }>;
    ctaSupport: string;
    ctaLabel: string;
  };
  /**
   * "010 / Bazı Şeylere İnanıyoruz" — eight editorial principles, not a
   * values page. `variant` gives each of three controlled treatments
   * ("A" left-statement/right-copy, "B" full-width statement, "C" dark
   * inversion) so eight rows don't read as eight identical rectangles;
   * exactly two (01, 04) carry `dark`. `tinyLine` is the small aside some
   * principles carry and others don't — optional rather than padded out
   * with empty strings on the rest.
   */
  principles: {
    folioNumber: string;
    title: string;
    /** Four lines, no accent. */
    introLines: string[];
    introSupport: string;
    items: Array<{
      number: string;
      /** Two or three lines, segmented so a punch line/fragment can carry the kite accent. */
      statement: Array<Array<{ text: string; accent?: boolean }>>;
      supportingCopy: string;
      technicalLabel: string;
      /** One to three short lines — present on about half the principles. */
      tinyLine?: string[];
      variant: "A" | "B" | "C";
      /** Principles 01 and 04 only — the section's two dark inversions. */
      dark?: boolean;
    }>;
    /** Five lines across two statements; one fragment (spanning a line break) carries the kite accent. */
    closing: Array<Array<{ text: string; accent?: boolean }>>;
  };
  /**
   * "011 / Neye Bakıyoruz?" — five measurement layers (Media → Creative →
   * Website → Conversion → Customer) connected by one continuous kite-
   * yellow rail, with a text loop-back note after Customer rather than a
   * literal diagram, same restraint as system.stages' return path. Each
   * layer's `variant` gives it its own visual treatment (grid / typographic
   * / journey / metric / lifecycle) so five layers don't read as five
   * identical rows; layer 04 (Conversion) is the section's one dark
   * inversion. No fake metric values anywhere — metric names are graphic
   * content, never attached to invented numbers.
   */
  measurement: {
    folioNumber: string;
    title: string;
    /** Three lines, no accent. */
    introLines: string[];
    introSupport: string;
    layers: Array<{
      number: string;
      name: string;
      /** Two lines. */
      mainQuestion: string[];
      signals: string[];
      meaning: string;
      diagnosticQuestions: string[];
      /** Two lines, segmented so a punch fragment can carry the kite accent. */
      smallLine: Array<{ text: string; accent?: boolean }>;
      variant: "grid" | "typographic" | "journey" | "metric" | "lifecycle";
      /** Layer 04 only — the section's one dark inversion. */
      dark?: boolean;
    }>;
    /** Small note after the Customer layer marking the loop back into Media — text, not a literal diagram. */
    loopNote: string;
    /** Four lines across two statements; the last two are typically accented. */
    keyStatement: Array<{ text: string; accent?: boolean }>;
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
    nextSectionHint: {
      number: string;
      title: string;
    };
  };
  thinking: {
    folioNumber: string;
    title: string;
    mainStatement: string[];
    /** Topic teasers, not published articles — no dates, authors, or reading times. */
    topics: Array<{
      number: string;
      category: string;
      statement: string[];
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
