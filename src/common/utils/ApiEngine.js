// ref: <https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/helpers/ApiClient.js>
import superagent from 'superagent';
import getPort from '../../server/utils/getPort';

const BASE = process.env.BROWSER? '': `http://localhost:${getPort()}`;
const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  return `${BASE}${path}`;
}

export default class ApiEngine {
  constructor(req) {
    methods.forEach((method) => {
      this[method] = (path, { params, data, files } = {}) => {
        return new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          if (!process.env.BROWSER && req.get('cookie')) {
            request.set('cookie', req.get('cookie'));
          }

          if (data) {
            request.send(data);
          }

          if (files) {
            let formData = new FormData();
            Object.keys(files).forEach((name) => {
              formData.append(name, files[name]);
            });
            request.send(formData);
          }

          request.end((err, { body } = {}) => {
            if (err) {
              return reject(body || err);
            }
            if (body.isError) {
              return reject(body.errors);
            }
            return resolve(body);
          });
        });
      };
    });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
