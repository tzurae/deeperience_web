import React, { Component } from 'react';
import Head from '../../Head';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../main/PageHeader';
import AvatarForm from '../../forms/AvatarForm';
import Time from '../../Time';
import userAPI from '../../../api/user';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    userAPI(this.context.store.getState().apiEngine)
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
        <Head
          scripts={[
            'https://www.gstatic.com/firebasejs/live/3.0/firebase.js',
          ]}
        />
        <PageHeader title="My Profile" />
        <dl className="dl-horizontal">
          <dt>_id</dt>
          <dd>{user._id}</dd>
          <dt>avatar</dt>
          <dd><AvatarForm avatarURL={user.avatarURL} /></dd>
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

ShowPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default ShowPage;
