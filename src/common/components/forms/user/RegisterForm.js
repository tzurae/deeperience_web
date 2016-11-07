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
import { Form, FormField, FormFooter } from '../../utils/BsForm';
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
      <Form horizontal onSubmit={handleSubmit(this.handleSubmit)}>
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
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
        <Field
          label="Skills"
          name="skills"
          component={FormField}
          type="checkboxes"
          style={{float: 'left', paddingRight: 20}}
          options={[{
            label: 'Nodejs',
            value: 'NODEJS',
          }, {
            label: 'Reactjs',
            value: 'REACTJS',
          }, {
            label: 'Redux',
            value: 'REDUX',
          }]}
        />
        <Field
          label=" "
          name="isAgreeTerms"
          component={FormField}
          type="checkbox"
          text={<span>I agree the <a href="#">terms</a></span>}
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
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(connect(state => ({
  apiEngine: state.apiEngine,
}))(RegisterForm));
