import fetch from '../utils/webAPIUtils';

export default {
  create: (todo) => fetch.post('/api/todo', todo),
};