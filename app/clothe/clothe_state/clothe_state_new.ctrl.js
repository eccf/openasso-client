/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_state')
  
  .controller('ClotheStateNewCtrl', function($scope, _Alert, toaster, Restangular, $state) {
    
    $scope.clotheState = {};
    
    $scope.save = function() {
      Restangular.all('clothe-state').post($scope.clotheState).then(function(clotheState){
        toaster.pop('success', 'Succès', _Alert.getDefaultUpdateSuccess().message);
        $state.go('app.parameter.clothe_state.edit', {id: clotheState.id});
      }, function(response){
        $scope.alerts = [_Alert.getDefaultCreateError(response.data)];
      });
    };
    
  });


})();