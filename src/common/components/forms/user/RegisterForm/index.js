import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import validator from 'validator'
import cx from 'classnames'
import FormNames from '../../../../constants/FormNames'
import userAPI from '../../../../api/user'
import { pushErrors } from '../../../../reducers/error/errorActions'
import { BsInput as Input, BsCheckbox as Checkbox } from '../../../fields/adapters'
import { BsForm as Form, DField } from '../../../fields/widgets'
import configs from '../../../../../../configs/project/client'
import Text from '../../../utils/Text'
import SocialLoginList from '../../../utils/SocialAuthButtonList/index'
import FormButton from '../../../utils/FormButton'
import { selectFromGlobal } from '../../../../lib/selector'
import { createStructuredSelector } from 'reselect'
import styles from './styles.scss'

const mapStateToProps = createStructuredSelector({
  apiEngine: selectFromGlobal('apiEngine'),
})

const validate = (values) => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = 'Required'
  } else {
    if (!validator.isEmail(values.get('email'))) {
      errors.email = 'Not an email'
    }
  }

  if (!values.get('name')) {
    errors.name = 'Required'
  } else {
    const pattern = /^[a-zA-Z0-9]{6,15}$/g
    if (!pattern.test(values.name)) {
      errors.name = '暱稱必須為6至15位英文大小寫與數字組合'
    }
  }

  if (!values.get('password')) {
    errors.password = 'Required'
  } else {
    const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/g
    if (!pattern.test(values.get('password'))) {
      errors.password = '請輸入6至20碼英文大小寫與數字組合'
    }
  }

  if (!values.get('ensurePassword')) {
    errors.ensurePassword = ' Required'
  } else {
    if (values.get('password') && values.get('ensurePassword')) {
      if (values.get('password') !== values.get('ensurePassword')) {
        errors.ensurePassword = '確認密碼與密碼不相同'
      }
    }
  }

  if (!values.get('membershi')) {
    if (!values.get('isAgreeTerms')) {
      errors.isAgreeTerms = 'Required'
    }
  }

  if (configs.recaptcha && !values.get('recaptcha')) {
    errors.recaptcha = 'Required'
  }
  return errors
}

const FormProperties = {
  form: FormNames.USER_REGISTER,
  validate,
  asyncBlurFields: ['email'],
}

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(formData) {
    const { dispatch, apiEngine } = this.props
    return userAPI(apiEngine)
      .register(formData)
      .catch((err) => {
        dispatch(pushErrors(err))
        throw err
      })
      .then((json) => {
        setTimeout(dispatch(push('/user/login')), 5000)
      })
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
      valid,
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
              placeholder="重複密碼"
            />
            <Field
              name="memberShip"
              component={DField}
              adapter={Checkbox}
              type="checkbox"
              text={<Text id="register.hasRead" style={{ color: 'white' }} isSpan={true}/>}
            />
            <div className={styles.footer}>
              <FormButton
                type="submit"
                onClick={valid ? this.props.openModal : null}
                disabled={pristine || !!asyncValidating || submitting || invalid}
                textId="register.register"
              />
            </div>
          </Form>
        </div>
      </div>
    )
  }
};

export default reduxForm(FormProperties)(connect(mapStateToProps)(RegisterForm))
