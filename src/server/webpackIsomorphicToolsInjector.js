import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import webpackIsomorphicToolsConfig
from '../../configs/project/webpack-isomorphic-tools-configuration';

const injector = new Promise((resolve, reject) => {
  // project root, sync with `webpack.config.dev.js` and `webpack.config.prod.js`
  let projectBasePath = path.resolve(__dirname, '../');
  global.__webpackIsomorphicTools__ =
    new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
      .development(process.env.NODE_ENV === 'development')
      .server(projectBasePath, resolve);
});

export default injector;
