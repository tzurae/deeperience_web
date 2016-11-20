import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../layouts/PageLayout'
import AvatarForm from '../../forms/user/AvatarForm'
import ChangePasswordForm from '../../forms/user/ChangePasswordForm'
import Text from '../../widgets/Text'

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
          <div style={{ fontSize: '30px', marginBottom: '0px' }}>
            <Text id="memberCenter.editPersonalProfile" />
          </div>
          <div style={{ fontSize: '12px', marginBottom: '0px' }}> Edit Personal Profile </div>
          <p style={{ color: '#FF7155' }}> _______ </p>
        </div>
      </Row>
      <Row>
        <Col md={3} />
        <Col md={6}>
          <div style={style.bg}>
            <Row>
              <Col md={1} />
              <Col md={9}>
                <p style={{ fontSize: '20px', marginBottom: '-25px' }}>
                  <Text id="memberCenter.personalData" />
                </p>
                <p style={{ color: '#FF7155', fontSize: '30px', marginTop: '-30px' }}>
                  _______________________________
                </p>
                <Row>
                  <Col md={11}>
                    <AvatarForm />
                  </Col>
                  <Col md={1} />
                </Row>
                <p style={{ fontSize: '20px', marginBottom: '-25px' }}>
                  <Text id="memberCenter.editPassword" />
                </p>
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
    </PageLayout>
  )
}

export default EditPage
