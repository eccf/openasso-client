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
    .module('app.dashboard')
    .config(config);
    
  config.$inject = ['$stateProvider', '$urlRouterProvider'];
    
  function config($stateProvider, $urlRouterProvider) {
    var prefixCtrlPath = 'app/dashboard/views/dashboard_';
    var prefixTplPath = 'app/dashboard/views/dashboard_';

    $stateProvider.state('app.dashboard', {
      url: '/dashboard',
      parent: 'app',
      template: '<ui-view/>',
      abstract: true
    })
    .state('app.dashboard.index', {
      url: '',
      templateUrl: prefixTplPath + 'index.tpl.html',
      resolve: {
        deps: ['$ocLazyLoad', function( $ocLazyLoad ){
          return $ocLazyLoad.load({
            name: 'app.dashboard',
            files: [prefixCtrlPath + 'index.ctrl.js']
          });
        }],
        currentPeriod: ['_DataService', function(_DataService) {
          return _DataService.getOne('period').one('current').get().then(function(period) {
            return period;
          });
        }],
        dashboard: ['_DataService', function(_DataService) {
          return _DataService.getOne('dashboard').get().then(function(dashboard) {
            return dashboard;
          });
        }]
      },
      controller: 'DashboardIndexController',
      controllerAs: 'vm'
    });
  }

})();