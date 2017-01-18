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
    .module('app.bike')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var prefixCtrlPath = 'app/bike/views/';
    var prefixTplPath = 'app/bike/views/';

    $stateProvider.state('app.bike', {
      url: '/bike',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.bike.list', {
      url: '',
      templateUrl: prefixTplPath + 'bike_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_list.controller.js']
          });
        }],
        bikeSizes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('bike-size');
        }],
        bikeTypes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('bike-type');
        }]
      },
      controller: 'BikeListController',
      controllerAs: 'vm'
    })

    .state('app.bike.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'bike_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_form.controller.js']
          });
        }],
        bikeSizes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('bike-size');
        }],
        bikeTypes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('bike-type');
        }],
        bike: [function() {
          return {};
        }]
      },
      controller: 'BikeFormController',
      controllerAs: 'vm'
    })

    .state('app.bike.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'bike_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_form.controller.js']
          });
        }],
        bikeSizes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('bike-size');
        }],
        bikeTypes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('bike-type');
        }],
        bike: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('bike', $stateParams.id);
        }]
      },
      controller: 'BikeFormController',
      controllerAs: 'vm'
    })

    ////////////////////////////////

    .state('app.bike_size', {
      url: '/bike-size',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.bike_size.list', {
      url: '',
      templateUrl: prefixTplPath + 'bike_size/bike_size_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_size/bike_size_list.controller.js']
          });
        }],
        bikeSizes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('bike-size');
        }]
      },
      controller: 'BikeSizeListController',
      controllerAs: 'vm'
    })

    .state('app.bike_size.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'bike_size/bike_size_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_size/bike_size_form.controller.js']
          });
        }],
        bikeSize: [function() {
          return {};
        }]
      },
      controller: 'BikeSizeFormController',
      controllerAs: 'vm'
    })

    .state('app.bike_size.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'bike_size/bike_size_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_size/bike_size_form.controller.js']
          });
        }],
        bikeSize: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('bike-size', $stateParams.id);
        }]
      },
      controller: 'BikeSizeFormController',
      controllerAs: 'vm'
    })


    ////////////////////////////////////////////////////

    .state('app.bike_type', {
      url: '/bike-type',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.bike_type.list', {
      url: '',
      templateUrl: prefixTplPath + 'bike_type/bike_type_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_type/bike_type_list.controller.js']
          });
        }],
        bikeTypes: ['_DataService', function(_DataService) {
          return _DataService.getListFromCache('bike-type');
        }]
      },
      controller: 'BikeTypeListController',
      controllerAs: 'vm'
    })

    .state('app.bike_type.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'bike_type/bike_type_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_type/bike_type_form.controller.js']
          });
        }],
        bikeType: [function() {
          return {};
        }]
      },
      controller: 'BikeTypeFormController',
      controllerAs: 'vm'
    })

    .state('app.bike_type.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'bike_type/bike_type_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'bike_type/bike_type_form.controller.js']
          });
        }],
        bikeType: ['_DataService', '$stateParams', function(_DataService, $stateParams) {
          return _DataService.getOneFromCache('bike-type', $stateParams.id);
        }]
      },
      controller: 'BikeTypeFormController',
      controllerAs: 'vm'
    });  
  }
  
})();
