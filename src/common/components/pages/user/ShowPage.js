import React, { Component } from 'react';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../main/PageHeader';
import Time from '../../Time';
import userAPI from '../../../api/user';

export default class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    userAPI
      .show()
      .catch((err) => {
        alert('Show user fail');
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
        <PageHeader title="My Profile" />
        <dl className="dl-horizontal">
          <dt>_id</dt>
          <dd>{user._id}</dd>
          <dt>name</dt>
          <dd>{user.name}</dd>
          <dt>email</dt>
          <dd>{user.email}</dd>
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
