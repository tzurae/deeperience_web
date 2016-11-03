import ActionTypes from '../constants/ActionTypes';
import cookie from 'cookie';
import assign from 'object-assign';

export const setCookie = (name, value, options) => {
  options = assign({
    path: '/',
  }, options);
  return (dispatch, getState) => {
    return Promise
      .resolve(dispatch({
        type: ActionTypes.SET_COOKIE,
        cookie: {
          name,
          value,
          options,
        },
      }))
      .then(() => {
        if (process.env.BROWSER) {
          document.cookie = cookie.serialize(
            name, getState().cookies[name], options);
        }
        return Promise.resolve();
      });
  };
};

export const setCookies = (cookies) => {
  return (dispatch) => {
    return Promise.all(
      Object
        .keys(cookies)
        .map((name) => dispatch(setCookie(name, cookies[name])))
    );
  };
};

export const removeCookie = (name) => {
  return (dispatch, getState) => {
    if (process.env.BROWSER) {
      return dispatch(setCookie(name, '', {
        expires: new Date(1970, 1, 1, 0, 0, 1),
      }));
    }
    return Promise.resolve();
  };
};
