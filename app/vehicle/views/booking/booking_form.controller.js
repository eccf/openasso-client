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

(function () {
  'use strict';

  angular
    .module('app.vehicle')
    .controller('BookingFormController', BookingFormController);

  BookingFormController.$inject = ['$scope', 'booking', '_DataService', 'toaster', '$state', '_Alert', '_Date'];

  function BookingFormController($scope, booking, _DataService, toaster, $state, _Alert, _Date) {
    var vm = this;
    vm.booking = booking;
    vm.save = save;
    vm.remove = remove;
    vm.openStartDate = openStartDate;
    vm.openEndDate = openEndDate;
    activate();

    /////////////////////

    function activate() {
      initDatePickers();
      loadAsync();
    }

    function save() {
      _DataService.save('booking', vm.booking)
        .then(function (value) {
          vm.booking = value;
          toaster.pop('success', 'Succès', _Alert.getDefaultSaveSuccess().message);
        })
        .catch(function (response) {
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function remove() {
      _DataService.remove('booking', vm.booking)
        .then(function () {
          toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
          $state.go('app.vehicle.booking.list');
        })
        .catch(function (response) {
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function loadAsync() {
      _DataService.getListFromCache('booking-type').then(function (datas) {
        vm.bookingTypes = datas;
      });
      _DataService.getListFromCache('booking-status').then(function (datas) {
        vm.bookingStatus = datas;
      });
      _DataService.getListFromCache('vehicle').then(function (datas) {
        vm.vehicles = datas;
      });
    }

    function initDatePickers() {
      vm.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
      };
      handleDate($scope, 'startDate', vm.booking);
      handleDate($scope, 'endDate', vm.booking);
    }

    function openStartDate($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.startDateOpen = true;
    }

    function openEndDate($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.endDateOpen = true;
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

