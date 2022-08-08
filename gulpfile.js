const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const data = require('gulp-data');
const connect = require('gulp-connect');
const sitemap = require('gulp-sitemap');
const fs = require('fs');

function buildSass() {
  gulp.src('src/sass/**/*.sass')
  .pipe(data((file) => {
    console.log("[build] "+file['history']);
  }))
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest('./static/assets/css'))
  .pipe(connect.reload());
}

function buildPug() {  
  let build_time = new Date().getTime();
  gulp.src('src/pug/**/index.pug')
  .pipe(data((file) => {
    console.log("[build] "+file['history']);
    const result = {
      index: require('./data/index.json'),
      creatives: require('./data/creatives.json'),
      timestamp: build_time
    };
    return result;
  }))
  .pipe(pug())
  .pipe(gulp.dest('./static/'))
  .pipe(sitemap({siteUrl: 'https://b1t.tw'}))
  .pipe(gulp.dest('./static/'))
  .pipe(connect.reload());
}

gulp.task('build', async() => {
  await buildSass();
  await buildPug();
});

gulp.task('server', function () {
    connect.server({
        port: 3000,
        livereload: true,
        root: 'static'
    })
    buildSass();
    buildPug();
    gulp.watch(['src/**/*.sass',], function(event){
      buildSass();
      event();
    });
    gulp.watch(['src/**/*.pug', 'src/**/*.sass', 'static/assets/js/*.js', 'data/*.json'], function(event){
      buildPug();
      event();
    });
});