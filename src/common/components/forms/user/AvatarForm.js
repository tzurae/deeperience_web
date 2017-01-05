import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import FormNames from '../../../constants/FormNames'
import configs from '../../../../../configs/project/client'
import firebaseAPI from '../../../api/firebase'
import userAPI from '../../../api/user'
import { pushErrors } from '../../../reducers/error/errorActions'
import { setCookies } from '../../../reducers/cookie/cookieActions'
import { BsInput as Input } from '../../fields/adapters'
import Head from '../../utils/Head'
import toRefreshURL from '../../../utils/toRefreshURL'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
} from '../../fields/widgets'
import Text from '../../utils/Text'
import { selectFromCookies, selectFromGlobal } from '../../../lib/selector'
import { createStructuredSelector } from 'reselect'

const mapStateToProps = createStructuredSelector({
  user: selectFromCookies('user'),
  apiEngine: selectFromGlobal('apiEngine'),
})

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
}

/**
 * Test server side validation with Postman:
 * 1. Setup the method and url `POST http://localhost:3000/api/users/me/avatar`
 * 2. Select `Body` tab
 * 3. Select `form-data` type
 * 4. Add new key `avatar` and select some invalid file on purpose
 * 5. Send
 */
export const validate = (values) => {
  const errors = {}

  if (!values.get('avatar') || values.get(['avatar', 'length']) !== 1) {
    errors.avatar = 'Required'
  } else {
    const { size, type, mimetype } = values.get('avatar[0]')
    const { maxSize, validMIMETypes } = configs.fileUpload.avatar

    if (size > maxSize) {
      errors.avatar = (
        `Your file(${Math.floor(size / 1024)} Kb) ` +
        `exceeds the limit size(${Math.floor(maxSize / 1024)} Kb).`
      )
    }
    // we check the key `type` for client side and `mimetype` for server side
    if (validMIMETypes.indexOf(type || mimetype) < 0) {
      errors.avatar = 'Invalid type. Please upload .jpg, .png or .gif file.'
    }
  }

  return errors
}

class AvatarForm extends Component {
  constructor() {
    super()
    this.uploadToLocal = this._uploadToLocal.bind(this)
    this.uploadToFirebase = this._uploadToFirebase.bind(this)
    this.signInFirebase = this._signInFirebase.bind(this)
    this.clearFileField = this._clearFileField.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.state = {
      isFirebaseInitialized: false,
      avatarURL: null,
    }
  }

  _uploadToLocal(formData) {
    const { apiEngine } = this.props

    return userAPI(apiEngine)
      .uploadAvatar(formData.avatar[0])
      .catch((err) => {
        return Promise.reject(err)
      })
      .then((json) => {
        return Promise.resolve(json.downloadURL)
      })
  }

  _signInFirebase() {
    const { dispatch, apiEngine } = this.props

    return firebaseAPI(apiEngine)
      .readToken()
      .catch((err) => {
        dispatch(pushErrors([{
          title: 'Fail To Read Token',
          detail: 'Read firebase token fail.',
        }]))
        throw err
      })
      .then((json) => {
        // Initialize firebase
        if (!this.state.isFirebaseInitialized) {
          firebase.initializeApp(configs.firebase)
          this.setState({
            isFirebaseInitialized: true,
          })
        }

        // SignIn firebase
        return firebase.auth()
          .signInWithCustomToken(json.token)
          .catch((err) => {
            dispatch(pushErrors([{
              title: 'Fail To Signin Firebase',
              detail: 'Signin firebase fail.',
            }]))
            throw err
          })
      })
  }

  _uploadToFirebase(formData) {
    const _this = this
    const { user } = this.props

    return new Promise((resolve, reject) => {
      _this.signInFirebase().then(() => {
        // ref: <https://firebase.google.com/docs/storage/web/upload-files#upload_files>
        const storageRef = firebase.storage().ref()
        const avatarRef = storageRef.child(
          `${process.env.NODE_ENV}/${user._id}/avatar.jpg`)
        const uploadTask = avatarRef.put(formData.avatar[0])

        uploadTask.on('state_changed', snapshot => {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, err => {
          // Handle unsuccessful uploads
          return reject(err)
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          const downloadURL = uploadTask.snapshot.downloadURL
          return resolve(downloadURL)
        })
      })
    })
  }

  _clearFileField() {
    const { change, untouch } = this.props
    change('avatar', '')
    untouch('avatar')
  }

  _handleSubmit(formData) {
    const { dispatch, apiEngine } = this.props
    let uploadProcedure

    if (formData.storage === 'firebase') {
      uploadProcedure = this.uploadToFirebase(formData)
    } else if (formData.storage === 'local') {
      uploadProcedure = this.uploadToLocal(formData)
    }

    return uploadProcedure
      .catch((err) => {
        dispatch(pushErrors([{
          title: 'Fail To Upload Avatar',
          detail: 'Upload avatar fail.',
          meta: err,
        }]))
        throw err
      })
      .then((downloadURL) => {
        return userAPI(apiEngine)
          .updateAvatarURL({
            avatarURL: downloadURL,
          })
          .catch((err) => {
            dispatch(pushErrors([{
              title: 'Fail To Update Avatar URL',
              detail: 'Update user avatar URL fail.',
              meta: err,
            }]))
            throw err
          })
          .then((json) => {
            const newAvatarURL = toRefreshURL(downloadURL)
            json.user.avatarURL = newAvatarURL
            dispatch(setCookies({
              user: json.user,
            }))
            this.clearFileField()
          })
      })
  }

  render() {
    const {
      user: { avatarURL },
      handleSubmit,
    } = this.props

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Head
          scripts={[
            'https://www.gstatic.com/firebasejs/live/3.0/firebase.js',
          ]}
        />
        <Row>
          <Col md={9}>
            <div style={style.div}>
              <Text id="user.name" />
              <Field
                name="name"
                component={Input}
                type="text"
                style={style.field}
              />
            </div>
            <div style={style.div}>
              <Text id="memberCenter.avatar" />
              <Field
                name="avatar"
                component={Input}
                type="file"
                style={style.field}
              />
            </div>
          </Col>
          <Col md={3}>
            {avatarURL && <img src={avatarURL}
              style={{ width: '140px', height: '140px', marginLeft: '10px' }}
            />}
          </Col>
        </Row>
        <FormFooter>
          <Button type="submit" disabled={false}>
            <Text id="register.sure" />
          </Button>
        </FormFooter>
      </Form>
    )
  }
};

export default reduxForm({
  form: FormNames.USER_AVATAR,
  validate,
})(connect(mapStateToProps)(AvatarForm))
