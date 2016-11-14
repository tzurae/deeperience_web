import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import { Field, reduxForm } from 'redux-form'
import { reduxForm } from 'redux-form'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import validator from 'validator'
import DField from '../../utils/DField'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { validateForm } from '../../../actions/formActions'
import { pushErrors } from '../../../actions/errorActions'
// import { Form, FormField, FormFooter } from '../../utils/BsForm'
import { Form, FormFooter } from '../../utils/BsForm'
import configs from '../../../../../configs/project/client'

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else {
    if (!validator.isEmail(values.email)) {
      errors.email = 'Not an email'
    } else {
      const pattern = /^[a-zA-Z0-9]{6,15}$/g
      if (!pattern.test(values.email.split('@')[0])) {
        errors.email = '信箱帳號必須為6至15位英文大小寫與數字組合'
      }
    }
  }

  if (!values.password) {
    errors.password = 'Required'
  } else {
    const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/g
    if (!pattern.test(values.password)) {
      errors.password = '請輸入6至20碼英文大小寫與數字組合'
    }
  }

  if (configs.recaptcha && !values.recaptcha) {
    errors.recaptcha = 'Required'
  }

  if (values.password && values.ensurePassword) {
    if (values.password !== values.ensurePassword) {
      errors.ensurePassword = '確認密碼與密碼不相同'
    }
  }

  return errors
}

const asyncValidate = (values, dispatch) => {
  return dispatch(validateForm(FormNames.USER_REGISTER, 'email', values.email))
    .then((json) => {
      const validationError = {}
      if (!json.isPassed) {
        validationError.email = json.message
        throw validationError
      }
    })
}

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
    marginTop: '40px',
    marginLeft: '0.9em',
    borderRadius: '50px',
    backgroundColor: '#FF864F',
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
        dispatch(push('/user/login'))
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
    } = this.props

    return (
      <div style={style.bg}>
        <div style={style.title}> 註   冊 </div>
        <Form horizontal onSubmit={handleSubmit(this.handleSubmit)} style={{ marginLeft: '30px' }}>
          {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
          <div style={{ paddingLeft: '11px' }}>
            <DField name="name" />
            <DField name="email" />
            <DField name="password" type="password" />
            <DField name="ensurePassword" type="password" />
            {/*
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
                label=" "
                name="recaptcha"
                component={FormField}
                type="recaptcha"
              />
            */}
            <input type="checkbox" name="memberShip" value="memberShip" />
            <span style={{ color: 'white' }}> 已詳細閱讀 </span>
            <a href="http://www.w3schools.com/html/">會員條款</a>
            <br />
            <FormFooter>
              <Button
                type="submit"
                onClick={this.props.openModal}
                disabled={pristine || !!asyncValidating || submitting || invalid}
                style={style.submit}
              >
                註冊
              </Button>
            </FormFooter>
          </div>
        </Form>
      </div>
    )
  }
};

export default reduxForm({
  form: FormNames.USER_REGISTER,
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(connect(state => ({
  apiEngine: state.apiEngine,
}))(RegisterForm))
