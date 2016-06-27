var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var moduleImporter = require("sass-module-importer");

var config = require("../utils/config")();
var errorHandler = require("../utils/errorHandler.js");
var reload = require("../utils/browserSyncReload.js")();

//postCSS plugin declarations
var postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    imageInliner = require("postcss-image-inliner"),
    svgo = require("postcss-svgo"),
    cssnano = require("cssnano"),
    postcssScss = require("postcss-scss"),
    stylelint = require("stylelint"),
    postcssReporter = require("postcss-reporter");

gulp.task("styles", function() {
    var preCompileProcessors = [
        postcssReporter({ clearMessages: true })
    ];

    if(config.local.linting && config.local.linting.styles) {
        preCompileProcessors.push(stylelint({ 
            config: config.stylelint,
            configBasedir: __dirname 
        }));
    }
    
    var processors = [
        autoprefixer,
        svgo,
        imageInliner
    ];

    if (!config.local.scss.minify) {
        processors.push(cssnano({
            discardDuplicates: false
        }));
    }
    
    if (!config.local.scss) return; // if the scss paths aren't set, skip this step
    return gulp.src(config.local.scss.src)
        .pipe($.plumber(errorHandler))
        .pipe($.sourcemaps.init()) // start sourcemap processing
        .pipe(postcss(preCompileProcessors, { syntax: postcssScss }))
        .on("error", errorHandler) // if there are errors during postcss, call errorHandler        
        .pipe($.sass({
            includePaths: [config.bowerPackageFolder],
            importer: [
                function(url, prev, done) {
                    if(url.indexOf("~") === 0 && url.indexOf("/") !== 1) {
                        moduleImporter({
                            basedir: process.cwd()
                        })(url.substr(1), prev, done);
                    } else {
                        return null;
                    }
                }
            ]
        })) // compile the sass
        .on("error", errorHandler) // if there are errors during sass compile, call errorHandler
        .pipe(postcss(processors))
        .pipe($.if(config.local.scss.minify !== false, $.rename({
            extname: ".min.css"
        })))
        .pipe($.sourcemaps.write("./", {
            sourceRoot: "./"
        })) // start sourcemap processing
        .pipe(gulp.dest(config.local.scss.dest)) // output minified css to the output dir
        .pipe($.ignore("**/*.map")) // remove map files to prevent reload issues
        .pipe(reload({
            stream: true
        })); // reload with minified css using browsersync
});
