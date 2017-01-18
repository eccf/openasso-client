/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_type')
  
  .controller('ClotheTypeNewCtrl', function($scope, _Alert, toaster, Restangular, $state) {
    
    $scope.clotheType = {};
    
    $scope.save = function() {
      Restangular.all('clothe-type').post($scope.clotheType).then(function(clotheType){
        toaster.pop('success', 'Succès', _Alert.getDefaultUpdateSuccess().message);
        $state.go('app.parameter.clothe_type.edit', {id: clotheType.id});
      }, function(response){
        $scope.alerts = [_Alert.getDefaultCreateError(response.data)];
      });
    };
    
  });


})();