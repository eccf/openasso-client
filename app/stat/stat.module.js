/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('app.stat', [
  
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
  var prefixCtrlPath = 'app/stat/stat_';
  var prefixTplPath = 'app/stat/stat_';
    
  $stateProvider.state('app.stat', {
    url: '/stat',
    parent: 'app',
    template: '<ui-view/>',
    abstract: true
  })
  .state('app.stat.index', {
    url: '',
    templateUrl: prefixTplPath + 'index.tpl.html',
    resolve: {
      deps: ['$ocLazyLoad', function( $ocLazyLoad ){
        return $ocLazyLoad.load({
          name: 'app.stat',
          files: [prefixCtrlPath + 'index.ctrl.js']
        });
      }],
      currentPeriod: ['Restangular', function(Restangular) {
        return Restangular.one('period').one('current').get().then(function(period) {
          return period;
        });
      }],
      stat: ['Restangular', function(Restangular) {
        return Restangular.one('stat').get().then(function(stat) {
          return stat;
        });
      }]
    },
    controller: 'StatIndexCtrl'
  });
               
}])

;