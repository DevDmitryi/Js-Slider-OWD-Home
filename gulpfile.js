'use strict'; 

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const { series } = require('gulp');
sass.compiler = require('node-sass');

//compile scss into css
function scss() {
    return gulp.src('./dev_build/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev_build/css/'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dev_build",
            index: "index.html"
        }
    });
    gulp.watch('./dev_build/scss/**/*.scss', scss)
    gulp.watch('./**/*.html').on('change',browserSync.reload);
    gulp.watch('./**/*.js').on('change', browserSync.reload);
}

exports.scss = scss;
exports.watch = watch;

exports.default = series(scss, watch);