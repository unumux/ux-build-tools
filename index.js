var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var browserify = require('browserify');
var watchify = require('watchify');
var debowerify = require('debowerify');
var babelify = require('babelify');
var minifyify = require('minifyify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var path = require('path');
var fs = require('fs');

var bower = require('bower');

var bowerPackageFolder = bower.config.directory;

var config = require(path.join(process.cwd(), 'ux.json'));

var home = getUserHome();
var globalConfigPath = path.join(home, '.ux-global.json');

if(fs.existsSync(globalConfigPath)) {
        var globalConfig = require(globalConfigPath);
}

var paths = config;

var loginMiddleware = require('./utils/login-middleware.js');

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
        .pipe($.ignore('**/*.map'))  // remove map files to prevent reload issues
        .pipe(reload({stream:true})) // reload with minified css using browsersync
});

var browserSyncConfig = {}
if(config.server) {
    browserSyncConfig.server = "./";
} else if(config.proxy) {
    if(!globalConfig || !globalConfig.login || !globalConfig.login.username || !globalConfig.login.password) {
        console.log('You must setup your memberservices credentials. Please run ux --login (this needs to only be done once)');
        process.exit(1);
    }
    browserSyncConfig.proxy = {
        target: config.proxy,
        middleware: loginMiddleware(globalConfig.login.username, globalConfig.login.password)
    }
}

gulp.task('browsersync', function() {
    if(browserSyncConfig) {
        return browserSync.init(browserSyncConfig);
    }
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

    b.plugin(minifyify, {map: outputFilename + '.map', output: path.join(paths.js.dest, outputFilename + '.map')});

    b.on('update', bundle);
    // b.on('log', $.util.log); // output build logs to terminal

    return bundle();


    function bundle() {
        return b.bundle()
          .on('error', errorHandler)
          .pipe(source(outputFilename))
          .pipe(buffer())
          .pipe(gulp.dest(paths.js.dest))
          .pipe(reload({stream: true}));
    }

});

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
