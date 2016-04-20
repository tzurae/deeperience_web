import morgan from 'morgan';

morgan.token('colorStatus', (req, res) => {
  const status = res.statusCode;
  let color = '';

  if (status < 200) {
    // 1xx
    color = '\x1b[0m';
  } else if (status < 300) {
    // 2xx
    color = '\x1b[0;32m';
  } else if (status < 400) {
    // 3xx
    color = '\x1b[1;33m';
  } else if (status < 500) {
    // 4xx
    color = '\x1b[0;31m';
  } else {
    // 5xx
    color = '\x1b[0;35m';
  }

  return color + status + '\x1b[0m';
});

let morganMiddleware = null;
if (process.env.NODE_ENV === 'development') {
  morganMiddleware = morgan(
    '\x1b[1;30m' + '[:date[iso]] ' +
    '\x1b[0m'    + ':remote-addr\t' +
                   ':colorStatus ' +
                   ':method ' +
                   ':url\t' +
    '\x1b[0m'    + ':res[content-length] - ' +
    '\x1b[0;36m' + ':response-time ms' +
    '\x1b[0m'
  );
} else {
  morganMiddleware = morgan(
    '[:date[iso]] ' +
    ':remote-addr\t' +
    ':status ' +
    ':method ' +
    ':url\t' +
    ':res[content-length] - ' +
    ':response-time ms'
  );
}
export default morganMiddleware;