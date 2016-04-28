import 'whatwg-fetch';
import getToken from './getToken';

const getUnAuthPromise = () => new Promise((resolve, reject) => {
  reject(new Error(
    'Calling authenticated required api without providing token'));
});

export default {
  get: (path) => {
    return fetch(path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  },
  post: (path, param = {}) => {
    return fetch(path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then((res) => res.json());
  },
  delete: (path) => {
    return fetch(path, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  },
  getAuth: (path) => {
    const token = getToken();
    if (!token) {
      return getUnAuthPromise();
    }
    return fetch(path, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => res.json());
  },
  postAuth: (path, param = {}) => {
    const token = getToken();
    if (!token) {
      return getUnAuthPromise();
    }
    return fetch(path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(param),
    }).then((res) => res.json());
  },
};