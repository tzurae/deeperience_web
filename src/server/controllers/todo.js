import { handleDbError } from '../decorators/handleError';
import Todo from '../models/Todo';

export default {
  create(req, res) {
    const todo = Todo({
      title: req.body.title,
      detail: req.body.detail,
    });

    todo.save(handleDbError(res)((todo) => {
      res.json({
        todo: todo,
        isError: false,
      });
    }));
  },

  list(req, res) {
    Todo.find({}, handleDbError(res)((todos) => {
      res.json({
        todos: todos,
        isError: false,
      });
    }));
  },
};