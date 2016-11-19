import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { pushErrors } from '../../../actions/errorActions'
import { BsInput as Input } from '../../fields/adapters'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../fields/widgets'

const style = {
  div: {
    color: 'black',
    fontSize: '1.1em',
    marginLeft: '10px',
  },
  field: {
    marginTop: '-5px',
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
    values.newPasswordConfirm &&
    values.newPassword !== values.newPasswordConfirm
  ) {
    errors.newPassword = errors.newPasswordConfirm = 'Password Not Matched'
  }

  if (values.oldPassword === values.newPassword) {
    errors.newPassword = 'Cannot be same as old password'
  }

  if (!values.oldPassword) {
    errors.oldPassword = 'Required'
  }

  if (!values.newPassword) {
    errors.newPassword = 'Required'
  }

  if (!values.newPasswordConfirm) {
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
              <p> 舊密碼 </p>
              <Field
                name="oldPassword"
                component={Input}
                type="password"
                style={style.field}
              />
            </div>
            <div style={style.div}>
              <p> 新密碼 </p>
              <Field
                name="newPassword"
                component={Input}
                type="password"
                style={style.field}
              />
            </div>
            <div style={style.div}>
              <p> 新密碼 </p>
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
            Change
            {submitting && (
              <i className="fa fa-spinner fa-spin" aria-hidden="true" />
            )}
          </Button>
        </FormFooter>
      </Form>
    )

//     return (
//       <Form
//         defaultHorizontal={false}
//         defaultLabelDimensions={{ sm: 12 }}
//         defaultFieldDimensions={{ sm: 12 }}
//         onSubmit={handleSubmit(this.handleSubmit)}
//       >
//         {submitSucceeded && (<Alert bsStyle="success">Password Changed</Alert>)}
//         {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
// <<<<<<< HEAD
//         <Field
//           name="oldPassword"
//           component={FormField}
//           label="Old Password"
//           adapter={Input}
//           type="password"
//           placeholder="Old Password"
//         />
//         <Field
//           name="newPassword"
//           component={FormField}
//           label="New Password"
//           adapter={Input}
//           type="password"
//           placeholder="New Password"
//         />
//         <Field
//           name="newPasswordConfirm"
//           component={FormField}
//           label="New Password Confirm"
//           adapter={Input}
//           type="password"
//           placeholder="New Password Confirm"
//         />
// =======
//         <Row>
//           <Col md={9}>
//             <div style={style.div}>
//               <p> 舊密碼 </p>
//               <Field
//                 name="oldPassword"
//                 component={FormField}
//                 type="text"
//                 style={style.field}
//               />
//             </div>
//             <div style={style.div}>
//               <p> 新密碼 </p>
//               <Field
//                 name="newPassword"
//                 component={FormField}
//                 type="text"
//                 style={style.field}
//               />
//             </div>
//             <div style={style.div}>
//               <p> 新密碼 </p>
//               <Field
//                 name="newPasswordConfirm"
//                 component={FormField}
//                 type="text"
//                 style={style.field}
//               />
//             </div>
//           </Col>
//         </Row>
// >>>>>>> origin/dev
//         <FormFooter>
//           <Button type="submit" disabled={pristine || submitting || invalid} style={style.submit}>
//             Change
//             {submitting && (
//               <i className="fa fa-spinner fa-spin" aria-hidden="true" />
//             )}
//           </Button>
//         </FormFooter>
//       </Form>
//     )
  }
};

export default reduxForm({
  form: FormNames.USER_CHANGE_PASSWORD,
  validate,
})(connect(state => ({
  apiEngine: state.apiEngine,
}))(ChangePasswordForm))
