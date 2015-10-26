var gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  handlebars = require('gulp-htmlbars-compiler'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  changed = require('gulp-changed'),
  plumber = require('gulp-plumber'),
  debug = require('gulp-debug'),
  webserver = require('gulp-webserver'),
  stubby = require('gulp-stubby-server');


var templatesCompiler = require('./bower_components/ember/ember-template-compiler');

var SCRIPTS_SRC = [
    'src/scripts/core.js',
    'src/scripts/**/*.js'
  ],
  SCSS_SRC = ['src/scss/*.scss'],
  TEMPLATES_SRC = ['src/templates/**/*.hbs'],
  VENDORS = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/ember/ember.js',
    'bower_components/ember/ember-template-compiler.js'
  ],
  PROTOTYPES_SRC = ["src/prototypes/**/*"],
  ASSETS_SRC = ["src/assets/**"];




gulp.task('webserver', ['stubby'], function(){
  gulp.src('../build')
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: 'http://localhost:8000/app/index.html',
    proxies: [
      {
        'source': '/api',
        'target': 'http://127.0.0.1:8882/api'
      }
    ]
  }));
});

gulp.task('stubby', function(cb) {
  var options = {
          files: [
              'src/mocks/*.request.json'
          ],
          mute: false
      };
  stubby(options, cb);
});

gulp.task('sass', function() {
  return gulp.src(SCSS_SRC)
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('../build/dist/css'));
});


gulp.task('templates', function() {

  gulp.src('src/templates/**/*.html').pipe(gulp.dest('../build/app/'));

  gulp.src(TEMPLATES_SRC)
    .pipe(changed('../.tmp/templates/'))
    .pipe(debug())
    .pipe(gulp.dest('../.tmp/templates/'))
    .on('end', function() {
      return gulp.src(['../.tmp/templates/**/*.hbs'])
        .pipe(debug())
        .pipe(handlebars({
          isHTMLBars: true,
          outputType: 'browser',
          namespace: 'Ember.TEMPLATES',
          compiler: templatesCompiler,
        }))
        .pipe(concat('templates.js'))
        .pipe(plumber())
        .pipe(gulp.dest('../build/dist/js/'));
    });


});


gulp.task('vendors', function() {

  return gulp.src(VENDORS)
    .pipe(gulp.dest('../build/dist/js/vendors/'));
});

gulp.task('scripts', function() {

  return gulp.src(SCRIPTS_SRC)
    .pipe(changed('../.tmp/js/'))
    .pipe(debug())
    .pipe(gulp.dest('../.tmp/js/'))
    .on('end', function() {

      return gulp.src(['../.tmp/js/core.js', '../.tmp/js/**/*.js'])
        .pipe(concat('all.min.js'))
        //.pipe(uglify({ mangle: false }))
        .pipe(plumber())
        .pipe(gulp.dest('../build/dist/js/'));
    });

});

gulp.task('assets', function() {

  return gulp.src(ASSETS_SRC).pipe(gulp.dest('../build/dist/assets/'));


});


gulp.task('prototypes', function() {

  return gulp.src(PROTOTYPES_SRC)
    .pipe(debug())
    .pipe(changed('../.tmp/prototypes/'))
    .pipe(gulp.dest('../.tmp/prototypes/'))
    .pipe(gulp.dest('../build/protoypes/'))
});

gulp.task('watch', ['assets', 'scripts','vendors','templates', 'sass', 'prototypes', 'webserver'], function() {
  //watches SCSS files for changes
  //gulp.watch('scss/*.scss', ['css']);

  //watches handlebars files for changes
  gulp.watch(PROTOTYPES_SRC, ['prototypes']);
  gulp.watch(SCSS_SRC, ['sass']);
  gulp.watch(TEMPLATES_SRC, ['templates']);

  //watches JavaScript files for changes
  gulp.watch(SCRIPTS_SRC, ['scripts']);
});
