/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('app.parameter.clothe_model', [
  
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
  var prefixCtrlPath = 'app/parameter/clothe_model/clothe_model_';
  var prefixTplPath = 'app/parameter/clothe_model/clothe_model_';
    
  $stateProvider.state('app.parameter.clothe_model', {
    url: '/clothe-model',
    parent: 'app.parameter',
    template: '<ui-view/>',
    abstract: true
  })
  .state('app.parameter.clothe_model.index', {
    url: '',
    templateUrl: prefixTplPath + 'list.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function( $ocLazyLoad ){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_model',
          files: [prefixCtrlPath + 'index.ctrl.js']
        });
      }],
      clotheModels: ['Restangular', function(Restangular) {
        return Restangular.all('clothe-model').getList().then(function(clotheModels) {
          return clotheModels;
        });
      }]
    },
    controller: 'ClotheModelIndexCtrl'
  })
  .state('app.parameter.clothe_model.new', {
    url: '/new',
    templateUrl: prefixTplPath + 'form.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_model',
          files: [prefixCtrlPath + 'new.ctrl.js']
        });
      }]
    },
    controller: 'ClotheModelNewCtrl'
  })
  .state('app.parameter.clothe_model.edit', {
    url: '/{id}/edit',
    templateUrl: prefixTplPath + 'form.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_model',
          files: [prefixCtrlPath + 'edit.ctrl.js']
        });
      }],
      clotheModel: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
        return Restangular.one('clothe-model', $stateParams.id).get().then(function(item) {
          return item;
        });
      }]
    },
    controller: 'ClotheModelEditCtrl'
  });
               
}])

;
