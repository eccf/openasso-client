'use strict';

/* Controllers */

angular.module('app').controller('StatIndexCtrl', ['$scope', 'currentPeriod', 'stat', 'Restangular', function($scope, currentPeriod, stat, Restangular) {
    
    $scope.currentPeriod = currentPeriod;
    
    angular.forEach(stat.countCurrentSubscriptionByGroup, function(value, key) {
      if(value.label === null) {
        stat.countCurrentSubscriptionByGroup[key].label = 'Aucun groupe';
      }
    });

    angular.forEach(stat.countCurrentSubscriptionBySection, function(value, key) {
      if(value.label === null) {
        stat.countCurrentSubscriptionBySection[key].label = 'Aucune section';
      }
    });

    angular.forEach(stat.countCurrentSubscriptionByState, function(value, key) {
      if(value.label === null) {
        stat.countCurrentSubscriptionByState[key].label = 'Aucun état';
      }
    });
    
    $scope.result = stat;
    
    /*Restangular.one('stat').get().then(function(result) {
      
      
      
      
      $scope.result = result;
    });*/
    
    $scope.periodSubscription = [];
    $scope.periodSubscriptionTicks = [];
    for(var i = 0 ; i < stat.countSubscriptionByPeriod.length ; i++) {
      $scope.periodSubscription.push([i+1, stat.countSubscriptionByPeriod[i].data]);
      $scope.periodSubscriptionTicks.push([i+1, stat.countSubscriptionByPeriod[i].label]);
    }
    
    $scope.periodSubscriptionBySectionTicks = [];
    var periodIndexed = [];
    for(var i = 0 ; i < stat.periods.length ; i++) {
      periodIndexed[stat.periods[i].id] = i;
      $scope.periodSubscriptionBySectionTicks.push([i+1, stat.periods[i].label]);
    }
    
    $scope.periodSubscriptionBySection = [];
    for(var key in stat.countSubscriptionByPeriodBySection) {
      var section = {};
      section.label = key;
      var values = stat.countSubscriptionByPeriodBySection[key];
      var data = [];
      for(var i = 0 ; i < values.length ; i++) {
        var periodId = values[i][0];
        data.push([periodIndexed[periodId], values[i][1]]);
      }
      section.data = data;
      $scope.periodSubscriptionBySection.push(section);
    }
    console.log($scope.periodSubscriptionBySection);
    
    
    $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];
    

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [1, 120], [2, 70], [3, 70], [4, 60] ];

    $scope.d1_2 = [ [1, 50], [4, 35], [3, 90]];

    $scope.d1_3 = [ [1, 80],  [2, 40], [3, 30],  [4, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.sin(i)]);
    }   

    $scope.d3 = [ 
      { label: "iPhone5S", data: 40 }, 
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function(){
      $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(y);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }

    $scope.d4 = $scope.getRandomData();
  }]);