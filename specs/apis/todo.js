var chai = require('chai');
var request = require('superagent');
var expect = chai.expect;
var constants = require('../constants');
var Todo = require('../../build/server/models/Todo').default;

var fakeTodo = {
  text: 'this is a fake todo text',
};
var resTodo;

before(function(done) {
  Todo.remove({}, done);
});

describe('#Unauthorized User', function() {
  // POST /api/todo
  describe('GET /api/todo', function() {
    it('should create todo', function(done) {
      request
        .post(constants.BASE + '/api/todo')
        .send(fakeTodo)
        .end(function(err, res) {
          expect(res).to.not.be.undefined;
          expect(res.status).to.equal(200);
          expect(res.body.isError).to.be.false;
          expect(res.body.todo).to.be.an('object');
          resTodo = res.body.todo;
          done();
        });
    });
  });
});

after(function(done) {
  Todo.remove({}, done);
});