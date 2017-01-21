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
    .controller('MemberListController', MemberListController);

  MemberListController.$inject = ['periods', 'groups', 'subscriptionStates', '$scope', 'NgTableParams', '_DataService', '_Cache', '$timeout'];

  function MemberListController(periods, groups, subscriptionStates, $scope, NgTableParams, _DataService, _Cache, $timeout) {
    var vm = this;
    var initializing = true;
    vm.load = false;
    vm.members;
    vm.periods = periods;
    vm.groups = groups;
    vm.subscriptionStates = subscriptionStates;
    vm.getMembers = getMembers;
    vm.clearFilters = clearFilters;
    vm.getAvatar = getAvatar;
    activate();



    /////////////////////

    function activate() {
      initTable();
      initFilters();
      getMembers(true);
    }

    function getCurrentPeriod(periods) {
      var current;
      angular.forEach(periods, function(period){
        if(period.current) {
          current =  period;
        }
      });
      return current;
    }

    function getMembers(cache) {
      vm.load = true;
      vm.members = [];
      if(cache) {
        _DataService.getListFromCache('member', {filters: vm.filters, representation: 'detail'}).then(getMemberCallback);
      }
      else {
        _DataService.getList('member', {filters: vm.filters, representation: 'detail'}).then(getMemberCallback);
      }

      function getMemberCallback(members) {
        vm.members = members;
        vm.memberTableParams.settings({
          dataset: members
        });
        vm.load = false;
      }
    }
    
    function getAvatar(member) {
      if(member.photo) {
        return Config.get('upload_url') + '/member/' + member.photo;
      }
      else if(member.sexe === 'F') {
        return 'assets/img/woman_cyclist.png';
      }
      else {
        return 'assets/img/man_cyclist.png';
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

    function initTable() {
      vm.memberTableParams = new NgTableParams({
        page: 1, // show first page
        count: 200, // count per page
        sorting: {
          lastname: 'asc' // initial sorting
        }
      },{
        counts:[]
      });
    }

    function initFilters() {
      if(_Cache.get('member-filters')) {
        vm.filters = _Cache.get('member-filters');
      }
      else {
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
        vm.currentPeriod = getCurrentPeriod(periods);
        if(vm.currentPeriod) {
          vm.filters.period = vm.currentPeriod.id;
        }
      }

      $scope.$watch(angular.bind(this, function () {
        return vm.filters;
      }), function (newVal) {
        if (initializing) {
          $timeout(function() { initializing = false; });
        } else {
          _Cache.put('member-filters', newVal);
        }

      }, true);
    }
  }
})();

