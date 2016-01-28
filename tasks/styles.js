var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var config       = require('../utils/config')();
var errorHandler = require('../utils/errorHandler.js');
var reload       = require('../utils/browserSyncReload.js')();

//postCSS plugin declarations
var postcss       = require('gulp-postcss');
    autoprefixer  = require('autoprefixer');
    imageInliner  = require('postcss-image-inliner');
    svgo          = require('postcss-svgo');
    cssnano       = require('cssnano');

gulp.task('styles', function() {
    var processors;
    if(!config.local.scss.minify) {
      processors = [
        autoprefixer,
        svgo,
        imageInliner,
        cssnano({
          discardDuplicates: false
        })
      ];
    } else {
      processors = [
        autoprefixer,
        svgo,
        imageInliner
      ];
    }

    if(!config.local.scss) return; // if the scss paths aren't set, skip this step

    return gulp.src(config.local.scss.src)
        .pipe($.sourcemaps.init()) // start sourcemap processing
        .pipe($.sass({
            includePaths: [config.bowerPackageFolder]
        })) // compile the sass
        .pipe(postcss(processors))
        .on('error', errorHandler) // if there are errors during sass compile, call errorHandler
        .pipe($.if(config.local.scss.minify !== false, $.rename({extname: ".min.css"})))
        .pipe($.sourcemaps.write('./', { sourceRoot: './' })) // start sourcemap processing
        .pipe(gulp.dest(config.local.scss.dest)) // output minified css to the output dir
        .pipe($.ignore('**/*.map'))  // remove map files to prevent reload issues
        .pipe(reload({stream:true})) // reload with minified css using browsersync
});
