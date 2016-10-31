import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
    FormNames.USER_VERIFY_EMAIL,
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

class VerifyEmailForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this._handleSubmit.bind(this);
    this.handleCancleClick = this._handleCancleClick.bind(this);
  }

  componentDidMount() {
    let { email, initialize } = this.props;

    if (email) {
      initialize({ email });
    }
  }

  _handleSubmit(formData) {
    let { dispatch, apiEngine, initialize } = this.props;

    return userAPI(apiEngine)
      .requestVerifyEmail(formData)
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

  _handleCancleClick() {
    let { onCancel, dispatch } = this.props;

    if (onCancel) {
      onCancel();
    } else {
      dispatch(push('/'));
    }
  }

  render() {
    const {
      email,
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
          disabled={Boolean(email)}
          placeholder="Email"
        />
        <Field
          label=" "
          name="recaptcha"
          component={FormField}
          type="recaptcha"
        />
        <FormFooter>
          <Button
            type="submit"
            disabled={(!email && pristine) || submitting || invalid}
          >
            Send An Email to Verify My Email Address
            {submitting && (
              <i className="fa fa-spinner fa-spin" aria-hidden="true" />
            )}
          </Button>
          <Button
            bsStyle="link"
            onClick={this.handleCancleClick}
          >
            Cancel
          </Button>
        </FormFooter>
      </Form>
    );
  }
};

VerifyEmailForm.propTypes = {
  email: PropTypes.string,
  onCancel: PropTypes.func,
};

export default reduxForm({
  form: FormNames.USER_VERIFY_EMAIL,
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(connect(state => ({
  apiEngine: state.apiEngine,
}))(VerifyEmailForm));
