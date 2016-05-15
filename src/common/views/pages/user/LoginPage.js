import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import BsPageHeader from '../../components/bs/PageHeader';
import LoginForm from '../../components/forms/LoginForm';

const LoginPage = (props) => (
  <PageLayout>
    <BsPageHeader title="Login" />
    <LoginForm />
  </PageLayout>
);

export default LoginPage;
