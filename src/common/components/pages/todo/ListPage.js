import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import todoAPI from '../../../api/todo';
import { pushErrors } from '../../../actions/errorActions';
import {
  setTodo,
  addTodo,
  removeTodo,
} from '../../../actions/todoActions';
import PageLayout from '../../layouts/PageLayout';

let TodoItem = ({ onRemoveClick, text }) => (
  <li>
    <button onClick={onRemoveClick}>x</button>
    {text}
  </li>
);

class ListPage extends Component {
  constructor(props) {
    super(props);
    this._handleAddClick = this._handleAddClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, apiEngine } = this.props;
    if (this.props.todos.length === 0) {
      todoAPI(apiEngine)
        .list()
        .catch((err) => {
          dispatch(pushErrors(err));
          throw err;
        })
        .then((json) => {
          dispatch(setTodo(json.todos));
        });
    }
  }

  _handleAddClick() {
    const { dispatch, apiEngine } = this.props;
    const text = this.refs.todotext.value;
    todoAPI(apiEngine)
      .create({ text })
      .catch((err) => {
        dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        dispatch(addTodo(json.todo));
        this.refs.todotext.value = '';
      });
  }

  _handleRemoveClick(id) {
    const { dispatch, apiEngine } = this.props;
    todoAPI(apiEngine)
      .remove(id)
      .catch((err) => {
        dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        dispatch(removeTodo(id));
      });
  }

  render() {
    return (
      <PageLayout>
        <PageHeader>Todo List</PageHeader>
        <input type="text" ref="todotext" />
        <button onClick={this._handleAddClick}>Add Todo</button>
        <ul>
          {this.props.todos.map((todo, index) =>
            <TodoItem
              key={index}
              onRemoveClick={this._handleRemoveClick.bind(this, todo._id)}
              text={todo.text} />)}
        </ul>
      </PageLayout>
    );
  }
};

export default connect(state => ({
  apiEngine: state.apiEngine,
  todos: state.todos,
}))(ListPage);
