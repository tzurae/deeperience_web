// native packages
var path = require('path');

// vendor packages
var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var del = require('del');
var babel = require('gulp-babel');
var webpack = require('webpack');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');

// local modules
var webpackConfig = {
  development: require('./config/webpack.config.dev'),
  production: require('./config/webpack.config.prod'),
};
var babelConfig = {
  development: require('./config/babel.config.dev'),
  production: require('./config/babel.config.prod'),
};

var paths = {
  scripts: './src/server/**/*.js',
  reacts: './src/flux/**/*.js',
  statics: './src/public/**/*',
  nodemonWatchIgnore: [
    'gulpfile.js',
    'node_modules/**/*',
    'src/**/*',
    'public/js/bundle.js',
    'build/flux/**/*',
  ],
  targetDir: 'build',
};

function _babelStream(src, dest, config) {
  return gulp
    .src(src)
    .pipe(changed(dest))
    .pipe(sourcemaps.init())
      .pipe(babel(config))
      .on('error', notify.onError({
        title: 'babel fail',
        message: '<%= error.message %>',
      }))
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: './src',
    }))
    .pipe(gulp.dest(dest));
}

function _webpackTask(config, cb) {
  webpack(config, function(err, stats) {
    if (err) {
      return cb(err);
    }
    var jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0) {
      return cb(jsonStats.errors);
    }
    if (jsonStats.warnings.length > 0) {
      gutil.log(gutil.colors.yellow(jsonStats.warnings));
    }
    cb();
  });
}

// clean build files
gulp.task('clean', function() {
  return del.sync(paths.targetDir);
});

// build nodejs source files
gulp.task('build:nodejs', function() {
  return _babelStream(
    paths.scripts,
    path.join(paths.targetDir, 'server'),
    babelConfig.development
  );
});

// build reactjs source files
gulp.task('build:reactjs', ['build:nodejs'], function() {
  return _babelStream(
    paths.reacts,
    path.join(paths.targetDir, 'flux'),
    babelConfig.development
  );
});

// bundle react components
gulp.task('webpack:development', ['build:reactjs'], function(cb) {
  _webpackTask(webpackConfig.development, cb);
});

gulp.task('webpack:production', ['build:reactjs'], function(cb) {
  _webpackTask(webpackConfig.production, cb);
});

// copy static files
gulp.task('copy', function() {
  return gulp
    .src(paths.statics)
    .pipe(changed(path.join(paths.targetDir, 'public')))
    .pipe(gulp.dest(path.join(paths.targetDir, 'public')));
});

// watching source files
gulp.task('watch', ['build:development'], function() {
  gulp.watch(paths.scripts, ['build:nodejs']);
  gulp.watch(paths.reacts, ['build:reactjs', 'webpack:development']);
  gulp.watch(paths.statics, ['copy']);
});

// launch development server
gulp.task('serve', function(cb) {
  var started = false;
  var entryPath = path.join(paths.targetDir, 'server/server.js');

  return nodemon({
    script: entryPath,
    watch: [path.join(paths.targetDir, '**/*.js')],
    ext: 'js',
    env: {
      NODE_ENV: 'development',
    },
    ignore: paths.nodemonWatchIgnore,
  })
  .on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  })
  .on('restart', function() {
  });
});

gulp.task('build:production', function() {
  gulp.start(
    'clean',
    'build:nodejs',
    'build:reactjs',
    'webpack:production',
    'copy');
});

gulp.task('build:development', function() {
  gulp.start(
    'clean',
    'build:nodejs',
    'build:reactjs',
    'webpack:development',
    'copy',
    'watch');
});

gulp.task('default', function() {
  gulp.start('build:development');
});