import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import FormNames from '../../../constants/FormNames'
import userAPI from '../../../api/user'
import { pushErrors } from '../../../reducers/error/errorActions'
import { setCookies } from '../../../reducers/cookie/cookieActions'
import { BsInput as Input } from '../../fields/adapters'
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

  return errors
}

class EditForm extends Component {
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
        dispatch(setCookies({
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
          name="avatar"
          component={FormField}
          adapterStyle={{width:'95%'}}
          label={<Text id="memberCenter.avatar"/>}
          adapter={Input}
          type="file"
          placeholder={<Text id="memberCenter.avatar"/>}
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
  form: FormNames.USER_EDIT,
  validate,
})(connect(mapStateToProps)(EditForm))
