import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';
import FormNames from '../../../constants/FormNames';
import configs from '../../../../../configs/project/client';
import firebaseAPI from '../../../api/firebase';
import userAPI from '../../../api/user';
import { pushErrors } from '../../../actions/errorActions';
import { setCookies } from '../../../actions/cookieActions';
import { Form, FormField, FormFooter } from '../../utils/BsForm';
import toRefreshURL from '../../../utils/toRefreshURL';

const initialValues = {
  storage: 'local',
};

/**
 * Test server side validation with Postman:
 * 1. Setup the method and url `POST http://localhost:3000/api/users/me/avatar`
 * 2. Select `Body` tab
 * 3. Select `form-data` type
 * 4. Add new key `avatar` and select some invalid file on purpose
 * 5. Send
 */
export let validate = (values) => {
  const errors = {};

  if (!values.avatar || values.avatar.length !== 1) {
    errors.avatar = 'Required';
  } else {
    let { size, type, mimetype } = values.avatar[0];
    let { maxSize, validMIMETypes } = configs.fileUpload.avatar;

    if (size > maxSize) {
      errors.avatar = (
        `Your file(${Math.floor(size / 1024)} Kb) ` +
        `exceeds the limit size(${Math.floor(maxSize / 1024)} Kb).`
      );
    }
    // we check the key `type` for client side and `mimetype` for server side
    if (validMIMETypes.indexOf(type || mimetype) < 0) {
      errors.avatar = 'Invalid type. Please upload .jpg, .png or .gif file.';
    }
  }

  return errors;
};

class AvatarForm extends Component {
  constructor() {
    super();
    this.uploadToLocal = this._uploadToLocal.bind(this);
    this.uploadToFirebase = this._uploadToFirebase.bind(this);
    this.signInFirebase = this._signInFirebase.bind(this);
    this.clearFileField = this._clearFileField.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      isFirebaseInitialized: false,
      avatarURL: null,
    };
  }

  _uploadToLocal(formData) {
    let { apiEngine } = this.props;

    return userAPI(apiEngine)
      .uploadAvatar(formData.avatar[0])
      .catch((err) => {
        return Promise.reject(err);
      })
      .then((json) => {
        return Promise.resolve(json.downloadURL);
      });
  }

  _signInFirebase() {
    let { dispatch, apiEngine } = this.props;

    return firebaseAPI(apiEngine)
      .readToken()
      .catch((err) => {
        dispatch(pushErrors([{
          title: 'Fail To Read Token',
          detail: 'Read firebase token fail.',
        }]));
        throw err;
      })
      .then((json) => {
        // Initialize firebase
        if (!this.state.isFirebaseInitialized) {
          firebase.initializeApp(configs.firebase);
          this.setState({
            isFirebaseInitialized: true,
          });
        }

        // SignIn firebase
        return firebase.auth()
          .signInWithCustomToken(json.token)
          .catch(function(err) {
            dispatch(pushErrors([{
              title: 'Fail To Signin Firebase',
              detail: 'Signin firebase fail.',
            }]));
            throw err;
          });
      });
  }

  _uploadToFirebase(formData) {
    let _this = this;
    let { user } = this.props;

    return new Promise((resolve, reject) => {
      _this.signInFirebase().then(() => {
        // ref: <https://firebase.google.com/docs/storage/web/upload-files#upload_files>
        let storageRef = firebase.storage().ref();
        let avatarRef = storageRef.child(
          `${process.env.NODE_ENV}/${user._id}/avatar.jpg`);
        let uploadTask = avatarRef.put(formData.avatar[0]);

        uploadTask.on('state_changed', function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, function(err) {
          // Handle unsuccessful uploads
          return reject(err);
        }, function complete() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          let downloadURL = uploadTask.snapshot.downloadURL;
          return resolve(downloadURL);
        });
      });
    });
  }

  _clearFileField() {
    let { change, untouch } = this.props;
    change('avatar', '');
    untouch('avatar');
  }

  _handleSubmit(formData) {
    let { dispatch, apiEngine } = this.props;
    let uploadProcedure;
    if (formData.storage === 'firebase') {
      uploadProcedure = this.uploadToFirebase(formData);
    } else if (formData.storage === 'local') {
      uploadProcedure = this.uploadToLocal(formData);
    }

    return uploadProcedure
      .catch((err) => {
        dispatch(pushErrors([{
          title: 'Fail To Upload Avatar',
          detail: 'Upload avatar fail.',
          meta: err,
        }]));
        throw err;
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
            }]));
            throw err;
          })
          .then((json) => {
            let newAvatarURL = toRefreshURL(downloadURL);
            json.user.avatarURL = newAvatarURL;
            dispatch(setCookies({
              user: json.user,
            }));
            this.clearFileField();
          });
      });
  }

  render() {
    const {
      user: { avatarURL },
      handleSubmit,
      pristine,
      submitting,
      invalid,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        {avatarURL && <Image thumbnail src={avatarURL} />}
        <Field
          name="avatar"
          component={FormField}
          type="file"
        />
        <Field
          label="Store avatar into"
          name="storage"
          component={FormField}
          options={[{
            label: 'Firebase',
            value: 'firebase',
            disabled: !!configs.firebase === false,
          }, {
            label: 'Local',
            value: 'local',
          }]}
        />
        <FormFooter>
          <Button type="submit" disabled={pristine || submitting || invalid}>
            Upload
          </Button>
        </FormFooter>
      </Form>
    );
  }
};

export default reduxForm({
  form: FormNames.USER_AVATAR,
  initialValues,
  validate,
})(connect(({ apiEngine, cookies: { user } }) => ({
  apiEngine: apiEngine,
  user: (user && JSON.parse(user)) || {},
}))(AvatarForm));
