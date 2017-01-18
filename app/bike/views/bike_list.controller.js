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
 * @author    Eric Mas <e.mas@opendev.fr>
 * @copyright 2017 Etoile Cycliste de Clermont-Ferrand
 * @license   http://www.gnu.org/licenses/gpl-3.0.html GPL License 3.0 or (at your option) any later version
 */


(function() {
  'use strict';

  angular
    .module('app.bike')
    .controller('BikeListController', BikeListController);

  BikeListController.$inject = ['$scope', 'bikeTypes', 'bikeSizes', '_DataService', '_Table', '_Cache', '$timeout'];

  function BikeListController($scope, bikeTypes, bikeSizes, _DataService, _Table, _Cache, $timeout) {
    var vm = this;
    var initializing = true;
    vm.load = false;
    vm.bikes;
    vm.bikeTypes = bikeTypes;
    vm.bikeSizes = bikeSizes;
    vm.getBikes = getBikes;
    vm.clearFilters = clearFilters;
    activate();

    /////////////////////

    function activate() {
      vm.bikeTableParams = _Table.getTable();
      initFilters();
      getBikes(true);
    }

    function getBikes(cache) {
      vm.load = true;
      vm.bikes = [];
      _DataService.getListFromCache('bike',{filters: vm.filters}).then(getBikeCallback);

      function getBikeCallback(bikes) {
        vm.bikes = bikes;
        _Table.updateDataset(vm.bikeTableParams, bikes);
        vm.load = false;
      }
    }

    function clearFilters() {
      vm.filters = {
        name: '',
        groups:[],
        period:null,
        subscriptionsState: [],
        practicing: false,
        teacher: false,
        volunteer: false,
        manager: false
      };
    }

    function initFilters() {
      if(_Cache.get('bike-filters')) {
        vm.filters = _Cache.get('bike-filters');
      }
      else {
        vm.filters = {
          name: '',
          bikeTypes:[],
          bikeSizes: []
        };
      }

      $scope.$watch(angular.bind(this, function () {
        return vm.filters;
      }), function (newVal) {
        if (initializing) {
          $timeout(function() { initializing = false; });
        } else {
          _Cache.put('bike-filters', newVal);
        }

      }, true);
    }
  }
  
})();

