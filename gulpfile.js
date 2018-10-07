const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp
        .src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions']
            })
        )
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }

  });
});

gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
