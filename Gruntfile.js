//Framework Version 2.0.0 for MVC applications
module.exports = function (grunt) {

  grunt.initConfig({
    variables: grunt.file.readJSON('variables.json'),

    sass: {
      dev: {
        files: {
          '<%= variables.dev.css %>': '<%= variables.dev.scss %>' // Output : Input
        }
      },
      release: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= variables.release.css %>': '<%= variables.dev.scss %>' // Output : Input
        }
      }
    },

    concat: {
      debug: {
        nonull: true,
        src: '<%= variables.debug.jsSource %>',
        dest: '<%= variables.dev.js %>'
      },
      dev: {
        nonull: true,
        src: '<%= variables.dev.jsSource %>',
        dest: '<%= variables.dev.js %>'
      }
    },

    uglify: {
      options: {
        report: 'gzip',
        mangle: false
      },
      release: {
        files: {
          '<%= variables.release.js %>' : '<%= concat.dev.dest %>'
        }
      }
    },

    copy: {
      bootstrap: {
        files: [
          {
            expand:true, flatten: true,
            src: '<%= variables.build.bowerBootstrap %>',
            dest: '<%= variables.build.bootstrapDest %>'
          }
        ]
      },
      mixins: {
        files: [
          {
            expand:true, flatten: true,
            src: '<%= variables.build.bowerMixins %>',
            dest: '<%= variables.build.mixinsDest %>'
          }
        ]
      },
      jquery: {
        files: [
          {
            expand:true, flatten:true,
            src: '<%= variables.build.bowerJquery %>',
            dest: '<%= variables.build.jqueryDest %>'
          }
        ]
      },
      branding: {
        files: [
          {
            expand:true, flatten:true,
            src: '<%= variables.build.brandingSrc %>',
            dest: '<%= variables.build.brandingDest %>'
          }
        ]
      },
      sourceSans: {
        files: [
          {
             expand:true, flatten:true,
             src: '<%= variables.build.sourceSansSrc %>',
             dest: '<%= variables.build.sourceSansDest %>'
          }
        ]
      },
      oswald: {
        files: [
          {
            expand:true, flatten:true,
            src: '<%= variables.build.oswaldSrc %>',
            dest: '<%= variables.build.oswaldDest %>'
          }
        ]      
      }
    },

    clean: [
      "<%= variables.build.cleanFolders %>"
    ],

    jshint: {
      files: {
        src: '<%= variables.debug.js %>'
      }
    },

    uncss: {
      dev: {
        options: {
          ignore: [
            /js.*/,
            /active.*/,
            /left.*/,
            /right.*/,
            /prev.*/,
            /next.*/,
            '.has-success',
            '.has-error'
          ]
        },
        files: {
          '<%= variables.dev.css %>': '<%= variables.dev.html %>'
        }
      },

      release: {
        options: {
          ignore: [
            /js.*/,
            /active.*/,
            /left.*/,
            /right.*/,
            /prev.*/,
            /next.*/,
            '.has-success',
            '.has-error'
          ],
          report: 'min'
        },
        files: {
          '<%= variables.release.css %>': '<%= variables.dev.html %>'
        }
      }
    },

    captain_hook: {
      debug: {
        jsFiles: '<%= variables.debug.jsPath %>',
        cssFiles: '<%= variables.debug.cssPath %>',
        targetHtml: '<%= variables.debug.masterLayout %>'
      },
      release: {
        jsFiles: '<%= variables.release.jsPath %>',
        cssFiles: '<%= variables.release.cssPath %>',
        targetHtml: '<%= variables.debug.masterLayout %>'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: '<%= variables.watch.scss %>',
        tasks: ['sass:dev']
      },
      js: {
        files: '<%= variables.watch.js %>',
        tasks: ['modernizr'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['<%= variables.watch.html %>'],
        options: {
          livereload: true
        }
      }
    },

    browserSync: {
      bsfiles: {
        src: '<%= variables.debug.cssPath %>'
      },
      options: {
        proxy: '<%= variables.debug.proxy %>',
        watchTask: true
      }
    },

    modernizr: {
      dist: {
        "devFile": '<%= variables.dev.modernizr %>',
        "outputFile": "<%= variables.release.modernizr %>",
        "parseFiles": true
      }
    }

  });

  grunt.registerTask('bower', function() {
    var exec = require('child_process').exec;
        var cb = this.async();
        exec('bower install', function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
  });

   grunt.registerTask('git', function() {
    var exec = require('child_process').exec;
        var cb = this.async();
        exec('git clone https://github.com/unumux/UI-Framework', function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
  });

  // Pull in the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-captain-hook');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask("default", function () {
    grunt.log.writeln("\r\n - \x1b[97mGRUNT COMMANDS\x1b[39;49m -------------------------------------------------------------\r\n");
    grunt.log.writeln("   grunt \x1b[93mwatch\x1b[39;49m - Watch scss");
    grunt.log.writeln("   grunt \x1b[93mbuild\x1b[39;49m - Build the initial files and installs Bower/Branding components");
    grunt.log.writeln("   grunt \x1b[93mdebug\x1b[39;49m - Build for the debug environment");
    grunt.log.writeln("   grunt \x1b[93mdev\x1b[39;49m - Build the dev files");
    grunt.log.writeln("   grunt \x1b[93mrelease\x1b[39;49m - Build the release files");
    grunt.log.writeln("\r\n - \x1b[97mGRUNT COMMANDS (ADVANCED)\x1b[39;49m --------------------------------------------------\r\n");
    grunt.log.writeln("   grunt \x1b[93mbower\x1b[39;49m - Install bower dependencies");
    grunt.log.writeln("   grunt \x1b[93mgit\x1b[39;49m - Clone UI-Framework from github");
    grunt.log.writeln("   grunt \x1b[93msass:dev\x1b[39;49m - Compile scss files");
    grunt.log.writeln("   grunt \x1b[93msass:release\x1b[39;49m - Minify  compiled CSS file");
    grunt.log.writeln("   grunt \x1b[93mcopy\x1b[39;49m - Copy files from Bower Components to MVC file structure");
    grunt.log.writeln("   grunt \x1b[93mclean\x1b[39;49m - Delete the Bower components folder");
    grunt.log.writeln("   grunt \x1b[93mjshint\x1b[39;49m - Run jslint for javascript errors");
    grunt.log.writeln("   grunt \x1b[93muncss:dev\x1b[39;49m - Remove unused css styles");
    grunt.log.writeln("   grunt \x1b[93muncss:release\x1b[39;49m - Remove unused css styles");
    grunt.log.writeln("   grunt \x1b[93mcaptain_hook:debug\x1b[39;49m - link page to debug version of the files");
    grunt.log.writeln("   grunt \x1b[93mcaptain_hook:dev\x1b[39;49m - link page to dev version of javascript and CSS");
    grunt.log.writeln("   grunt \x1b[93mcaptain_hook:release\x1b[39;49m - link page to release version of javascript and CSS");
  });

  grunt.registerTask('build', ['bower', 'git', 'copy', 'clean', 'sass:dev', 'captain_hook:debug']);
  grunt.registerTask('debug', ['captain_hook:debug', 'browserSync', 'watch']);
  grunt.registerTask('dev', ['sass:dev', 'uncss:dev', 'captain_hook:dev']);
  grunt.registerTask('release', ['concat:dev', "uglify", 'sass:release', 'uncss:release', 'captain_hook:release']);
};
