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
htmlmin      = require('gulp-htmlmin')
concat       = require('gulp-concat')
stylus       = require('gulp-stylus')
pug          = require('gulp-pug')
gutil        = require('gulp-util')
sourcemaps   = require('gulp-sourcemaps')
gulpif       = require('gulp-if')
fs           = require('fs')
objectus     = require('objectus')

env = 'dev'

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

gulp.task 'goprod', ->
  env = 'prod'

gulp.task 'vendor', ->
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
  ])
  .pipe(gulpif(env != 'dev',uglify()))
  .pipe(concat('vendor.js'))
  .pipe gulp.dest('public/js/')

customOpts =
  entries: [dirs.coffee + '/main.coffee']
  transform: ['coffeeify']
  extensions: ['.coffee']
  debug: true

opts = assign({}, watchify.args, customOpts)

watcher = watchify(browserify(opts))

bundle = (watch=true) ->

  if watch == false then bundler = browserify(opts) else bundler = watcher
  bundler.bundle().on('error', notify.onError((error) ->
    title: 'Browserify Error'
    message: '<%= error.message %>'
    sound: 'Pop'
  ))
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulpif(env == 'dev',sourcemaps.init(loadMaps: true)))
  .pipe(gulpif(env != 'dev',uglify()))
  .pipe(gulpif(env == 'dev',sourcemaps.write()))
  .pipe(gulp.dest('./public/js/'))
  sync.reload()

watcher.on 'update', bundle
watcher.on 'log', gutil.log
gulp.task 'bundle', bundle
gulp.task 'bundle-once', ->
  bundle(false)

gulp.task 'stylus', ->
  gulp.src(dirs.stylus + '/main.styl')
    .pipe(gulpif(env == 'dev',sourcemaps.init(loadMaps: true)))
    .pipe(stylus(rawDefine: config: config)
    .on('error', notify.onError((error) ->
      title: 'Stylus error: ' + error.name
      message: error.message
      sound: 'Pop'
    )))
    .pipe(clean())
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    .pipe(gulp.dest('public/css/'))
    .pipe(sync.stream())

gulp.task 'pug', ->
  gulp.src(dirs.pug + '/**/index.pug')
    .pipe(pug(
      pretty: true
      locals:
        config: config
    ).on('error', notify.onError((error) ->
      title: 'Pug error: ' + error.name
      message: error.message
      sound: 'Pop'
    )).on('error', (error) ->
      console.log error
      return
    ))
    .pipe(gulpif(env != 'dev',htmlmin(
      collapseWhitespace: true
      processScripts: ['application/ld+json', 'text/javascript']
    )))
    .pipe(gulp.dest('public'))
    .pipe sync.stream()

watch = ->
  gulp.watch 'config/**/*', ['objectus','pug','stylus']
  gulp.watch dirs.stylus + '/**/*.styl', ['stylus']
  gulp.watch dirs.pug + '/**/*.pug', ['pug']
  gulp.watch 'resources/vector/**/*.svg', ['pug']
  gulp.watch 'public/images/**/*', ['pug']

gulp.task 'sync', ->
  bundle(true)
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

gulp.task 'watch', watch
gulp.task 'default', ['objectus','stylus','pug','vendor','bundle-once']
gulp.task 'prod', ['goprod','default']
