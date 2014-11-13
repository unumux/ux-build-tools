var help = {
  "GRUNT COMMANDS": {
    "watch": "Watch scss and html",
    "debug": "Build for the debug environment",
    "dev": "Build the dev files",
    "release": "Build the release files"
  },
  "GRUNT COMMANDS (ADVANCED)": {
    "sass:dev": "Compile scss files",
    "sass:release": "Minify  compiled CSS file",
    "wiredep": "Insert bower component scss imports",
    "sass_injection": "Insert imports for local scss files",
    "jshint": "Run jslint for js errors",
    "concat": "Concatenate js files",
    "uncss:dev": "Remove unused css styles",
    "uncss:release": "Remove unused css styles",
    "captain_hook:debug": "link page to debug version of the files",
    "captain_hook:dev": "link page to dev version of js and CSS",
    "captain_hook:release": "link page to release version of js and CSS"
  }
}

module.exports = function(grunt) {
  for(group in help) {
    grunt.log.writeln("\r\n - \x1b[97m" + group + "\x1b[39;49m -------------------------------------------------------------\r\n");
    for(item in help[group]) {
      grunt.log.writeln("   grunt \x1b[93m" + item + "\x1b[39;49m - " + help[group][item]);
    }
  }
}