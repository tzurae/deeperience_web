import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Resources from '../../../constants/Resources';
import todoAPI from '../../../api/todo';
import { pushErrors } from '../../../actions/errorActions';
import {
  setTodo,
  addTodo,
  removeTodo,
} from '../../../actions/todoActions';
import { setCrrentPage, setPage } from '../../../actions/pageActions';
import PageLayout from '../../layouts/PageLayout';
import Pagination from '../../utils/BsPagination';

class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      isEditable: false,
      inputValue: '',
    };
  }

  renderInput() {
    let { inputValue } = this.state;

    return (
      <input
        type="text"
        value={inputValue}
        onChange={(e) => this.setState({
          inputValue: e.target.value,
        })}
      />
    );
  }

  renderControlButtons() {
    let { text, onSaveClick } = this.props;
    let { isEditable, inputValue } = this.state;

    return isEditable ? (
      <span>
        <button
          onClick={() => (
            onSaveClick(inputValue)
              .then(() => this.setState({ isEditable: false }))
          )}
        >
          Save
        </button>
        <button onClick={() => this.setState({ isEditable: false })}>
          Cancel
        </button>
      </span>
    ) : (
      <span>
        <button
          onClick={() => this.setState({ isEditable: true, inputValue: text })}
        >
          Edit
        </button>
      </span>
    );
  }

  render() {
    let { onRemoveClick, text } = this.props;
    let { isEditable } = this.state;

    return (
      <li>
        {text}
        {isEditable && this.renderInput()}
        {this.renderControlButtons()}
        <button onClick={onRemoveClick}>x</button>
      </li>
    );
  }
}

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.handleAddClick = this._handleAddClick.bind(this);
  }

  componentDidMount() {
    let { dispatch, location } = this.props;
    dispatch(setCrrentPage(Resources.TODO, location.query.page || 1));
  }

  componentDidUpdate(prevProps) {
    let { dispatch, apiEngine, page, location } = this.props;

    if (prevProps.page.current !== page.current) {
      todoAPI(apiEngine)
        .list({ page: page.current })
        .catch((err) => {
          dispatch(pushErrors(err));
          throw err;
        })
        .then((json) => {
          dispatch(setTodo(json.todos));
          dispatch(setPage(Resources.TODO, json.page));
          dispatch(push({
            pathname: location.pathname,
            query: { page: json.page.current },
          }));
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

  handleSaveClick(id, newText) {
    let { dispatch, apiEngine } = this.props;

    return todoAPI(apiEngine)
      .update(id, { text: newText })
      .catch((err) => {
        dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        this.fetchTodos();
      });
  }

  handleRemoveClick(id) {
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
    let { page } = this.props;

    return (
      <PageLayout>
        <PageHeader>Todo List ({`${page.current} / ${page.total}`})</PageHeader>
        <input type="text" ref="todotext" />
        <button onClick={this.handleAddClick}>Add Todo</button>
        <ul>
          {this.props.todos.map((todo) =>
            <TodoItem
              key={todo._id}
              onRemoveClick={this.handleRemoveClick.bind(this, todo._id)}
              onSaveClick={this.handleSaveClick.bind(this, todo._id)}
              text={todo.text} />)}
        </ul>
        <Pagination resourceName={Resources.TODO} />
      </PageLayout>
    );
  }
};

export default connect(state => ({
  apiEngine: state.apiEngine,
  todos: state.todos,
  page: state.pages[Resources.TODO] || {},
}))(ListPage);
