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
      .module('app.vehicle')
      .controller('VehicleShowController', VehicleShowController);

  VehicleShowController.$inject = ['$scope', 'vehicle', '_Table', '_Cache'];

  function VehicleShowController($scope, vehicle, _Table, _Cache) {
    var vm = this;
    vm.vehicle = vehicle;
    vm.setActiveTab = setActiveTab;
    activate();

    /////////////////////

    function activate() {
      loadAsync();
      initTabs();
    }

    function loadAsync() {
      //Récupération des maintenances liés au véhicule
      vm.vehicle.getList('maintenance').then(function(data) {
        vm.maintenancesTable = _Table.getOrderTable(data, {
          date: 'desc'
        });
      });
      //Récupération des notebook liés au véhicule
      vm.vehicle.getList('notebook').then(function(data) {
        vm.notebooksTable = _Table.getOrderTable(data, {
          date: 'desc'
        });
      });
    }

    function initTabs() {
      var activeTab = 0;

      // Utilisation du cache pour sauvegarder l'onglet actif
      var vehicleTabCache = _Cache.get('vehicule-tab');
      vm.activeTab = (vehicleTabCache) ? vehicleTabCache : 0;

      // Définition des onglets
      vm.tabs = [
        { id: 1, title:'Maintenances', template:'app/vehicle/views/maintenance/maintenance_list.tpl.html'},
        { id: 2, title:'Carnet de bord', template:'app/vehicle/views/notebook/notebook_list.tpl.html'}
      ];
    }

    function setActiveTab(id) {
      _Cache.put('vehicule-tab', id);
    }
  }
})();

