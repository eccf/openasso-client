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
      .module('app.common')
      .factory('_Date', _Date);

  _Date.$inject = [];

  function _Date() {
    return {
      toDate: function(dateString) {
        return moment(dateString, 'YYYY-MM-DD').isValid() ? moment(dateString, 'YYYY-MM-DD').toDate() : null;
      },
      toString: function(dateObject){
        return (moment(dateObject).isValid()) ? moment(dateObject).format('YYYY-MM-DD') : null;
      }
    };
  }
    
})();