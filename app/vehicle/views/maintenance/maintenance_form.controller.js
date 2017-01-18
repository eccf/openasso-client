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
    .module('app.vehicle')
    .controller('MaintenanceFormController', MaintenanceFormController);

  MaintenanceFormController.$inject = ['$scope', 'vehicle', 'maintenance', 'maintenanceTypes', '_DataService', 'toaster', '$state', '_Alert', '_Date'];

  function MaintenanceFormController($scope, vehicle, maintenance, maintenanceTypes, _DataService, toaster, $state, _Alert, _Date) {
    var vm = this;
    vm.vehicle = vehicle;
    vm.maintenance = maintenance;
    vm.maintenanceTypes = maintenanceTypes;
    vm.save = save;
    vm.remove = remove;
    vm.openDate = openDate;
    activate();

    /////////////////////

    function activate() {
      initDatePickers();
    }

    function save() {
      _DataService.save('maintenance', vm.maintenance)
        .then(function(value){
          vm.maintenance = value;
          toaster.pop('success', 'Succès', _Alert.getDefaultSaveSuccess().message);
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function remove() {
      _DataService.remove('maintenance', vm.maintenance)
        .then(function(){
          toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
          $state.go('app.vehicle.show', {id: vm.vehicle.id});
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function initDatePickers() {
      vm.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
      };
      handleDate($scope, 'date', vm.maintenance);
    }

    function openDate($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.dateOpen = true;
    }

    function handleDate($scope, dateProperty, model) {
      vm[dateProperty] = _Date.toDate(model[dateProperty]);
      $scope.$watch(angular.bind(this, function () {
        return vm[dateProperty];
      }), function (newVal) {
        model[dateProperty] = _Date.toString(vm[dateProperty]);
      });
    }
  }
})();

