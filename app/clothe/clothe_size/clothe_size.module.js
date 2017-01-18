/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('app.parameter.clothe_size', [
  
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
  var prefixCtrlPath = 'app/parameter/clothe_size/clothe_size_';
  var prefixTplPath = 'app/parameter/clothe_size/clothe_size_';
    
  $stateProvider.state('app.parameter.clothe_size', {
    url: '/clothe-size',
    parent: 'app.parameter',
    template: '<ui-view/>',
    abstract: true
  })
  .state('app.parameter.clothe_size.index', {
    url: '',
    templateUrl: prefixTplPath + 'list.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function( $ocLazyLoad ){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_size',
          files: [prefixCtrlPath + 'index.ctrl.js']
        });
      }],
      clotheSizes: ['Restangular', function(Restangular) {
        return Restangular.all('clothe-size').getList().then(function(clotheSizes) {
          return clotheSizes;
        });
      }]
    },
    controller: 'ClotheSizeIndexCtrl'
  })
  .state('app.parameter.clothe_size.new', {
    url: '/new',
    templateUrl: prefixTplPath + 'form.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_size',
          files: [prefixCtrlPath + 'new.ctrl.js']
        });
      }]
    },
    controller: 'ClotheSizeNewCtrl'
  })
  .state('app.parameter.clothe_size.edit', {
    url: '/{id}/edit',
    templateUrl: prefixTplPath + 'form.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_size',
          files: [prefixCtrlPath + 'edit.ctrl.js']
        });
      }],
      clotheSize: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
        return Restangular.one('clothe-size', $stateParams.id).get().then(function(item) {
          return item;
        });
      }]
    },
    controller: 'ClotheSizeEditCtrl'
  });
               
}])

;
