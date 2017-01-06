import React from 'react'
import Text from '../Text'
import styles from '../../../styles'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

const style = {
  color: '#FFFFF0',
  fontSize: styles.font.medium,
  paddingTop: '20px',
  textAlign: 'center',
}

const Footer = () => (
  <section style={{ padding: '30px', backgroundColor: '#003D79', minHeight: '15vh' }}>
    <Row>
      <Col md={3}>
        <ul>
          <li style={style}>
            <Text id="footer.aboutUs"/>
          </li>
          <li style={style}>
            <Text id="footer.fansite"/>
          </li>
          <li style={style}>
            <Text id="footer.joinUs"/>
          </li>
        </ul>
      </Col>
      <Col md={3}>
        <ul>
          <li style={style}>
            <Text id="footer.travelerServiceRule"/>
          </li>
          <li style={style}>
            <Text id="footer.privateRule"/>
          </li>
          <li style={style}>
            <Text id="footer.planerServiceRule"/>
          </li>
        </ul>
      </Col>
      <Col md={3}>
        <ul>
          <li style={style}>
            <Text id="footer.serviceEmail"/>
            <Text id="footer.companyEmail"/>
          </li>
          <li style={style}>
            <Text id="footer.servicePhone"/>
            <Text id="footer.phone"/>
          </li>
          <li style={style}>
            <Text id="footer.serviceTime"/>
            <Text id="footer.time"/>
          </li>
        </ul>
      </Col>
      <Col md={3}>
        <ul>
          <li style={style}>
            <Text id="footer.companyFullName"/>
          </li>
          <li style={style}>
            <Text id="footer.tourismBureauNumber"/>
          </li>
          <li style={style}>
            <Text id="footer.companyAddress"/>
          </li>
        </ul>
      </Col>
    </Row>
    <Row>
      <Text id="footer.establishedPeriod" style={style}/>
    </Row>
  </section>
)

export default Footer
