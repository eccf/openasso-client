/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
  
  'use strict';

  /* Controllers */

  angular.module('app.clothe')

  .controller('ClotheIndexCtrl', function(clothes, _Table) {
    
    this.getClotheTable = function() {
      return _Table.getOrderTable(clothes.pending, {
        collection: 'desc'
      });
    };
    
    this.getClotheSummaryTable = function() {
      return _Table.getOrderTable(clothes.summary, {
        collection: 'desc'
      });
    };
    
    this.getClotheDetailTable = function() {
      return _Table.getOrderTable(clothes.detail, {
        lastname: 'desc'
      });
    };
    
  });

})();