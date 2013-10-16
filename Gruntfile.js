module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: 
      '',
      //'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      //'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      //'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      //' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


    // Task configuration.
    clean: {
    	all: ["dist/"],
		},

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      all: {
        src: [ "dist/debug/lib.js"],
        dest: 'dist/debug/lib.js',
        separator: ";"
      }
    },

    requirejs: {
      all: {
        options: {
          baseUrl: "./src/",
          mainConfigFile: "src/config.js",
          out: "dist/debug/lib.js",
          name: "config",
          wrap: true,
          optimize: "none",
          paths: {
            requireLib: 'lib/require'
          },
          include: ["requireLib","main"],
          namespace: "tfw"
        }
      },
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        //report: 'gzip',
        compress: true
      },
      all: {
        src: 'dist/debug/lib.js',
        dest: 'dist/release/lib.js'
      }
    },
    
    watch: {
      gruntfile: {
        files: ["./src/**/*.js", "index.html"],
      },
    },
    
    connect: {
      all: {
        options: {
          port: 9001,
          baseUrl: "./"
        }
      }
    },
    jasmine: {
      all: {
        src: 'src/tvp/**/*.js',
        options: {
          //keepRunner: true,
          specs: './test/specs/**/*Test.js',
          helpers: './tests/helpers/*Helper.js',
          host: 'http://127.0.0.1:9001/',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'src/config.js',
            requireConfig: {
              baseUrl: "src/"
            }
           }
        }
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Register 
  grunt.registerTask('debug:all', [ 'clean:all', 'requirejs:all', 'concat:all']);
  grunt.registerTask('release:all', [ 'debug:all', 'uglify:all']);
  grunt.registerTask('test:all', ['connect:all', 'jasmine:all']);
};
