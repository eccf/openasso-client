/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('app.parameter.clothe_type', [
  
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
  var prefixCtrlPath = 'app/parameter/clothe_type/clothe_type_';
  var prefixTplPath = 'app/parameter/clothe_type/clothe_type_';
    
  $stateProvider.state('app.parameter.clothe_type', {
    url: '/clothe-type',
    parent: 'app.parameter',
    template: '<ui-view/>',
    abstract: true
  })
  .state('app.parameter.clothe_type.index', {
    url: '',
    templateUrl: prefixTplPath + 'list.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function( $ocLazyLoad ){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_type',
          files: [prefixCtrlPath + 'index.ctrl.js']
        });
      }],
      clotheTypes: ['Restangular', function(Restangular) {
        return Restangular.all('clothe-type').getList().then(function(clotheTypes) {
          return clotheTypes;
        });
      }]
    },
    controller: 'ClotheTypeIndexCtrl'
  })
  .state('app.parameter.clothe_type.new', {
    url: '/new',
    templateUrl: prefixTplPath + 'form.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_type',
          files: [prefixCtrlPath + 'new.ctrl.js']
        });
      }]
    },
    controller: 'ClotheTypeNewCtrl'
  })
  .state('app.parameter.clothe_type.edit', {
    url: '/{id}/edit',
    templateUrl: prefixTplPath + 'form.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_type',
          files: [prefixCtrlPath + 'edit.ctrl.js']
        });
      }],
      clotheType: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
        return Restangular.one('clothe-type', $stateParams.id).get().then(function(item) {
          return item;
        });
      }]
    },
    controller: 'ClotheTypeEditCtrl'
  });
               
}])

;
