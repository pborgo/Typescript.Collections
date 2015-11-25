var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');

var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulpconfig')();

gulp.task('default', $.taskListing);