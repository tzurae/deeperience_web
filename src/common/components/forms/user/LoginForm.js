import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
// import validator from 'validator';
import FormNames from '../../../constants/FormNames';
import userAPI from '../../../api/user';
import { pushErrors } from '../../../actions/errorActions';
import { loginUser } from '../../../actions/userActions';
import { Form, FormField, FormFooter } from '../../utils/BsForm';

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
    return this.props.dispatch(loginUser({
      token: json.token,
      data: json.user,
    }));
  }

  _handleSubmit(formData) {
    // let { store } = this.context;
    let { dispatch, apiEngine, change } = this.props;

    return userAPI(apiEngine)
      .login(formData)
      .catch((err) => {
        dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        if (json.isAuth) {
          this.login(json).then(() => {
            // redirect to the origin path before logging in
            let { next } = this.props.routing.locationBeforeTransitions.query;
            dispatch(push(next || '/'));
          });
        } else {
          change('password', '');
          throw new SubmissionError({
            _error: 'Login failed. You may type wrong email or password.',
          });
        }
      });
  }

  render() {
    const {
      handleSubmit,
      submitFailed,
      error,
      pristine,
      submitting,
      invalid,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit(this.handleSubmit)}>
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
        <Field
          label=" "
          name="plaintext"
          component={FormField}
          type="plaintext"
          text="Welcome to Express-React-HMR-Boilerplate."
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
            Login
          </Button>
          <Link to="/user/password/forget">
            <Button bsStyle="link">Forget password?</Button>
          </Link>
        </FormFooter>
      </Form>
    );
  }
};

export default reduxForm({
  form: FormNames.USER_LOGIN,
  validate,
})(connect(state => ({
  apiEngine: state.apiEngine,
  routing: state.routing,
}))(LoginForm));
