import configs from '../../../configs/project/server';

export default (baseURL, token) => (
  `${configs.host[process.env.NODE_ENV]}${baseURL}?token=${token}`
);
