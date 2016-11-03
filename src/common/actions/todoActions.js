import ActionTypes from '../constants/ActionTypes';

export const setTodo = (todos) => {
  return {
    type: ActionTypes.SET_TODO,
    todos,
  };
};

export const addTodo = (todo) => {
  return {
    type: ActionTypes.ADD_TODO,
    todo,
  };
};

export const removeTodo = (id) => {
  return {
    type: ActionTypes.REMOVE_TODO,
    id,
  };
};
