'use strict';

console.log("gpaCalculator.js loaded!");

angular.module("appModule")
    .config(function($stateProvider){
        $stateProvider
            .state('gpaCalculator', {
                url: '/gpaCalculator',
                templateUrl: 'views/gpaCalculator/gpaCalculator.html',
                controller: 'gpaCtrl'
            });
    });