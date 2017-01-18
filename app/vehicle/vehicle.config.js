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

(function () {
  'use strict';

  angular
    .module('app.vehicle')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var prefixCtrlPath = 'app/vehicle/views/';
    var prefixTplPath = 'app/vehicle/views/';

    $stateProvider.state('app.vehicle', {
      url: '/vehicle',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })

    /////////////////

    .state('app.vehicle.list', {
      url: '',
      templateUrl: prefixTplPath + 'vehicle_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'vehicle_list.controller.js']
          });
        }],
        vehicles: ['_DataService', function (_DataService) {
          return _DataService.getListFromCache('vehicle');
        }]
      },
      controller: 'VehicleListController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.show', {
      url: '/{id}/show',
      templateUrl: prefixTplPath + 'vehicle_show.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'vehicle_show.controller.js']
          });
        }],
        vehicle: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('vehicle', $stateParams.id);
        }]
      },
      controller: 'VehicleShowController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'vehicle_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'vehicle_form.controller.js']
          });
        }],
        vehicle: [function () {
          return {};
        }]
      },
      controller: 'VehicleFormController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'vehicle_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'vehicle_form.controller.js']
          });
        }],
        vehicle: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('vehicle', $stateParams.id);
        }]
      },
      controller: 'VehicleFormController',
      controllerAs: 'vm'
    })

    /////////////////

    .state('app.vehicle.maintenance', {
      url: '/{idVehicle}/maintenance',
      parent: 'app.vehicle',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.vehicle.maintenance.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'maintenance/maintenance_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'maintenance/maintenance_form.controller.js'
            ]
          });
        }],
        vehicle: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('vehicle', $stateParams.idVehicle);
        }],
        maintenance: ['vehicle', function (vehicle) {
          return {
            vehicle: vehicle.id
          };
        }],
        maintenanceTypes: ['_DataService', function (_DataService) {
          return _DataService.getListFromCache('maintenance-type');
        }]
      },
      controller: 'MaintenanceFormController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.maintenance.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'maintenance/maintenance_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'maintenance/maintenance_form.controller.js'
            ]
          });
        }],
        vehicle: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('vehicle', $stateParams.idVehicle);
        }],
        maintenance: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('maintenance', $stateParams.id);
        }],
        maintenanceTypes: ['_DataService', function (_DataService) {
          return _DataService.getListFromCache('maintenance-type');
        }]
      },
      controller: 'MaintenanceFormController',
      controllerAs: 'vm'
    })

    /////////////////

    .state('app.vehicle.notebook', {
      url: '/{idVehicle}/notebook',
      parent: 'app.vehicle',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.vehicle.notebook.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'notebook/notebook_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'notebook/notebook_form.controller.js'
            ]
          });
        }],
        vehicle: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('vehicle', $stateParams.idVehicle);
        }],
        notebook: ['vehicle', function (vehicle) {
          return {
            vehicle: vehicle.id
          };
        }]
      },
      controller: 'NotebookFormController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.notebook.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'notebook/notebook_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [
              prefixCtrlPath + 'notebook/notebook_form.controller.js'
            ]
          });
        }],
        vehicle: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('vehicle', $stateParams.idVehicle);
        }],
        notebook: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('notebook', $stateParams.id);
        }]
      },
      controller: 'NotebookFormController',
      controllerAs: 'vm'
    })

    /////////////////

    .state('app.vehicle.booking_type', {
      url: '/booking-type',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.vehicle.booking_type.list', {
      url: '',
      templateUrl: prefixTplPath + 'booking_type/booking_type_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'booking_type/booking_type_list.controller.js']
          });
        }],
        bookingTypes: ['_DataService', function (_DataService) {
          return _DataService.getListFromCache('booking-type');
        }]
      },
      controller: 'BookingTypeListController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.booking_type.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'booking_type/booking_type_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'booking_type/booking_type_form.controller.js']
          });
        }],
        bookingType: [function () {
          return {};
        }]
      },
      controller: 'BookingTypeFormController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.booking_type.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'booking_type/booking_type_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'booking_type/booking_type_form.controller.js']
          });
        }],
        bookingType: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('booking-type', $stateParams.id);
        }]
      },
      controller: 'BookingTypeFormController',
      controllerAs: 'vm'
    })

    /////////////////

    .state('app.vehicle.maintenance_type', {
      url: '/maintenance-type',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.vehicle.maintenance_type.list', {
      url: '',
      templateUrl: prefixTplPath + 'maintenance_type/maintenance_type_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'maintenance_type/maintenance_type_list.controller.js']
          });
        }],
        maintenanceTypes: ['_DataService', function (_DataService) {
          return _DataService.getListFromCache('maintenance-type');
        }]
      },
      controller: 'MaintenanceTypeListController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.maintenance_type.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'maintenance_type/maintenance_type_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'maintenance_type/maintenance_type_form.controller.js']
          });
        }],
        maintenanceType: [function () {
          return {};
        }]
      },
      controller: 'MaintenanceTypeFormController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.maintenance_type.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'maintenance_type/maintenance_type_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'maintenance_type/maintenance_type_form.controller.js']
          });
        }],
        maintenanceType: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('maintenance-type', $stateParams.id);
        }]
      },
      controller: 'MaintenanceTypeFormController',
      controllerAs: 'vm'
    })

    /////////////////

    .state('app.vehicle.booking', {
      url: '/booking',
      parent: 'app.vehicle',
      template: '<ui-view/>',
      abstract: true
    })

    .state('app.vehicle.booking.list', {
      url: '',
      templateUrl: prefixTplPath + 'booking/booking_list.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'booking/booking_list.controller.js']
          });
        }],
        bookings: ['_DataService', function (_DataService) {
          return _DataService.getListFromCache('booking');
        }],
        currentPeriod: ['_DataService', function (_DataService) {
          return _DataService.getOne('period').one('current').get();
        }]
      },
      controller: 'BookingListController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.booking.new', {
      url: '/new',
      templateUrl: prefixTplPath + 'booking/booking_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'booking/booking_form.controller.js']
          });
        }],
        currentPeriod: ['_DataService', function (_DataService) {
          return _DataService.getOne('period').one('current').get();
        }],
        booking: ['currentPeriod', function (currentPeriod) {
          return {
            period: angular.isDefined(currentPeriod.id) ? currentPeriod.id : null
          };
        }]
      },
      controller: 'BookingFormController',
      controllerAs: 'vm'
    })

    .state('app.vehicle.booking.edit', {
      url: '/{id}/edit',
      templateUrl: prefixTplPath + 'booking/booking_form.tpl.html',
      resolve: {
        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [prefixCtrlPath + 'booking/booking_form.controller.js']
          });
        }],
        currentPeriod: ['_DataService', function (_DataService) {
          return _DataService.getOne('period').one('current').get();
        }],
        booking: ['_DataService', '$stateParams', function (_DataService, $stateParams) {
          return _DataService.getOneFromCache('booking', $stateParams.id);
        }]
      },
      controller: 'BookingFormController',
      controllerAs: 'vm'
    });
  }

})();


