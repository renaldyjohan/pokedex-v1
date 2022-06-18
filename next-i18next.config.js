module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
  fallbackLng: 'en',
  detection: {
    order:['htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
    caches: ['cookie'],
  }
};
