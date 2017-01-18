/* 
 * Project: openasso-client
 * Author: Eric Mas
 */

(function() {
    'use strict';

    angular
        .module('app.member')
        .controller('GroupListController', GroupListController);

    GroupListController.$inject = ['$scope', 'groups', '_Table'];

    function GroupListController($scope, groups, _Table) {
        var vm = this;
        vm.groups = groups;
        activate();
        
        /////////////////////

        function activate() {
          vm.tableParams = _Table.getTable(groups);
        }
    }
})();

