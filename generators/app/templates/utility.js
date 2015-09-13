var gulp = require('gulp');
var del = require('del');
var config = require('./config.json');
// Gulp Clean
gulp.task('clean', function(){
  del([
  	config.package,
    config.dist+'/',
    config.app+'/js',
    config.app+'/style.css',
    config.app+'/vendor.css',
    config.temp,
    config.fontpath,
    config.package+'.zip'
    ])
});
