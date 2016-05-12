import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import validator from 'validator';
import BsHorizontalForm from './BsHorizontalForm';
import BsFormInput from './BsFormInput';
import BsFormButton from './BsFormButton';

const validate = (values) => {
  const errors = {};

  // if (values.email && !validator.isEmail(values.email)) {
  //   errors.email = 'Not an email';
  // }

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

const LoginForm = (props) => {
  const {
    fields: { email, password },
    handleSubmit,
  } = props;

  return (
    <BsHorizontalForm onSubmit={handleSubmit}>
      <BsFormInput
        label="Email"
        type="text"
        placeholder="Email"
        field={email}
      />
      <BsFormInput
        label="Password"
        type="password"
        placeholder="Password"
        field={password}
      />
      <BsFormButton
        type="submit"
        title="Login"
      />
    </BsHorizontalForm>
  );
};

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
  fields: [
    'email',
    'password',
  ],
  validate,
})(LoginForm);
