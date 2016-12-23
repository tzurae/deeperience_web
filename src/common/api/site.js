export default (apiEngine) => ({
  createSite: site => apiEngine.post('/api/sites', { data: site }),
})
