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
    .module('app.volunteerism')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var prefixCtrlPath = 'app/volunteerism/views/';
    var prefixTplPath = 'app/volunteerism/views/';

    $stateProvider.state('app.volunteerism', {
      url: '/volunteerism',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.volunteerism.list', {
      url: '',
      templateUrl: prefixTplPath + 'volunteerism_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'volunteerism_list.controller.js']
          });
        }],
        volunteerisms: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('volunteerism');
        }],
        currentPeriod: ['_DataService', function(_DataService) {
          return _DataService.getOne('period').one('current').get();
        }]
      },
      controller: 'VolunteerismListController',
      controllerAs: 'vm'
    })

    .state('app.volunteerism.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'volunteerism_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'volunteerism_form.controller.js']
          });
        }],
        currentPeriod: ['_DataService', function(_DataService) {
          return _DataService.getOne('period').one('current').get();
        }],
        volunteerism: ['currentPeriod', function(currentPeriod) {
          return {
            period: angular.isDefined(currentPeriod.id) ? currentPeriod.id : null
          };
        }]
      },
      controller: 'VolunteerismFormController',
      controllerAs: 'vm'
    })

    .state('app.volunteerism.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'volunteerism_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'volunteerism_form.controller.js']
          });
        }],
        currentPeriod: ['_DataService', function(_DataService) {
          return _DataService.getOne('period').one('current').get();
        }],
        volunteerism: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('volunteerism', $stateParams.id);
        }]
      },
      controller: 'VolunteerismFormController',
      controllerAs: 'vm'
    })

    ////////////////

    .state('app.volunteerism.volunteer', {
      url: '/volunteer',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.volunteerism.volunteer.list', {
      url: '',
      templateUrl: prefixTplPath + 'volunteer/volunteer_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'volunteer/volunteer_list.controller.js']
          });
        }],
        currentPeriod: ['_DataService', function(_DataService) {
          return _DataService.getOne('period').one('current').get();
        }],
        volunteers: ['currentPeriod','_DataService', function(currentPeriod, _DataService) {
          return _DataService.getList('member', {
            filters: {
              period: currentPeriod.id,
              volunteer: true
            },
            representation: 'detail'
          });
        }]
      },
      controller: 'VolunteerListController',
      controllerAs: 'vm'
    });  
  }

    
})();


