module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ["src/*.js"],
      options: {
        "esnext": true
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          '.tmp/*.js': 'src/*.js'
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/FGLightbox.css': 'src/styles.scss'
        }
      }
    },
    uglify: {
      main: {
        files: {
          'dist/FGLightbox.min.js': ['.tmp/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['jshint', 'sass', 'babel', 'uglify']);

};