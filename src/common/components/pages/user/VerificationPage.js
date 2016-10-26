import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Alert from 'react-bootstrap/lib/Alert';
import userAPI from '../../../api/user';
import PageLayout from '../../layouts/PageLayout';

class VerificationPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isVerifying: true,
      isFail: true,
    };
  }

  componentWillMount() {
    let { apiEngine, location } = this.props;

    userAPI(apiEngine)
      .verify({ token: location.query.token })
      .catch((err) => {
        this.setState({
          isVerifying: false,
          isFail: true,
        });
        throw err;
      })
      .then((json) => {
        this.setState({
          isVerifying: false,
          isFail: false,
        });
      });
  }

  render() {
    let { isVerifying, isFail } = this.state;

    if (isVerifying) {
      return (
        <p>Please wait for a while...</p>
      );
    }

    if (isFail) {
      return (
        <PageLayout>
          <Alert bsStyle="danger">
            <strong>Verification Failed</strong>
          </Alert>
        </PageLayout>
      );
    }

    return (
      <PageLayout>
        <Alert bsStyle="success">
          <strong>Verification Success</strong>
          <p>
            Go to <Link to="/user/login">Login Page</Link>
          </p>
        </Alert>
      </PageLayout>
    );
  }
};

export default connect(state => ({
  apiEngine: state.apiEngine,
}))(VerificationPage);
