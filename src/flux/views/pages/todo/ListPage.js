import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader';

@connect(state => state)
export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this._handleBtnClick = ::this._handleBtnClick;
  }

  _handleBtnClick() {
  }

  render() {
    return <div className="container">
      <PageHeader title="Todo List" />
      <input type="text" ref="todotext" />
      <button onClick={this._handleBtnClick}>Add Todo</button>
      <ul>
        {this.props.todos.map((todo, index) =>
          <li key={index}>{todo}</li>)}
      </ul>
    </div>;
  }
};
