import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import BsPageHeader from '../../components/BsPageHeader';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage = (props) => (
  <PageLayout>
    <BsPageHeader title="Register" />
    <RegisterForm />
  </PageLayout>
);

export default RegisterPage;
