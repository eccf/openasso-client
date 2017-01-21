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
      .module('app.volunteerism')
      .controller('VolunteerismListController', VolunteerismListController);

  VolunteerismListController.$inject = ['$scope', 'volunteerisms', 'currentPeriod', '_Table', '_Alert'];

  function VolunteerismListController($scope, volunteerisms, currentPeriod, _Table, _Alert) {
    var vm = this;
    vm.volunteerisms = volunteerisms;
    vm.currentPeriod = currentPeriod;
    vm.hasCurrentPeriod = hasCurrentPeriod;
    activate();

    /////////////////////

    function activate() {
      vm.tableParams = _Table.getOrderTable(volunteerisms, {
        date: 'desc'
      });
      initAlerts();
    }

    function initAlerts() {
      vm.alerts = [];
      if(!hasCurrentPeriod()) {
        vm.alerts.push(_Alert.createAlert('danger','Aucune période courante n\'est définie dans l\'application. Merci de définir au préalable une période courante.'));
      }
    }

    function hasCurrentPeriod() {
      return angular.isDefined(currentPeriod);
    }

  }
  
})();

