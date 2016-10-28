import Errors from '../../common/constants/Errors';

export default (formPath, onlyFields = []) => (req, res, next) => {
  let { validate } = require(`../../common/components/forms/${formPath}`);
  let errors = validate(req.body);

  if (onlyFields.length > 0) {
    let newErrors = {};
    onlyFields.forEach((field) => {
      newErrors[field] = errors[field];
    });
    errors = newErrors;
  }

  if (Object.keys(errors).length > 0) {
    res.pushError(Errors.INVALID_DATA, {
      errors,
    });
    return res.errors();
  }
  next();
};
