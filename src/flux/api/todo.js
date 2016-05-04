import api from '../utils/webAPIUtils';

export default {
  list: () => api.get('/api/todo'),
  create: (todo) => api.post('/api/todo', todo),
  remove: (id) => api.delete(`/api/todo/${id}`),
};