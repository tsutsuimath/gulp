var gulp = require('gulp');
var less = require('gulp-less'); 
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var gulpautoprefixer = require("gulp-autoprefixer");

/* Task to compile less */
gulp.task('compile-less', function() {  
    var srcfile = "./src/styles.less";
    var temp = "./dist/css";
    return gulp
      .src(srcfile)
      .pipe(less())
      .pipe(gulpautoprefixer({ browsers: ["last 2 versions", ">5%"] }))
      .pipe(gulp.dest(temp));
}); 

/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('./src/*.less' , gulp.series('compile-less'));
});

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    }); 
    gulp.watch("./src/*.less").on("change", reload);
    gulp.watch("./dist/*.html").on("change", reload);
});

/* Task when running `gulp` from terminal */
gulp.task('default', gulp.parallel('serve', 'watch-less'));