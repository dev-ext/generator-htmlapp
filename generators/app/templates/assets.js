var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var minifyHTML = require('gulp-minify-html');
var fileinclude = require('gulp-file-include');
var htmlreplace = require('gulp-html-replace');
var config = require('./config.json');
var asset = require('./tasks/asset.json');

// HTML and  others Copy
gulp.task('htmlcopy',function(){
 return gulp.src([config.app+'/*.html'])
 .pipe(fileinclude({
      prefix: '@',
      basepath: ''
    }))
 .pipe(gulp.dest(config.dist));
});

gulp.task('htmlcopy:b',function(){
  var opts = {
    conditionals: true,
    spare:true,
    empty :true
  };
 return gulp.src([config.app+'/*.html'])
 .pipe(fileinclude({
      prefix: '@',
      basepath: ''
    }))
 .pipe(htmlreplace({
        'css': 'style.min.css',
        'vendorcss':'vendor.min.css',
        'js': config.u_mainjs,
        'vendorjs': config.u_vendorjs
    }))
 .pipe(minifyHTML(opts)) 
 .pipe(gulp.dest(config.dist));
});

gulp.task('bowerfont',function(){
 return gulp.src(asset.bowerfont)
 .pipe(gulp.dest(config.fontpath))
});

gulp.task('bowerfont:b',function(){
 return gulp.src(asset.bowerfont)
 .pipe(gulp.dest(config.d_fontpath))
});

gulp.task('extras', function () {
  return gulp.src([
    config.app+'/*.*',
    '!'+config.app+'/*.html',
    '!'+config.app+'/*.tpl',
    '!'+config.app+'/*.scss'
  ], {
    dot: true
  }).pipe(gulp.dest(config.dist));
});
