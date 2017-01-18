/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_model')
  
  .controller('ClotheModelNewCtrl', function($scope, _Alert, toaster, Restangular, $state) {
    
    $scope.clotheModel = {};
    
    $scope.save = function() {
      Restangular.all('clothe-model').post($scope.clotheModel).then(function(clotheModel){
        toaster.pop('success', 'Succès', _Alert.getDefaultUpdateSuccess().message);
        $state.go('app.parameter.clothe_model.edit', {id: clotheModel.id});
      }, function(response){
        $scope.alerts = [_Alert.getDefaultCreateError(response.data)];
      });
    };
    
  });


})();