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
    .module('app.common')
    .controller('FederationFormController', FederationFormController);

  FederationFormController.$inject = ['$scope', 'federation', '_DataService', 'toaster', '$state', '_Alert'];

  function FederationFormController($scope, federation, _DataService, toaster, $state, _Alert) {
    var vm = this;
    vm.federation = federation;
    vm.save = save;
    vm.remove = remove;
    activate();

    /////////////////////

    function activate() {

    }

    function save() {
      _DataService.save('federation', vm.federation)
        .then(function(value){
          vm.federation = value;
          toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function remove() {
      _DataService.remove('federation', vm.federation)
        .then(function(value){
          toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
          $state.go('app.common.federation.list');
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }
  }
  
})();
