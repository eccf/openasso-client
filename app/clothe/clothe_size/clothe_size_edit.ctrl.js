/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_size')
  
  .controller('ClotheSizeEditCtrl', function($scope, clotheSize, _Alert, toaster, $state) {
    
    $scope.clotheSize = clotheSize;
    
    $scope.save = function() {
      $scope.clotheSize.put().then(function(){
        toaster.pop('success', 'Succès', _Alert.getDefaultUpdateSuccess().message);
      }, function(response){
        $scope.alerts = [_Alert.getDefaultUpdateError(response.data)];
      });
    };
    
    $scope.delete = function() {
      $scope.clotheSize.remove().then(function(){
        toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
        $state.go('app.parameter.clothe_size.index');
      }, function(response){
        $scope.alerts = [_Alert.getDefaultDeleteError(response.data)];
      });
    };
    
  });


})();
