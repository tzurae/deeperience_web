import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import { addTodo } from '../../../actions/todoActions';
import todoAPI from '../../../api/todo';

@connect(state => state)
export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this._handleBtnClick = ::this._handleBtnClick;
  }

  _handleBtnClick() {
    const { dispatch } = this.props;
    const text = this.refs.todotext.value;
    todoAPI
      .create({ text })
      .then((json) => {
        if (json.isError) {
          console.log(json.errors);
          alert('Create todo fail');
        } else {
          dispatch(addTodo(json.todo));
          this.refs.todotext.value = '';
        }
      });
  }

  render() {
    return <div className="container">
      <PageHeader title="Todo List" />
      <input type="text" ref="todotext" />
      <button onClick={this._handleBtnClick}>Add Todo</button>
      <ul>
        {this.props.todos.map((todo, index) =>
          <li key={index}>{todo.text}</li>)}
      </ul>
    </div>;
  }
};
