var argv = require('yargs').argv,
    gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    gif = require('gulp-if'),
    uglify = require('gulp-uglify');

var config = {
  debug: !argv.dist,
  dist: argv.dist
};

gulp.task('javascript', function () {
  gulp.src('./index.js', { read: false })
    .pipe(browserify({
      transform: [],
      extensions: []
    }))
    .pipe(gif(config.dist, uglify({ preserveComments: 'some' })))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./target/app'));
});

gulp.task('default', ['javascript']);
