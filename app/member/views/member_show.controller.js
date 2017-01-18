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
    .controller('MemberShowController', MemberShowController);

  MemberShowController.$inject = ['$scope', 'member'];

  function MemberShowController($scope, member) {
    var vm = this;
    vm.member = member;
    vm.getAvatar = getAvatar;
    activate();

    /////////////////////

    function activate() {
      loadAsync();
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

    function loadAsync() {
      member.getList('license').then(function(data) {
        vm.licenses = data;
      });
      member.getList('degree').then(function(data) {
        vm.degrees = data;
      });
      member.getList('bike-rent', {filters: {currentPeriod:true}}).then(function(data) {
        vm.bikeRents = data;
      });
    }
  }
})();

