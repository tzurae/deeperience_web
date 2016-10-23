import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageLayout from '../../layouts/PageLayout';
import Head from '../../widgets/Head';
import LoginForm from '../../forms/LoginForm';

const LoginPage = (props) => (
  <PageLayout>
    <Head
      links={[
        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.0.0/bootstrap-social.min.css',
      ]}
    />
    <PageHeader>Login</PageHeader>
    <Grid>
      <Row>
        <Col md={9}>
          <LoginForm location={props.location} />
        </Col>
        <Col md={3}>
          <a
            href="/auth/facebook"
            className="btn btn-block btn-social btn-facebook"
          >
            <span className="fa fa-facebook"></span>Login with Facebook
          </a>
        </Col>
      </Row>
    </Grid>
  </PageLayout>
);

export default LoginPage;
