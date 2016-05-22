import api from '../utils/webAPIUtils';

export default {
  readToken: () => api.getAuth('/api/user/me/firebase/token'),
};
