import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import BsPageHeader from '../../components/BsPageHeader';
import RegisterForm from '../../components/RegisterForm';
import userAPI from '../../../api/user';

export default class RegisterPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this._handleSubmit = ::this._handleSubmit;
  }

  _handleSubmit(formData) {
    userAPI
      .register(formData)
      .catch((err) => {
        alert('Register user fail');
        throw err;
      })
      .then((json) => {
        this.context.router.push('/');
      });
  }

  render() {
    return (
      <PageLayout>
        <BsPageHeader title="Register" />
        <RegisterForm onSubmit={this._handleSubmit} />
      </PageLayout>
    );
  }
};
