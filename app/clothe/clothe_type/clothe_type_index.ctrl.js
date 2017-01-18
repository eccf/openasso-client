/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_type')

  .controller('ClotheTypeIndexCtrl', function($scope, clotheTypes, _Table) {
    $scope.tableParams = _Table.getTable(clotheTypes);
  });

})();