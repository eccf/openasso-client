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
    .controller('SubscriptionFormController', SubscriptionFormController);

  SubscriptionFormController.$inject = ['$scope', 'member', 'subscription', '_DataService', 'toaster', '_Alert', '_Cache'];

  function SubscriptionFormController($scope, member, subscription, _DataService, toaster, _Alert, _Cache) {
    var vm = this;
    vm.member = member;
    vm.subscription = subscription;
    vm.getAvatar = getAvatar;
    vm.save = save;
    activate();

    /////////////////////

    function activate() {
      loadDependencies();
      initAlerts();
      if(!vm.subscription.id) {
        initSubscriptions();
      }
    }

    function save() {
      _DataService.save('subscription', vm.subscription)
        .then(function(value) {
          _Cache.remove('member-one');
          _Cache.remove('member-list');
          vm.subscription = value;
          toaster.pop('success', 'Succès', _Alert.getDefaultSaveSuccess().message);
        })
        .catch(function(response){
          vm.alerts = [_Alert.getDefaultDeleteError(response.data)];
        });
    }

    function loadDependencies() {

      _DataService.getListFromCache('subscription-state').then(function(data) {
        vm.subscriptionStates = data;
      });

      _DataService.getListFromCache('level').then(function(data) {
        vm.levels = data;
      });

      _DataService.getListFromCache('period').then(function(data) {
        vm.periods = data;
        if(!vm.subscription.id) {
          vm.periods.forEach(function(period) {
            if(period.current) { // Sélection de la période courante par défaut
              vm.subscription.period = period.id;
            }
          });
        }
      });

      _DataService.getListFromCache('group').then(function(data) {
        vm.groups = data;
      });

      _DataService.getListFromCache('section').then(function(data) {
        vm.sections = data;
      });
      
      _DataService.getListFromCache('position').then(function(data) {
        vm.positions = data;
      });
      
      _DataService.getListFromCache('allergy').then(function(data) {
        vm.allergies = data;
      });
    }

    function initAlerts() {
      vm.alerts = (_Alert.getQueue()) ? [_Alert.getQueue()] : [];
    }

    function initSubscriptions() {
      vm.subscription.practicing = true;
      vm.subscription.level = 1;
      vm.subscription.subscriptionState = 2;

      if(member.lastSubscription) {
        vm.subscription.group = member.lastSubscription.group;
        vm.subscription.section = member.lastSubscription.section;
      }
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

