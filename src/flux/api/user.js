import fetch from '../utils/webAPIUtils';

export default {
  register: (user) => fetch.post('/api/user', user),
};
