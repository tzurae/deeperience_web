import chai from 'chai';
import request from 'superagent';
import async from 'async';
import constants from '../../constants';
import Errors from '../../../build/common/constants/Errors';
let expect = chai.expect;

describe('#locale', () => {
  let validLocales = [
    'en-us',
    'zh-tw',
  ];

  let invalidLocales = [
    'foo',
    'bar',
    'fuck you',
  ];

  describe('#Unauthorized User', () => {
    // GET /api/locale/{validLocaleName}
    describe('GET /api/locales/{validLocaleName}', () => {
      it('should download valid locale', (done) => {
        async.eachSeries(validLocales,  (validLocale, cb) => {
          request
            .get(constants.BASE + '/api/locales/' + validLocale)
            .end((err, res) => {
              expect(err).to.equal(null);
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
    describe('GET /api/locales/{invalidLocaleName}', () => {
      it('should reject invalid locale', (done) => {
        async.eachSeries(invalidLocales, (invalidLocale, cb) => {
          request
            .get(constants.BASE + '/api/locales/' + invalidLocale)
            .end((err, res) => {
              expect(err).to.equal(null);
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              expect(res.body.errors[0].code)
                .to.equal(Errors.LOCALE_NOT_SUPPORTED.code);
              cb();
            });
        }, done);
      });
    });
  });
});
