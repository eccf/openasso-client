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
    .controller('BikeRentFormController', BikeRentFormController);

  BikeRentFormController.$inject = ['$scope','member', 'bikeRent', 'toaster', '_Alert', '_DataService', 'APP_CONSTANT_LIST', '_Date', '$state'];

  function BikeRentFormController($scope, member, bikeRent, toaster, _Alert, _DataService, APP_CONSTANT_LIST, _Date, $state) {
    var vm = this;
    vm.member = member;
    vm.bikeRent = bikeRent;
    vm.openDate = openDate;
    vm.openStartDate = openStartDate;
    vm.openEndDate = openEndDate;
    vm.save = save;
    vm.remove = remove;
    activate();

    /////////////////////

    function activate() {
      if(!vm.bikeRent.id) {
        initBikeRent();
      }
      initDatePickers();
      loadAsync();
      initAlerts();
    }

    function save() {
      _DataService.save('bike-rent', vm.bikeRent)
        .then(function(value){
          vm.bikeRent = value;
          toaster.pop('success', 'Succès', _Alert.getDefaultSaveSuccess().message);
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function remove() {
      _DataService.remove('bike-rent', vm.bikeRent)
        .then(function(value){
          toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
          $state.go('app.member.bike_rent.list', {idMember: vm.member.id});
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function loadAsync() {
      _DataService.getListFromCache('period').then(function(data){
        vm.periods = data;
      });
      _DataService.getListFromCache('bike').then(function(data){
        vm.bikes = data;
      });
      vm.payementTypes = APP_CONSTANT_LIST.payementTypes;
    }

    function initBikeRent() {
      if(member.currentSubscription && member.currentSubscription.period) {
        vm.bikeRent.period = member.currentSubscription.period.id;
      }
    }

    function initAlerts() {
      vm.alerts = (_Alert.getQueue()) ? [_Alert.getQueue()] : [];
    }

    function initDatePickers() {
      vm.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
      };
      handleDate($scope, 'date', vm.bikeRent);
      handleDate($scope, 'startDate', vm.bikeRent);
      handleDate($scope, 'endDate', vm.bikeRent);
    }

    function openDate($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.dateOpen = true;
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

