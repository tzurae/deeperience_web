export default (apiEngine) => ({
  readToken: () => apiEngine.get('/api/users/me/firebase/token'),
});
