import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Alert from 'react-bootstrap/lib/Alert';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageLayout from '../../layouts/PageLayout';
import LoginForm from '../../forms/user/LoginForm';
import SocialAuthButtonList from '../../utils/SocialAuthButtonList';

let LoginPage = ({ location }) => (
  <PageLayout>
    <PageHeader>Login</PageHeader>
    <Row>
      <Col md={12}>
        {location.query.next && (
          <Alert bsStyle="warning">
            <strong>Authentication Required</strong>
            {' '}Please login first.
          </Alert>
        )}
      </Col>
    </Row>
    <Row>
      <Col md={9}>
        <LoginForm />
      </Col>
      <Col md={3}>
        <SocialAuthButtonList />
      </Col>
    </Row>
  </PageLayout>
);

export default LoginPage;
