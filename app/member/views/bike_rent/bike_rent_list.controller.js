/* 
 * Copyright (C) Copyright 2017 Etoile Cycliste de Clermont-Ferrand
 *
 * This file is part of openasso-client
 *
 * openasso-client is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    Eric Mas <webmaster@clermont-cyclisme.fr>
 * @copyright 2017 Etoile Cycliste de Clermont-Ferrand
 * @license   http://www.gnu.org/licenses/gpl-3.0.html GPL License 3.0 or (at your option) any later version
 */

(function() {
  'use strict';

  angular
    .module('app.member')
    .controller('BikeRentListController', BikeRentListController);

  BikeRentListController.$inject = ['$scope', 'member', 'bikeRents', '_Table'];

  function BikeRentListController($scope, member, bikeRents, _Table) {
    var vm = this;
    vm.member = member;
    vm.bikeRents = bikeRents;
    activate();

    /////////////////////

    function activate() {
      initTable();
    }

    function initTable() {
      vm.bikeRentsTable = _Table.getOrderTable(bikeRents, {
        'period.label': 'desc'
      });
    }
  }
  
})();

