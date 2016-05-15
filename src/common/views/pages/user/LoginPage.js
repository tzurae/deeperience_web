import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../components/main/PageHeader';
import LoginForm from '../../components/forms/LoginForm';

const LoginPage = (props) => (
  <PageLayout>
    <PageHeader title="Login" />
    <LoginForm />
  </PageLayout>
);

export default LoginPage;
