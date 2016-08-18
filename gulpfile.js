
var gulp = require('gulp');
var sync = require('browser-sync').create();

var notify = require('gulp-notify');

var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var stylus = require('gulp-stylus');
var pug = require('gulp-pug');

var sourcemaps = require('gulp-sourcemaps');

var path = require('path');
var fs = require('fs');

var objectus = require('objectus');

objectus('config/', function(error, result) {
  if (error) {
    notify(error);
  }
  data = result;
});


gulp.task('objectus', function() {
  objectus('config/', function(error, result) {

    if (error) {
      notify(error);
    }

    data = result;

  });

  return true;

});

gulp.task('vendors', function() {

  gulp.src([
    'bower_components/jquery/dist/jquery.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(concat('vendor.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/js/lib'));

});

gulp.task('coffee', function() {

  fs.writeFileSync('public/js/config.js', "var config = " + JSON.stringify(data) + ";", 'utf8')

  gulp.src('coffee/**/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true})
      .on('error', notify.onError(function(error) {
        return {title: "Coffee error", message: error.message + "\r\n" + error.filename + ':' + error.location.first_line, sound: 'Pop'};
      }))
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('pub/js'))
    .pipe(sync.stream());
});

gulp.task('stylus', function() {

  gulp.src('stylus/main.styl')

    .pipe(sourcemaps.init())
    .pipe(stylus({ rawDefine: { data: data } })
    .on('error', notify.onError(function(error) {
      return {title: "Stylus error: " + error.name, message: error.message, sound: 'Pop' };
    })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe(sync.stream());
});


gulp.task('pug', function() {

  gulp.src('view/**/index.pug')
    .pipe(pug({pretty: true, locals: {data: data}})
      .on('error', notify.onError(function(error) {
        return {title: "Jade error: " + error.name, message: error.message, sound: 'Pop' };
      }))
      .on('error', function(error) {
        console.log(error);
      })
    )
    .pipe(gulp.dest('public'))
    .pipe(sync.stream());

});

gulp.task('sync', function() {
  sync.init({
    notify: false,
    open: false,
    server: {
      baseDir: 'public/',
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
    scrollProportionally: false,
    //scrollRestoreTechnique: 'cookie'
  });

  gulp.watch('config/**/*', ['objectus','stylus','pug']);
  gulp.watch('coffee/**/*.coffee', ['objectus', 'coffee']);
  gulp.watch('stylus/**/*.styl', ['stylus']);
  gulp.watch('view/**/*.pug', ['pug']);
  gulp.watch('resource/svg/**/*.svg', ['pug']);
  gulp.watch('public/image/**/*', ['pug']);

});


gulp.task('watch', function() {
  gulp.watch('config/**/*', ['objectus','stylus','pug']);
  gulp.watch('coffee/**/*.coffee', ['coffee']);
  gulp.watch('stylus/**/*.styl', ['stylus']);
  gulp.watch('view/**/*.pug', ['pug']);
});

gulp.task('default', ['objectus','coffee', 'stylus', 'pug', 'vendors']);
