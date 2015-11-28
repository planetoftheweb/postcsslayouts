var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  postcss = require('gulp-postcss'),
  precss = require('precss'),
  autoprefixer = require('autoprefixer'),
  cssnext = require('cssnext'),
  cssnano = require('cssnano'),

  source = 'process/css/',
  dest = 'builds/postcss/';

gulp.task('html', function() {
  gulp.src(dest + '*.html');
});

gulp.task('css', function() {
  gulp.src(source + 'style.css')
  .pipe(postcss([
      precss(),
      cssnext(),
      autoprefixer(),
      cssnano()
    ]))
  .on('error', gutil.log)
  .pipe(
      gulp.dest(dest + 'css')
  );
});

gulp.task('watch', function() {
  gulp.watch(source + '**/*.css', ['css']);
  gulp.watch(dest + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['html', 'css', 'webserver','watch']);
