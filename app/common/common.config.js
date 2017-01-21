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
    .module('app.common')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var prefixCtrlPath = 'app/common/views/';
    var prefixTplPath = 'app/common/views/';

    $stateProvider.state('app.common', {
      url: '/common',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })

    /////////////////

    .state('app.common.parameter', {
      url: '/parameter',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.common.parameter.list', {
      url: '',
      templateUrl: prefixTplPath + 'parameter/parameter_list.tpl.html'
    })

    /////////////////

    .state('app.common.federation', {
      url: '/federation',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.common.federation.list', {
      url: '',
      templateUrl: prefixTplPath + 'federation/federation_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'federation/federation_list.controller.js']
          });
        }],
        federations: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('federation');
        }]
      },
      controller: 'FederationListController',
      controllerAs: 'vm'
    })

    .state('app.common.federation.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'federation/federation_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'federation/federation_form.controller.js']
          });
        }],
        federation: [function() {
          return {};
        }]
      },
      controller: 'FederationFormController',
      controllerAs: 'vm'
    })

    .state('app.common.federation.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'federation/federation_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'federation/federation_form.controller.js']
          });
        }],
        federation: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('federation', $stateParams.id);
        }]
      },
      controller: 'FederationFormController',
      controllerAs: 'vm'
    })

    /////////////////

    .state('app.common.section', {
      url: '/section',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.common.section.list', {
      url: '',
      templateUrl: prefixTplPath + 'section/section_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'section/section_list.controller.js']
          });
        }],
        sections: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('section');
        }]
      },
      controller: 'SectionListController',
      controllerAs: 'vm'
    })

    .state('app.common.section.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'section/section_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'section/section_form.controller.js']
          });
        }],
        section: [function() {
          return {};
        }]
      },
      controller: 'SectionFormController',
      controllerAs: 'vm'
    })

    .state('app.common.section.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'section/section_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'section/section_form.controller.js']
          });
        }],
        section: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('section', $stateParams.id);
        }]
      },
      controller: 'SectionFormController',
      controllerAs: 'vm'
    })

    /////////////////

    .state('app.common.period', {
      url: '/period',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.common.period.list', {
      url: '',
      templateUrl: prefixTplPath + 'period/period_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'period/period_list.controller.js']
          });
        }],
        periods: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('period');
        }]
      },
      controller: 'PeriodListController',
      controllerAs: 'vm'
    })

    .state('app.common.period.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'period/period_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'period/period_form.controller.js']
          });
        }],
        period: [function() {
          return {};
        }]
      },
      controller: 'PeriodFormController',
      controllerAs: 'vm'
    })

    .state('app.common.period.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'period/period_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'period/period_form.controller.js']
          });
        }],
        period: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('period', $stateParams.id);
        }]
      },
      controller: 'PeriodFormController',
      controllerAs: 'vm'
    });  
  }
    
})();


