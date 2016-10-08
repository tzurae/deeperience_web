import { handleDbError } from '../decorators/handleError';
import Todo from '../models/Todo';

export default {
  create(req, res) {
    const todo = Todo({
      text: req.body.text,
    });

    todo.save(handleDbError(res)((todo) => {
      res.json({
        todo: todo,
      });
    }));
  },

  list(req, res) {
    Todo.find({}, handleDbError(res)((todos) => {
      res.json({
        todos: todos,
      });
    }));
  },

  remove(req, res) {
    Todo.remove({_id: req.params.id}, handleDbError(res)(() => {
      res.json({});
    }));
  },
};
