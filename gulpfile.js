'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var htmlinclude = require('posthtml-include');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var del = require('del');
var cheerio = require('gulp-cheerio');
const htmlmin = require('gulp-htmlmin');

var concatScripts = [
  'build/js/yandex-map.js',
  'build/js/main-menu.js',
  'build/js/modal-basket.js'
];

var svgSpriteImages = [
  'build/img/icon-cart.svg',
  'build/img/icon-fb.svg',
  'build/img/icon-insta.svg',
  'build/img/icon-mail.svg',
  'build/img/icon-mail.svg',
  'build/img/icon-phone.svg',
  'build/img/icon-search.svg',
  'build/img/icon-twitter.svg',
  'build/img/logo-footer.svg',
  'build/img/logo-htmlacademy.svg'
];

gulp.task('css', function () {
  var processors = [autoprefixer()];
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('imagemin', function () {
  return gulp.src('build/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  return gulp.src('build/img/**/*.{png,jpg}')
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('svgsprite', function () {
  return gulp.src(svgSpriteImages)
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('img', gulp.series('imagemin', 'svgsprite', 'webp'));

gulp.task('html', function () {
  return gulp.src('source/**/*.html')
    .pipe(plumber())
    .pipe(posthtml([
      htmlinclude()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('concatjs', function () {
  return gulp.src(concatScripts)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('minjs', function () {
  return gulp.src(['build/js/**/*.js', '!build/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('js', gulp.series('concatjs', 'minjs'));

gulp.task('copy', function () {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/**',
      'source/js/**'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build/'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('reloadPage', function (done) {
  server.reload();
  done();
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/js/**/*.js').on('change', gulp.series('copy', 'js', 'reloadPage'));
  gulp.watch(svgSpriteImages).on('change', gulp.series('copy', 'html', 'reloadPage'));
  gulp.watch('source/**/*.html').on('change', gulp.series('html', 'reloadPage'));
  gulp.watch('source/img/**').on('change', gulp.series('img', 'reloadPage'));
});

gulp.task('build', gulp.series('clean', 'copy', 'img', 'html', 'css', 'js'));
gulp.task('start', gulp.series('build', 'server'));
