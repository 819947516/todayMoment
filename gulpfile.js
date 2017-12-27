/**
 * Created by Leej on 2017/12/27.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    rev = require('gulp-rev'),
    imagemin = require('gulp-imagemin'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    revCollector = require('gulp-rev-collector');



//处理css
gulp.task('css',function () {
    return gulp.src('./public/less/index.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(autoprefixer())
        .pipe(rev())
        .pipe(gulp.dest('./release/public/css'))
        .pipe(rev.manifest())
        .pipe(rename("css-manifest.json"))
        .pipe(gulp.dest('./release/rev'));

});


//处理图片

gulp.task('images',function () {
    return gulp.src(['./public/images/**/*','./uploads/*'],{base:'./'})
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())
        .pipe(rename('images-manifest.json'))
        .pipe(gulp.dest('./release/rev'))
});

//处理js
gulp.task('js',function () {
    return gulp.src('./index1.html')
        .pipe(useref())
        .pipe(gulpif('*.js',uglify()))
        .pipe(gulpif('*.js',rev()))
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())
        .pipe(rename('js-manifest.json'))
        .pipe(gulp.dest('./release/rev'))
});

//其他

gulp.task('other',function () {
    gulp.src(['./api/*','./public/fonts/*','./public/libs/*','./views/*.html'],{base:'./'})
        .pipe(gulp.dest('./release'))
});

//替换

gulp.task('replace',['css','js','images'],function () {
    gulp.src(['./release/rev/*.json','./release/index1.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./release'))
});

gulp.task('default',['replace','other']);