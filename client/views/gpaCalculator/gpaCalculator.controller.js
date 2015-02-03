'use strict';

angular.module("appModule")
    .controller('gpaCtrl', function($scope, $http) {
        console.log("GPA controller loaded!");

        $scope.classField = "";

        $scope.gradeField = "";

        $scope.creditField = "";

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [];

        $scope.getClasses = function () {
            $http.get('api/classes').success(function (classes) {
                $scope.data = classes;
            });
        };

        $scope.getClasses();

        $scope.addClass = function () {
            if ($scope.classField.length >= 1) {
                $http.post('api/classes', {class: $scope.classField, grade:$scope.gradeField, credits:$scope.creditField}).success(function () {
                    $scope.getClasses();
                });
                $scope.classField = "";
                $scope.gradeField = "";
                $scope.creditField = "";
            }
        };

        $scope.removeData = function (index) {
            $http.delete('/api/classes/' + $scope.data[index]._id).success(function () {
                $scope.getClasses();
            });
        };

        $scope.itemsInList = function () {
            return $scope.data.length;
        };

    });