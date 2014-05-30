var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    reactify = require('reactify'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer');

var paths = {
    js: 'js/*.js'
};

gulp.task('build_bundle', function(){
    gulp.src('js/main.js')
        .pipe(browserify({
            transform: [reactify]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('compile_sass', function(){
    gulp.src('sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './build/css'
        }))
        .pipe(autoprefixer(['last 2 versions']))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function(){
    gulp.watch(paths.js, ['build_bundle']);
    gulp.watch('sass/*.scss', ['compile_sass']);
});