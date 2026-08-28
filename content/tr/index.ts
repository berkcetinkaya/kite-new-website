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
      contact: "İLETİŞİM",
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
      [{ text: "İYİ MARKALARIN" }],
      [{ text: "FAZLA GÜRÜLTÜYE" }],
      [{ text: "İHTİYACI YOK." }],
    ],
    secondaryStatement: [{ text: "GEREKEN TEK" }, { text: "ŞEY" }, { text: "YÖN.", accent: true }],
    supportingCopy: [
      "Hareket eden, bağ kuran ve büyüyen markalar inşa eden kreatif bir growth ajansıyız.",
      "—",
      "Strateji. Kreatiflik. Teknoloji. Büyüme.",
    ],
    primaryCta: "PROJENİ KONUŞALIM",
    secondaryCta: "İŞLERİMİZİ GÖR",
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
    featuredLabel: "ÖNE ÇIKAN",
    statusOngoing: "DEVAM EDİYOR",
    nextSectionHint: {
      number: "003",
      title: "NELER YAPIYORUZ",
    },
    projects: [
      {
        number: "01",
        name: "DESETOUR",
        services: ["Website", "Reklam", "Sosyal Medya", "CRM"],
      },
      {
        number: "02",
        name: "ECRU ATELIER",
        services: ["Reklam", "Sosyal Medya"],
      },
      {
        number: "03",
        name: "TITOCAR",
        services: ["Reklam Yönetimi"],
      },
      {
        number: "04",
        name: "LYXASKIN",
        services: ["Sosyal Medya", "Reklam"],
        ongoing: true,
      },
      {
        number: "05",
        name: "PETCANVAS",
        services: ["Reklam Yönetimi"],
      },
    ],
  },
  capabilities: {
    indexLabel: "NELER YAPIYORUZ",
    introStatement: "Büyümeyi tek bir hizmet olarak görmüyoruz.",
    introSupport:
      "Markanın ne söylediğinden reklamın kime ulaştığına, kullanıcının hangi sayfaya indiğinden sonrasında CRM'de ne olduğuna kadar bütün yolculuğu birlikte ele alıyoruz.",
    systemLine: ["STRATEGY", "CREATIVE", "MEDIA", "WEB", "DATA", "CRM"],
    items: [
      {
        number: "01",
        title: "STRATEJİ & GROWTH",
        statement: [
          { text: "Ne söyleyeceğimizi, kime söyleyeceğimizi ve hangi noktada " },
          { text: "neyi test edeceğimizi", accent: true },
          { text: " belirliyoruz." },
        ],
        groups: [
          {
            items: [
              "Growth Audit",
              "Pazar ve Rakip Analizi",
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
          label: "ORTAYA ÇIKANLAR",
          items: ["Growth Roadmap", "Campaign Architecture", "Messaging Framework", "Test Planı", "Channel Planı"],
        },
      },
      {
        number: "02",
        title: "PERFORMANCE MEDIA",
        statement: [
          { text: "Bütçeyi harcamak değil, " },
          { text: "doğru yere", accent: true },
          { text: " yönlendirmek." },
        ],
        supportingCopy: "Her kampanyayı tek başına değil, funnel'ın bir parçası olarak değerlendiriyoruz.",
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
          label: "ÖLÇTÜĞÜMÜZ NOKTALAR",
          items: ["CPA", "CAC", "ROAS", "CTR", "Conversion Rate", "Creative Performance", "Audience Saturation"],
        },
      },
      {
        number: "03",
        title: "CREATIVE & CONTENT",
        statement: [
          { text: "İyi creative sadece güzel görünmez. " },
          { text: "Bir şey yaptırır.", accent: true },
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
          label: "AI DESTEKLİ ÜRETİM",
          items: ["AI Imagery", "AI Video", "Rapid Prototyping", "Creative Variation", "Concept Development"],
          note: "AI üretim kapasitesini büyütür. Kararı hâlâ fikir verir.",
        },
      },
      {
        number: "04",
        title: "WEB & CONVERSION",
        statement: [
          { text: "Tıklamadan sonrası da " },
          { text: "reklamın bir parçası.", accent: true },
        ],
        supportingCopy: "Reklamın getirdiği ilgiyi, tasarlanmış bir kullanıcı yolculuğu ile dönüşüme çeviriyoruz.",
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
          { text: "Tıklamanın sonrasında ne olduğunu göremiyorsak, öncesini " },
          { text: "sağlıklı şekilde büyütemeyiz.", accent: true },
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
    title: "SORUŞTURMA",
    introLines: ["BİR MARKAYLA KARŞI KARŞIYA GELDİĞİMİZDE,", "ÖNCE ŞU 13 SORUYU SORARIZ."],
    investigationDetails: ["DURUM: İNCELENİYOR", "KANIT: DATA", "NOT: HİS YETERLİ DEĞİL"],
    questions: [
      {
        number: "01",
        question: "KİM?",
        answerLines: [[{ text: "Marka kim?" }], [{ text: "Gerçekten kim?" }]],
        label: "BRAND / POSITIONING",
      },
      {
        number: "02",
        question: "KİME?",
        answerLines: [
          [{ text: "Kime konuşuyoruz?" }],
          [{ text: "'Herkese'", accent: true }, { text: " cevap sayılmıyor." }],
        ],
        label: "AUDIENCE",
      },
      {
        number: "03",
        question: "NEYİ?",
        answerLines: [[{ text: "Aslında ne satıyoruz?" }], [{ text: "Ürünü mü, fikri mi?" }]],
        label: "OFFER",
      },
      {
        number: "04",
        question: "NİYE?",
        answerLines: [
          [{ text: "Niye senden alsın?" }],
          [{ text: "'Kaliteliyiz'", accent: true }, { text: " cevap sayılmıyor." }],
        ],
        label: "VALUE PROPOSITION",
      },
      {
        number: "05",
        question: "NEREDE?",
        answerLines: [[{ text: "Nerede karşısına çıkıyoruz?" }], [{ text: "Her yerde olmak strateji değil." }]],
        label: "CHANNEL",
      },
      {
        number: "06",
        question: "NEYLE?",
        answerLines: [
          [{ text: "Hangi creative ile?" }],
          [{ text: "Güzel olanla değil, " }, { text: "çalışanla.", accent: true }],
        ],
        label: "CREATIVE",
      },
      {
        number: "07",
        question: "NE ZAMAN?",
        answerLines: [[{ text: "Ne zaman karşısına çıkıyoruz?" }], [{ text: "Sürekli çıkmak cevap değil." }]],
        label: "TIMING / FREQUENCY",
      },
      {
        number: "08",
        question: "KAÇA?",
        answerLines: [
          [{ text: "Bir müşteriyi kaça getiriyoruz?" }],
          [{ text: "'Bütçe gidiyor'", accent: true }, { text: " metrik değil." }],
        ],
        label: "CAC / CPA",
      },
      {
        number: "09",
        question: "NEREYE?",
        answerLines: [[{ text: "Tıklayınca nereye gidiyor?" }], [{ text: "Ve orada neden kalıyor?" }]],
        label: "LANDING / CONVERSION",
      },
      {
        number: "10",
        question: "NERDE KOPTU?",
        answerLines: [[{ text: "Nerede vazgeçiyor?" }], [{ text: "Bir yerde kesin kopuyor." }]],
        label: "FUNNEL",
      },
      {
        number: "11",
        question: "KİM DÖNDÜ?",
        answerLines: [[{ text: "Kim geri geldi?" }], [{ text: "İlk satış dosyayı kapatmıyor." }]],
        label: "RETENTION / CRM",
      },
      {
        number: "12",
        question: "NE TUTTU?",
        answerLines: [[{ text: "Gerçekte ne çalıştı?" }], [{ text: "Hissettiğimiz değil.", accent: true }]],
        label: "PERFORMANCE / DATA",
      },
      {
        number: "13",
        question: "ŞİMDİ NE?",
        answerLines: [
          [{ text: "Sırada neyi değiştiriyoruz?" }],
          [{ text: "'Biraz daha bütçe'", accent: true }, { text: " tek cevap değil." }],
        ],
        label: "OPTIMISATION",
      },
    ],
    ending: [{ text: "13 sorudan 4'üne cevap verebiliyorsak," }, { text: "işin yarısı tamam.", accent: true }],
    endingNote: "Geri kalanı data halleder.",
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
