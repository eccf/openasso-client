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
    .factory('_Alert', _Alert);

  _Alert.$inject = ['$rootScope'];

  function _Alert($rootScope) {
    var queue = [];
    var currentMessage = null;

    $rootScope.$on("$stateChangeStart", function() {
      currentMessage = queue.shift() || null;
    });

    return {

      setQueue: function(message) {
        queue.push(message);
      },

      getQueue: function() {
        return currentMessage;
      },

      createAlert: function(type, message) {
        return { 
          type: type, 
          message: message
        };
      },

      getDefaultSaveSuccess: function() {
        return this.createAlert('success', 'Enregistrement sauvegardé avec succès.') ;
      },

      getDefaultSaveError: function() {
        return this.createAlert('danger', 'Une erreur s\'est produite lors de la sauvegarde de l\'enregistrement.') ;
      },

      getDefaultUpdateSuccess: function() {
        var alert = { 
          type: 'success', 
          message: 'Enregistrement modifié avec succès.'
        };

        return alert;
      },

      getDefaultUpdateError: function(exceptionMessage) {
        var alert = { 
          type: 'danger', 
          message: 'Une erreur s\'est produite lors de la modification de l\'enregistrement.'
        };

        if(exceptionMessage && exceptionMessage['error'] && exceptionMessage['error']['exception'] && exceptionMessage['error']['exception'][0]) {
          alert.message += ' : ' + exceptionMessage['error']['exception'][0]['message'];
        }

        if(exceptionMessage && exceptionMessage[0]) {
          alert.message += ' : ' + exceptionMessage[0].message;
        }

        return alert;
      },

      getDefaultCreateSuccess: function() {
        return { type: 'success', message: 'Enregistrement créé avec succès.'};
      },

      getDefaultCreateError: function(exceptionMessage) {
        var alert = { 
          type: 'danger', 
          message: 'Une erreur s\'est produite lors de la création de l\'enregistrement.'
        };

        if(exceptionMessage && exceptionMessage['error'] && exceptionMessage['error']['exception'] && exceptionMessage['error']['exception'][0]) {
          alert.message += ' : ' + exceptionMessage['error']['exception'][0]['message'];
        }

        if(exceptionMessage && exceptionMessage[0]) {
          alert.message += ' : ' + exceptionMessage[0].message;
        }

        return alert;
      },

      getDefaultDeleteSuccess: function() {
        var alert = { 
          type: 'success', 
          message: 'Enregistrement supprimé avec succès.'
        };

        return alert;
      },

      getDefaultDeleteError: function(exceptionMessage) {
        var alert = { 
          type: 'danger', 
          message: 'Une erreur s\'est produite lors de la suppression de l\'enregistrement.'
        };
        if(exceptionMessage && exceptionMessage['error'] && exceptionMessage['error']['exception'] && exceptionMessage['error']['exception'][0]) {
          alert.message += ' : ' + exceptionMessage['error']['exception'][0]['message'];
        }
        if(exceptionMessage && exceptionMessage[0]) {
          alert.message += ' : ' + exceptionMessage[0].message;
        }

        return alert;
      }

    };
  }
    
})();


