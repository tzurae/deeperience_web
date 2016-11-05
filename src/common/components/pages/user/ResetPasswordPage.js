import React from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import PageLayout from '../../layouts/PageLayout'
import ResetPasswordForm from '../../forms/user/ResetPasswordForm'

const ResetPasswordPage = (props) => (
  <PageLayout>
    <PageHeader>Reset Password</PageHeader>
    <ResetPasswordForm />
  </PageLayout>
)

export default ResetPasswordPage
