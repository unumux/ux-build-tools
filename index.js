var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var path = require('path');
var fs = require('fs');


var config = require(path.join(process.cwd(), 'ux.json'))

var paths = config;

function errorHandler(e) {
    $.notify().write(e)
    this.emit('end');
}

// everything related to scss and css minification
gulp.task('styles', function() {
    if(!paths.scss) return; // if the scss paths aren't set, skip this step
    return gulp.src(paths.scss.src)
        .pipe($.sourcemaps.init()) // start sourcemap processing
        .pipe($.sass({
            includePaths: ['./bower_components'],
            outputStyle: 'compact'
        })) // compile the sass
        .on('error', errorHandler) // if there are errors during sass compile, call errorHandler
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write('./')) // write sourcemaps to a map file
        .pipe(gulp.dest(paths.scss.dest)) // output minified css to the output dir
        .pipe(reload({stream:true})) // reload with minified css using browsersync
        .pipe(gulp.dest(paths.scss.dest))
});


gulp.task('js', function() {
    if(!paths.js && config.compileJs) return;
    return gulp.src([paths.js.src, '!**/*.min.js'])
        .pipe(reload({stream:true}))
        .pipe($.uglify())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.js.dest))
});

gulp.task('browsersync', function() {
    return browserSync.init({
        server: config.server
    })
});

gulp.task('default', ['styles', 'js', 'watch', 'browsersync']);

gulp.task('watch', function() {
    if(paths.scss) {
        gulp.watch(paths.scss.src, ['styles']);
    }

    if(paths.js) {
        gulp.watch([paths.js.src, '!**/*.min.js'], ['js']);
    }

    if(paths.watch) {
        gulp.watch(paths.watch, reload);
    }
});
