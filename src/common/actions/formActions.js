import formAPI from '../api/form';
import { pushErrors } from '../actions/errorActions';

export const validateForm = (formName, fieldName, value) => {
  return (dispatch, getState) => {
    return formAPI(getState().apiEngine)
      .form(formName)
      .field(fieldName, value)
      .validate()
      .catch((err) => {
        let validationError = {};
        dispatch(pushErrors(err));
        validationError[fieldName] = 'Unable to validate';
        throw validationError;
      });
  };
};
