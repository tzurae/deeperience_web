import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Form from '../main/Form';
import Input from '../reduxForm/Input';
import Image from '../main/Image';
import firebaseConfig from '../../../../config/firebase';
import userAPI from '../../api/user';
import firebaseAPI from '../../api/firebase';

const initialValues = {
  storage: 'local',
};

const validate = (values) => {
  const errors = {};

  if (!values.avatar) {
    errors.avatar = 'Required';
  }

  return errors;
};

class AvatarForm extends Component {
  constructor(props) {
    super(props);
    this._uploadToLocal = ::this._uploadToLocal;
    this._uploadToFirebase = ::this._uploadToFirebase;
    this._signInFirebase = ::this._signInFirebase;
    this._handleSubmit = ::this._handleSubmit;
    this.state = {
      isFirebaseInitialized: false,
      avatarURL: null,
    };
  }

  _uploadToLocal(formData) {
    return userAPI
      .uploadAvatar({
        avatar: formData.avatar[0],
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .then((json) => {
        return Promise.resolve(json.downloadURL);
      });
  }

  _signInFirebase() {
    return firebaseAPI
      .readToken()
      .catch((err) => {
        alert('Read firebase token fail');
        throw err;
      })
      .then((json) => {
        // Initialize firebase
        if (!this.state.isFirebaseInitialized) {
          firebase.initializeApp(firebaseConfig);
          this.setState({
            isFirebaseInitialized: true,
          });
        }

        // SignIn firebase
        return firebase.auth()
          .signInWithCustomToken(json.token)
          .catch(function(err) {
            alert('Sign in firebase fail');
            throw err;
          });
      });
  }

  _uploadToFirebase(formData) {
    let _this = this;
    let { store } = this.context;
    let userId = store.getState().user.data._id;

    return new Promise((resolve, reject) => {
      _this._signInFirebase().then(() => {
        // ref: <https://firebase.google.com/docs/storage/web/upload-files#upload_files>
        let storageRef = firebase.storage().ref();
        let avatarRef = storageRef.child(
          `${process.env.NODE_ENV}/${userId}/avatar.jpg`);
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

  _handleSubmit(formData) {
    let uploadProcedure;
    if (formData.storage === 'firebase') {
      uploadProcedure = this._uploadToFirebase(formData);
    } else if (formData.storage === 'local') {
      uploadProcedure = this._uploadToLocal(formData);
    }
    uploadProcedure
      .catch((err) => {
        alert('upload fail');
        throw err;
      })
      .then((downloadURL) => {
        this.setState({
          avatarURL: `${downloadURL}?forceReload=${Math.random()}`,
        });
      });
  }

  render() {
    const {
      fields: {
        avatar,
        storage,
      },
      handleSubmit,
    } = this.props;
    const { value: _, ...avatarWithoutValue } = avatar;

    return (
      <Form onSubmit={handleSubmit(this._handleSubmit)}>
        {this.state.avatarURL && <Image thumbnail src={this.state.avatarURL} />}
        <Input
          type="file"
          placeholder="Avatar"
          field={avatarWithoutValue}
        />
        <Form.Field>
          Store avatar into
          <div className="radio">
            <label>
              <input
                type="radio"
                {...storage}
                value="firebase"
                checked={storage.value === 'firebase'}
              /> Firebase
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                {...storage}
                value="local"
                checked={storage.value === 'local'}
              /> Local
            </label>
          </div>
        </Form.Field>
        <Form.Button
          type="submit"
          title="Upload"
        />
      </Form>
    );
  }
};

AvatarForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AvatarForm.contextTypes = {
  store: PropTypes.object,
};

export default reduxForm({
  form: 'avatar',
  fields: [
    'avatar',
    'storage',
  ],
  initialValues,
  validate,
})(AvatarForm);
