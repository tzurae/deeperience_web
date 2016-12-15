import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { pushErrors } from '../../../reducers/error/errorActions'
import Text from '../../utils/Text'
import { BsInput as Input } from '../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
} from '../../fields/widgets'

const mapStateToProps = (state) => {
  return {
    apiEngine: state.getIn(['global', 'apiEngine']),
  }
}

const style = {
  div: {
    color: 'black',
    fontSize: '1.1em',
    marginLeft: '10px',
    marginTop: '10px',
  },
  field: {
    marginTop: '5px',
    width: '20em',
  },
  submit: {
    width: '7em',
    color: 'white',
    fontSize: '1.2em',
    marginTop: '40px',
    marginLeft: '6em',
    borderRadius: '50px',
    backgroundColor: '#FF864F',
  },
}

export const validate = (values) => {
  const errors = {}

  if (
    values.get('newPasswordConfirm') &&
    values.get('newPassword') !== values.get('newPasswordConfirm')
  ) {
    errors.newPassword = errors.newPasswordConfirm = 'Password Not Matched'
  }

  if (values.get('oldPassword') === values.get('newPassword')) {
    errors.newPassword = 'Cannot be same as old password'
  }

  if (!values.get('oldPassword')) {
    errors.oldPassword = 'Required'
  }

  if (!values.get('newPassword')) {
    errors.newPassword = 'Required'
  }

  if (!values.get('newPasswordConfirm')) {
    errors.newPasswordConfirm = 'Required'
  }

  return errors
}

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(formData) {
    const { dispatch, apiEngine, initialize } = this.props

    return userAPI(apiEngine)
      .updatePassword(formData)
      .catch((err) => {
        dispatch(pushErrors(err))
        throw err
      })
      .then((json) => {
        if (json.isAuth) {
          initialize({
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
          })
        } else {
          throw new SubmissionError({
            oldPassword: 'Wrong old password',
            _error: 'Change password failed',
          })
        }
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
      <Form
        defaultHorizontal={false}
        defaultLabelDimensions={{ sm: 12 }}
        defaultFieldDimensions={{ sm: 12 }}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        {submitSucceeded && (<Alert bsStyle="success">Password Changed</Alert>)}
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
        <Row>
          <Col md={9}>
            <div style={style.div}>
              <Text id="memberCenter.oldPassword" />
              <Field
                name="oldPassword"
                component={Input}
                type="password"
                style={style.field}
              />
            </div>
            <div style={style.div}>
              <Text id="memberCenter.newPassword" />
              <Field
                name="newPassword"
                component={Input}
                type="password"
                style={style.field}
              />
            </div>
            <div style={style.div}>
              <Text id="memberCenter.newPassword" />
              <Field
                name="newPasswordConfirm"
                component={Input}
                type="password"
                style={style.field}
              />
            </div>
          </Col>
        </Row>
        <FormFooter>
          <Button type="submit" disabled={pristine || submitting || invalid} style={style.submit}>
            <Text id="common.confirm" />
            {submitting && (
              <i className="fa fa-spinner fa-spin" aria-hidden="true" />
            )}
          </Button>
        </FormFooter>
      </Form>
    )
  }
};

export default reduxForm({
  form: FormNames.USER_CHANGE_PASSWORD,
  validate,
})(connect(mapStateToProps)(ChangePasswordForm))
