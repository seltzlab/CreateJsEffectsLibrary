module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/effects.js', 'src/simple-explosion.js', 'src/explosion.js', 'src/inkstain.js'],
        dest: 'build/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        wrap: "CreateJsEffectsLibrary"
      },
      my_target: {
        files: {
          'build/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>.min.js': ['build/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>.js']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
};

