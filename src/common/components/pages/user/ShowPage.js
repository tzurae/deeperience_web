import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import userAPI from '../../../api/user'
import { pushErrors } from '../../../actions/errorActions'
import PageLayout from '../../layouts/PageLayout'
import toRefreshURL from '../../../utils/toRefreshURL'
import Text from '../../widgets/Text.js'
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
    borderBottom: '2px solid #FF7155',
    width: '40px',
    marginBottom: '30px',
  },
  bg: {
    borderRadius: '20px',
    backgroundColor: 'white',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
  submit: {
    width: '7em',
    color: 'white',
    fontSize: '1em',
    borderRadius: '50px',
    backgroundColor: '#FF864F',
  },
  edit: {
    width: '5em',
    height: '2.2em',
    color: 'black',
    fontSize: '1em',
    marginLeft: '12px',
    marginBottom: '12px',
    borderRadius: '50px',
    border: '1px solid #FF864F',
    backgroundColor: 'transparent',
  },
}

const Info = ({ name }) => {
  return (
    <div style={{ textAlign: 'center', marginRight: '50px' }}>
      <div style={{ marginLeft: '-25px' }}>
        <Text id={name} />
      </div>
      <div>
        <span style={{ marginLeft: '40px', fontSize: '30px' }}>
          1 <Text id="memberCenter.piece" />
        </span>
        <Button disabled={false} style={style.edit}>
          <Text id="memberCenter.look" />
        </Button>
      </div>
    </div>
  )
}

const Title = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={style.title}>
        <Text id="memberCenter.personalPage" />
      </div>
      <div style={style.subTitle}> Personal Profile </div>
      <div style={style.underline} />
    </div>
  )
}

class ShowPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.initialUser,
    }
  }

  componentDidMount() {
    const { dispatch, apiEngine } = this.props

    userAPI(apiEngine)
      .read()
      .catch((err) => {
        dispatch(pushErrors(err))
        throw err
      })
      .then((json) => {
        json.user.avatarURL = toRefreshURL(json.user.avatarURL)
        this.setState({
          user: json.user,
        })
      })
  }

  render() {
    const { user } = this.state
    return (
      <PageLayout >
        <Row>
          <Title />
        </Row>
        <Row>
          <Col md={2} />
          <Col md={8}>
            <div style={style.bg}>
              <Row>
                <Col md={2} />
                <Col md={4}>
                  {user.avatarURL && <img src={user.avatarURL} style={{ width: '180px', height: '180px' }} />}
                </Col>
                <Col md={6}>
                  <span style={{ fontSize: '15px', marginBottom: '-5px' }}>
                    <Text id="user.name" />
                  </span>
                  <p style={{ fontSize: '22px', marginBottom: '25px' }}> {user.name} </p>
                  <span style={{ fontSize: '15px', marginBottom: '-5px' }}>
                      <Text id="login.email" />
                  </span>
                  <p style={{ fontSize: '22px', marginBottom: '25px' }}> {user.email ? user.email.value : ''} </p>
                  <Link to="/user/me/edit">
                    <Button disabled={false} style={style.submit}>
                      <Text id="memberCenter.edit" />
                    </Button>
                  </Link>
                </Col>
              </Row>
              <div style={{ background: '#FF7155', margin: '30px auto', width: '90%', height: '2px' }}/>
              <Row>
                <Col md={4}>
                  <Info name="memberCenter.buyTrip" />
                </Col>
                <Col md={4}>
                  <Info name="memberCenter.addTrip" />
                </Col>
                <Col md={4}>
                  <Info name="memberCenter.addSite" />
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={2} />
        </Row>
      </PageLayout>
    )
  }
};

export default connect(({ apiEngine, cookies: { user } }) => ({
  apiEngine,
  initialUser: (user && JSON.parse(user)) || {},
}))(ShowPage)
