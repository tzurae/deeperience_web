export default (apiEngine) => ({
  createTrip: trip => apiEngine.post('/api/trips', { data: trip }),
  listGuideSites: () => apiEngine.get('/api/sites'),
})
