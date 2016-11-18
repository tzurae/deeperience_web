import React from 'react'
// import { Link } from 'react-router'
// import PageHeader from 'react-bootstrap/lib/PageHeader'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
// import Button from 'react-bootstrap/lib/Button'
import PageLayout from '../../layouts/PageLayout'
// import EditForm from '../../forms/user/EditForm'
import AvatarForm from '../../forms/user/AvatarForm'
import ChangePasswordForm from '../../forms/user/ChangePasswordForm'
// import DField from '../../utils/DField'

const style = {
  bg: {
    borderRadius: '20px',
    backgroundColor: 'white',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
}

const EditPage = () => {
  return (
    <PageLayout>
      <Row>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '30px', marginBottom: '3px' }}> 編輯個人頁面 </div>
          <div style={{ fontSize: '12px', marginBottom: '-8px' }}> Edit Personal Profile </div>
          <p style={{ color: '#FF7155' }}> _______ </p>
        </div>
        {/*
          <Col md={12}>
            <Link to="/user/me/edit">
              <Button bsStyle="primary">Edit My Profile</Button>
            </Link>
          </Col>
        */}
      </Row>
      <Row>
        <Col md={3} />
        <Col md={6}>
          <div style={style.bg}>
            <Row>
              <Col md={1} />
              <Col md={9}>
                <p style={{ fontSize: '20px', marginBottom: '-25px' }}> 個人資料 </p>
                <p style={{ color: '#FF7155', fontSize: '30px', marginTop: '-30px' }}>
                  _______________________________
                </p>
                <Row>
                  <Col md={11}>
                    <AvatarForm />
                  </Col>
                  <Col md={1} />
                </Row>
                <p style={{ fontSize: '20px', marginBottom: '-25px' }}> 修改密碼 </p>
                <p style={{ color: '#FF7155', fontSize: '30px', marginTop: '-30px' }}>
                  _______________________________
                </p>
                <ChangePasswordForm />

              </Col>
              <Col md={2} />
            </Row>
          </div>
        </Col>
        <Col md={3} />
      </Row>

      {/*
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
      */}
    </PageLayout>
  )
}

export default EditPage
