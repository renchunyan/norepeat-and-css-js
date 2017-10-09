/**
 * Created by 123 on 2017/10/9.
 */
var gulp = require('gulp');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//压缩css和js
gulp.task('minify-css', function () {
    return gulp.src('./css/*.css')
        .pipe(concat('minifyCss.css'))
        .pipe(minify())
        .pipe(gulp.dest('./css'));
});
gulp.task('minify-js', function () {
    return gulp.src('./js/*.js')
        .pipe(concat('minifyJs.js'))
        .pipe(minify())
        .pipe(gulp.dest('./js'));
});