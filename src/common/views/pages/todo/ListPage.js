import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import TodoItem from '../../components/TodoItem';
import {
  setTodo,
  addTodo,
  removeTodo,
} from '../../../actions/todoActions';
import todoAPI from '../../../api/todo';

@connect(state => state)
export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this._handleAddClick = ::this._handleAddClick;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.todos.length == 0) {
      todoAPI
        .list()
        .catch((err) => {
          alert('List todos fail');
          throw err;
        })
        .then((json) => {
          dispatch(setTodo(json.todos));
        });
    }
  }

  _handleAddClick() {
    const { dispatch } = this.props;
    const text = this.refs.todotext.value;
    todoAPI
      .create({ text })
      .catch((err) => {
        alert('Create todo fail');
        throw err;
      })
      .then((json) => {
        dispatch(addTodo(json.todo));
        this.refs.todotext.value = '';
      });
  }

  _handleRemoveClick(id) {
    const { dispatch } = this.props;
    todoAPI
      .remove(id)
      .catch((err) => {
        alert('Remove todo fail');
        throw err;
      })
      .then((json) => {
        dispatch(removeTodo(id));
      });
  }

  render() {
    return <div className="container">
      <PageHeader title="Todo List" />
      <input type="text" ref="todotext" />
      <button onClick={this._handleAddClick}>Add Todo</button>
      <ul>
        {this.props.todos.map((todo, index) =>
          <TodoItem
            key={index}
            onRemoveClick={this._handleRemoveClick.bind(this, todo._id)}
            text={todo.text} />)}
      </ul>
    </div>;
  }
};
