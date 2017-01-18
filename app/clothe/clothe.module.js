/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('app.clothe', [
  
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
  var prefixCtrlPath = 'app/clothe/clothe_';
  var prefixTplPath = 'app/clothe/clothe_';
    
  $stateProvider.state('app.clothe', {
    url: '/clothe',
    parent: 'app',
    template: '<ui-view/>',
    abstract: true
  })
  .state('app.clothe.index', {
    url: '',
    templateUrl: prefixTplPath + 'list.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function( $ocLazyLoad ){
        return $ocLazyLoad.load({
          name: 'app.clothe',
          files: [prefixCtrlPath + 'index.ctrl.js']
        });
      }],
      clothes: ['Restangular', function(Restangular) {
        return Restangular.one('clothe').one('pending').get().then(function(clothes) {
          return clothes;
        });
      }]
    },
    controller: 'ClotheIndexCtrl',
    controllerAs: 'ctrl'
  });
               
}])


;