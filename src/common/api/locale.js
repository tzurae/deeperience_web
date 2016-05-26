export default (apiEngine) => ({
  read: (locale) => apiEngine.get(`/api/locale/${locale}`),
});
