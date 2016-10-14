import chai from 'chai';
import request from 'superagent';
import async from 'async';
import constants from '../../constants';
import Todo from '../../../build/server/models/Todo';
let expect = chai.expect;

describe('#todo', () => {
  let fakeTodos = [{
    text: 'this is a fake todo text',
  }, {
    text: 'foo',
  }, {
    text: '~bar~',
  }];
  let resTodos = [];

  before((done) => {
    Todo.remove({}, done);
  });

  describe('#Unauthorized User', () => {
    // POST /api/todo
    describe('POST /api/todos', () => {
      it('should create todo', (done) => {
        async.eachSeries(fakeTodos, (fakeTodo, cb) => {
          request
            .post(constants.BASE + '/api/todos')
            .send(fakeTodo)
            .end((err, res) => {
              expect(err).to.equal(null);
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              expect(res.body.errors).to.be.undefined;
              expect(res.body.todo).to.be.an('object');
              expect(res.body.todo.text).to.equal(fakeTodo.text);
              resTodos.push(res.body.todo);
              cb();
            });
        }, done);
      });
    });

    // GET /api/todo
    describe('GET /api/todos', () => {
      it('should list todos', (done) => {
        request
          .get(constants.BASE + '/api/todos')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.errors).to.be.undefined;
            expect(res.body.todos).to.be.an('array');
            expect(res.body.todos.length).to.equal(fakeTodos.length);
            done();
          });
      });
    });
  });

  after((done) => {
    Todo.remove({}, done);
  });
});
