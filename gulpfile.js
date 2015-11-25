var args = require('yargs').argv;
var del = require('del');
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulpconfig')();

gulp.task('default', $.taskListing);

gulp.task('tsc', ['clean'], function() {
	return gulp.src([config.paths.core + config.queries.ts])
    .pipe($.typescript(config.ts))
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.build));
});

gulp.task('clean', function (cb) {
    clean(config.paths.build + config.queries.all, cb);
});

function clean(path, cb) {
    log('Cleaning: ' + path);
    del(path).then(function (deletedPaths) {
        if (deletedPaths.length === 0) {
            log('No files were deleted.');
        } else {
            log('Deleted files:');
            for (var idx = 0; idx < deletedPaths.length; idx++) {
                log(deletedPaths[idx]);
            }
        }

        cb();
    });
}

function log(msg) {
    $.util.log($.util.colors.yellow('Info: ' + msg));
}