import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import PageLayout from '../../layouts/PageLayout';
import LoginForm from '../../forms/LoginForm';

const LoginPage = (props) => (
  <PageLayout>
    <PageHeader>Login</PageHeader>
    <LoginForm location={props.location} />
  </PageLayout>
);

export default LoginPage;
