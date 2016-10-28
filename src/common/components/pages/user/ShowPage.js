import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import userAPI from '../../../api/user';
import { pushErrors } from '../../../actions/errorActions';
import Head from '../../widgets/Head';
import PageLayout from '../../layouts/PageLayout';
import Time from '../../widgets/Time';
import RefreshImage from '../../utils/RefreshImage';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.initialUser,
    };
  }

  componentDidMount() {
    let { dispatch, apiEngine } = this.props;

    userAPI(apiEngine)
      .read()
      .catch((err) => {
        dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        this.setState({
          user: json.user,
        });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <PageLayout>
        <Head
          scripts={[
            'https://www.gstatic.com/firebasejs/live/3.0/firebase.js',
          ]}
        />
        <Row>
          <Col md={12}>
            <Link to="/user/me/edit">
              <Button bsStyle="primary">Edit My Profile</Button>
            </Link>
          </Col>
        </Row>
        <hr />
        <PageHeader>My Profile</PageHeader>
        <dl className="dl-horizontal">
          <dt>_id</dt>
          <dd>{user._id}</dd>
          <dt>avatar</dt>
          <dd>
            {user.avatarURL && <RefreshImage thumbnail src={user.avatarURL} />}
          </dd>
          <dt>name</dt>
          <dd>{user.name}</dd>
          <dt>email</dt>
          <dd>{user.email && user.email.value}</dd>
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
      </PageLayout>
    );
  }
};

export default connect(({ apiEngine, cookies: { user } }) => ({
  apiEngine: apiEngine,
  initialUser: (user && JSON.parse(user)) || {},
}))(ShowPage);
