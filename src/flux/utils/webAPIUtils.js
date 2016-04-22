import 'whatwg-fetch';

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
};