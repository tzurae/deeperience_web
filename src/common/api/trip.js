export default (apiEngine) => ({
  listGuideSites: () => apiEngine.get('/api/sites'),
  uploadImage: (img) => apiEngine.post('/api/trips/image',
    { files: { img } }
  ),
})
