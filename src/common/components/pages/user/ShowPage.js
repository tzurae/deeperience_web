import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import PageHeader from 'react-bootstrap/lib/PageHeader'
// import Modal from 'react-bootstrap/lib/Modal'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
// import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import userAPI from '../../../api/user'
import { pushErrors } from '../../../actions/errorActions'
import Head from '../../widgets/Head'
import PageLayout from '../../layouts/PageLayout'
// import Time from '../../widgets/Time'
// import VerifyEmailForm from '../../forms/user/VerifyEmailForm'
import toRefreshURL from '../../../utils/toRefreshURL'
import BackGround from '../../utils/BackGround'
import Text from '../../widgets/Text.js'

const style = {
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
      <div style={{ fontSize: '30px', marginBottom: '3px' }}>
        <Text id="memberCenter.personalPage" />
      </div>
      <div style={{ fontSize: '12px', marginBottom: '-8px' }}> Personal Profile </div>
      <p style={{ color: '#FF7155' }}> _______ </p>
    </div>
  )
}

class ShowPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.initialUser,
      // isShowVerifyEmailModal: false,
    }
    // this.openModal = this._openModal.bind(this)
    // this.closeModal = this._closeModal.bind(this)
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

/*
  _openModal() {
    this.setState({ isShowVerifyEmailModal: true })
  }

  _closeModal() {
    this.setState({ isShowVerifyEmailModal: false })
  }

  renderModal() {
    const { isShowVerifyEmailModal, user } = this.state

    return (
      <Modal
        show={isShowVerifyEmailModal}
        onHide={this.closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Verification Mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VerifyEmailForm
            email={user.email && user.email.value}
            onCancel={this.closeModal}
          />
        </Modal.Body>
      </Modal>
    )
  }
*/

  render() {
    const { user } = this.state
    return (
      <PageLayout >
        <BackGround color="#EFEEED" />
        <Head
          scripts={[
            'https://www.gstatic.com/firebasejs/live/3.0/firebase.js',
          ]}
        />
        {/* this.renderModal() */}
        <Row>
          <Title />
          {/*
            <Col md={12}>
              <Link to="/user/me/edit">
                <Button bsStyle="primary">Edit My Profile</Button>
              </Link>
            </Col>
          */}
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
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#FF7155', fontSize: '30px' }}>
                    ____________________________________________
                  </p>
                </div>
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

{/*
          <dl className="dl-horizontal">
            <dt>_id</dt>
            <dd>{user._id}</dd>
            <dt>avatar</dt>
            <dd>
            </dd>
            <dt>name</dt>
            <dd>{user.name}</dd>
            <dt>email</dt>
            <dd>
              {user.email && user.email.value}
              {user.email && !user.email.isVerified && (
                <Button onClick={this.openModal}>
                  Verify Now
                </Button>
              )}
            </dd>
            <dt>updatedAt</dt>
            <dd>
              <Time value={user.updatedAt} format="YYYY-MM-DD" />
              {' '}(<Time value={user.updatedAt} relative />)
            </dd>
            <dt>createdAt</dt>
            <dd>
              <Time value={user.createdAt} format="YYYY-MM-DD" />
              {' '}(<Time value={user.createdAt} relative />)
            </dd>
            <dt>raw</dt>
            <dd><pre>{JSON.stringify(user, null, 2)}</pre></dd>
          </dl>

*/}

      </PageLayout>
    )
  }
};

export default connect(({ apiEngine, cookies: { user } }) => ({
  apiEngine,
  initialUser: (user && JSON.parse(user)) || {},
}))(ShowPage)
