
gulp         = require('gulp')
sync         = require('browser-sync').create()
notify       = require('gulp-notify')
browserify   = require('browserify')
watchify     = require('watchify')
coffeeify    = require('coffeeify')
assign       = require('lodash.assign')
source       = require('vinyl-source-stream')
buffer       = require('vinyl-buffer')
uglify       = require('gulp-uglify')
clean        = require('gulp-clean-css')
concat       = require('gulp-concat')
stylus       = require('gulp-stylus')
pug          = require('gulp-pug')
sourcemaps   = require('gulp-sourcemaps')
gulpif       = require('gulp-if')
fs           = require('fs')
objectus     = require('objectus')

dirs =
  coffee: 'resources/coffee'
  pug: 'resources/views'
  stylus: 'resources/stylus'

objectify = ->
  config = {}
  objectus 'config/', (error, result) ->
    notify error if error
    config = result
  return config

config = objectify()

gulp.task 'objectus', objectify

env = 'dev'
gulp.task 'goprod', ->
  env = 'prod'
  return

gulp.task 'vendor', ->
  gulp.src([
    'node_modules/jquery/dist/jquery.js'
  ])
  .pipe(uglify())
  .pipe(concat('vendor.js'))
  .pipe gulp.dest('public/js/')
  return

customOpts =
  entries: [dirs.coffee + '/main.coffee']
  transform: ['coffeeify']
  extensions: ['.coffee']
  debug: true

opts = assign({}, watchify.args, customOpts)
b = watchify(browserify(opts))


gulp.task 'bundle', ->
  b.bundle().on('error', notify.onError((error) ->
    {
      title: 'Browserify Error'
      message: '<%= error.message %>'
      sound: 'Pop'
    }
  ))
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulpif(env == 'dev',sourcemaps.init()))
  .pipe(uglify())
  .pipe(gulpif(env == 'dev',sourcemaps.write()))
  .pipe(gulp.dest('./public/js/'))

gulp.task 'bundle-reload', ['bundle'], (done) ->
  sync.reload()
  done()
  return

gulp.task 'stylus', ->
  gulp.src(dirs.stylus + '/main.styl')
    .pipe(gulpif(env == 'dev',sourcemaps.init()))
    .pipe(stylus(rawDefine: config: config)
    .on('error', notify.onError((error) ->
      {
        title: 'Stylus error: ' + error.name
        message: error.message
        sound: 'Pop'
      }
    )))
    .pipe(clean())
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    .pipe(gulp.dest('public/css/'))
    .pipe(sync.stream())

  return

gulp.task 'pug', ->

  gulp.src(dirs.pug + '/**/index.pug')
    .pipe(pug(
      pretty: true
      locals:
        config: config
  ).on('error', notify.onError((error) ->
    {
      title: 'Pug error: ' + error.name
      message: error.message
      sound: 'Pop'
    }
  )).on('error', (error) ->
    console.log error
    return
  )).pipe(gulp.dest('public'))
    .pipe sync.stream()
  return

watch = ->
  gulp.watch 'config/**/*', ['objectus','pug','stylus']
  gulp.watch dirs.coffee + '/**/*.coffee', ['objectus','bundle-reload']
  gulp.watch dirs.stylus + '/**/*.styl', ['stylus']
  gulp.watch dirs.pug + '/**/*.pug', ['pug']
  gulp.watch 'resources/vector/**/*.svg', ['pug']
  gulp.watch 'public/images/**/*', ['pug']

  return

gulp.task 'sync', ->
  sync.init
    notify: false
    open: false
    server: baseDir: 'public/'
    ghostMode:
      clicks: false
      forms: false
      scroll: false
    scrollProportionally: false
  watch()
  return

gulp.task 'watch', watch

gulp.task 'default', ['objectus','stylus','pug','vendor','bundle']
gulp.task 'prod', ['goprod','default']

