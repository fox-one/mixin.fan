export default function ({ app }) {
  const locale = app.$util.helper.getLocale();
  app.i18n.setLocale(locale);
}
