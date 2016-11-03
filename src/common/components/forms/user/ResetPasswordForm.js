import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import FormNames from '../../../constants/FormNames';
import userAPI from '../../../api/user';
import { pushErrors } from '../../../actions/errorActions';
import { Form, FormField, FormFooter } from '../../utils/BsForm';

export const validate = (values) => {
  const errors = {};

  if (
    values.newPasswordConfirm &&
    values.newPassword !== values.newPasswordConfirm
  ) {
    errors.newPassword = errors.newPasswordConfirm = 'Password Not Matched';
  }

  if (!values.newPassword) {
    errors.newPassword = 'Required';
  }

  if (!values.newPasswordConfirm) {
    errors.newPasswordConfirm = 'Required';
  }

  return errors;
};

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(formData) {
    let { dispatch, apiEngine, routing, initialize } = this.props;
    let location = routing.locationBeforeTransitions;

    return userAPI(apiEngine)
      .resetPassword({
        ...formData,
        token: location.query.token,
      })
      .catch((err) => {
        dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        initialize({
          newPassword: '',
          newPasswordConfirm: '',
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
          <Alert bsStyle="success">
            Password Changed.
            Go to <Link to="/user/login">login page</Link> now.
          </Alert>
        )}
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
        <Field
          label="New Password"
          name="newPassword"
          component={FormField}
          type="password"
          disabled={submitSucceeded}
          placeholder="New Password"
        />
        <Field
          label="New Password Confirm"
          name="newPasswordConfirm"
          component={FormField}
          type="password"
          disabled={submitSucceeded}
          placeholder="New Password Confirm"
        />
        <FormFooter>
          <Button type="submit" disabled={pristine || submitting || invalid}>
            Reset
            {submitting && (
              <i className="fa fa-spinner fa-spin" aria-hidden="true" />
            )}
          </Button>
        </FormFooter>
      </Form>
    );
  }
};

export default reduxForm({
  form: FormNames.USER_RESET_PASSWORD,
  validate,
})(connect(state => ({
  apiEngine: state.apiEngine,
  routing: state.routing,
}))(ChangePasswordForm));
