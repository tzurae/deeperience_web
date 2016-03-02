import path from 'path';
import express from 'express';
import webpack from 'webpack';

import favicon from 'serve-favicon';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

(function addCustomMorganToken() {
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
})();

var app = express();

if (process.env.NODE_ENV === 'development') {
  const config = require('../../config/webpack.config.dev');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/',
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// favicon
app.use(favicon(path.join(__dirname, '../public/img/favicon.ico')));

// log request
app.use(morgan(
  '\x1b[1;30m' + '[:date[iso]] ' +
  '\x1b[0m'    + ':remote-addr\t' +
                 ':colorStatus ' +
                 ':method ' +
                 ':url\t' +
  '\x1b[0m'    + ':res[content-length] - ' +
  '\x1b[0;36m' + ':response-time ms' +
  '\x1b[0m'
));

app.use(express.static(
  path.join(__dirname, '../public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/template/index.html'));
});

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at port 3000');
});
