require('es6-promise').polyfill();
require('isomorphic-fetch');
import getPort from '../../server/utils/getPort';
import reactCookie from 'react-cookie';

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
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()));
  },
  post: (path, param = {}) => {
    return wrapErrorHandler(fetch(BASE + path, {
      method: 'POST',
      credentials: 'same-origin',
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
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()));
  },
  getAuth: (path) => {
    const token = reactCookie.load('token');
    if (!token) {
      return getUnAuthPromise();
    }
    return wrapErrorHandler(fetch(BASE + path, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()));
  },
  postAuth: (path, param = {}) => {
    const token = reactCookie.load('token');
    if (!token) {
      return getUnAuthPromise();
    }
    return wrapErrorHandler(fetch(path, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then((res) => res.json()));
  },
};