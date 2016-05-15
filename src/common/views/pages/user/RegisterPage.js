import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../components/main/PageHeader';
import RegisterForm from '../../components/forms/RegisterForm';

const RegisterPage = (props) => (
  <PageLayout>
    <PageHeader title="Register" />
    <RegisterForm />
  </PageLayout>
);

export default RegisterPage;
