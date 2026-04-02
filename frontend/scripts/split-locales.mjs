/**
 * One-time extraction: splits i18n.ts, content-i18n.ts, legal-translations.ts
 * into src/locales/ui|content|legal/{lang}.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const LANGS = ["en", "tr", "pt", "fr", "es", "ja", "zh", "ko", "ar", "ru", "it"];

function extractBlock(text, lang) {
  const needle = `  ${lang}: {`;
  const start = text.indexOf(needle);
  if (start === -1) throw new Error(`Block not found: ${lang}`);
  const openBrace = start + needle.length - 1;
  let depth = 0;
  for (let i = openBrace; i < text.length; i++) {
    const c = text[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        return text.slice(openBrace, i + 1);
      }
    }
  }
  throw new Error(`Unclosed block: ${lang}`);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

const uiSrc = fs.readFileSync(path.join(root, "src/lib/i18n.ts"), "utf8");
const contentSrc = fs.readFileSync(path.join(root, "src/lib/content-i18n.ts"), "utf8");
const legalSrc = fs.readFileSync(path.join(root, "src/lib/legal-translations.ts"), "utf8");

const uiDir = path.join(root, "src/locales/ui");
const contentDir = path.join(root, "src/locales/content");
const legalDir = path.join(root, "src/locales/legal");
ensureDir(uiDir);
ensureDir(contentDir);
ensureDir(legalDir);

for (const lang of LANGS) {
  const uiBody = extractBlock(uiSrc, lang);
  const uiOut = `import type { Dictionary } from "../types";\nconst ui: Dictionary = ${uiBody};\nexport default ui;\n`;
  fs.writeFileSync(path.join(uiDir, `${lang}.ts`), uiOut);

  const contentBody = extractBlock(contentSrc, lang);
  const contentOut = `import type { ContentI18n } from "../types";\nconst content: ContentI18n = ${contentBody};\nexport default content;\n`;
  fs.writeFileSync(path.join(contentDir, `${lang}.ts`), contentOut);

  const legalBody = extractBlock(legalSrc, lang);
  const legalOut = `import type { LegalTranslations } from "../types";\nconst legal: LegalTranslations = ${legalBody};\nexport default legal;\n`;
  fs.writeFileSync(path.join(legalDir, `${lang}.ts`), legalOut);
}

console.log("Wrote", LANGS.length * 3, "locale module files.");
