export default (apiEngine) => ({
  listGuideSites: () => apiEngine.get('/api/guideSites'),
  uploadImage: (img) => apiEngine.post('/api/trips/image', { files: { img } }),
})
