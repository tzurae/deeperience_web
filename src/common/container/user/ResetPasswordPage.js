import React from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import PageLayout from '../../components/layouts/PageLayout'
import ResetPasswordForm from '../../components/forms/user/ResetPasswordForm'

const ResetPasswordPage = (props) => (
  <PageLayout>
    <PageHeader>Reset Password</PageHeader>
    <ResetPasswordForm />
  </PageLayout>
)

export default ResetPasswordPage
