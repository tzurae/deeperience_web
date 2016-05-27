export default (apiEngine) => ({
  // list: () => new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(apiEngine.get('/api/todo'));
  //   }, 5000);
  // }),
  list: () => apiEngine.get('/api/todo'),
  create: (todo) => apiEngine.post('/api/todo', { data: todo }),
  remove: (id) => apiEngine.del(`/api/todo/${id}`),
});
