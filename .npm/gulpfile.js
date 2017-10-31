var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');

/**
 * Not all tasks need to use streams
 * A gulpfile is just another node program and you can use any package available on npm
 */
var del = require('del');
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  return del(['build']);
});
/* End */


/**
 * SCSS & Lint
 */
var scsslint   = require('gulp-scss-lint');
var minifyCss  = require('gulp-minify-css');
var sass       = require('gulp-sass');
// Path
var scssSrc    = '../docs/styleguide/assets/src/sass/**/*',
    cssDst     = '../docs/styleguide/assets/css';

// Lint SCSS (For Ordering CSS property)
gulp.task('scss-lint', function() {
  return gulp.src(scssSrc)
    .pipe(scsslint({
      'config': 'scss-lint.yml'
    }));
});
// Generate css & minify it
gulp.task('sass', function () {
  return gulp.src(scssSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssDst))
    .pipe(notify({message: 'SCSS compiled'}));
});
/* End */


/**
 * jQuery & Coffee scripts
 */
var uglify = require('gulp-uglify');
// Path
var jsSrc    = '../docs/styleguide/assets/src/js/**/*.js',
    jsDst     = '../docs/styleguide/assets/js';

gulp.task('scripts', ['clean'], function() {
  return gulp.src(jsSrc)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(jsDst))    
    .pipe(notify({message: 'JS compiled'}));
});
/* End */


/**
 * Image minify
 */
var imagemin = require('gulp-imagemin');
// Path
var imgSrc    = '../docs/styleguide/assets/src/images/**/*',
    imgDst     = '../docs/styleguide/assets/images';
// Copy all static images 
gulp.task('images', ['clean'], function() {
  return gulp.src(imgSrc)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 10}))
    .pipe(gulp.dest(imgDst))
    .pipe(notify({message: 'Images compiled'}));
});
/* End */


/**
 * Rerun the task when a file changes
 */
gulp.task('watch', function() {
  gulp.watch(jsSrc, ['scripts']);
  gulp.watch(imgSrc, ['images']);
  gulp.watch(scssSrc, ['sass']);
  gulp.watch(scssSrc, ['scss-lint']);
});
/* End */


// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'sass', 'images', , 'scss-lint']); 
