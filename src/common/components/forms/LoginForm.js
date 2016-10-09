import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
// import validator from 'validator';
import userAPI from '../../api/user';
import { pushErrors } from '../../actions/errorActions';
import { loginUser } from '../../actions/userActions';
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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.login = this._login.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _login(json) {
    return this.context.store.dispatch(loginUser({
      token: json.token,
      data: json.user,
    }));
  }

  _handleSubmit(formData) {
    userAPI(this.context.store.getState().apiEngine)
      .login(formData)
      .catch((err) => {
        this.context.store.dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        if (json.isAuth) {
          this.login(json).then(() => {
            // redirect to the origin path before logging in
            const { location } = this.props;
            if (location && location.state && location.state.nextPathname) {
              this.context.router.push(location.state.nextPathname);
            } else {
              this.context.router.push('/');
            }
          });
        } else {
          this.context.store.dispatch(pushErrors([{
            title: 'User Not Exists',
            detail: 'You may type wrong email or password.',
          }]));
        }
      });
  }

  render() {
    const {
      handleSubmit,
      pristine,
      invalid,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit(this.handleSubmit)}>
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
          <Button type="submit" disabled={pristine || invalid}>
            Login
          </Button>
        </FormFooter>
      </Form>
    );
  }
};

LoginForm.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.any.isRequired,
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
