import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import cx from 'classnames'
import FormNames from '../../../../constants/FormNames'
import Text from '../../../utils/Text'
import { BsInput as Input, BsCheckbox as Checkbox } from '../../../fields/adapters'
import { BsForm as Form, DField, BsField as FormField } from '../../../fields/widgets'
import FormButton from '../../../utils/FormButton'
import SocialLoginList from '../../../utils/SocialAuthButtonList'
import { selectFromGlobal, selectFromRouting } from '../../../../lib/selector'
import { createStructuredSelector } from 'reselect'
import styles from './styles.scss'

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

const mapStateToProps = createStructuredSelector({
  apiEngine: selectFromGlobal('apiEngine'),
  locationBeforeTransitions: selectFromRouting('locationBeforeTransitions'),
})

const FormProperties = {
  form: FormNames.USER_LOGIN,
  validate,
}

const LoginForm = props => {
  const {
    handleSubmit,
    submitFailed,
    error,
    pristine,
    submitting,
    invalid,
    login,
    className,
  } = props

  return (
    <div className={cx(styles.bg, className)}>
      <Text className={styles.title} id="nav.user.login"/>
      <div className={styles.content}>
        <Form
          defaultLabelDimensions={{ sm: 12 }}
          onSubmit={handleSubmit(login)}
        >
          {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
          <SocialLoginList login/>
          <Field
            name="email"
            component={DField}
            adapter={Input}
            type="text"
            placeholder="信箱"
            label={<Text id="login.email" isSpan={true}/>}
          />
          <Field
            name="password"
            component={DField}
            adapter={Input}
            type="password"
            placeholder="密碼"
            label={<Text id="login.password" isSpan={true}/>}
          />
          <Field
            name="rememberMe"
            component={FormField}
            adapter={Checkbox}
            type="checkbox"
            showLabel={false}
            className={styles.checkbox}
            text={<Text id="login.rememberMe" isSpan={true}/>}
          />
          <div className={styles.footer}>
            <FormButton
              type="submit"
              disabled={pristine || submitting || invalid}
              textId="nav.user.login"
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default reduxForm(FormProperties)(connect(mapStateToProps)(LoginForm))
