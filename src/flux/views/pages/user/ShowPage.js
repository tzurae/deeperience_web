import React, { Component } from 'react';
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
      .then((json) => {
        if (json.isError) {
          console.log(json.errors);
          alert('Show fail');
        } else {
          this.setState({
            user: json.user,
          });
        }
      });
  }

  render() {
    return <div className="container">
      {JSON.stringify(this.state.user)}
    </div>;
  }
};