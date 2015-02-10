'use strict';

angular.module("appModule")
    .controller('gpaCtrl', function($scope, $http) {
        console.log("GPA controller loaded!");

        //Initialize all fields
        $scope.classField = "";

        $scope.gradeField = "";

        $scope.creditField = "";

        var totalCredits = 0;
        var totalGradePoint = 0;

        $scope.totalCreditsFunction = function(){
            totalCredits = 0;
            for(var thing = 0; thing < $scope.classes.length; thing++){
                totalCredits += classes[thing].credits;
            }
            return totalCredits;
        };

        $scope.totalGradePointFunction = function(){
            totalGradePoint = 0;
            for(var thing = 0; thing < $scope.classes.length; thing++) {
                totalGradePoint += ($scope.classes[i].grade * $scope.classes[i].credits);
            }
            return totalGradePoint;
        };

        var checks = 0;

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.classes = [];

        //Adds classes found in the database
        $scope.getClasses = function(){
            $http.get('api/dbClass').success(function (classes) {
                $scope.classes = classes;
            });
        };
        $scope.getClasses();

        //Helper functions to determine if input is valid
        $scope.creditCheck = function(num) {
            if (!num.length === 1) {
                alert("Please submit a valid number of credits.");
                checks++;
            } else if (isNaN(num)) {
                alert("Please submit a valid number of credits.");
                checks++;
            }
        };

        $scope.gradeCheck = function(str) {
            if(!str.length == 1) {
                alert("Please submit a letter grade without a plus or minus.");
                checks++;
            } else if(!isNaN(str)){
                alert("Please submit a letter grade without a plus or minus.");
                checks++;
            }
        };

        $scope.classCheck = function(str) {
            if (!str.length >= 1) {
                alert("Please submit a class name.");
                checks++;
            }
        };

        //Main GPA functions
        $scope.addClass = function () {
            $scope.classCheck($scope.classField);
            $scope.gradeCheck($scope.gradeField);
            $scope.creditCheck(scope.creditField);
            if (checks === 0) {
                $http.post('api/dbClass', {class: $scope.classField, grade:$scope.gradeField, credits:$scope.creditField}).success(function(){
                    $scope.getClasses();
                });
                $scope.totalCredits = $scope.totalCredits + parseInt($scope.creditField);
                $scope.totalGradePoint = $scope.totalGradePoint + (parseInt($scope.creditField) * parseInt($scope.returnGradeValue($scope.gradeField.toUpperCase())));
                $scope.classField = "";
                $scope.gradeField = "";
                $scope.creditField = "";
            }
            checks = 0;
        };

        $scope.removeClass = function (index) {
            $http.delete('/api/dbClass/' + $scope.classes[index]._id).success(function () {
                $scope.getClasses();
                $scope.currentGpa();
            });
        };

        //More helper functions for correctly displaying the GPA
        $scope.currentGpa = function(){
            return ($scope.totalGradePointFunction()/$scope.totalCreditsFunction()).toFixed(3);
        };


        $scope.returnGradeValue = function(str){
            if (str === "A") {
                return 4.0;
            } else if (str === "B") {
                return 3.0;
            } else if (str === "C") {
                return 2.0;
            } else if (str === "D") {
                return 1.0;
            } else {
                return 0;
            }
        };

    });