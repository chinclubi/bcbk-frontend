var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

gulp.task('script', function () {
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './src/js/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./www/js'))
})
