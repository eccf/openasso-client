/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_model')
  
  .controller('ClotheModelEditCtrl', function($scope, clotheModel, _Alert, toaster, $state) {
    
    $scope.clotheModel = clotheModel;
    
    $scope.save = function() {
      $scope.clotheModel.put().then(function(){
        toaster.pop('success', 'Succès', _Alert.getDefaultUpdateSuccess().message);
      }, function(response){
        $scope.alerts = [_Alert.getDefaultUpdateError(response.data)];
      });
    };
    
    $scope.delete = function() {
      $scope.clotheModel.remove().then(function(){
        toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
        $state.go('app.parameter.clothe_model.index');
      }, function(response){
        $scope.alerts = [_Alert.getDefaultDeleteError(response.data)];
      });
    };
    
  });


})();
