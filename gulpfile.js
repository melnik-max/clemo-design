'use strict'

const gulp = require('gulp')
const rigger = require('gulp-rigger')
const browserSync = require('browser-sync').create()
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const reload = browserSync.reload

const config = {
  server: './build',
  notify: false,
  port: 3000,
  open: false
}

const path = {
  build: {
    html: 'build/',
    js: 'build/js',
    css: 'build/css',
    img: 'build/img'
  },
  dev: {
    html: 'dev/*.html',
    js: 'dev/js/*.js',
    css: 'dev/scss/**/*.scss',
    img: 'dev/img/*.*'
  },
  watch: {
    html: 'dev/**/*.html',
    js: 'dev/js/*.js',
    css: 'dev/scss/**/*.scss',
    img: 'dev/img/*.*'
  }
}

gulp.task('html:build', function (done) {
  gulp.src(path.dev.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }))
  done()
})

gulp.task('css:build', function (done) {
  gulp.src(path.dev.css)
    .pipe(sass())
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }))
  done()
})

gulp.task('img:build', function (done) {
  gulp.src(path.dev.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }))
  done()
})

gulp.task('js:build', function (done) {
  gulp.src(path.dev.js)
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }))
  done()
})

gulp.task('server', gulp.series('html:build', 'css:build', 'img:build', 'js:build', function (done) {
  browserSync.init(config)

  gulp.watch(path.watch.html).on('change', gulp.series('html:build'))
  gulp.watch(path.watch.css).on('change', gulp.series('css:build'))
  gulp.watch(path.watch.js).on('change', gulp.series('js:build'))
  gulp.watch(path.watch.img).on('change', gulp.series('img:build'))

  done()
}))

gulp.task('build', gulp.series('html:build', 'css:build', 'img:build', 'js:build'))
gulp.task('default', gulp.series('build', 'server'))
