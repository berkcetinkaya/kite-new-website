import type { SiteDictionary } from "@/lib/i18n/types";

const tr: SiteDictionary = {
  meta: {
    title: "KITE Growth Agency — Tasarım Sistemi",
    description:
      "KITE Growth Agency için geliştirilen editoryal tasarım sisteminin dahili önizlemesi.",
  },
  brand: {
    name: "KITE",
    agencyType: "GROWTH AGENCY",
    statement: "We're the wind behind your brand.",
    location: "ISTANBUL & BALI BASED",
    globalNote: "WORKING GLOBALLY",
  },
  ui: {
    skipToContent: "İçeriğe geç",
    languageSwitcherLabel: "Dili değiştir",
    back: "Geri",
  },
  header: {
    locationShort: "ISTANBUL & BALI",
    nav: {
      work: "İŞLER",
      services: "HİZMETLER",
      about: "HAKKIMIZDA",
      thinking: "THINKING",
    },
    cta: "PROJE BAŞLAT",
    mobileMenu: {
      openLabel: "Menü",
      closeLabel: "Kapat",
      ariaLabel: "Ana menü",
      menuEyebrow: "MENÜ",
      nav: {
        work: "İŞLER",
        services: "HİZMETLER",
        about: "HAKKIMIZDA",
        thinking: "THINKING",
        contact: "İLETİŞİM",
      },
      social: {
        instagram: "Instagram",
        linkedin: "LinkedIn",
        behance: "Behance",
        email: "E-posta",
      },
    },
  },
  hero: {
    indexLabel: "HERO",
    headline: [
      [{ text: "MARKANIZ NEREYE" }],
      [{ text: "GİTMEK İSTİYORSA," }],
      [{ text: "RÜZGÂRI", accent: true }, { text: " ORAYA" }],
      [{ text: "ÇEVİRİYORUZ." }],
    ],
    secondaryStatement: [{ text: "GEREKEN TEK ŞEY" }, { text: "YÖN.", accent: true }],
    supportingCopy: [
      "Markaların yönünü bulan, büyümesini hızlandıran bağımsız bir growth ajansıyız.",
      "Strateji. Kreatif. Teknoloji.",
    ],
    primaryCta: "PROJENİ KONUŞALIM",
    secondaryCta: "SEÇİLİ İŞLER",
    capabilities: ["CREATIVE", "MEDIA", "WEB", "AI", "CRM"],
    showreelLabel: "SHOWREEL İZLE",
    scrollLabel: "KEŞFETMEK İÇİN KAYDIR",
    stampLines: ["MARKALARI", "İLERİ TAŞI"],
    nextSectionHint: {
      number: "002",
      title: "SEÇİLİ İŞLER",
      viewAllLabel: "TÜM PROJELERİ GÖR",
    },
  },
  work: {
    indexLabel: "SEÇİLİ İŞLER",
    supportingLines: ["FARKLI SEKTÖRLER.", "AYNI MESELE:", "DOĞRU YÖN."],
    nextSectionHint: {
      number: "003",
      title: "NELER YAPIYORUZ",
    },
    projects: [
      { number: "01", name: "DESE TOUR", category: "TRAVEL EXPERIENCE COMPANY" },
      { number: "02", name: "ECRU ATELIER", category: "JEWELRY BRAND" },
      { number: "03", name: "ORAKL ASTROLOGY", category: "EDUCATION PLATFORM" },
      { number: "04", name: "REVO FITNESS", category: "FITNESS BRAND" },
    ],
  },
  capabilities: {
    indexLabel: "NELER YAPIYORUZ",
    supportingLines: ["MARKANIZIN DİJİTALDE", "İHTİYAÇ DUYDUĞU", "SİSTEMİ KURUYORUZ."],
    microCopy: "STRATEJİ, KREATİF VE TEKNOLOJİYİ AYNI YÖNDE ÇALIŞTIRIYORUZ.",
    closingStatement: [
      { lines: ["FİKİRDEN", "ALTYAPIYA."] },
      { lines: ["KREATİFTEN", "BÜYÜMEYE."] },
      { lines: ["TEK BİR", "YÖNDE."], accent: true },
    ],
    nextSectionHint: {
      number: "004",
      title: "MANİFESTO",
    },
    items: [
      {
        number: "01",
        title: "STRATEJİ & KREATİF",
        services: ["Marka Stratejisi", "Creative Direction", "Sosyal Medya", "İçerik Üretimi", "AI Görsel & Video"],
      },
      {
        number: "02",
        title: "MEDYA & PERFORMANS",
        services: ["Meta Ads", "Google Ads", "TikTok Ads", "Medya Planlama", "Performans Optimizasyonu"],
      },
      {
        number: "03",
        title: "WEB & DİJİTAL DENEYİM",
        services: ["Web Siteleri", "Landing Page'ler", "UI / UX", "Conversion Design", "Dijital Deneyimler"],
      },
      {
        number: "04",
        title: "AI & OTOMASYON",
        services: [
          "AI Asistanları",
          "İçerik Sistemleri",
          "İş Akışı Otomasyonları",
          "Lead Otomasyonları",
          "AI Destekli İş Sistemleri",
        ],
      },
      {
        number: "05",
        title: "CRM & GROWTH SYSTEMS",
        services: ["CRM Kurulumu", "Lead Yönetimi", "Otomatik Follow-up", "Müşteri Yolculukları", "Growth Infrastructure"],
      },
    ],
  },
  manifesto: {
    folioNumber: "004",
    statement1: {
      desktop: ["DAHA FAZLA", "SES ÇIKARMAK İÇİN", "BURADA DEĞİLİZ."],
      mobile: ["DAHA FAZLA", "SES ÇIKARMAK", "İÇİN BURADA", "DEĞİLİZ."],
    },
    statement2: {
      desktop: [
        [{ text: "MARKALARI" }],
        [{ text: "İLERİ TAŞIMAK", accent: true }],
        [{ text: "İÇİN BURADAYIZ." }],
      ],
      mobile: [
        [{ text: "MARKALARI" }],
        [{ text: "İLERİ", accent: true }],
        [{ text: "TAŞIMAK", accent: true }, { text: " İÇİN" }],
        [{ text: "BURADAYIZ." }],
      ],
    },
    secondaryStatement: ["STRATEJİYİ, KREATİFİ", "VE TEKNOLOJİYİ", "AYNI YÖNDE ÇALIŞTIRIYORUZ."],
    microAnnotations: ["ISTANBUL × BALI", "WORKING GLOBALLY"],
    nextSectionHint: {
      number: "005",
      title: "KITE",
    },
  },
  kite: {
    folioNumber: "005",
    microLabel: "INDEPENDENT CREATIVE GROWTH AGENCY",
    primaryStatement: ["İKİ ŞEHİR.", "İKİ FARKLI ENERJİ.", "TEK BİR YÖN."],
    citiesLabel: "ISTANBUL × BALI",
    aboutCopy: [
      "KITE, strateji, kreatif, medya ve teknolojiyi aynı masada buluşturan bağımsız bir growth ajansı.",
      "Markaların yalnızca daha fazla görünmesini değil, daha doğru görünmesini, daha akıllı çalışmasını ve sürdürülebilir şekilde büyümesini hedefliyoruz.",
    ],
    cities: [
      {
        name: "ISTANBUL",
        descriptors: ["Strateji.", "Tempo.", "Kültür.", "Hareket."],
        coordinates: "41.0082° N / 28.9784° E",
      },
      {
        name: "BALI",
        descriptors: ["Perspektif.", "Yaratıcılık.", "Alan.", "Özgürlük."],
        coordinates: "8.3405° S / 115.0920° E",
      },
    ],
    microAnnotation: "UTC+3 / UTC+8",
    processLabel: "NASIL ÇALIŞIYORUZ",
    process: [
      { number: "01", title: "ANLA" },
      { number: "02", title: "YÖNÜ BELİRLE" },
      { number: "03", title: "ÜRET" },
      { number: "04", title: "YAYINA AL" },
      { number: "05", title: "ÖLÇ & GELİŞTİR" },
    ],
    nextSectionHint: {
      number: "006",
      title: "THINKING",
    },
  },
  thinking: {
    mainStatement: ["FİKİRLER DE", "BÜYÜMENİN", "BİR PARÇASI."],
    articles: [
      {
        number: "01",
        title: ["STRATEJİ KREATİFTEN ÖNCE GELİR."],
        dek: "Çünkü iyi tasarım, yanlış yönü kurtaramaz.",
        category: "STRATEJİ",
        readTime: "5 MIN",
        slug: "strateji-kreatiften-once-gelir",
      },
      {
        number: "02",
        title: ["PERFORMANCE MARKETING'İN", "YENİ KURALLARI."],
        category: "PERFORMANCE",
        readTime: "7 MIN",
        slug: "performance-marketingin-yeni-kurallari",
      },
      {
        number: "03",
        title: ["AI GELECEK DEĞİL.", "BUGÜNÜN ARACI."],
        category: "AI & TECHNOLOGY",
        readTime: "4 MIN",
        slug: "ai-gelecek-degil-bugunun-araci",
      },
    ],
    nextSectionHint: {
      number: "007",
      title: "LET'S WORK TOGETHER",
    },
  },
  finalCta: {
    folioNumber: "007",
    mainStatement: ["BİRLİKTE", "İYİ BİR ŞEY", "YAPALIM."],
    secondaryLine: ["Markanız nereye gitmek istiyorsa,", "rüzgârı oraya çevirelim."],
    ctaLabel: "PROJE BAŞLAT",
  },
  footer: {
    copyright: "© KITE GROWTH AGENCY",
    privacy: "Privacy",
    terms: "Terms",
  },
  designSystemPreview: {
    eyebrow: "DAHİLİ ÖNİZLEME",
    title: "Tasarım Sistemi",
    subtitle:
      "Bu sayfa ana sayfa değildir. Tipografi, renk, bileşen ve düzen temellerinin editoryal bir dökümüdür.",
    statusNote: "Ana sayfa henüz oluşturulmadı — bölümler tek tek onaylanacaktır.",
    sectionLabels: {
      typography: "TİPOGRAFİ",
      color: "RENK SİSTEMİ",
      texture: "KAĞIT DOKUSU",
      buttons: "BUTONLAR",
      links: "METİN BAĞLANTILARI",
      numbering: "BÖLÜM NUMARALANDIRMA",
      borders: "ÇERÇEVE DİLİ",
      spacing: "BOŞLUK SİSTEMİ",
      grid: "IZGARA DAVRANIŞI",
    },
    displaySampleHeadline: "TİPOGRAFİ BİR YAPIDIR.",
    displaySampleSubline: "BU BİR GÖSTERİM METNİDİR.",
    bodySampleParagraph:
      "Bu bir gövde metni örneğidir. Amaç, arayüz tipografisinin okunabilirliğini ve editoryal ritmini farklı ölçeklerde göstermektir.",
    primaryCtaLabel: "PRIMARY CTA",
    secondaryCtaLabel: "SECONDARY CTA",
  },
};

export default tr;
