import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageLayout from '../../layouts/PageLayout';
import RegisterForm from '../../forms/user/RegisterForm';
import SocialAuthButtonList from '../../utils/SocialAuthButtonList';

const RegisterPage = (props) => (
  <PageLayout>
    <PageHeader>Register</PageHeader>
    <Row>
      <Col md={9}>
        <RegisterForm />
      </Col>
      <Col md={3}>
        <SocialAuthButtonList />
      </Col>
    </Row>
  </PageLayout>
);

export default RegisterPage;
