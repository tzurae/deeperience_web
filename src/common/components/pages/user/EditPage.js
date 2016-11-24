import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../layouts/PageLayout'
import AvatarForm from '../../forms/user/AvatarForm'
import ChangePasswordForm from '../../forms/user/ChangePasswordForm'
import Text from '../../widgets/Text'
import styles from '../../../styles'

const style = {
  title: {
    fontSize: styles.font.large,
    marginTop: '60px',
  },
  subTitle: {
    fontSize: styles.font.small,
    marginTop: '10px',
  },
  underline: {
    margin: '10px auto',
    borderBottom: '3px solid #FF7155',
    width: '40px',
    marginBottom: '30px',
  },
  underline2: {
    margin: '10px auto',
    width: '115%',
    borderBottom: '2px solid #FF7155',
    marginBottom: '5px',
  },
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
          <div style={style.title}>
            <Text id="memberCenter.editPersonalProfile" />
          </div>
          <div style={style.subTitle}>
            Edit Personal Profile
          </div>
          <div style={style.underline} />
        </div>
      </Row>
      <Row>
        <Col md={3} />
        <Col md={6}>
          <div style={style.bg}>
            <Row>
              <Col md={1} />
              <Col md={9}>
                <p style={{ fontSize: '20px'}}>
                  <Text id="memberCenter.personalData" />
                </p>
                <div style={style.underline2} />
                <Row>
                  <Col md={11}>
                    <AvatarForm />
                  </Col>
                  <Col md={1} />
                </Row>
                <p style={{ fontSize: '20px'}}>
                  <Text id="memberCenter.editPassword" />
                </p>
                <div style={style.underline2} />
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
