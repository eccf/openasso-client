/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('app.parameter.clothe_state', [
  
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
  var prefixCtrlPath = 'app/parameter/clothe_state/clothe_state_';
  var prefixTplPath = 'app/parameter/clothe_state/clothe_state_';
    
  $stateProvider.state('app.parameter.clothe_state', {
    url: '/clothe-state',
    parent: 'app.parameter',
    template: '<ui-view/>',
    abstract: true
  })
  .state('app.parameter.clothe_state.index', {
    url: '',
    templateUrl: prefixTplPath + 'list.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function( $ocLazyLoad ){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_state',
          files: [prefixCtrlPath + 'index.ctrl.js']
        });
      }],
      clotheStates: ['Restangular', function(Restangular) {
        return Restangular.all('clothe-state').getList().then(function(clotheStates) {
          return clotheStates;
        });
      }]
    },
    controller: 'ClotheStateIndexCtrl'
  })
  .state('app.parameter.clothe_state.new', {
    url: '/new',
    templateUrl: prefixTplPath + 'form.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_state',
          files: [prefixCtrlPath + 'new.ctrl.js']
        });
      }]
    },
    controller: 'ClotheStateNewCtrl'
  })
  .state('app.parameter.clothe_state.edit', {
    url: '/{id}/edit',
    templateUrl: prefixTplPath + 'form.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          name: 'app.parameter.clothe_state',
          files: [prefixCtrlPath + 'edit.ctrl.js']
        });
      }],
      clotheState: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
        return Restangular.one('clothe-state', $stateParams.id).get().then(function(item) {
          return item;
        });
      }]
    },
    controller: 'ClotheStateEditCtrl'
  });
               
}])

;
