import chai from 'chai';
import { apiEngine } from '../../utils';
import localeAPI from '../../../build/common/api/locale';
import async from 'async';
import Errors from '../../../build/common/constants/Errors';
let expect = chai.expect;

describe('#localeAPI', () => {
  let validLocales = [
    'en-us',
    'zh-tw',
  ];

  let invalidLocales = [
    'foo',
    'bar',
    'fuck you',
  ];

  describe('#read()', () => {
    it('should download valid locale', (done) => {
      async.eachSeries(validLocales,  (validLocale, cb) => {
        localeAPI(apiEngine)
          .read(validLocale)
          .then((json) => {
            expect(json.locale).to.equal(validLocale);
            expect(json.messages).to.be.an('object');
            cb();
          });
      }, done);
    });

    it('should reject invalid locale', (done) => {
      async.eachSeries(invalidLocales, (invalidLocale, cb) => {
        localeAPI(apiEngine)
          .read(invalidLocale)
          .catch((err) => {
            expect(err[0].code)
              .to.equal(Errors.LOCALE_NOT_SUPPORTED.code);
            cb();
          });
      }, done);
    });
  });
});
