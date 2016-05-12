import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import BsHorizontalForm from './BsHorizontalForm';
import BsFormInput from './BsFormInput';
import BsFormButton from './BsFormButton';

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
})(LoginForm);
