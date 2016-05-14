import api from '../utils/webAPIUtils';

export default {
  show: (locale) => api.get(`/api/locale/${locale}`),
};
