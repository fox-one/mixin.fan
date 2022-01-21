export default function ({ app }) {
  let locale = "en";
  if (navigator.language.includes("ja")) {
    locale = "ja";
  } else if (navigator.language.includes("zh")) {
    locale = "zh";
  }
  app.i18n.setLocale(locale);
}
