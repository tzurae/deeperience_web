import fetch from '../utils/webAPIUtils';

export default {
  list: (todo) => fetch.get('/api/todo'),
  create: (todo) => fetch.post('/api/todo', todo),
  remove: (id) => fetch.delete(`/api/todo/${id}`),
};