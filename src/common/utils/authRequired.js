import reactCookie from 'react-cookie';

// refer to https://github.com/reactjs/react-router/blob/master/examples%2Fauth-flow%2Fapp.js
export default (nextState, replace) => {
  const token = reactCookie.load('token');
  if (!token) {
    replace({
      pathname: '/user/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
  }
};
