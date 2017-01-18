/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_type')
  
  .controller('ClotheTypeEditCtrl', function($scope, clotheType, _Alert, toaster, $state) {
    
    $scope.clotheType = clotheType;
    
    $scope.save = function() {
      $scope.clotheType.put().then(function(){
        toaster.pop('success', 'Succès', _Alert.getDefaultUpdateSuccess().message);
      }, function(response){
        $scope.alerts = [_Alert.getDefaultUpdateError(response.data)];
      });
    };
    
    $scope.delete = function() {
      $scope.clotheType.remove().then(function(){
        toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
        $state.go('app.parameter.clothe.index');
      }, function(response){
        $scope.alerts = [_Alert.getDefaultDeleteError(response.data)];
      });
    };
    
  });


})();
