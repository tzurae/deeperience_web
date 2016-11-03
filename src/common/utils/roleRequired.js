export default (store) => (requiredRoles) => (nextState, replace) => {
  let { user } = store.getState().cookies;
  user = (user && JSON.parse(user)) || {};

  if (!((
    requiredRoles instanceof Array &&
    requiredRoles.indexOf(user.role) >= 0
  ) || (
    user.role === requiredRoles
  ))) {
    replace({
      pathname: '/',
    });
  }
};
