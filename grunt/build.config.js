module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'dist',
  async_vendor_dir: 'vendor',
  
  app_files: {
    js: [
      'app/app.js',
      'app/app.constant.js',
      'app/app.config.js',
      'app/app.run.js',
      'app/app.controller.js',
			'app/**/*.module.js',
      'app/**/*.config.js',
      'app/common/directives/**/*.js',
      'app/common/services/**/*.js',
      'app/common/filters/**/*.js',
      'theme/**/*.js'
    ],
    css: [
      'theme/css/theme.css',
      'assets/css/app.css'
    ]
  },
  
  vendor_files: {
    js: [
      //Libs
      'bower_components/jquery/dist/jquery.js',
      'bower_components/lodash/dist/lodash.min.js',
      'bower_components/moment/moment.js',
      //Bootstrap
      'bower_components/bootstrap/dist/js/bootstrap.js',
      //Angular
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      //Angular ui router
      'bower_components/angular-ui-router/release/angular-ui-router.js', 
      //Restangular
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-ui-utils/ui-utils.js',
      'bower_components/restangular/dist/restangular.js',
      //Angular bootstrap
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      //OCLazyload
      'bower_components/oclazyload/dist/ocLazyLoad.js',
      //Angular translate
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      //Autre vendors
      'bower_components/ng-table/ng-table.js',
      'bower_components/AngularJS-Toaster/toaster.js',
      'bower_components/angular-ui-select/dist/select.js'
    ],
    css: [
      'bower_components/animate.css/animate.css',
      'bower_components/font-awesome/css/font-awesome.min.css',
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/ng-table/ng-table.css',
      'bower_components/angular-ui-select/dist/select.css',
      'bower_components/AngularJS-Toaster/toaster.css'
    ],
    assets: [
    ]
  },
  
  async_vendor_files: [
    'jquery.easy-pie-chart/dist/angular.easypiechart.js',
    'jquery.sparkline/dist/jquery.sparkline.min.js',
    'Flot/jquery.flot.js',
    'Flot/jquery.flot.resize.js',
    'flot.tooltip/js/jquery.flot.tooltip.min.js',
    'flot-spline/js/jquery.flot.spline.min.js',
    'flot.orderbars/js/jquery.flot.orderBars.js',
    'Flot/jquery.flot.pie.js',
    'screenfull/dist/screenfull.min.js',
    'slimscroll/jquery.slimscroll.min.js',
    'html5sortable/jquery.sortable.js',
    'nestable/jquery.nestable.js',
    'bootstrap-filestyle/src/bootstrap-filestyle.js',
    'bootstrap-slider/bootstrap-slider.js',
    'bootstrap-slider/bootstrap-slider.css',
    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css',
    'bootstrap-wysiwyg/bootstrap-wysiwyg.js',
    'bootstrap-wysiwyg/external/jquery.hotkeys.js'
    
  ]
};


