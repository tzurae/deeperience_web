import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Form from '../main/Form';
import Input from '../reduxForm/Input';
import userAPI from '../../api/user';

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
  }

  _handleSubmit(formData) {
    userAPI
      .uploadAvatar({
        avatar: formData.avatar[0],
      })
      .catch((err) => {
        alert('Upload user avatar fail');
        throw err;
      })
      .then((json) => {
        alert('ok');
      });
  }

  render() {
    const {
      fields: { avatar },
      handleSubmit,
    } = this.props;
    const { value: _, ...avatarWithoutValue } = avatar;

    return (
      <Form onSubmit={handleSubmit(this._handleSubmit)}>
        <Input
          type="file"
          placeholder="Avatar"
          field={avatarWithoutValue}
        />
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

export default reduxForm({
  form: 'avatar',
  fields: [
    'avatar',
  ],
  validate,
})(AvatarForm);
