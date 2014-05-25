module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/effect.js', 'src/simple-explosion.js', 'src/explosion.js', 'src/ink-stain.js', 'src/burn.js', 'src/fireworks.js'],
        dest: 'build/<%= pkg.name.toLowerCase() %>.js'
      }
    },
    uglify: {
      options: {
        //wrap: "CreateJsEffectsLibrary",
        //exportAll: true,
        mangle: true
      },
      my_target: {
        files: {
          'build/<%= pkg.name.toLowerCase() %>.min.js': ['build/<%= pkg.name.toLowerCase() %>.js']
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

