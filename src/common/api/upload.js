export default (apiEngine) => ({
  uploadImage: (img) => apiEngine.post('/api/upload/image',
    { files: { img } }
  ),
})
