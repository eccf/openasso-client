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
    .controller('MemberFormPhotoController', MemberFormPhotoController);

  MemberFormPhotoController.$inject = ['$scope', 'member', '$http', '$state', '_Cache', '_Alert'];

  function MemberFormPhotoController($scope, member, $http, $state, _Cache, _Alert) {
    var vm = this;
    vm.member = member;
    vm.getAvatar = getAvatar;
    vm.save = save;
    activate();

    /////////////////////

    function activate() {
     
    }

    function save() {
      vm.alerts = [];
      var file = vm.photo;
      var uploadUrl = Config.get('api_url') + '/member/' + vm.member.id + '/photo';
        
      var fd = new FormData();
      fd.append('photoFile', file);
      
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function() {
        _Cache.remove('member-one');
        $state.go('app.member.show',{id:vm.member.id});
      })
      .error(function(response){
        vm.alerts = [_Alert.createAlert('danger','Le fichier n\'a pas pu être téléchargé. Vérifiez l\'extension et la taille du fichier.')];
      });
        
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

