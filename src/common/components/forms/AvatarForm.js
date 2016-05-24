import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Form from '../main/Form';
import Input from '../reduxForm/Input';
import Image from '../main/Image';
import firebaseConfig from '../../../../config/firebase';
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
    this._handleSubmit = ::this._handleSubmit;
    this.state = {
      avatarURL: null,
    };
  }

  componentDidMount() {
    firebaseAPI
      .readToken()
      .catch((err) => {
        alert('Read firebase token fail');
        throw err;
      })
      .then((json) => {
        // Initialize firebase
        firebase.initializeApp(firebaseConfig);

        // SignIn firebase
        firebase.auth()
          .signInWithCustomToken(json.token)
          .catch(function(err) {
            alert('Sign in firebase fail');
            throw err;
          });
      });
  }

  _handleSubmit(formData) {
    let _this = this;
    let { store } = this.context;
    let userId = store.getState().user.data._id;

    // ref: <https://firebase.google.com/docs/storage/web/upload-files#upload_files>
    let storageRef = firebase.storage().ref();
    let avatarRef = storageRef.child(
      `${process.env.NODE_ENV}/${userId}/avatar.jpg`);
    let uploadTask = avatarRef.put(formData.avatar[0]);

    uploadTask.on('state_changed', function(snapshot) {
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
    }, function(error) {
      // Handle unsuccessful uploads
    }, function complete() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      let downloadURL = uploadTask.snapshot.downloadURL;
      _this.setState({
        avatarURL: downloadURL,
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
