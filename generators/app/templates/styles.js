var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var config = require('./config.json');


// Style
gulp.task('styles', function () {
  gulp.src(config.styles_scss)
    .pipe($.plumber())    
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.compile_styles))
});

gulp.task('styles:b', function () {
  gulp.src(config.styles_scss)   
    .pipe($.plumber()) 
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe(gulp.dest(config.d_styles))  
    .pipe(csso())    
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(config.d_styles)); 
});

// Vendor Style
gulp.task('vendorStyles', function () {
  gulp.src(config.vendor_scss)
    .pipe($.plumber())    
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.compile_Vstyles))
});

gulp.task('vendorStyles:b', function () {
  gulp.src(config.vendor_scss) 
    .pipe($.plumber())   
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe(gulp.dest(config.d_Vstyles))  
    .pipe(csso())    
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest(config.d_Vstyles)); 
});

