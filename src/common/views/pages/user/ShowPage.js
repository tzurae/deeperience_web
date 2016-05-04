import React, { Component } from 'react';
import PageHeader from '../../components/PageHeader';
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
    return <div className="container">
      <PageHeader title="My Profile" />
      {JSON.stringify(this.state.user)}
    </div>;
  }
};