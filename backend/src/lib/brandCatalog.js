/**
 * Trusted Brand Reference Catalog
 * Provides authoritative official brand profiles, domains, verified social handles,
 * genuine app package identifiers, and verified official reference logo assets.
 * 
 * Works without requiring user brand registration.
 */

export const TRUSTED_BRANDS = [
  {
    id: "brand_sbi",
    name: "SBI",
    fullName: "State Bank of India",
    domain: "sbi.co.in",
    domains: ["sbi.co.in", "onlinesbi.sbi", "onlinesbi.com", "sbi.bank"],
    description: "State Bank of India retail banking, net banking, and financial services",
    category: "Banking & Finance",
    referenceLogo: {
      url: "/brands/sbi.svg",
      externalUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/300px-SBI-logo.svg.png",
      sourceType: "Official Brand Asset / Reserve Registry",
      sourceUrl: "https://sbi.co.in",
      retrievedAt: "2026-03-01",
      description: "Official circular blue keyhole emblem with State Bank of India typography",
      primaryColors: ["#00B5EF", "#0A1128", "#FFFFFF"],
      expectedText: ["SBI", "STATE BANK OF INDIA", "YONO"],
      hasRequiredText: true,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#0A1128" rx="20"/><circle cx="100" cy="90" r="60" fill="#00B5EF"/><circle cx="100" cy="90" r="22" fill="#0A1128"/><rect x="94" y="90" width="12" height="52" fill="#0A1128"/><text x="100" y="175" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">STATE BANK OF INDIA</text></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "TheOfficialSBI", url: "https://x.com/TheOfficialSBI" },
      { platform: "Twitter / X", handle: "TheOfficialSBI", url: "https://x.com/TheOfficialSBI" },
      { platform: "Instagram", handle: "theofficialsbi", url: "https://instagram.com/theofficialsbi" },
      { platform: "Facebook", handle: "StateBankOfIndia", url: "https://facebook.com/StateBankOfIndia" },
      { platform: "LinkedIn", handle: "state-bank-of-india", url: "https://linkedin.com/company/state-bank-of-india" },
      { platform: "YouTube", handle: "TheOfficialSBI", url: "https://youtube.com/@TheOfficialSBI" },
    ],
    officialApps: [
      { store: "Google Play", appId: "com.sbi.lotusintouch", publisher: "State Bank of India", name: "YONO SBI: The Mobile Banking App" },
      { store: "Google Play", appId: "com.sbi.SBIFreedomPlus", publisher: "State Bank of India", name: "YONO Lite SBI" },
      { store: "Apple App Store", appId: "id1231735880", publisher: "State Bank of India", name: "YONO SBI" },
    ],
  },
  {
    id: "brand_tatadigital",
    name: "Tata Digital",
    fullName: "Tata Digital / Tata Neu",
    domain: "tatadigital.com",
    domains: ["tatadigital.com", "tata.com", "tataneu.com"],
    description: "Tata Digital rewards, shopping, UPI, and digital commerce super-app",
    category: "E-Commerce & Digital Services",
    referenceLogo: {
      url: "/brands/tatadigital.svg",
      externalUrl: "https://tatadigital.com/favicon.ico",
      sourceType: "Official Corporate Identity Guidelines",
      sourceUrl: "https://tatadigital.com",
      retrievedAt: "2026-03-01",
      description: "Official vibrant gradient T-shaped monogram and Tata Neu wordmark",
      primaryColors: ["#E94560", "#9C27B0", "#3F51B5"],
      expectedText: ["TATA NEU", "TATA DIGITAL"],
      hasRequiredText: true,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#11052C" rx="20"/><defs><linearGradient id="tataGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#E94560"/><stop offset="50%" stop-color="#9C27B0"/><stop offset="100%" stop-color="#3F51B5"/></linearGradient></defs><path d="M50 130 L50 60 L110 60 L110 80 L80 80 L80 130 Z" fill="url(#tataGrad)"/><circle cx="140" cy="80" r="22" fill="url(#tataGrad)"/><text x="100" y="172" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle">TATA NEU</text></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "TataDigitalOfficial", url: "https://x.com/TataDigitalOfficial" },
      { platform: "Twitter / X", handle: "TataDigitalOfficial", url: "https://x.com/TataDigitalOfficial" },
      { platform: "Instagram", handle: "tata_digital", url: "https://instagram.com/tata_digital" },
      { platform: "LinkedIn", handle: "tata-digital", url: "https://linkedin.com/company/tata-digital" },
    ],
    officialApps: [
      { store: "Google Play", appId: "com.tatadigital.tcp", publisher: "Tata Digital Limited", name: "Tata Neu-Reward that matters" },
      { store: "Apple App Store", appId: "id1552554035", publisher: "Tata Digital Limited", name: "Tata Neu" },
    ],
  },
  {
    id: "brand_hdfc",
    name: "HDFC Bank",
    fullName: "HDFC Bank Limited",
    domain: "hdfcbank.com",
    domains: ["hdfcbank.com", "hdfc.com"],
    description: "HDFC Bank retail banking, credit cards, loans, and netbanking",
    category: "Banking & Finance",
    referenceLogo: {
      url: "/brands/hdfc.svg",
      externalUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/300px-HDFC_Bank_Logo.svg.png",
      sourceType: "Official Brand Asset Portal",
      sourceUrl: "https://hdfcbank.com",
      retrievedAt: "2026-03-01",
      description: "Official geometric blue and red interlocking square corporate emblem",
      primaryColors: ["#004C8F", "#ED232A", "#FFFFFF"],
      expectedText: ["HDFC BANK", "HDFC"],
      hasRequiredText: true,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#FFFFFF" rx="20"/><rect x="50" y="45" width="100" height="100" fill="#004C8F" rx="8"/><rect x="70" y="65" width="60" height="60" fill="#ED232A"/><rect x="85" y="80" width="30" height="30" fill="#FFFFFF"/><text x="100" y="175" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#004C8F" text-anchor="middle">HDFC BANK</text></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "HDFCBank_Cares", url: "https://x.com/HDFCBank_Cares" },
      { platform: "X", handle: "HDFC_Bank", url: "https://x.com/HDFC_Bank" },
      { platform: "Twitter / X", handle: "HDFCBank_Cares", url: "https://x.com/HDFCBank_Cares" },
      { platform: "Instagram", handle: "hdfcbank", url: "https://instagram.com/hdfcbank" },
      { platform: "Facebook", handle: "HDFC.bank", url: "https://facebook.com/HDFC.bank" },
    ],
    officialApps: [
      { store: "Google Play", appId: "com.snapwork.hdfc", publisher: "HDFC Bank Ltd.", name: "HDFC Bank MobileBanking" },
      { store: "Apple App Store", appId: "id461717929", publisher: "HDFC Bank Ltd.", name: "HDFC Bank MobileBanking" },
    ],
  },
  {
    id: "brand_paytm",
    name: "Paytm",
    fullName: "Paytm / One97 Communications",
    domain: "paytm.com",
    domains: ["paytm.com", "paytmmall.com"],
    description: "Paytm digital payments, recharge, soundbox, and UPI services",
    category: "Fintech & Payments",
    referenceLogo: {
      url: "/brands/paytm.svg",
      externalUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/300px-Paytm_Logo_%28standalone%29.svg.png",
      sourceType: "Official Corporate Media Kit",
      sourceUrl: "https://paytm.com",
      retrievedAt: "2026-03-01",
      description: "Official dark blue 'Pay' with light cyan 'tm' wordmark logo",
      primaryColors: ["#002E6E", "#00BAF2", "#FFFFFF"],
      expectedText: ["PAYTM", "PAY TM"],
      hasRequiredText: true,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#FFFFFF" rx="20"/><rect x="25" y="60" width="150" height="80" fill="#002E6E" rx="14"/><text x="65" y="112" font-family="Arial, sans-serif" font-size="36" font-weight="900" fill="#FFFFFF">Pay</text><text x="135" y="112" font-family="Arial, sans-serif" font-size="36" font-weight="900" fill="#00BAF2">tm</text></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "Paytm", url: "https://x.com/Paytm" },
      { platform: "X", handle: "PaytmCare", url: "https://x.com/PaytmCare" },
      { platform: "Twitter / X", handle: "Paytm", url: "https://x.com/Paytm" },
      { platform: "Instagram", handle: "paytm", url: "https://instagram.com/paytm" },
      { platform: "Facebook", handle: "Paytm", url: "https://facebook.com/Paytm" },
    ],
    officialApps: [
      { store: "Google Play", appId: "net.one97.paytm", publisher: "One97 Communications Limited", name: "Paytm: Secure UPI Payments" },
      { store: "Apple App Store", appId: "id473941634", publisher: "One97 Communications Limited", name: "Paytm" },
    ],
  },
  {
    id: "brand_icici",
    name: "ICICI Bank",
    fullName: "ICICI Bank Limited",
    domain: "icicibank.com",
    domains: ["icicibank.com"],
    description: "ICICI Bank retail banking, iMobile pay, and credit cards",
    category: "Banking & Finance",
    referenceLogo: {
      url: "/brands/icici.svg",
      externalUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/300px-ICICI_Bank_Logo.svg.png",
      sourceType: "Official Corporate Media Asset",
      sourceUrl: "https://icicibank.com",
      retrievedAt: "2026-03-01",
      description: "Official orange flame roundel and bold ICICI Bank identity",
      primaryColors: ["#F37021", "#990000", "#081026"],
      expectedText: ["ICICI", "ICICI BANK"],
      hasRequiredText: true,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#081026" rx="20"/><circle cx="100" cy="80" r="45" fill="#F37021"/><circle cx="100" cy="80" r="24" fill="#990000"/><circle cx="100" cy="80" r="10" fill="#FFFFFF"/><text x="100" y="165" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#F37021" text-anchor="middle">ICICI Bank</text></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "ICICIBank", url: "https://x.com/ICICIBank" },
      { platform: "X", handle: "ICICIBank_Care", url: "https://x.com/ICICIBank_Care" },
      { platform: "Twitter / X", handle: "ICICIBank", url: "https://x.com/ICICIBank" },
      { platform: "Instagram", handle: "icicibank", url: "https://instagram.com/icicibank" },
    ],
    officialApps: [
      { store: "Google Play", appId: "com.csam.icici.bank.imobile", publisher: "ICICI Bank Ltd.", name: "iMobile Pay by ICICI Bank" },
      { store: "Apple App Store", appId: "id375276006", publisher: "ICICI Bank Ltd.", name: "iMobile Pay" },
    ],
  },
  {
    id: "brand_netflix",
    name: "Netflix",
    fullName: "Netflix, Inc.",
    domain: "netflix.com",
    domains: ["netflix.com"],
    description: "Netflix streaming entertainment service and subscription management",
    category: "Entertainment",
    referenceLogo: {
      url: "/brands/netflix.svg",
      externalUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/300px-Netflix_2015_logo.svg.png",
      sourceType: "Official Brand Asset Portal",
      sourceUrl: "https://netflix.com",
      retrievedAt: "2026-03-01",
      description: "Official red folded ribbon 'N' icon on black background",
      primaryColors: ["#E50914", "#B81D24", "#141414"],
      expectedText: ["N", "NETFLIX"],
      hasRequiredText: false,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#141414" rx="20"/><path d="M68 35 L90 35 L90 165 L68 165 Z" fill="#B81D24"/><path d="M110 35 L132 35 L132 165 L110 165 Z" fill="#B81D24"/><path d="M68 35 L132 165 L110 165 L68 35 Z" fill="#E50914"/></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "netflix", url: "https://x.com/netflix" },
      { platform: "Twitter / X", handle: "netflix", url: "https://x.com/netflix" },
      { platform: "Instagram", handle: "netflix", url: "https://instagram.com/netflix" },
      { platform: "Facebook", handle: "netflix", url: "https://facebook.com/netflix" },
    ],
    officialApps: [
      { store: "Google Play", appId: "com.netflix.mediaclient", publisher: "Netflix, Inc.", name: "Netflix" },
      { store: "Apple App Store", appId: "id363590051", publisher: "Netflix, Inc.", name: "Netflix" },
    ],
  },
  {
    id: "brand_google",
    name: "Google",
    fullName: "Google LLC / Google Pay",
    domain: "google.com",
    domains: ["google.com", "pay.google.com"],
    description: "Google search, Android, Google Pay UPI payments and cloud services",
    category: "Technology",
    referenceLogo: {
      url: "/brands/google.svg",
      externalUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/300px-Google_%22G%22_logo.svg.png",
      sourceType: "Official Google Brand Assets",
      sourceUrl: "https://google.com",
      retrievedAt: "2026-03-01",
      description: "Official 4-color Google 'G' roundel emblem",
      primaryColors: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"],
      expectedText: ["GOOGLE", "G"],
      hasRequiredText: false,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#FFFFFF" rx="20"/><path d="M140 100 C140 94 139 88 138 83 L100 83 L100 99 L123 99 C122 105 118 111 113 115 L113 128 L129 128 C138 120 140 108 140 100 Z" fill="#4285F4"/><path d="M100 141 C111 141 121 137 129 128 L113 115 C109 118 105 120 100 120 C90 120 82 113 79 104 L62 104 L62 117 C70 132 84 141 100 141 Z" fill="#34A853"/><path d="M79 104 C78 101 78 98 78 95 C78 92 78 89 79 86 L79 73 L62 73 C59 80 57 87 57 95 C57 103 59 110 62 117 L79 104 Z" fill="#FBBC05"/><path d="M100 70 C107 70 113 72 117 76 L130 63 C121 55 111 50 100 50 C84 50 70 59 62 73 L79 86 C82 77 90 70 100 70 Z" fill="#EA4335"/></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "Google", url: "https://x.com/Google" },
      { platform: "X", handle: "GoogleIndia", url: "https://x.com/GoogleIndia" },
      { platform: "Twitter / X", handle: "Google", url: "https://x.com/Google" },
      { platform: "Instagram", handle: "google", url: "https://instagram.com/google" },
    ],
    officialApps: [
      { store: "Google Play", appId: "com.google.android.apps.nbu.paisa.user", publisher: "Google LLC", name: "Google Pay: Save and Pay" },
      { store: "Apple App Store", appId: "id1193357041", publisher: "Google LLC", name: "Google Pay" },
    ],
  },
  {
    id: "brand_uidai",
    name: "Aadhaar",
    fullName: "UIDAI / Aadhaar",
    domain: "uidai.gov.in",
    domains: ["uidai.gov.in", "myaadhaar.uidai.gov.in"],
    description: "Unique Identification Authority of India (UIDAI) Aadhaar identity portal",
    category: "Government & Identity",
    referenceLogo: {
      url: "/brands/aadhaar.svg",
      externalUrl: "https://uidai.gov.in/images/Aadhaar_Logo.svg",
      sourceType: "Official UIDAI Government Portal",
      sourceUrl: "https://uidai.gov.in",
      retrievedAt: "2026-03-01",
      description: "Official red and saffron rayed sun with green Aadhaar banner",
      primaryColors: ["#F15A24", "#FFF200", "#009245"],
      expectedText: ["AADHAAR", "UIDAI"],
      hasRequiredText: true,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#FFFFFF" rx="20"/><circle cx="100" cy="80" r="42" fill="#F15A24"/><circle cx="100" cy="80" r="28" fill="#FFF200"/><circle cx="100" cy="80" r="16" fill="#F15A24"/><text x="100" y="160" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#009245" text-anchor="middle">AADHAAR</text></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "UIDAI", url: "https://x.com/UIDAI" },
      { platform: "Twitter / X", handle: "UIDAI", url: "https://x.com/UIDAI" },
      { platform: "Facebook", handle: "AadhaarOfficial", url: "https://facebook.com/AadhaarOfficial" },
      { platform: "YouTube", handle: "AadhaarOfficial", url: "https://youtube.com/@AadhaarOfficial" },
    ],
    officialApps: [
      { store: "Google Play", appId: "in.gov.uidai.mAadhaarPlus", publisher: "Unique Identification Authority of India", name: "mAadhaar" },
      { store: "Apple App Store", appId: "id1435441454", publisher: "Unique Identification Authority of India", name: "mAadhaar" },
    ],
  },
  {
    id: "brand_epfo",
    name: "EPFO",
    fullName: "Employees' Provident Fund Organisation",
    domain: "epfindia.gov.in",
    domains: ["epfindia.gov.in", "unifiedportal-mem.epfindia.gov.in"],
    description: "Employees' Provident Fund Organisation India pension & PF portal",
    category: "Government & Social Security",
    referenceLogo: {
      url: "/brands/epfo.svg",
      externalUrl: "https://epfindia.gov.in/favicon.ico",
      sourceType: "Official Government Portal",
      sourceUrl: "https://epfindia.gov.in",
      retrievedAt: "2026-03-01",
      description: "Official navy blue wheel and gear emblem with EPFO wordmark",
      primaryColors: ["#0077B6", "#90E0EF", "#0A192F"],
      expectedText: ["EPFO", "PROVIDENT FUND"],
      hasRequiredText: true,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#0A192F" rx="20"/><circle cx="100" cy="85" r="45" fill="#0077B6"/><circle cx="100" cy="85" r="30" fill="#0A192F"/><circle cx="100" cy="85" r="12" fill="#90E0EF"/><text x="100" y="165" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" text-anchor="middle">EPFO</text></svg>`,
    },
    officialSocial: [
      { platform: "X", handle: "socialepfo", url: "https://x.com/socialepfo" },
      { platform: "Twitter / X", handle: "socialepfo", url: "https://x.com/socialepfo" },
      { platform: "Facebook", handle: "socialepfo", url: "https://facebook.com/socialepfo" },
    ],
    officialApps: [
      { store: "Google Play", appId: "in.gov.umang.negd.g2c", publisher: "National e-Governance Division (NeGD)", name: "UMANG" },
    ],
  },
];

