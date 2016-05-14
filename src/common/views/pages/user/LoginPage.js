import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import BsPageHeader from '../../components/BsPageHeader';
import LoginForm from '../../components/LoginForm';

const LoginPage = (props) => (
  <PageLayout>
    <BsPageHeader title="Login" />
    <LoginForm />
  </PageLayout>
);

export default LoginPage;
