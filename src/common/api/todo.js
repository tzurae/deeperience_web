export default (apiEngine) => ({
  // list: () => new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(apiEngine.get('/api/todo'));
  //   }, 5000);
  // }),
  list: ({ page }) => apiEngine.get('/api/todos', { params: { page } }),
  create: (todo) => apiEngine.post('/api/todos', { data: todo }),
  update: (id, todo) => apiEngine.put(`/api/todos/${id}`, { data: todo }),
  remove: (id) => apiEngine.del(`/api/todos/${id}`),
});
