import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import validator from 'validator';
import BsHorizontalForm from '../bs/HorizontalForm';
import BsFormInput from '../bs/FormInput';
import BsFormButton from '../bs/FormButton';
import userAPI from '../../../api/user';

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

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this._handleSubmit = ::this._handleSubmit;
  }

  _handleSubmit(formData) {
    userAPI
      .register(formData)
      .catch((err) => {
        alert('Register user fail');
        throw err;
      })
      .then((json) => {
        this.context.router.push('/');
      });
  }

  render() {
    const {
      fields: { name, email, password },
      handleSubmit,
    } = this.props;

    return (
      <BsHorizontalForm onSubmit={handleSubmit(this._handleSubmit)}>
        <BsFormInput
          label="Name"
          type="text"
          placeholder="Name"
          field={name}
        />
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
          title="Register"
        />
      </BsHorizontalForm>
    );
  }
};

RegisterForm.contextTypes = {
  router: React.PropTypes.any.isRequired,
};

RegisterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'register',
  fields: [
    'name',
    'email',
    'password',
  ],
  validate,
})(RegisterForm);
