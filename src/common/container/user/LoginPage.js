import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import * as authActions from '../../reducers/auth/authAction'
import PageLayout from '../../components/layouts/PageLayout'
import LoginForm from '../../components/forms/user/LoginForm'

const style = {
  form: {
    marginTop: '55px',
  },
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

class LoginPage extends Component {
  render() {
   return (
     <PageLayout src="/img/homepage/river_dark.jpg">
       <Row>
         <Col md={4} />
         <Col md={4} />
         <Col md={4} />
       </Row>
       <Row>
         <Col md={4} />
         <Col md={4}>
           <div style={style.form}>
             <LoginForm login={this.props.actions.login} />
           </div>
         </Col>
         <Col md={4} />
       </Row>
     </PageLayout>
   )
  }
}

export default connect(null, mapDispatchToProps)(LoginPage)
