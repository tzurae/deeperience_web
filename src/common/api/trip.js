export default (apiEngine) => ({
  listGuideSites: () => apiEngine.get('/api/guideSites'),
  uploadImage: (img, category) => apiEngine.post(`/api/trips/image/${category}`,
    { files: { img } }
  ),
})
