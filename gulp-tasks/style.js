var gulp = require('gulp')
var concat = require('gulp-concat')
var prefix = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')

gulp.task('style', function () {
  return gulp.src([
    './bower_components/bootstrap/dist/css/bootstrap.css',
    './src/scss/style.scss'
  ])
    .pipe(prefix('last 1 version', '> 1%', 'ie 10', 'ie 11', 'iOS 6', 'iOS 7', 'Android 4', {
      cascade: true
    }))
    .pipe(concat('style.css'))
    .pipe(minifycss({keepSpecialComments: 0}))
    .pipe(gulp.dest('./www/css'))
})
