var gulp = require("gulp");
var requireDir = require("require-dir");
requireDir("./tasks");

gulp.task("default", ["styles", "js", "watch"]);
