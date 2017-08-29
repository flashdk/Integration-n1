var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    cleanCSS    = require('gulp-clean-css'),
    rename      = require('gulp-rename'),
    imagemin    = require('gulp-imagemin'),
    useref      = require('gulp-useref');


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
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('imagemini',function () {
    gulp.src("app/images/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
})

gulp.task('default', ['serve','imagemini'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
})