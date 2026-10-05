import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const logo = (await readFile(new URL("../public/assets/logo.png", import.meta.url))).toString("base64");

function socialCard(language) {
  const copy = language === "es"
    ? {
        headline: "La gratitud es humana.",
        subhead: "Sin presión.",
        description: "Envía gratitud digital en persona.",
        screenTitle: "Un pequeño gracias",
      }
    : {
        headline: "Gratitude is human.",
        subhead: "No pressure.",
        description: "Send a digital thank-you, in person.",
        screenTitle: "A little thank-you",
      };

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3e8ff"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
      <linearGradient id="phone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8a2be2"/><stop offset="1" stop-color="#30006a"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="#007fff" stop-opacity=".24"/><stop offset="1" stop-color="#007fff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#background)"/>
    <circle cx="1080" cy="95" r="260" fill="url(#glow)"/>
    <circle cx="1125" cy="535" r="190" fill="#fff52d" opacity=".54"/>
    <image href="data:image/png;base64,${logo}" x="54" y="22" width="300" height="200" preserveAspectRatio="xMidYMid meet"/>
    <text x="86" y="316" fill="#30006a" font-family="Arial, sans-serif" font-size="58" font-weight="700">${copy.headline}</text>
    <text x="86" y="384" fill="#8a2be2" font-family="Arial, sans-serif" font-size="58" font-weight="700">${copy.subhead}</text>
    <text x="90" y="460" fill="#5a4a75" font-family="Arial, sans-serif" font-size="26" font-weight="600">${copy.description}</text>
    <rect x="88" y="508" width="418" height="54" rx="27" fill="#ffffff"/>
    <text x="112" y="543" fill="#30006a" font-family="Arial, sans-serif" font-size="18" font-weight="700">Tap to Pay  ·  TipPal ID  ·  QR</text>
    <rect x="790" y="55" width="324" height="520" rx="42" fill="url(#phone)"/>
    <rect x="807" y="72" width="290" height="486" rx="30" fill="#ffffff"/>
    <rect x="910" y="87" width="84" height="9" rx="4.5" fill="#d9b8ff"/>
    <circle cx="952" cy="204" r="58" fill="#ffe9e2"/>
    <path d="M952 235s-37-23-49-45c-8-15 1-34 18-34 10 0 17 6 21 12 4-6 11-12 21-12 17 0 26 19 18 34-12 22-49 45-49 45z" fill="#ff7a59"/>
    <text x="952" y="306" text-anchor="middle" fill="#30006a" font-family="Arial, sans-serif" font-size="21" font-weight="700">${copy.screenTitle}</text>
    <rect x="841" y="341" width="222" height="72" rx="18" fill="#f3e8ff"/>
    <circle cx="874" cy="377" r="17" fill="#007fff"/>
    <path d="m868 377 5 5 9-11" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="903" y="365" width="128" height="10" rx="5" fill="#30006a" opacity=".78"/>
    <rect x="903" y="384" width="86" height="8" rx="4" fill="#8a7ba3" opacity=".7"/>
    <rect x="841" y="431" width="222" height="72" rx="18" fill="#f3e8ff"/>
    <circle cx="874" cy="467" r="17" fill="#fff52d"/>
    <path d="M866 467h16M874 459v16" stroke="#30006a" stroke-width="3" stroke-linecap="round"/>
    <rect x="903" y="455" width="128" height="10" rx="5" fill="#30006a" opacity=".78"/>
    <rect x="903" y="474" width="106" height="8" rx="4" fill="#8a7ba3" opacity=".7"/>
    <text x="1125" y="606" text-anchor="end" fill="#5a4a75" font-family="Arial, sans-serif" font-size="14" font-weight="700">TipPal</text>
  </svg>`;
}

const cards = [
  ["en", fileURLToPath(new URL("../public/og.png", import.meta.url))],
  ["es", fileURLToPath(new URL("../public/og-es.png", import.meta.url))],
];

for (const [language, output] of cards) {
  await sharp(Buffer.from(socialCard(language))).png().toFile(output);
}
