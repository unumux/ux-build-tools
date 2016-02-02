var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var path = require("path");
var _ = require("lodash");

var browserify = require("browserify");
var watchify = require("watchify");
var debowerify = require("debowerify");
var babelify = require("babelify");
var minifyify = require("minifyify");

var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

var config = require("../utils/config.js")();
var errorHandler = require("../utils/errorHandler.js");
var reload = require("../utils/browserSyncReload.js")();

var presets = [
    require("babel-preset-es2015"),
    require("babel-preset-react")
];


gulp.task("js", function() {
    if(!config.local.js) return; // if JS paths aren't set or if JS compiling is disabled, skip

    if(config.local.js.legacy && config.local.js.legacy.concat) {

        return gulp.src(config.local.js.src)
            .pipe($.ignore("site.min.js"))
            .pipe($.sourcemaps.init())
            .pipe($.cached('scripts'))
            .pipe($.uglify())
            .pipe($.remember('scripts'))
            .pipe($.concat("site.min.js"))
            .pipe($.sourcemaps.write("./", {
                sourceRoot: "./"
            }))
            .pipe(gulp.dest(config.local.js.dest))
            .pipe(reload({stream: true}));

    } else if(config.local.js.main && config.local.compileJs) {
        var customOpts = {
            entries: config.local.js.main,
            debug: true
        };

        var baseName = path.basename(config.local.js.main, path.extname(config.local.js.main));
        var outputFilename = baseName + ".min.js";

        var opts = _.assign({}, watchify.args, customOpts);
        var b = watchify(browserify(opts));

        b.transform(babelify.configure({
            presets: presets
        }));

        b.transform(debowerify);

        b.plugin(minifyify, {map: outputFilename + ".map", output: path.join(config.local.js.dest, outputFilename + ".map")});

        b.on("update", bundle);
        // b.on('log', $.util.log); // output build logs to terminal

        return bundle();


        function bundle() {
            return b.bundle()
              .on("error", errorHandler)
              .pipe(source(outputFilename))
              .pipe(buffer())
              .pipe(gulp.dest(config.local.js.dest))
              .pipe(reload({stream: true}));
        }
    }

});
