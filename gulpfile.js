'use strict';

var source = require('vinyl-source-stream'),
    del = require('del'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    eslint = require('gulp-eslint'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    envify = require('envify/custom');

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
}

function rebundle(bundler, app, production) {
    var stream = bundler.bundle();
    return stream
        .on('error', handleErrors)
        .pipe(plumber())
        .pipe(gulpif(!production, source(app + '.js')))
        .pipe(gulpif(production, source(app + '.min.js')))
        .pipe(gulpif(production, streamify(uglify())))
        .pipe(gulp.dest('./static/js/build/app/' + app + '/'));
}

function buildScript(app, production) {
    process.env.NODE_ENV = production ? 'production' : 'development';

    var props = {
        entries: ['./' + app + '/static/js/app.js'],
        debug: false,
        cache: {},
        packageCache: {}
    };

    var bundler = production ? browserify(props) : watchify(browserify(props));
    bundler.transform(babelify).transform(envify());
    bundler.on('update', function () {
        rebundle(bundler, app, production);
        gutil.log('Rebundle ...');
    });

    return rebundle(bundler, app, production);
}

gulp.task('clean', function () {
    del('./static/js/build/');
});

gulp.task('lint', function () {
    return gulp.src(['./' + gutil.env.app + '/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('uglify-es5-shim', function () {
    gulp.src('./static/js/es5-shim.js')
        .pipe(rename('es5-shim.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./static/js/'));
});

gulp.task('build', function () {
    return buildScript(gutil.env.app, true);
});

gulp.task('watch', function () {
    return buildScript(gutil.env.app, false);
});