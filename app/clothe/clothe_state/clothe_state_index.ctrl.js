/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.parameter.clothe_state')

  .controller('ClotheStateIndexCtrl', function($scope, clotheStates, _Table) {
    $scope.tableParams = _Table.getTable(clotheStates);
  });

})();