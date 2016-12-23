import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import validator from 'validator'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { validateForm } from '../../../reducers/form/formActions'
import { pushErrors } from '../../../reducers/error/errorActions'
import { BsInput as Input, BsCheckbox as Checkbox } from '../../fields/adapters'
import styles from '../../../styles'
import {
  BsForm as Form,
  DField,
} from '../../fields/widgets'
import configs from '../../../../../configs/project/client'
import Text from '../../utils/Text'
import SocialLoginList from '../../utils/SocialAuthButtonList'
import FormButton from '../../utils/FormButton'
import { selectSomethingFromGlobal } from '../../../lib/selector'
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  apiEngine: selectSomethingFromGlobal('apiEngine')
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

// const asyncValidate = (values, dispatch) => {
//   return dispatch(validateForm(FormNames.USER_REGISTER, 'email', values.email))
//     .then((json) => {
//       const validationError = {}
//       if (!json.isPassed) {
//         validationError.email = json.message
//         throw validationError
//       }
//     })
// }

const style = {
  bg: {
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '20px',
    backgroundColor: 'rgba(34, 34, 34, 0.55)',
  },
  title: {
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #797D80',
    marginBottom: '25px',
    paddingBottom: '10px',
  },
  submit: {
    width: '8em',
    color: 'white',
    fontSize: '1.2em',
    borderRadius: '50px',
    backgroundColor: '#FF864F',
  },
  label: {
    color: 'white',
    fontSize: styles.font.medium,
  },
  field: {
    marginTop: '5px',
    marginBottom: '15px',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10px',
  },
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
      <div className={className} style={style.bg}>
        <div style={style.title}>
          <Text id="nav.user.register" />
        </div>
        <Form horizontal onSubmit={handleSubmit(this.handleSubmit)} style={{ margin: '0 30px' }}>
          {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
          <div style={{ padding: '0 11px' }}>
            <SocialLoginList/>
            <hr />
            <Text id="user.name" style={style.label} />
            <Field
              name="name"
              component={DField}
              adapter={Input}
              type="text"
              placeholder="Name"
              style={style.field}
            />
            <Text id="login.email" style={style.label} />
            <Field
              name="email"
              component={DField}
              adapter={Input}
              type="text"
              placeholder="Email"
              style={style.field}
            />
            <Text id="login.password" style={style.label} />
            <Field
              name="password"
              component={DField}
              adapter={Input}
              type="password"
              placeholder="Password"
              style={style.field}
            />
            <Text id="login.ensurePassword" style={style.label} />
            <Field
              name="ensurePassword"
              component={DField}
              adapter={Input}
              type="password"
              placeholder="Repeat Password"
              style={style.field}
            />
            <Field
              name="memberShip"
              component={DField}
              adapter={Checkbox}
              type="checkbox"
              text={<Text id="register.hasRead" style={{ color: 'white' }} isSpan={true}/>}
            />
            <div style={style.button}>
              <FormButton
                type="submit"
                onClick={valid ? this.props.openModal : null}
                disabled={pristine || !!asyncValidating || submitting || invalid}
                textId="register.register"
              />
            </div>
          </div>
        </Form>
      </div>
    )
  }
};

export default reduxForm({
  form: FormNames.USER_REGISTER,
  validate,
  // asyncValidate,
  asyncBlurFields: ['email'],
})(connect(mapStateToProps)(RegisterForm))
