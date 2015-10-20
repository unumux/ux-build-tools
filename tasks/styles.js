var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = require('../utils/config')();
var errorHandler = require('../utils/errorHandler.js');
var reload = require('../utils/browserSyncReload.js')();


gulp.task('styles', function() {
    if(!config.local.scss) return; // if the scss paths aren't set, skip this step
    return gulp.src(config.local.scss.src)
        .pipe($.sourcemaps.init()) // start sourcemap processing
        .pipe($.sass({
            includePaths: [config.bowerPackageFolder]
        })) // compile the sass
        .on('error', errorHandler) // if there are errors during sass compile, call errorHandler
        .pipe($.autoprefixer())
        .pipe($.if(config.local.scss.base64 !== false, $.base64({
            maxImageSize: 10*1024,
            extensions: ['svg', 'png', 'jpg']
        })))
        .pipe($.if(config.local.scss.minify !== false, $.minifyCss({compatibility: 'ie8'})))
        .pipe($.if(config.local.scss.minify !== false, $.rename({extname: ".min.css"})))
        .pipe($.sourcemaps.write('./', { sourceRoot: './' })) // start sourcemap processing
        .pipe(gulp.dest(config.local.scss.dest)) // output minified css to the output dir
        .pipe($.ignore('**/*.map'))  // remove map files to prevent reload issues
        .pipe(reload({stream:true})) // reload with minified css using browsersync
});
