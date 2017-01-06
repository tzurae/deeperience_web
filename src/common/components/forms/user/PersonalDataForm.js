import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { pushErrors } from '../../../reducers/error/errorActions'
import { setCookie } from '../../../reducers/cookie/cookieActions'
import { BsInput as Input, BsSelect as Select } from '../../fields/adapters'
import Text from '../../utils/Text'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
  BsField as FormField,
} from '../../fields/widgets'

const mapStateToProps = (state) => {
  return {
    apiEngine: state.getIn(['global', 'apiEngine']),
  }
}

export const validate = (values) => {
  const errors = {}

  if (!values.get('name')) {
    errors.name = 'Required'
  }

  if (
    values.get('newPasswordConfirm') &&
    values.get('newPassword') !== values.get('newPasswordConfirm')
  ) {
    errors.newPassword = errors.newPasswordConfirm = 'Password Not Matched'
  }

  return errors
}

class PersonalDataForm extends Component {
  constructor(props) {
    super(props)
    this.init = this._init.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  componentDidMount() {
    const { dispatch, apiEngine } = this.props

    userAPI(apiEngine)
      .read()
      .catch((err) => {
        dispatch(pushErrors(err))
        throw err
      })
      .then((json) => {
        this.init(json.user)
      })
  }

  _init(user) {
    const { initialize } = this.props
    initialize({
      name: user.name,
      cellPhone: user.cellPhone,
      email: user.email.value,
    })
  }

  _handleSubmit(formData) {
    const { dispatch, apiEngine } = this.props

    return userAPI(apiEngine)
      .update(formData)
      .catch((err) => {
        dispatch(pushErrors(err))
        throw err
      })
      .then((json) => {
        this.init(json.user)
        dispatch(setCookie({
          user: json.user,
        }))
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
      underlineClass,
      headerClass,
    } = this.props

    return (
      <Form
        onSubmit={handleSubmit(this.handleSubmit)}>
        {submitSucceeded && (<Alert bsStyle="success">Profile Saved</Alert>)}
        {submitFailed && error && (<Alert bsStyle="danger">{error}</Alert>)}
        <Field
          name="name"
          component={FormField}
          adapterStyle={{width:'95%'}}
          label={<Text id="user.name"/>}
          adapter={Input}
          type="text"
          placeholder="Name"
        />
        <Field
          name="cellPhone"
          component={FormField}
          adapterStyle={{width:'95%'}}
          label={<Text id="memberCenter.cellPhone"/>}
          adapter={Input}
          type="text"
          placeholder="手機號碼"
        />
        <Field
          name="email"
          component={FormField}
          adapterStyle={{width:'95%'}}
          label={<Text id="login.email"/>}
          adapter={Input}
          type="text"
          placeholder="信箱"
        />
        <Field
          name="sex"
          component={FormField}
          adapterStyle={{width:'95%'}}
          label={<Text id="memberCenter.sex"/>}
          adapter={Select}
          options={[{
            label: '男',
            value: 'male',
          },{
            label: '女',
            value: 'female',
          }]}
        />
        <Field
          name="avatar"
          component={FormField}
          adapterStyle={{width:'95%'}}
          label={<Text id="memberCenter.avatar"/>}
          adapter={Input}
          type="file"
          placeholder={<Text id="memberCenter.avatar"/>}
        />
        <p className={headerClass}>{<Text id="memberCenter.editPassword" isSpan={true}/>}</p>
        <hr className={underlineClass}/>
        <Field
          name="newPassword"
          component={FormField}
          label={<Text id="memberCenter.newPassword"/>}
          adapter={Input}
          type="password"
          disabled={submitSucceeded}
          placeholder="新密碼"
        />
        <Field
          name="newPasswordConfirm"
          component={FormField}
          label={<Text id="memberCenter.ensurePassword"/>}
          adapter={Input}
          type="password"
          disabled={submitSucceeded}
          placeholder="請再輸入一次新密碼"
        />
        <FormFooter horizontal={false} style={{textAlign:'center'}}>
          <Button type="submit" disabled={pristine || submitting || invalid}>
            Update
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
  form: FormNames.USER_DATA,
  validate,
})(connect(mapStateToProps)(PersonalDataForm))
