var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var config = require('./config.json');


// Style
gulp.task('styles', function () {
  gulp.src(config.<% if (css_pre_SCSS)  { %>styles_scss<% } %><% if (css_pre_LESS)  { %>styles_less<% } %>)
    .pipe($.plumber())<% if (css_pre_LESS)  { %>
    .pipe($.less())<% } %>    
    .pipe($.sourcemaps.init())<% if (css_pre_SCSS)  { %>
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) <% } %>
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version','ie 9']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.compile_styles))
});

gulp.task('styles:b', function () {
   gulp.src(config.<% if (css_pre_SCSS)  { %>styles_scss<% } %><% if (css_pre_LESS)  { %>styles_less<% } %>)
    .pipe($.plumber())<% if (css_pre_LESS)  { %>
    .pipe($.less())<% } %>    
    .pipe($.sourcemaps.init())<% if (css_pre_SCSS)  { %>
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) <% } %>
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version','ie 9']})
    ]))
    .pipe(gulp.dest(config.d_styles))  
    .pipe(csso())    
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(config.d_styles)); 
});

// Vendor Style
gulp.task('vendorStyles', function () {
   gulp.src(config.<% if (css_pre_SCSS)  { %>vendor_scss<% } %><% if (css_pre_LESS)  { %>vendor_less<% } %>)
    .pipe($.plumber())<% if (css_pre_LESS)  { %>
    .pipe($.less())<% } %>    
    .pipe($.sourcemaps.init())<% if (css_pre_SCSS)  { %>
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) <% } %>
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version','ie 9']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.compile_Vstyles))
});

gulp.task('vendorStyles:b', function () {
  gulp.src(config.<% if (css_pre_SCSS)  { %>vendor_scss<% } %><% if (css_pre_LESS)  { %>vendor_less<% } %>)
    .pipe($.plumber())<% if (css_pre_LESS)  { %>
    .pipe($.less())<% } %>    
    .pipe($.sourcemaps.init())<% if (css_pre_SCSS)  { %>
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) <% } %>
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version','ie 9']})
    ]))
    .pipe(gulp.dest(config.d_Vstyles))  
    .pipe(csso())    
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest(config.d_Vstyles)); 
});