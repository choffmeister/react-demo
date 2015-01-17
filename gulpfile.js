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

gulp.task('css', ['clean'], function () {
  return gulp.src('./app/style.less')
    .pipe(less({ compress: config.dist }))
    .pipe(gulp.dest('./target/app'))
});

gulp.task('javascript', ['clean'], function () {
  var inst = bundler();
  return bundle();

  function bundler() {
    var b = browserify('./app/app.js')
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
      .pipe(connect.reload())
      .pipe(gulp.dest('./target/app'));
  };
});

gulp.task('connect', function () {
  connect.server({
    port: config.port,
    root: './target',
    livereload: config.watch
  });
});

gulp.task('clean', function (cb) {
  del(['./target/**'], cb);
})

gulp.task('build', ['html', 'css', 'javascript'])
gulp.task('server', ['build', 'connect']);
