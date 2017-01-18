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
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var prefixCtrlPath = 'app/member/views/';
    var prefixTplPath = 'app/member/views/';

    $stateProvider.state('app.member', {
      url: '/member',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.member.list', {
      url: '',
      templateUrl: prefixTplPath + 'member_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function( $ocLazyLoad ){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'member_list.controller.js']
          });
        }],
        periods: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('period');
        }],
        groups: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('group');
        }],
        subscriptionStates: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('subscription-state');
        }]
      },
      controller: 'MemberListController',
      controllerAs: 'vm'
    })


    .state('app.member.show', {
      url: '/{id}/show',
      templateUrl: prefixTplPath + 'member_show.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function( $ocLazyLoad ){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'member_show.controller.js'
            ]
          });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('member',$stateParams.id, {representation: 'detail'});
        }]
      },
      controller: 'MemberShowController',
      controllerAs: 'vm'
    })

    .state('app.member.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'member_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function( $ocLazyLoad ){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'member_form.controller.js'
            ]
          });
        }],
        member: [function() {
          return {};
        }]
      },
      controller: 'MemberFormController',
      controllerAs: 'vm'
    })

    .state('app.member.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'member_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function( $ocLazyLoad ){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'member_form.controller.js'
            ]
          });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOne('member', $stateParams.id, null, true);
        }]
      },
      controller: 'MemberFormController',
      controllerAs: 'vm'
    })
    
    .state('app.member.photo', {
      url: '/{id}/photo',
      templateUrl: prefixTplPath + 'member_form_photo.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function( $ocLazyLoad ){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'member_form_photo.controller.js'
            ]
          });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOne('member', $stateParams.id, null, true);
        }]
      },
      controller: 'MemberFormPhotoController',
      controllerAs: 'vm'
    })

    /////////////////////////////////////////////

    .state('app.member.subscription', {
      url: '/{idMember}/subscription',
      parent: 'app.member',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.member.subscription.list', {
      url: '',
      templateUrl: prefixTplPath + 'subscription/subscription_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function( $ocLazyLoad ){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'subscription/subscription_list.controller.js'
            ]
          });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('member',$stateParams.idMember, {representation: 'detail'});
        }],
        subscriptions: ['member', function(member) {
          return member.getList('subscription');
        }]
      },
      controller: 'SubscriptionListController',
      controllerAs: 'vm'
    })

    .state('app.member.subscription.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'subscription/subscription_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'subscription/subscription_form.controller.js'
            ]
          });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('member',$stateParams.idMember, {representation: 'detail'});
        }],
        subscription: ['member', function(member) {
          return {
            member: member.id
          };
        }]
      },
      controller: 'SubscriptionFormController',
      controllerAs: 'vm'
    })

    .state('app.member.subscription.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'subscription/subscription_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'subscription/subscription_form.controller.js'
            ]
          });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('member',$stateParams.idMember, {representation: 'detail'});
        }],
        subscription: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('subscription', $stateParams.id);
        }]
      },
      controller: 'SubscriptionFormController',
      controllerAs: 'vm'
    })

    /////////////////////////////////////////////

    .state('app.member.bike_rent', {
      url: '/{idMember}/bike-rent',
      parent: 'app.member',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.member.bike_rent.list', {
      url: '',
      templateUrl: prefixTplPath + 'bike_rent/bike_rent_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function( $ocLazyLoad ){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'bike_rent/bike_rent_list.controller.js'
            ]
          });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('member',$stateParams.idMember, {representation: 'detail'});
        }],
        bikeRents: ['member', function(member) {
          return member.getList('bike-rent');
        }]
      },
      controller: 'BikeRentListController',
      controllerAs: 'vm'
    })

    .state('app.member.bike_rent.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'bike_rent/bike_rent_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load({
          files: [
          prefixCtrlPath + 'bike_rent/bike_rent_form.controller.js'
          ]
        });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('member',$stateParams.idMember, {representation: 'detail'});
        }],
        bikeRent: ['member', function(member) {
          return {
            member: member.id
          };
        }]
      },
      controller: 'BikeRentFormController',
      controllerAs: 'vm'
    })

    .state('app.member.bike_rent.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'bike_rent/bike_rent_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'bike_rent/bike_rent_form.controller.js'
            ]
          });
        }],
        member: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('member',$stateParams.idMember, {representation: 'detail'});
        }],
        bikeRent: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('bike-rent', $stateParams.id);
        }]
      },
      controller: 'BikeRentFormController',
      controllerAs: 'vm'
    })

    ////////////////////////////////

    .state('app.member.degree_type', {
      url: '/degree-type',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.member.degree_type.list', {
      url: '',
      templateUrl: prefixTplPath + 'degree_type/degree_type_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'degree_type/degree_type_list.controller.js']
          });
        }],
        degreeTypes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('degree-type');
        }]
      },
      controller: 'DegreeTypeListController',
      controllerAs: 'vm'
    })

    .state('app.member.degree_type.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'degree_type/degree_type_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'degree_type/degree_type_form.controller.js']
          });
        }],
        degreeType: [function() {
          return {};
        }]
      },
      controller: 'DegreeTypeFormController',
      controllerAs: 'vm'
    })

    .state('app.member.degree_type.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'degree_type/degree_type_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'degree_type/degree_type_form.controller.js']
          });
        }],
        degreeType: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('degree-type', $stateParams.id);
        }]
      },
      controller: 'DegreeTypeFormController',
      controllerAs: 'vm'
    })

    //////////////////////

    .state('app.member.level', {
      url: '/level',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.member.level.list', {
      url: '',
      templateUrl: prefixTplPath + 'level/level_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'level/level_list.controller.js']
          });
        }],
        levels: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('level');
        }]
      },
      controller: 'LevelListController',
      controllerAs: 'vm'
    })

    .state('app.member.level.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'level/level_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'level/level_form.controller.js']
          });
        }],
        level: [function() {
          return {};
        }]
      },
      controller: 'LevelFormController',
      controllerAs: 'vm'
    })

    .state('app.member.level.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'level/level_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'level/level_form.controller.js']
          });
        }],
        level: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('level', $stateParams.id);
        }]
      },
      controller: 'LevelFormController',
      controllerAs: 'vm'
    })

    /////////////////

    .state('app.member.group', {
      url: '/group',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.member.group.list', {
      url: '',
      templateUrl: prefixTplPath + 'group/group_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'group/group_list.controller.js']
          });
        }],
        groups: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('group');
        }]
      },
      controller: 'GroupListController',
      controllerAs: 'vm'
    })

    .state('app.member.group.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'group/group_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'group/group_form.controller.js']
          });
        }],
        group: [function() {
          return {};
        }]
      },
      controller: 'GroupFormController',
      controllerAs: 'vm'
    })

    .state('app.member.group.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'group/group_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'group/group_form.controller.js']
          });
        }],
        group: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('group', $stateParams.id);
        }]
      },
      controller: 'GroupFormController',
      controllerAs: 'vm'
    })


    ;  
  }
  
})();


