import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import PageLayout from '../../layouts/PageLayout';
import ForgetPasswordForm from '../../forms/user/ForgetPasswordForm';

let ForgetPasswordPage = () => (
  <PageLayout>
    <PageHeader>Forget Password</PageHeader>
    <ForgetPasswordForm />
  </PageLayout>
);

export default ForgetPasswordPage;
