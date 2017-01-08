import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import validator from 'validator'
import cx from 'classnames'
import Spinner from '../../../utils/Spinner'
import { validateForm } from '../../../../reducers/form/formActions'
import FormNames from '../../../../constants/FormNames'
import { BsInput as Input, BsCheckbox as Checkbox } from '../../../fields/adapters'
import { BsForm as Form, BsField as FormField, DField } from '../../../fields/widgets'
import configs from '../../../../../../configs/project/client'
import Text from '../../../utils/Text'
import SocialLoginList from '../../../utils/SocialAuthButtonList/index'
import FormButton from '../../../utils/FormButton'
import styles from './styles.scss'

const validate = values => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = '必填'
  } else {
    if (!validator.isEmail(values.get('email'))) {
      errors.email = '非信箱格式'
    }
  }

  if (!values.get('name')) {
    errors.name = '必填'
  } else {
    const pattern = /^[a-zA-Z0-9]{6,15}$/g
    if (!pattern.test(values.name)) {
      errors.name = '6至15位英數字組合'
    }
  }

  if (!values.get('password')) {
    errors.password = '必填'
  } else {
    const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/g
    if (!pattern.test(values.get('password'))) {
      errors.password = '6至20位英數字組合'
    }
  }

  if (!values.get('ensurePassword')) {
    errors.ensurePassword = '必填'
  } else {
    if (values.get('password') && values.get('ensurePassword')) {
      if (values.get('password') !== values.get('ensurePassword')) {
        errors.ensurePassword = '確認密碼與密碼不相同'
      }
    }
  }

  if (!values.get('membership')) {
    errors.membership = '請同意'
  }

  if (configs.recaptcha && !values.get('recaptcha')) {
    errors.recaptcha = '請打勾'
  }
  return errors
}

const asyncValidate = (values, dispatch) => {
  return dispatch(validateForm(FormNames.USER_REGISTER, 'email', values.get('email')))
    .then((json) => {
      const validationError = {}
      if (!json.isPassed) {
        validationError.email = json.message
        throw validationError
      }
    })
}

const FormProperties = {
  form: FormNames.USER_REGISTER,
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
}

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = ::this._handleSubmit
  }

  _handleSubmit(formData) {
    this.props.register(formData)
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
      registerError,
      className,
    } = this.props

    return (
      <div className={cx(className, styles.bg)}>
        <div className={styles.title}>
          <Text id="nav.user.register"/>
        </div>
        <div className={styles.content}>
          <Form
            horizontal
            defaultLabelDimensions={{ sm: 12 }}
            onSubmit={handleSubmit(this.handleSubmit)}
          >
            {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
            <SocialLoginList/>
            <Field
              name="name"
              label={<Text id="user.name" isSpan={true}/>}
              component={DField}
              adapter={Input}
              type="text"
              placeholder="暱稱"
            />
            <Field
              name="email"
              label={<Text id="login.email" isSpan={true}/>}
              component={DField}
              adapter={Input}
              type="text"
              placeholder="信箱"
            />
            <Field
              name="password"
              label={<Text id="login.password" isSpan={true}/>}
              component={DField}
              adapter={Input}
              type="password"
              placeholder="密碼"
            />
            <Field
              name="ensurePassword"
              label={<Text id="login.ensurePassword" isSpan={true}/>}
              component={DField}
              adapter={Input}
              type="password"
              placeholder="確認密碼"
            />
            <Field
              name="membership"
              component={FormField}
              adapter={Checkbox}
              type="checkbox"
              className={styles.agreement}
              text={<Text id="register.hasRead" isSpan={true}/>}
              fieldDimensions={{ sm: 12 }}
            />
            {
              registerError.indexOf('USER_EXISTED') !== -1 && // registerError plain array
              <Text id="register.email.existed" className={styles.error}/>
            }
            <div className={styles.footer}>
              <FormButton
                type="submit"
                disabled={pristine || !!asyncValidating || submitting || invalid}
                textId="register.register"
              />
              <Spinner
                className={styles.spinner}
                dotClass={styles.spinnerDot}
                display={this.props.fetching}
              />
            </div>
          </Form>
        </div>
      </div>
    )
  }
};

export default reduxForm(FormProperties)(RegisterForm)
