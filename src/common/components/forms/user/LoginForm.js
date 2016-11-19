import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { pushErrors } from '../../../actions/errorActions'
import { loginUser } from '../../../actions/userActions'
import { BsInput as Input } from '../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  DField,
} from '../../fields/widgets'

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
    width: '7em',
    color: 'white',
    fontSize: '1.2em',
    marginTop: '40px',
    marginLeft: '6em',
    borderRadius: '50px',
    backgroundColor: '#FF864F',
    position: 'relative',
  },
  register: {
    width: '7em',
    color: 'white',
    fontSize: '1.2em',
    marginTop: '40px',
    marginLeft: '-3.2em',
    borderRadius: '50px',
    backgroundColor: 'transparent',
    position: 'absolute',
    border: '2px solid #FF864F',
  },
}

const validate = (values) => {
  const errors = {}

  // if (values.email && !validator.isEmail(values.email)) {
  //   errors.email = 'Not an email';
  // }

  if (!values.email) {
    errors.email = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.login = this._login.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _login(json) {
    return this.props.dispatch(loginUser({
      token: json.token,
      data: json.user,
    }))
  }

  _handleSubmit(formData) {
    // let { store } = this.context;
    const { dispatch, apiEngine, change } = this.props

    return userAPI(apiEngine)
      .login(formData)
      .catch((err) => {
        dispatch(pushErrors(err))
        throw err
      })
      .then((json) => {
        if (json.isAuth) {
          this.login(json).then(() => {
            // redirect to the origin path before logging in
            const { next } = this.props.routing.locationBeforeTransitions.query
            dispatch(push(next || '/'))
          })
        } else {
          change('password', '')
          throw new SubmissionError({
            _error: 'Login failed. You may type wrong email or password.',
          })
        }
      })
  }

  render() {
    const {
      handleSubmit,
      submitFailed,
      error,
      pristine,
      submitting,
      invalid,
    } = this.props

    return (
      <div style={style.bg}>
        <div style={style.title}> 登   入 </div>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <div style={{ padding: '0 40px' }}>
            {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
            <Field
              name="email"
              component={DField}
              label="信箱"
              adapter={Input}
              type="text"
              placeholder="信箱"
            />
            <Field
              name="password"
              component={DField}
              label="密碼"
              adapter={Input}
              type="password"
              placeholder="密碼"
            />
            <input type="checkbox" name="remember" value="remember" />
            <span style={{ color: 'white' }}> Remember Me </span>
            <FormFooter>
              <Link to="/user/register">
                <Button type="submit" disabled={false} style={style.register}>
                  註冊
                </Button>
              </Link>
              <Button type="submit" disabled={pristine || submitting || invalid} style={style.submit}>
                登入
              </Button>
            </FormFooter>
          </div>
        </Form>
      </div>
    )
  }
};

export default reduxForm({
  form: FormNames.USER_LOGIN,
  validate,
})(connect(state => ({
  apiEngine: state.apiEngine,
  routing: state.routing,
}))(LoginForm))
