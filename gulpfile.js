
var gulp         = require('gulp');
var sync         = require('browser-sync').create();
var notify       = require('gulp-notify');
var coffee       = require('gulp-coffee');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var stylus       = require('gulp-stylus');
var pug          = require('gulp-pug');
var sourcemaps   = require('gulp-sourcemaps');
var fs           = require('fs');
var objectus     = require('objectus');

var objectify = function() {

  objectus('config/', function(error, result) {
    if (error) {
      notify(error);
    }
    config = result;
  });

  return config;

}

var config = objectify();

gulp.task('objectus', objectify);

gulp.task('vendor', function() {

  gulp.src([
    'node_modules/jquery/dist/jquery.js',
  ])
  .pipe(uglify())
  .pipe(concat('vendor.min.js'))
  .pipe(gulp.dest('public/js/lib'));

});

gulp.task('coffee', function() {

  fs.writeFileSync('public/js/config.js', "var config = " + JSON.stringify(config) + ";", 'utf8')

  gulp.src('coffee/**/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true})
      .on('error', notify.onError(function(error) {
        return {title: "Coffee error", message: error.message + "\r\n" + error.filename + ':' + error.location.first_line, sound: 'Pop'};
      }))
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'))
    .pipe(sync.stream());
});

gulp.task('stylus', function() {

  gulp.src('stylus/main.styl')

    .pipe(sourcemaps.init())
    .pipe(stylus({ rawDefine: { config: config } })
    .on('error', notify.onError(function(error) {
      return {title: "Stylus error: " + error.name, message: error.message, sound: 'Pop' };
    })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe(sync.stream());
});


gulp.task('pug', function() {

  gulp.src('view/**/index.pug')
    .pipe(pug({pretty: true, locals: {config: config}})
      .on('error', notify.onError(function(error) {
        return {title: "Pug error: " + error.name, message: error.message, sound: 'Pop' };
      }))
      .on('error', function(error) {
        console.log(error);
      })
    )
    .pipe(gulp.dest('public'))
    .pipe(sync.stream());

});

var watch = function() {

  gulp.watch('config/**/*', ['objectus','stylus','pug']);
  gulp.watch('coffee/**/*.coffee', ['objectus', 'coffee']);
  gulp.watch('stylus/**/*.styl', ['stylus']);
  gulp.watch('view/**/*.pug', ['pug']);
  gulp.watch('resource/svg/**/*.svg', ['pug']);
  gulp.watch('public/image/**/*', ['pug']);

};

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
  });

  watch();

});

gulp.task('watch', watch);

gulp.task('default', ['objectus','coffee', 'stylus', 'pug', 'vendor']);
