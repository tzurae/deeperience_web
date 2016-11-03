import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
// import validator from 'validator';
import FormNames from '../../../constants/FormNames';
import userAPI from '../../../api/user';
import { validateForm } from '../../../actions/formActions';
import { pushErrors } from '../../../actions/errorActions';
import { Form, FormField, FormFooter } from '../../utils/BsForm';
import configs from '../../../../../configs/project/client';

export let validate = (values) => {
  let errors = {};

  // if (values.email && !validator.isEmail(values.email)) {
  //   errors.email = 'Not an email';
  // }

  if (!values.email) {
    errors.email = 'Required';
  }

  if (configs.recaptcha && !values.recaptcha) {
    errors.recaptcha = 'Required';
  }

  return errors;
};

let asyncValidate = (values, dispatch) => {
  return dispatch(validateForm(
    FormNames.USER_FORGET_PASSWORD,
    'email',
    values.email
  )).then((json) => {
    let validationError = {};
    if (!json.isPassed) {
      validationError.email = json.message;
      throw validationError;
    }
  });
};

class ForgetPasswordForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(formData) {
    let { dispatch, apiEngine, initialize } = this.props;

    return userAPI(apiEngine)
      .requestResetPassword(formData)
      .catch((err) => {
        dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        initialize({
          email: '',
        });
      });
  }

  render() {
    const {
      handleSubmit,
      submitSucceeded,
      submitFailed,
      error,
      pristine,
      submitting,
      invalid,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit(this.handleSubmit)}>
        {submitSucceeded && (
          <Alert bsStyle="success">A reset link is sent</Alert>
        )}
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
        <Field
          label="Email"
          name="email"
          component={FormField}
          type="text"
          placeholder="Email"
        />
        <Field
          label=" "
          name="recaptcha"
          component={FormField}
          type="recaptcha"
        />
        <FormFooter>
          <Button type="submit" disabled={pristine || submitting || invalid}>
            Request An Email to Reset My Password
          </Button>
          <Link to="/user/login">
            <Button bsStyle="link">Cancel</Button>
          </Link>
        </FormFooter>
      </Form>
    );
  }
};

export default reduxForm({
  form: FormNames.USER_FORGET_PASSWORD,
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(connect(state => ({
  apiEngine: state.apiEngine,
}))(ForgetPasswordForm));
