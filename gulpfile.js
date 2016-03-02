// ====================
// Packages and modules
// ====================

// native packages
var path = require('path');

// vendor packages
var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var rimraf = require('rimraf');
var babel = require('gulp-babel');
var webpack = require('webpack');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');

// local modules
var webpackConfig = require('./config/webpack.config.dev');
var babelConfig = require('./config/babel.config.dev');

var files = {
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
};

var targetDir = 'build';

// clean build files
gulp.task('clean', function(done) {
  try {
    rimraf.sync(targetDir);
    done();
  } catch (e) {
    gutil.log(gutil.colors.red(
      'Cannot clean build directory.'));
    done(e);
  }
});

// build nodejs source files
gulp.task('build:nodejs', function() {
  return gulp
    .src(files.scripts)
    .pipe(changed(path.join(targetDir, 'server')))
    .pipe(sourcemaps.init())
      .pipe(babel(babelConfig))
      .on('error', notify.onError({
        title: 'babel fail',
        message: '<%= error.message %>',
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(targetDir, 'server')));
});

// build reactjs source files
gulp.task('build:reactjs', ['build:nodejs'], function() {
  return gulp
    .src(files.reacts)
    .pipe(changed(path.join(targetDir, 'flux')))
    .pipe(sourcemaps.init())
      .pipe(babel(babelConfig))
      .on('error', notify.onError({
        title: 'babel fail',
        message: '<%= error.message %>',
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(targetDir, 'flux')));
});

// bundle react components
gulp.task('webpack', ['build:reactjs'], function(cb) {
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      return cb(err);
    }
    var jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0) {
      return cb(jsonStats.errors);
    }
    if (jsonStats.warnings.length > 0) {
      gutil.warn(jsonStats.warnings);
    }
    cb();
  });
});

// copy static files
gulp.task('copy', function() {
  return gulp
    .src(files.statics)
    .pipe(changed(path.join(targetDir, 'public')))
    .pipe(gulp.dest(path.join(targetDir, 'public')));
});

// watching source files
gulp.task('watch', [
  'build:nodejs', 'build:reactjs', 'webpack', 'copy',
], function() {
  gulp.watch(files.scripts, ['build:nodejs']);
  gulp.watch(files.reacts, ['build:reactjs', 'webpack']);
  gulp.watch(files.statics, ['copy']);
});

gulp.task('serve', function(cb) {
  var started = false;
  var entryPath = path.join(targetDir, 'server/server.js');

  return nodemon({
    script: entryPath,
    watch: [path.join(targetDir, '**/*.js')],
    ext: 'js',
    env: {
      NODE_ENV: 'development',
    },
    ignore: files.nodemonWatchIgnore,
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

gulp.task('default', function() {
  gulp.start(
    'clean',
    'build:nodejs',
    'build:reactjs',
    'webpack',
    'copy',
    'watch');
});