var argv = require('yargs').argv,
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gif = require('gulp-if'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    minifyhtml = require('gulp-minify-html'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

var config = {
  debug: !argv.dist,
  dist: argv.dist,
  watch: argv.watch,
  port: argv.port || 9000
};

gulp.task('html', ['clean'], function () {
  return gulp.src('./index.html')
    .pipe(gif(config.dist, minifyhtml()))
    .pipe(gulp.dest('./target'));
});

gulp.task('javascript', ['clean'], function () {
  var inst = bundler();
  return bundle();

  function bundler() {
    var b = browserify('./index.js')
      .transform(reactify);
    if (config.watch) {
      var w = watchify(b, watchify.args);
      w.on('update', bundle);
      return w;
    } else {
      return b;
    }
  };

  function bundle() {
    return inst.bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gif(config.debug, sourcemaps.init({ localMaps: true })))
      .pipe(gif(config.dist, uglify({ preserveComments: 'some' })))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./target/app'));
  };
});

gulp.task('clean', function () {
  return gulp.src('./target', { read: false })
    .pipe(rimraf());
})

gulp.task('build', ['html', 'javascript'])
gulp.task('default', ['build', 'serve']);
