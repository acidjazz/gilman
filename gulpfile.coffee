
gulp         = require('gulp')
sync         = require('browser-sync').create()
notify       = require('gulp-notify')
coffee       = require('gulp-coffee')
browserify   = require('browserify')
watchify     = require('watchify')
coffeeify    = require('coffeeify')
babelify     = require('babelify')
assign       = require('lodash.assign')
source       = require('vinyl-source-stream')
buffer       = require('vinyl-buffer')
uglify       = require('gulp-uglify')
concat       = require('gulp-concat')
stylus       = require('gulp-stylus')
pug          = require('gulp-pug')
sourcemaps   = require('gulp-sourcemaps')
fs           = require('fs')
objectus     = require('objectus')

dirs =
  coffee: 'resources/coffee'
  pug: 'resources/views'
  stylus: 'resources/stylus'

objectify = ->
  objectus 'config/', (error, result) ->
    if error
      notify error
    config = result
    return
  config

config = objectify()

gulp.task 'objectus', objectify

gulp.task 'vendor', ->
  gulp.src([ 'node_modules/jquery/dist/jquery.js' ]).pipe(uglify()).pipe(concat('vendor.min.js')).pipe gulp.dest('public/js/lib')
  return

customOpts =
  entries: [ dirs.coffee + 'main.coffee' ]
  transform: [
    'coffeeify'
    'babelify'
  ]
  extensions: [ '.coffee' ]
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
  .pipe(sourcemaps.init(
    loadMaps: true
    debug: true))
  .pipe(uglify())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./public/js/'))
  .pipe sync.stream()

gulp.task 'bundle-reload', ['bundle'], (done) ->
  sync.reload()
  done()
  return

gulp.task 'stylus', ->
  gulp.src(dirs.stylus + '/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus(rawDefine: config: config)
    .on('error', notify.onError((error) ->
      {
        title: 'Stylus error: ' + error.name
        message: error.message
        sound: 'Pop'
      }
    )))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe sync.reload()

  return

gulp.task 'pug', ->
  gulp.src(dirs.pug + '/**/index.pug').pipe(pug(
    pretty: true
    locals: config: config).on('error', notify.onError((error) ->
    {
      title: 'Pug error: ' + error.name
      message: error.message
      sound: 'Pop'
    }
  )).on('error', (error) ->
    console.log error
    return
  )).pipe(gulp.dest('public')).pipe sync.stream()
  return

watch = ->
  gulp.watch 'config/**/*', [ 'objectus','pug','stylus' ]
  gulp.watch dirs.coffee + '/**/*.coffee', [ 'objectus','bundle-reload' ]
  gulp.watch dirs.stylus + '/**/*.styl', [ 'stylus' ]
  gulp.watch dirs.pug + '/**/*.pug', [ 'pug' ]
  gulp.watch 'resources/vector/**/*.svg', [ 'pug' ]
  gulp.watch 'public/images/**/*', [ 'pug' ]

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
gulp.task 'default', [ 'objectus', 'coffee', 'stylus', 'pug', 'vendor' ]

