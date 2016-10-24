import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
    return this.props.dispatch(loginUser({
      token: json.token,
      data: json.user,
    }));
  }

  _handleSubmit(formData) {
    // let { store } = this.context;
    let { dispatch, apiEngine } = this.props;

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
          dispatch(pushErrors([{
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
      submitting,
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
          <Button type="submit" disabled={pristine || submitting || invalid}>
            Login
          </Button>
        </FormFooter>
      </Form>
    );
  }
};

export default reduxForm({
  form: 'login',
  validate,
})(connect(state => ({
  apiEngine: state.apiEngine,
  routing: state.routing,
}))(LoginForm));
