module.exports = function(grunt) {
	
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  var userConfig = require( './grunt/build.config.js' );
  
  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),
    
    clean: {
      async_vendor: ['<%= async_vendor_dir %>'],
      init: ['<%= build_dir %>'],
      aftercopy: [
        '<%= build_dir %>/app/*.js',
        '<%= build_dir %>/app/**/*.module.js',
        '<%= build_dir %>/app/**/*.config.js',
        '<%= build_dir %>/app/common/services',
        '<%= build_dir %>/app/common/filters',
        '<%= build_dir %>/app/common/dataservices'
      ]
    },
    
    copy: {
      async_vendor: {
        files: [{
          expand: true, 
          dest: '<%= async_vendor_dir %>', 
          src:[
            '<%= async_vendor_files %>'
          ], 
          cwd:'bower_components/'
        }]
      },
      dist:{
        files: [
            {expand: true, dest: '<%= build_dir %>/app', src:'**', cwd:'app/'},
            {expand: true, dest: '<%= build_dir %>/assets/fonts', src:'**', cwd:'assets/fonts'},
            {expand: true, dest: '<%= build_dir %>/assets/img', src:'**', cwd:'assets/img'},
            {expand: true, dest: '<%= build_dir %>/l10n', src:'**', cwd:'l10n/'},
            {expand: true, dest: '<%= build_dir %>/vendor', src:'**', cwd:'vendor/'},
            {dest: 'dist/index.html', src:'index.min.html'}
        ]
      }
    },
    
    uglify: {
      dist: {
        options: {
          mangle: false
        },
        files: {
          'dist/app/vendors.min.js': [
            '<%= vendor_files.js %>'
          ],
          'dist/app/app.min.js': [
            '<%= app_files.js %>'
          ]
        }
      }
    },
    
    cssmin: {
      dist: {
        files: {
          'dist/assets/css/vendors.min.css': [
            '<%= vendor_files.css %>'
          ],
          'dist/assets/css/app.min.css': [
            '<%= app_files.css %>'
          ]
        }
      }
    }
  
  };

  // Chargement de la config
  grunt.initConfig( grunt.util._.extend(taskConfig, userConfig));

  // Tâche pour builder initialiser le dossier des vendors chargées de manière asynchone
  grunt.registerTask('async_vendor', ['clean:async_vendor', 'copy:async_vendor']);
  // Tâche pour builder l'application en production
  grunt.registerTask('dist', ['clean:init', 'copy:dist', 'clean:aftercopy','uglify:dist', 'cssmin:dist']);
  
};
