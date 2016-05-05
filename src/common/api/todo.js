import api from '../utils/webAPIUtils';

export default {
  // below is an example of simulating timeout for `ssr fetch state`
  // list: () => new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(api.get('/api/todo'));
  //   }, 5000);
  // }),
  list: () => api.get('/api/todo'),
  create: (todo) => api.post('/api/todo', todo),
  remove: (id) => api.delete(`/api/todo/${id}`),
};
