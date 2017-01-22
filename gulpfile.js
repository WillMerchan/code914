var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var moduleImporter = require('sass-module-importer');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('sass/app.scss')
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
          stream: true
    }))
});

gulp.task('autoprefix', () =>
    gulp.src('css/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('sass/*/*.scss', ['sass']); 
  gulp.watch('sass/*.scss', ['sass']); 
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('js/*.js', browserSync.reload); 
});