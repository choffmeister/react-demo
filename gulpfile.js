var argv = require('yargs').argv,
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    connect = require('gulp-connect'),
    del = require('del'),
    gif = require('gulp-if'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    minifyhtml = require('gulp-minify-html'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var config = {
  debug: !argv.dist,
  dist: argv.dist,
  port: argv.port || 9000
};

var onerror = function (err) {
  if (config.debug) {
    gutil.beep();
    gutil.log(err.message);
  } else {
    throw err;
  }
};

gulp.task('html', function () {
  return gulp.src('./app/index.html')
    .pipe(gif(config.dist, minifyhtml()))
    .pipe(size({ showFiles: true, gzip: config.dist }))
    .pipe(connect.reload())
    .pipe(gulp.dest('./target'));
});

gulp.task('css', function () {
  return gulp.src('./app/style.less')
    .pipe(less({ compress: config.dist }))
    .on('error', onerror)
    .pipe(size({ showFiles: true, gzip: config.dist }))
    .pipe(connect.reload())
    .pipe(gulp.dest('./target/app'))
});

gulp.task('javascript', function () {
  var bundler = browserify('./app/main.jsx')
    .transform(reactify);
  return bundle();

  function bundle() {
    return bundler.bundle()
      .on('error', onerror)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gif(config.debug, sourcemaps.init({ localMaps: true })))
      .pipe(gif(config.dist, uglify({ preserveComments: 'some' })))
      .pipe(size({ showFiles: true, gzip: config.dist }))
      .pipe(sourcemaps.write('.'))
      .pipe(connect.reload())
      .pipe(gulp.dest('./target/app'));
  };
});

gulp.task('connect', ['build'], function () {
  connect.server({
    port: config.port,
    root: './target',
    livereload: true
  });
});

gulp.task('watch', ['build'], function () {
  gulp.watch('./index.html', ['html']);
  gulp.watch('./app/**/*.{css,less}', ['css']);
  gulp.watch('./app/**/*.{js,jsx}', ['javascript']);
});

gulp.task('build', ['html', 'css', 'javascript'])
gulp.task('server', ['connect', 'watch']);
gulp.task('default', ['server']);
