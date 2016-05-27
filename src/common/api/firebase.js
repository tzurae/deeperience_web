export default (apiEngine) => ({
  readToken: () => apiEngine.get('/api/user/me/firebase/token'),
});
