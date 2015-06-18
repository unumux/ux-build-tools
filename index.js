var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var glob = require('glob');

var browserify = require('browserify');
var watchify = require('watchify');
var debowerify = require('debowerify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var combiner = require('stream-combiner2');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('node-sass');

var path = require('path');
var fs = require('fs');

var bower = require('bower');

var bowerPackageFolder = bower.config.directory;

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
            includePaths: [bowerPackageFolder]
        })) // compile the sass
        .on('error', errorHandler) // if there are errors during sass compile, call errorHandler
        .pipe($.autoprefixer())
        .pipe($.if(config.scss.base64 !== false, $.base64({
            maxImageSize: 10*1024,
            extensions: ['svg', 'png', 'jpg']
        })))
        .pipe($.if(config.scss.minify !== false, $.minifyCss({compatibility: 'ie8'})))
        .pipe($.if(config.scss.minify !== false, $.rename({extname: ".min.css"})))
        .pipe($.sourcemaps.write('./', { sourceRoot: './' })) // start sourcemap processing
        .pipe(gulp.dest(paths.scss.dest)) // output minified css to the output dir
        .pipe(reload({stream:true})) // reload with minified css using browsersync
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

    if(paths.watch) {
        gulp.watch(paths.watch, reload);
    }
});



gulp.task('js', function() {
    if(!paths.js || !paths.js.main || !config.compileJs) return; // if JS paths aren't set or if JS compiling is disabled, skip

    var customOpts = {
        entries: paths.js.main,
        debug: true
    };

    var baseName = path.basename(paths.js.main, path.extname(paths.js.main));
    var outputFilename = baseName + ".min.js";

    var opts = _.assign({}, watchify.args, customOpts);
    var b = watchify(browserify(opts));

    b.transform(babelify);
    b.transform(debowerify);

    b.on('update', bundle);
    b.on('log', $.util.log); // output build logs to terminal

    return bundle();


    function bundle() {

        var combined = combiner([
            b.bundle(),
            source(outputFilename),
            buffer(),
            $.sourcemaps.init({loadMaps: true}),
            $.uglify(),
            $.sourcemaps.write('./', {sourceRoot: './', includeContent: true}),
            gulp.dest(paths.js.dest),
            reload({stream:true})
        ]);

        combined.on('error', errorHandler);

        return combined;
    }

});
