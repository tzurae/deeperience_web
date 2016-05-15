import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    return <li>
      <button onClick={this.props.onRemoveClick}>x</button>
      {this.props.text}
    </li>;
  }
};
