import React from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import PageLayout from '../../components/layouts/PageLayout'
import ForgetPasswordForm from '../../components/forms/user/ForgetPasswordForm'

const ForgetPasswordPage = () => (
  <PageLayout>
    <PageHeader>Forget Password</PageHeader>
    <ForgetPasswordForm />
  </PageLayout>
)

export default ForgetPasswordPage
