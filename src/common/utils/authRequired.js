// refer to https://github.com/reactjs/react-router/blob/master/examples%2Fauth-flow%2Fapp.js
export default (store) => (nextState, replace) => {
  const { token } = store.getState().cookies;
  if (!token) {
    replace({
      pathname: '/user/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
  }
};
