import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import FormNames from '../../../constants/FormNames'
import Text from '../../utils/Text'
import styles from '../../../styles'
import { BsInput as Input, BsCheckbox as Checkbox } from '../../fields/adapters'
import {
  BsForm as Form,
  DField,
} from '../../fields/widgets'
import FormButton from '../../utils/FormButton'
import SocialLoginList from '../../utils/SocialAuthButtonList'
import { selectSomethingFromGlobal, selectSomethingFromRouting } from '../../../lib/selector'
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  apiEngine: selectSomethingFromGlobal('apiEngine'),
  locationBeforeTransitions: selectSomethingFromRouting('locationBeforeTransitions')
})

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
  register: {
    width: '7em',
    color: 'white',
    fontSize: '1.2em',
    margin: '0',
    borderRadius: '50px',
    backgroundColor: 'transparent',
  },
  label: {
    color: 'white',
    fontSize: styles.font.medium,
  },
  field: {
    marginTop: '5px',
    marginBottom: '15px',
  },
}

// IMPORTANT: values is an Immutable.Map here!
const validate = (values) => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = 'Required'
  }

  if (!values.get('password')) {
    errors.password = 'Required'
  }

  return errors
}

class LoginForm extends Component {

  render() {
    const {
      handleSubmit,
      submitFailed,
      error,
      pristine,
      submitting,
      invalid,
      login,
    } = this.props

    return (
      <div style={style.bg}>
        <div style={style.title}>
          <Text id="nav.user.login"/>
        </div>
        <Form onSubmit={handleSubmit(login)}>
          <div style={{ padding: '0 40px' }}>
            {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
            <SocialLoginList login/>
            <hr/>
            <Text id="login.email" style={style.label} />
            <Field
              name="email"
              component={DField}
              adapter={Input}
              type="text"
              placeholder="信箱"
              style={style.field}
            />
            <Text id="login.password" style={style.label} />
            <Field
              name="password"
              component={DField}
              adapter={Input}
              type="password"
              placeholder="密碼"
              style={style.field}
            />
            <Field
              name="rememberMe"
              component={DField}
              adapter={Checkbox}
              type="checkbox"
              text={<Text id="login.rememberMe" style={{ color: 'white' }} isSpan={true}/>}
            />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
              <FormButton
                type="submit"
                disabled={pristine || submitting || invalid}
                textId="nav.user.login"
              />
            </div>
          </div>
        </Form>
      </div>
    )
  }
};

export default reduxForm({
  form: FormNames.USER_LOGIN,
  validate,
})(connect(mapStateToProps)(LoginForm))
