'use strict';

console.log("gpaCalculator.js loaded!");

angular.module("appModule")
    .config(function($stateProvider){
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/gpaCalculator/gpaCalculator.html',
                controller: 'gpaCtrl'
            });
    });