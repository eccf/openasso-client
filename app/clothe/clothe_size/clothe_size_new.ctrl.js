/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_size')
  
  .controller('ClotheSizeNewCtrl', function($scope, _Alert, toaster, Restangular, $state) {
    
    $scope.clotheSize = {};
    
    $scope.save = function() {
      Restangular.all('clothe-size').post($scope.clotheSize).then(function(clotheSize){
        toaster.pop('success', 'Succès', _Alert.getDefaultUpdateSuccess().message);
        $state.go('app.parameter.clothe_size.edit', {id: clotheSize.id});
      }, function(response){
        $scope.alerts = [_Alert.getDefaultCreateError(response.data)];
      });
    };
    
  });


})();