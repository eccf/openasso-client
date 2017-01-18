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

  angular.module('app')
  
  /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.js'],
      sparkline:      ['vendor/jquery.sparkline/dist/jquery.sparkline.min.js'],
      plot:           ['vendor/Flot/jquery.flot.js', 
                          'vendor/Flot/jquery.flot.resize.js',
                          'vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                          'vendor/flot-spline/js/jquery.flot.spline.min.js',
                          'vendor/flot.orderbars/js/jquery.flot.orderBars.js',
                          'vendor/Flot/jquery.flot.pie.js'],
      slimScroll:     ['vendor/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['vendor/html5sortable/jquery.sortable.js'],
      nestable:       ['vendor/nestable/jquery.nestable.js'],
      filestyle:      ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider:         ['vendor/bootstrap-slider/bootstrap-slider.js',
                          'vendor/bootstrap-slider/bootstrap-slider.css'],
      TouchSpin:      ['vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                          'vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                          'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js']
      }
  )
  
  .constant('APP_CONSTANT_LIST', {
    payementTypes: ['Chèque', 'Espèce', 'Autre'],
    phoneTypes: ['Fixe', 'Mobile', 'Père', 'Mère', 'Parents', 'Grand-Parents', 'Frère', 'Soeur','Professionnel', 'Autre'],
    emailTypes: ['Principal', 'Père', 'Mère', 'Parents', 'Grand-Parents','Frère', 'Soeur', 'Professionnel', 'Autre']
  });
  
})();
