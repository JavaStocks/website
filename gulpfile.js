'use strict';
var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    watch   = require('gulp-watch'),
    minify  = require('gulp-minify'),
    concat  = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    minifycss = require('gulp-clean-css'),
    livereload = require('gulp-livereload');

gulp.task('sass', function () {
    gulp.src('./css/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});

gulp.task('js', function() {
    return gulp.src('./js/dist/*.js')
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('./js'));
});

gulp.task('run', function () {
    nodemon({
        script: 'app.js',
        watch: ["routes.js", "app.js", "views/*", 'js/dist/*', 'css/sass/*'],
        ext: 'html js scss'
    }).on('restart', function() {
        gulp.src('app.js');
        gulp.run('sass', 'js');
    });


    //gulp.watch([ './css/sass/*.scss', './js/dist/*.js' ], ['sass', 'js']);
});