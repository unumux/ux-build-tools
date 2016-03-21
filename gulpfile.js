var gulp = require("gulp");

var eslint = require("gulp-eslint");

// var mocha = require("gulp-mocha");

// var istanbul = require("gulp-istanbul");
// var isparta = require("isparta");

var src = ["Gulpfile.js", "{tasks,utils}/**/*.js"];
var tests = "test/**/*.js";


gulp.task("coverage", function(done) {
    done();
    // return gulp.src(src)
    //     .pipe(istanbul({
    //         instrumenter: isparta.Instrumenter
    //     }))
    //     .pipe(istanbul.hookRequire());
});

gulp.task("mocha", function(done) {
    done();

    // return gulp.src(tests)
    //     .pipe(mocha())
    //     .pipe(istanbul.writeReports())
    //     .pipe(istanbul.enforceThresholds({
    //         thresholds: {
    //             global: 90
    //         }
    //     })).once("error", function() {
    //         console.log("ERR")
    //     });
});

gulp.task("eslint", function() {
    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("test", ["eslint", "coverage", "mocha"]);

gulp.task("default", ["test"], function() {
    gulp.watch([src, tests], ["test"]);
});
