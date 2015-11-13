var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

gulp.task('script', function () {
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './src/js/**/*.js'])
    .pipe(concat('scripts.js'))
    // .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./www/js'))
})

gulp.task('script-with-angular', function () {
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './bower_components/angular-recaptcha/release/angular-recaptcha.js',
    // './bower_components/ui-select/dist/select.js',
    './src/js/**/*.js'])
    .pipe(concat('scripts-with-angular.js'))
    // .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./www/js'))
})
