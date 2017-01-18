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
    .module('app')
    .config(config);
    
  config.$inject = ['$translateProvider', 'RestangularProvider', '$stateProvider', '$urlRouterProvider'];
    
  function config($translateProvider, RestangularProvider, $stateProvider, $urlRouterProvider) {
    // Parémétrage de l'url des fichiers de langue [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Langage [langKey] par défaut
    $translateProvider.preferredLanguage('fr_FR');
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('escape');
    
    // Définition de l'url de l'api et du state parent
    RestangularProvider.setBaseUrl(Config.get('api_url'));
    RestangularProvider.setDefaultHeaders({ "Content-Type": "application/json" });
    
    // Définition de la route par défaut
    $urlRouterProvider.otherwise('/app/dashboard');
    // Définition du state principal
    $stateProvider.state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'app/app.tpl.html'
    });
  }

})();
