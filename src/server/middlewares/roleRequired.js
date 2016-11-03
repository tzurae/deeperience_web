import Errors from '../../common/constants/Errors';

const roleRequired = (requiredRoles) => (req, res, next) => {
  if ((
    requiredRoles instanceof Array &&
    requiredRoles.indexOf(req.user.role) >= 0
  ) || (
    req.user.role === requiredRoles
  )) {
    next();
  } else {
    return res.errors([Errors.PERMISSION_DENIED]);
  }
};

export default roleRequired;
