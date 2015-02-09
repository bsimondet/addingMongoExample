'use strict';

angular.module("appModule")
    .controller('gpaCtrl', function($scope, $http) {
        console.log("GPA controller loaded!");

        $scope.classField = "";

        $scope.gradeField = "";

        $scope.creditField = "";

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.classes = [];

        $scope.getClasses = function(){
            $http.get('api/dbClass').success(function (classes) {
                $scope.classes = classes;
            });
        };

        $scope.getClasses();

        $scope.addClass = function () {
            if ($scope.classField.length >= 1) {
                $http.post('api/dbClass', {class: $scope.classField, grade:$scope.gradeField, credits:$scope.creditField}).success(function(){
                    $scope.getClasses();
                });
                $scope.classField = "";
                $scope.gradeField = "";
                $scope.creditField = "";
            }
        };

        $scope.removeClass = function (index) {
            $http.delete('/api/dbClass' + $scope.classes[index]._id).success(function () {
                $scope.getClasses();
            });
        };

        $scope.itemsInList = function () {
            return $scope.classes.length;
        };

        $scope.currentGpa = function(){
            return 4;
        }

    });