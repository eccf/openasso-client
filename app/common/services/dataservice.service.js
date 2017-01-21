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
      .factory('_DataService', _DataService);

  _DataService.$inject = ['$q','_Cache','Restangular'];

  function _DataService($q, _Cache, Restangular) {

    var service = {
      getListFromCache: getListFromCache,
      getList: getList,
      getOne: getOne,
      getOneFromCache: getOneFromCache,
      save: save,
      remove: remove
    };

    return service;

    /////////////////////

    function getList(key, options) {
      return Restangular.all(key).getList(options)
        .then(function(values) {
          _Cache.put(key+'-list', values);
          return values;
        })
        .catch(function(response) {
          console.log('Erreur request api getList : ' + key);
          console.log(response);
        });
    }

    function getListFromCache(key, options) {
      if(_Cache.get(key+'-list')) {
        return $q.when(_Cache.get(key+'-list'));
      }
      else {
        return getList(key, options);
      }
    }

    function getOne(key, id, options, noCache) {
      if(id) {
        return Restangular.one(key, id).get(options).then(
          function(value) {
            if(!noCache) {
              _Cache.put(key+'-one', value);
            }
            return value;
          }, 
          function (response) {
            console.log('Erreur request api getList : ' + key);
            console.log(response);
          });
      }
      else {
        return Restangular.one(key);
      }
    }

    function getOneFromCache(key, id, options) {
      var one = _Cache.get(key+'-one');
      if(one && one.id === parseInt(id)) {
        return $q.when(one);
      }
      else {
        return getOne(key, id, options);
      }
    }

    function save(key, model) {
      _Cache.remove(key+'-one');
      _Cache.remove(key+'-list');
      if(model.id) {
        return model.put();
      }
      else {
        return Restangular.all(key).post(model);
      }
    }

    function remove(key, model) {
      _Cache.remove(key+'-one');
      _Cache.remove(key+'-list');
      return model.remove();
    }
  }
  
})();