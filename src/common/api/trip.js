export default (apiEngine) => ({
  listGuideSites: () => apiEngine.get('/api/guideSites'),
})
