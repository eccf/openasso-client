/* 
 * Project: openasso-client
 * Author: Eric Mas
 */

(function() {
  'use strict';

  angular
    .module('app.member')
    .controller('MemberFormController', MemberFormController);

  MemberFormController.$inject = ['$scope', 'member', '_Alert', 'toaster', '$state', '_Date', 'APP_CONSTANT_LIST', '_DataService', '$uibModal'];

  function MemberFormController($scope, member, _Alert, toaster, $state, _Date, APP_CONSTANT_LIST, _DataService, $uibModal) {
    var vm = this;
    vm.member = member;
    vm.phoneTypes = APP_CONSTANT_LIST.phoneTypes;
    vm.emailTypes = APP_CONSTANT_LIST.emailTypes;
    vm.save = save;
    vm.saveAndNewSubscription = saveAndNewSubscription;
    vm.getAvatar = getAvatar;
    vm.openBirthDate = openBirthDate;
    activate();

    /////////////////////

    function activate() {
      initAlerts();
      initDatePickers();
    }

    function save() {
      _DataService.save('member', vm.member)
        .then(function(value){
          vm.member = value;
          toaster.pop('success', 'Succès', _Alert.getDefaultSaveSuccess().message);
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    // Méthode de sauvegarde de l'enregistrement et redirection pour une nouvelle inscription
    function saveAndNewSubscription() {
      _DataService.save('member', vm.member)
        .then(function(value){
          vm.member = value;
          toaster.pop('success', 'Succès', _Alert.getDefaultSaveSuccess().message);
          $state.go('app.member.subscription.new', {idMember: vm.member.id});
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
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

    function initAlerts() {
      vm.alerts = (_Alert.getQueue()) ? [_Alert.getQueue()] : [];
    }

    function initDatePickers() {
      vm.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
      };
      handleDate($scope, 'birthdate', vm.member);
    }

    function openBirthDate($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.birthDateOpen = true;
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

