'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;
var config = require('./tasks/config.json');
var requireDir = require('require-dir');
var tasks = requireDir('tasks/');


gulp.task('build',['styles:b','vendorStyles:b',<% if (js_pre_none)  { %>'mainjs:b',<% } %><% if (js_pre_coffe)  { %>'maincoffee:b',<% } %>'headjs:b','vendorjs:b','images','extras','htmlcopy:b','bowerfont:b'],function(){
  return gulp.src(config.dist+'/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default',['clean'],function(){
console.log('Check readme.md');

});
