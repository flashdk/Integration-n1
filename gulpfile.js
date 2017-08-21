var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var cleanCSS    = require('gulp-clean-css');
var rename      = require('gulp-rename');


// Static Server + watching scss/html files/*,'dist'*/
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/**/*.scss")
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(cleanCSS())
        //.pipe(sourcemaps.write())
        //.pipe(rename({suffix: '.min',basename:'app'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

/*gulp.task('dist', function(){
    return gulp.src("app/css/*.*")
        .pipe(gulp.dest('dist/css'))
});*/

gulp.task('default', ['serve']);