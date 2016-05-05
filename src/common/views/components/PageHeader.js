import React, { Component } from 'react';

export default class PageHeader extends Component {
  static defaultProps = {
    title: 'Page Header',
  };

  render() {
    return <div className="page-header">
      <h1>{this.props.title}</h1>
    </div>;
  }
};
