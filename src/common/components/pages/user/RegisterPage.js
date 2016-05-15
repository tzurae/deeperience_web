import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../main/PageHeader';
import RegisterForm from '../../forms/RegisterForm';

const RegisterPage = (props) => (
  <PageLayout>
    <PageHeader title="Register" />
    <RegisterForm />
  </PageLayout>
);

export default RegisterPage;
