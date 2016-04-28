var chai = require('chai');
var request = require('superagent');
var expect = chai.expect;
var async = require('async');
var constants = require('../constants');
var Todo = require('../../build/server/models/Todo').default;

describe('#todo', function() {
  var fakeTodos = [{
    text: 'this is a fake todo text',
  }, {
    text: 'foo',
  }, {
    text: '~bar~',
  }, ];
  var resTodos = [];

  before(function(done) {
    Todo.remove({}, done);
  });

  describe('#Unauthorized User', function() {
    // POST /api/todo
    describe('POST /api/todo', function() {
      it('should create todo', function(done) {
        async.eachSeries(fakeTodos, function iteratee(fakeTodo, cb) {
          request
            .post(constants.BASE + '/api/todo')
            .send(fakeTodo)
            .end(function(err, res) {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              expect(res.body.isError).to.be.false;
              expect(res.body.todo).to.be.an('object');
              expect(res.body.todo.text).to.equal(fakeTodo.text);
              resTodos.push(res.body.todo);
              cb();
            });
        }, done);
      });
    });

    // GET /api/todo
    describe('GET /api/todo', function() {
      it('should list todos', function(done) {
        request
          .get(constants.BASE + '/api/todo')
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.isError).to.be.false;
            expect(res.body.todos).to.be.an('array');
            expect(res.body.todos.length).to.equal(fakeTodos.length);
            done();
          });
      });
    });
  });

  after(function(done) {
    Todo.remove({}, done);
  });
});