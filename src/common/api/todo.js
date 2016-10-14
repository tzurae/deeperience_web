export default (apiEngine) => ({
  // list: () => new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(apiEngine.get('/api/todo'));
  //   }, 5000);
  // }),
  list: () => apiEngine.get('/api/todos'),
  create: (todo) => apiEngine.post('/api/todos', { data: todo }),
  remove: (id) => apiEngine.del(`/api/todos/${id}`),
});
