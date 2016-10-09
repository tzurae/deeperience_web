import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import PageLayout from '../../layouts/PageLayout';
import RegisterForm from '../../forms/RegisterForm';

const RegisterPage = (props) => (
  <PageLayout>
    <PageHeader>Register</PageHeader>
    <RegisterForm />
  </PageLayout>
);

export default RegisterPage;
