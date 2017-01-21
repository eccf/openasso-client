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
    .module('app.member')
    .controller('LicenseFormController', LicenseFormController);

  LicenseFormController.$inject = ['$scope','member', 'license', 'federations', 'toaster', '_Alert', '_DataService', '$state'];

  function LicenseFormController($scope, member, license, federations, toaster, _Alert, _DataService, $state) {
    var vm = this;
    vm.member = member;
    vm.license = license;
    vm.federations = federations;
    vm.save = save;
    vm.remove = remove;
    vm.getAvatar = getAvatar;
    activate();

    /////////////////////

    function activate() {
      initAlerts();
    }

    function save() {
      _DataService.save('license', vm.license)
        .then(function(value){
          vm.license = value;
          toaster.pop('success', 'Succès', _Alert.getDefaultSaveSuccess().message);
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function remove() {
      _DataService.remove('license', vm.license)
        .then(function(value){
          toaster.pop('success', 'Succès', _Alert.getDefaultDeleteSuccess().message);
          $state.go('app.member.show', {id: vm.member.id});
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function initAlerts() {
      vm.alerts = (_Alert.getQueue()) ? [_Alert.getQueue()] : [];
    }
    
    function getAvatar() {
      if(vm.member.photo) {
        return Config.get('upload_url') + '/member/' + member.photo;
      }
      else if(vm.member.sexe === 'F') {
        return 'assets/img/woman_cyclist.png';
      }
      else {
        return 'assets/img/man_cyclist.png';
      }
    }
  }
  
})();

