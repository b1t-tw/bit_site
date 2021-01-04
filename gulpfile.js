const gulp = require('gulp');
const pug = require('gulp-pug');
const data = require('gulp-data');
const connect = require('gulp-connect');
const sitemap = require('gulp-sitemap');
const fs = require('fs');

gulp.task('server', function () {
    connect.server({
        port: 3000,
        livereload: true,
        root: 'static'
    })
    gulp.src('src/**/index.pug')
    .pipe(data((file) => {
      console.log("[build] "+file['history']);
      const result = {
        index: require('./data/index.json'),
        creatives: require('./data/creatives.json')
      };
      return result;
    }))
    .pipe(pug())
    .pipe(gulp.dest('./static/'))
    .pipe(sitemap({siteUrl: 'https://b1t.tw'}))
    .pipe(gulp.dest('./static/'))
    .pipe(connect.reload());

    gulp.watch(['src/**/*.pug', 'static/assets/css/*.css', 'static/assets/js/*.js', 'data/*.json'], function(event){
      gulp.src('src/**/index.pug')
      .pipe(data((file) => {
        console.log("[build] "+file['history']);
        const result = {
          index: require('./data/index.json'),
          creatives: require('./data/creatives.json')
        };
        return result;
      }))
      .pipe(pug())
      .pipe(gulp.dest('./static/'))
      .pipe(sitemap({siteUrl: 'https://b1t.tw'}))
      .pipe(gulp.dest('./static/'))
      .pipe(connect.reload());
      event();
    });
});