import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
// import validator from 'validator';
import userAPI from '../../api/user';
import { pushErrors } from '../../actions/errorActions';
import { Form, FormField, FormFooter } from '../utils/BsForm';

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
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(formData) {
    return userAPI(this.context.store.getState().apiEngine)
      .register(formData)
      .catch((err) => {
        this.context.store.dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        this.context.router.push('/');
      });
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          label="Name"
          name="name"
          component={FormField}
          type="text"
          placeholder="Name"
        />
        <Field
          label="Email"
          name="email"
          component={FormField}
          type="text"
          placeholder="Email"
        />
        <Field
          label="Password"
          name="password"
          component={FormField}
          type="password"
          placeholder="Password"
        />
        <FormFooter>
          <Button type="submit" disabled={pristine || submitting || invalid}>
            Register
          </Button>
        </FormFooter>
      </Form>
    );
  }
};

RegisterForm.contextTypes = {
  store: PropTypes.any.isRequired,
  router: PropTypes.any.isRequired,
};

export default reduxForm({
  form: 'register',
  validate,
})(RegisterForm);
