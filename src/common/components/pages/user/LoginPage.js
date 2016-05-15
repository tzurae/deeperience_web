import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../main/PageHeader';
import LoginForm from '../../forms/LoginForm';

const LoginPage = (props) => (
  <PageLayout>
    <PageHeader title="Login" />
    <LoginForm />
  </PageLayout>
);

export default LoginPage;
