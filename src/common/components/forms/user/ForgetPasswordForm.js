import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { validateForm } from '../../../reducers/form/formActions'
import { pushErrors } from '../../../reducers/error/errorActions'
import { Recaptcha } from '../../fields/bases'
import { BsInput as Input } from '../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../fields/widgets'
import configs from '../../../../../configs/project/client'

const mapStateToProps = (state) => {
  return {
    apiEngine: state.getIn(['global', 'apiEngine']),
  }
}

export const validate = (values) => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = 'Required'
  }

  if (configs.recaptcha && !values.get('recaptcha')) {
    errors.recaptcha = 'Required'
  }

  return errors
}

const asyncValidate = (values, dispatch) => {
  return dispatch(validateForm(
    FormNames.USER_FORGET_PASSWORD,
    'email',
    values.email
  )).then((json) => {
    const validationError = {}
    if (!json.isPassed) {
      validationError.email = json.message
      throw validationError
    }
  })
}

class ForgetPasswordForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(formData) {
    const { dispatch, apiEngine, initialize } = this.props

    return userAPI(apiEngine)
      .requestResetPassword(formData)
      .catch((err) => {
        dispatch(pushErrors(err))
        throw err
      })
      .then((json) => {
        initialize({
          email: '',
        })
      })
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
    } = this.props

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        {submitSucceeded && (
          <Alert bsStyle="success">A reset link is sent</Alert>
        )}
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
        <Field
          name="email"
          component={FormField}
          label="Email"
          adapter={Input}
          type="text"
          placeholder="Email"
        />
        <Field
          name="recaptcha"
          component={FormField}
          label=""
          adapter={Recaptcha}
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
    )
  }
};

export default reduxForm({
  form: FormNames.USER_FORGET_PASSWORD,
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(connect(mapStateToProps)(ForgetPasswordForm))
