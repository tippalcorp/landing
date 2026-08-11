import en from "./en.json";
import es from "./es.json";

const dicts: Record<string, Record<string, string>> = {
  en,
  es,
};

/**
 * Look up a localized string by locale and dotted key.
 * Falls back to English, then to the raw key if neither dictionary has it.
 *
 * Usage in pages/layouts:
 *   import { t } from "../i18n/t";
 *   const label = t(Astro.props.lang ?? "en", "chrome.lastUpdated");
 */
export function t(locale: string, key: string): string {
  const dict = dicts[locale] ?? dicts.en;
  return dict[key] ?? en[key] ?? key;
}