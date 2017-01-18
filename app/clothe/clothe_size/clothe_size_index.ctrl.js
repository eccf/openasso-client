/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_size')

  .controller('ClotheSizeIndexCtrl', function($scope, clotheSizes, _Table) {
    $scope.tableParams = _Table.getTable(clotheSizes);
  });

})();