import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Table from 'react-bootstrap/lib/Table';
import Resources from '../../../../constants/Resources';
import userAPI from '../../../../api/user';
import { pushErrors } from '../../../../actions/errorActions';
import { setCrrentPage, setPage } from '../../../../actions/pageActions';
import PageLayout from '../../../layouts/AdminPageLayout';
import Pagination from '../../../utils/BsPagination';

class ListPage extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    let { dispatch, location } = this.props;
    dispatch(setCrrentPage(Resources.USER, location.query.page || 1));
  }

  componentDidUpdate(prevProps) {
    let { dispatch, apiEngine, page, location } = this.props;

    if (prevProps.page.current !== page.current) {
      userAPI(apiEngine)
        .list({ page: page.current })
        .catch((err) => {
          dispatch(pushErrors(err));
          throw err;
        })
        .then((json) => {
          this.setState({ users: json.users });
          dispatch(setPage(Resources.USER, json.page));
          dispatch(push({
            pathname: location.pathname,
            query: { page: json.page.current },
          }));
        });
    }
  }

  render() {
    let { users } = this.state;

    return (
      <PageLayout>
        <PageHeader>User List</PageHeader>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email.value}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination resourceName={Resources.USER} />
      </PageLayout>
    );
  }
}

export default connect(state => ({
  apiEngine: state.apiEngine,
  page: state.pages[Resources.USER] || {},
}))(ListPage);
