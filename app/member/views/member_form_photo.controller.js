/* 
 * Project: openasso-client
 * Author: Eric Mas
 */

(function() {
  'use strict';

  angular
    .module('app.member')
    .controller('MemberFormPhotoController', MemberFormPhotoController);

  MemberFormPhotoController.$inject = ['$scope', 'member', '$http', '$state', '_Cache'];

  function MemberFormPhotoController($scope, member, $http, $state, _Cache) {
    var vm = this;
    vm.member = member;
    vm.getAvatar = getAvatar;
    vm.save = save;
    activate();

    /////////////////////

    function activate() {
     
    }

    function save() {
      var file = vm.photo;
      console.log('file is ' );
      console.dir(file);
      var uploadUrl = Config.get('api_url') + '/member/' + vm.member.id + '/photo';
        
        
      var fd = new FormData();
      fd.append('photo', file);
      console.log(fd.get('photo'));
      
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function() {
        _Cache.remove('member-one')
        $state.go('app.member.show',{id:vm.member.id});
      })
      .error(function(){
        console.log('upload error');
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

