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
      .filter('phone', phone);

  phone.$inject = [];

  function phone() {
    return function(phone) {
      phone = phone.replace(/[^\d]/g, '');

      //check if number length equals to 10
      if (phone.length === 10) {
          //reformat and return phone number
          return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
      }
      else {
        return phone;
      }
    };
  }
    
})();