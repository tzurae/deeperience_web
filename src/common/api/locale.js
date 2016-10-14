export default (apiEngine) => ({
  read: (locale) => apiEngine.get(`/api/locales/${locale}`),
});
