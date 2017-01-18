/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_state')
  
  .controller('ClotheStateEditCtrl', function($scope, clotheState, _Alert, toaster, $state) {
    
    $scope.clotheState = clotheState;
    
    $scope.save = function() {
      $scope.clotheState.put().then(function(){
        toaster.pop('success', 'Succès', _Alert.getDefaultUpdateSuccess().message);
      }, function(response){
        $scope.alerts = [_Alert.getDefaultUpdateError(response.data)];
      });
    };
    
    $scope.delete = function() {
      $scope.clotheState.remove().then(function(){
        toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
        $state.go('app.parameter.clothe_state.index');
      }, function(response){
        $scope.alerts = [_Alert.getDefaultDeleteError(response.data)];
      });
    };
    
  });


})();
