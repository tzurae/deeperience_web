import React from 'react'
// import PageHeader from 'react-bootstrap/lib/PageHeader'
// import Alert from 'react-bootstrap/lib/Alert'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../layouts/PageLayout'
import LoginForm from '../../forms/user/LoginForm'
// import SocialAuthButtonList from '../../utils/SocialAuthButtonList'
import BackGround from '../../utils/BackGround'

const LoginPage = ({ location }) => (
  <PageLayout>
    <BackGround src="/img/river_dark.jpg" />
    {/*
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
    */}
    <Row>
      <Col md={4} />
      <Col md={4}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px', marginTop: '20px' }}>
          <div style={{ fontSize: '38px', marginBottom: '10px' }}> Deeperience </div>
          <div style={{ fontSize: '18px' }}> 完美客製化旅程，旅程規劃零負擔 </div>
        </div>
      </Col>
      <Col md={4} />
    </Row>
    <Row>
      <Col md={4} />
      <Col md={4}>
        <LoginForm />
      </Col>
      <Col md={4} />
      {/*
        <Col md={3}>
          <SocialAuthButtonList />
        </Col>
      */}
    </Row>
  </PageLayout>
)

export default LoginPage
