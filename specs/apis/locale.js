var chai = require('chai');
var request = require('superagent');
var expect = chai.expect;
var async = require('async');
var constants = require('../constants');
var Errors = require('../../build/common/constants/Errors').default;

describe('#locale', function() {
  var validLocales = [
    'en-us',
    'zh-tw',
  ];

  var invalidLocales = [
    'foo',
    'bar',
    'fuck you',
  ];

  describe('#Unauthorized User', function() {
    // GET /api/locale/{validLocaleName}
    describe('GET /api/locale/{validLocaleName}', function() {
      it('should download valid locale', function(done) {
        async.eachSeries(validLocales, function iteratee(validLocale, cb) {
          request
            .get(constants.BASE + '/api/locale/' + validLocale)
            .end(function(err, res) {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              expect(res.body.errors).to.be.undefined;
              expect(res.body.locale).to.equal(validLocale);
              expect(res.body.messages).to.be.an('object');
              cb();
            });
        }, done);
      });
    });

    // GET /api/locale/{invalidLocaleName}
    describe('GET /api/locale/{invalidLocaleName}', function() {
      it('should reject invalid locale', function(done) {
        async.eachSeries(invalidLocales, function iteratee(invalidLocale, cb) {
          request
            .get(constants.BASE + '/api/locale/' + invalidLocale)
            .end(function(err, res) {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              expect(res.body.errors[0].code).to.equal(Errors.LOCALE_NOT_SUPPORTED.code);
              cb();
            });
        }, done);
      });
    });
  });
});
