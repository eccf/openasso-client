/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_model')

  .controller('ClotheModelIndexCtrl', function($scope, clotheModels, _Table) {
    $scope.tableParams = _Table.getTable(clotheModels);
  });

})();