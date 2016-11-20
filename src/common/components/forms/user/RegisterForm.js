import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import validator from 'validator'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { validateForm } from '../../../actions/formActions'
import { pushErrors } from '../../../actions/errorActions'
import { BsInput as Input } from '../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  DField,
} from '../../fields/widgets'
import configs from '../../../../../configs/project/client'
import Text from '../../widgets/Text'

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else {
    if (!validator.isEmail(values.email)) {
      errors.email = 'Not an email'
    }
  }

  if (!values.name) {
    errors.name = 'Required'
  } else {
    const pattern = /^[a-zA-Z0-9]{6,15}$/g
    if (!pattern.test(values.name)) {
      errors.name = '暱稱必須為6至15位英文大小寫與數字組合'
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

  if (!values.isAgreeTerms) {
    errors.isAgreeTerms = 'Required'
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
        <div style={style.title}>
          <Text id="nav.user.register" />
        </div>
        <Form horizontal onSubmit={handleSubmit(this.handleSubmit)} style={{ margin: '0 30px' }}>
          {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
          <div style={{ padding: '0 11px' }}>
            <Field
              name="name"
              component={DField}
              label="Name"
              adapter={Input}
              type="text"
              placeholder="Name"
            />
            <Field
              name="email"
              component={DField}
              label="Email"
              adapter={Input}
              type="text"
              placeholder="Email"
            />
            <Field
              name="password"
              component={DField}
              label="Password"
              adapter={Input}
              type="password"
              placeholder="Password"
            />
            <Field
              name="ensurePassword"
              component={DField}
              label="Repeat Password"
              adapter={Input}
              type="password"
              placeholder="Repeat Password"
            />
            <input type="checkbox" name="memberShip" value="memberShip" />
            <span style={{ color: 'white' }}>
              <Text id="register.hasRead" />
            </span>
            <a href="http://www.w3schools.com/html/">
              <Text id="register.memberShip" />
            </a>
            <br />
            <FormFooter>
              <Button
                type="submit"
                onClick={this.props.openModal}
                disabled={pristine || !!asyncValidating || submitting || invalid}
                style={style.submit}
              >
                <Text id="register.register" />
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
}))(RegisterForm))
