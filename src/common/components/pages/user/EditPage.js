import React from 'react';
import { Link } from 'react-router';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import PageLayout from '../../layouts/PageLayout';
import EditForm from '../../forms/user/EditForm';
import AvatarForm from '../../forms/user/AvatarForm';
import ChangePasswordForm from '../../forms/user/ChangePasswordForm';

let EditPage = () => {
  return (
    <PageLayout>
      <Row>
        <Col md={12}>
          <Link to="/user/me">
            <Button>Finish</Button>
          </Link>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={6}>
          <PageHeader>Edit Profile</PageHeader>
          <EditForm />
        </Col>
        <Col md={6}>
          <PageHeader>Upload Avatar</PageHeader>
          <AvatarForm />
        </Col>
        <Col md={6}>
          <PageHeader>Change Password</PageHeader>
          <ChangePasswordForm />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default EditPage;
