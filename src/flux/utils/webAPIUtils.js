require('es6-promise').polyfill();
require('isomorphic-fetch');
import getPort from '../../server/utils/getPort';
import getToken from './getToken';

const BASE = process.env.BROWSER? '': `http://localhost:${getPort()}`;

const getUnAuthPromise = () => new Promise((resolve, reject) => {
  reject(new Error(
    'Calling authenticated required api without providing token'));
});

const wrapErrorHandler = (fetchPromise) => {
  return fetchPromise
    .then((json) => {
      if (json.isError) {
        console.error('[API Error]', json.errors);
        return Promise.reject(json.errors);
      }
      return Promise.resolve(json);
    });
};

export default {
  get: (path) => {
    return wrapErrorHandler(fetch(BASE + path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()));
  },
  post: (path, param = {}) => {
    return wrapErrorHandler(fetch(BASE + path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then((res) => res.json()));
  },
  delete: (path) => {
    return wrapErrorHandler(fetch(BASE + path, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()));
  },
  getAuth: (path) => {
    const token = getToken();
    if (!token) {
      return getUnAuthPromise();
    }
    return wrapErrorHandler(fetch(BASE + path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => res.json()));
  },
  postAuth: (path, param = {}) => {
    const token = getToken();
    if (!token) {
      return getUnAuthPromise();
    }
    return wrapErrorHandler(fetch(path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(param),
    }).then((res) => res.json()));
  },
};