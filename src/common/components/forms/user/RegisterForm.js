import React, { Component } from 'react';
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
import { Recaptcha } from '../../fields/bases';
import {
  BsInput as Input,
  BsCheckbox as Checkbox,
} from '../../fields/adapters';
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../fields/widgets';
import configs from '../../../../../configs/project/client';

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

  if (!values.isAgreeTerms) {
    errors.isAgreeTerms = 'Required';
  }

  if (configs.recaptcha && !values.recaptcha) {
    errors.recaptcha = 'Required';
  }

  return errors;
};

let asyncValidate = (values, dispatch) => {
  return dispatch(validateForm(FormNames.USER_REGISTER, 'email', values.email))
    .then((json) => {
      let validationError = {};
      if (!json.isPassed) {
        validationError.email = json.message;
        throw validationError;
      }
    });
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(formData) {
    let { dispatch, apiEngine } = this.props;

    return userAPI(apiEngine)
      .register(formData)
      .catch((err) => {
        dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        dispatch(push('/user/login'));
      });
  }

  render() {
    const {
      handleSubmit,
      submitFailed,
      error,
      pristine,
      asyncValidating,
      submitting,
      invalid,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
        <Field
          name="name"
          component={FormField}
          label="Name"
          adapter={Input}
          type="text"
          placeholder="Name"
        />
        <Field
          name="email"
          component={FormField}
          label="Email"
          adapter={Input}
          type="text"
          placeholder="Email"
        />
        <Field
          name="password"
          component={FormField}
          label="Password"
          adapter={Input}
          type="password"
          placeholder="Password"
        />
        <Field
          name="isAgreeTerms"
          component={FormField}
          label=""
          adapter={Checkbox}
          text={<span>I agree the <a href="#">terms</a></span>}
        />
        <Field
          name="recaptcha"
          component={FormField}
          label=""
          adapter={Recaptcha}
        />
        <FormFooter>
          <Button
            type="submit"
            disabled={pristine || !!asyncValidating || submitting || invalid}
          >
            Register
          </Button>
        </FormFooter>
      </Form>
    );
  }
};

export default reduxForm({
  form: FormNames.USER_REGISTER,
  initialValues: {
    slide: {
      min: 30,
      max: 40,
    },
  },
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(connect(state => ({
  apiEngine: state.apiEngine,
}))(RegisterForm));
