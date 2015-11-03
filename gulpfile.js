var gulp = require('gulp')

var requireDir = require('require-dir')
requireDir('./gulp-tasks')

gulp.task('default', ['compile'], function () {
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/**/*.tmpl', ['html'])
  gulp.watch('./src/css/*.css', ['style'])
  gulp.watch('./src/js/**/*.js', ['script'])
})

gulp.task('compile', ['init', 'html', 'style', 'script'])