/**
 * Normalizes query string for matching
 */
function clean(str) {
  return String(str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Searches built-in trusted brand catalog by name or domain
 */
export function findCatalogBrand(query) {
  if (!query) return null;
  const qClean = clean(query);
  if (!qClean) return null;

  for (const b of TRUSTED_BRANDS) {
    if (clean(b.name) === qClean || clean(b.fullName).includes(qClean) || qClean.includes(clean(b.name))) {
      return b;
    }
    if (b.domains?.some(d => clean(d).includes(qClean) || qClean.includes(clean(d)))) {
      return b;
    }
  }
  return null;
}

/**
 * Auto-detects if candidate content resembles any trusted brand
 * Inspects: handle, displayName, app name, package id, domain, or raw text
 */
export function autoDetectBrandFromCandidate({ text, url, handle, name, appId, store }) {
  const haystack = [text, url, handle, name, appId, store].filter(Boolean).join(" ").toLowerCase();
  if (!haystack) return null;

  for (const b of TRUSTED_BRANDS) {
    const brandName = b.name.toLowerCase();
    const brandClean = clean(brandName);

    // Exact word or clean substring in candidate tokens
    const regex = new RegExp(`\\b${brandName}\\b`, "i");
    if (regex.test(haystack)) return b;

    // Check handle or appId containing brand without space
    const handleClean = clean(handle || "");
    const appIdClean = clean(appId || "");
    const nameClean = clean(name || "");

    if (handleClean.includes(brandClean) || appIdClean.includes(brandClean) || nameClean.includes(brandClean)) {
      return b;
    }

    // Check domain references
    if (b.domains?.some(d => haystack.includes(d))) {
      return b;
    }
  }

  return null;
}
