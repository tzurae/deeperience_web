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
    todoAPI
      .list()
      .then((json) => {
        if (json.isError) {
          console.log(json.errors);
          alert('List todos fail');
        } else {
          dispatch(setTodo(json.todos));
        }
      });
  }

  _handleAddClick() {
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

  _handleRemoveClick(id) {
    const { dispatch } = this.props;
    todoAPI
      .remove(id)
      .then((json) => {
        if (json.isError) {
          console.log(json.errors);
          alert('Remove todo fail');
        } else {
          dispatch(removeTodo(id));
        }
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
