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
