var gulp = require('gulp')

gulp.task('html', function () {
  return gulp.src(['./src/**/*.html', './src/**/*.tmpl'])
    .pipe(gulp.dest('./www/'))
})
