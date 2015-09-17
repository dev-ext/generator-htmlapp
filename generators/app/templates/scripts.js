var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var config = require('./config.json');


// Lint JS
gulp.task('lint', function() {
  return gulp.src(config.mainjs)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter('default'));
});
<% if (js_pre_none)  { %>
// Main Js
gulp.task('mainjs', function(){
  return gulp.src(config.mainjs)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('main.js'))    
    .pipe(gulp.dest(config.compile_js))
});
gulp.task('mainjs:b', function(){
  return gulp.src(config.mainjs)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('main.js'))    
    .pipe(gulp.dest(config.d_compile_js))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.d_compile_js));
});
<% } %>
<% if (js_pre_coffe)  { %>
// Main coffee script 
gulp.task('maincoffee', function(){
  return gulp.src(config.maincoffee)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('main.js'))    
    .pipe(gulp.dest(config.compile_js))
});
gulp.task('maincoffee:b', function(){
  return gulp.src(config.maincoffee)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('main.js'))    
    .pipe(gulp.dest(config.d_compile_js))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.d_compile_js));
});
<% } %>

// Vendor js
gulp.task('vendorjs', function(){
  return gulp.src(config.vendor_js)
    .pipe(jshint())
    .pipe(concat('vendor.js'))    
    .pipe(gulp.dest(config.compile_js_vendor))
});

gulp.task('vendorjs:b', function(){
  return gulp.src(config.vendor_js)
    .pipe(jshint())
    .pipe(concat('vendor.js'))    
    .pipe(gulp.dest(config.d_compile_js_vendor))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.d_compile_js_vendor));
});

// modernizr
gulp.task('headjs', function(){
  return gulp.src(config.headjs)  
    .pipe(concat('headscripts.js'))  
    .pipe(uglify())
    .pipe(gulp.dest(config.compile_js_vendor))
});

gulp.task('headjs:b', function(){
  return gulp.src(config.headjs)   
    .pipe(concat('headscripts.js')) 
    .pipe(uglify())
    .pipe(gulp.dest(config.d_compile_js_vendor));
});

