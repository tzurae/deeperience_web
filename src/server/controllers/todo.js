import assign from 'object-assign';
import { handleDbError } from '../decorators/handleError';
import filterAttribute from '../utils/filterAttribute';
import Todo from '../models/Todo';

export default {
  list(req, res) {
    Todo.paginate({
      page: req.query.page,
      perPage: 5,
    }, handleDbError(res)((page) => {
      Todo
        .find({})
        .sort({ createdAt: 'desc' })
        .limit(page.limit)
        .skip(page.skip)
        .exec(handleDbError(res)((todos) => {
          res.json({
            todos: todos,
            page: page,
          });
        }));
    }));
  },

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

  update(req, res) {
    let modifiedTodo = filterAttribute(req.body, [
      'text',
    ]);

    Todo.findById(req.params.id, handleDbError(res)((todo) => {
      todo = assign(todo, modifiedTodo);
      todo.save(handleDbError(res)(() => {
        res.json({
          originAttributes: req.body,
          updatedAttributes: todo,
        });
      }));
    }));
  },

  remove(req, res) {
    Todo.remove({_id: req.params.id}, handleDbError(res)(() => {
      res.json({});
    }));
  },
};
