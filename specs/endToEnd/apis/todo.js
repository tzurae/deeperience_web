import chai from 'chai';
import { apiEngine } from '../../utils';
import todoAPI from '../../../build/common/api/todo';
import async from 'async';
import Todo from '../../../build/server/models/Todo';
let expect = chai.expect;

describe('#todoAPI', () => {
  let fakeTodos = [{
    text: 'this is a fake todo text',
  }, {
    text: 'foo',
  }, {
    text: '~bar~',
  }];

  before((done) => {
    Todo.remove({}, done);
  });

  describe('#create()', () => {
    it('should create todo', (done) => {
      async.eachSeries(fakeTodos, (fakeTodo, cb) => {
        todoAPI(apiEngine)
          .create(fakeTodo)
          .then((json) => {
            expect(json.todo).to.be.an('object');
            expect(json.todo.text).to.equal(fakeTodo.text);
            cb();
          });
      }, done);
    });
  });

  describe('#list()', () => {
    it('should list todos', (done) => {
      todoAPI(apiEngine)
        .list({ page: 1 })
        .then((json) => {
          expect(json.todos).to.be.an('array');
          expect(json.todos).to.have.lengthOf(fakeTodos.length);
          done();
        });
    });
  });

  after((done) => {
    Todo.remove({}, done);
  });
});
