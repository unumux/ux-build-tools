    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync').create();
    var reload = browserSync.reload;
    var mainBowerFiles = require('main-bower-files');


    var paths = {
        scss: {
            src: ['Styles/**/*.scss'],
            dest: 'Styles'
        },
        watch: ['Views/**/*.{html,cshtml}', 'Scripts/**/*.js'],
    }

    var ignorePaths = ['!node_modules/**/*', '!bower_components/**/*', '!gulpfile.js'];

    function errorHandler(e) {
        $.notify().write(e)
        this.emit('end');
    }

    // everything related to scss and css minification
    gulp.task('styles', function() {
        if(!paths.scss) return; // if the scss paths aren't set, skip this step
        return gulp.src(paths.scss.src)
            .pipe($.sourcemaps.init()) // start sourcemap processing
            .pipe($.sass()) // compile the sass
            .on('error', errorHandler) // if there are errors during sass compile, call errorHandler
            .pipe($.autoprefixer())
            .pipe($.sourcemaps.write()) // write sourcemaps to the css file
            .pipe(gulp.dest(paths.scss.dest)) // output unminified css to the output dir
            .pipe(reload({stream:true})) // reload with unminified css using browsersync
            .pipe($.cssmin()) // minify css
            .pipe($.rename({suffix: '.min'})) // rename output stream to add .min suffex
            .pipe(gulp.dest(paths.scss.dest))
    });


    gulp.task('js', function() {
        if(!paths.js) return;
        return gulp.src(paths.js)
            .pipe(reload({stream:true}))
            .pipe($.uglify())
            .pipe($.rename({suffix: '.min'}))
            .pipe(gulp.dest('./'))
    });

    gulp.task('bower', function () {
        return gulp.src(mainBowerFiles())
            .pipe(gulp.dest('lib'))
    })


    gulp.task('browsersync', function() {
        return browserSync.init({
            server: false
        })
    });

    gulp.task('default', ['styles', 'js', 'watch', 'browsersync']);

    gulp.task('watch', function() {
        if(paths.scss) {
            gulp.watch(paths.scss.src, ['styles']);
        }

        if(paths.js) {
            gulp.watch(paths.js, ['js']);
        }
        gulp.watch(paths.watch, reload);
    });
