'use strict';

angular.module("appModule")
    .controller('gpaCtrl', function($scope, $http) {
        console.log("GPA controller loaded!");

        //Initialize all fields
        $scope.classField = "";

        $scope.gradeField = "";

        $scope.creditField = "";

        $scope.totalCredits = 0;
        $scope.totalGradePoint = 0;
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

        //Is supposed to continuously update the GPA
        $scope.updateGPA = function() {
            for (var i = 0; i < $scope.classes.length; i++){
                $scope.totalCredits += $scope.classes[i].credits;
                $scope.totalGradePoint += ($scope.classes[i].grade * $scope.classes[i].credits)/$scope.totalCredits;
            }
            return ($scope.totalGradePoint && $scope.totalCredits);
        };

        //Helper functions to determine if input is valid
        $scope.creditCheck = function() {
            if (!$scope.creditField.length === 1) {
                alert("Please submit a valid number of credits.");
                checks++;
            } else if (isNaN($scope.creditField)) {
                alert("Please submit a valid number of credits.");
                checks++;
            }
        };

        $scope.gradeCheck = function() {
            if(!$scope.gradeField.length == 1) {
                alert("Please submit a letter grade without a plus or minus.");
                checks++;
            } else if(!isNaN($scope.gradeField)){
                alert("Please submit a letter grade without a plus or minus.");
                checks++;
            }
        };

        $scope.classCheck = function() {
            if (!$scope.classField.length >= 1) {
                alert("Please submit a class name.");
                checks++;
            }
        };

        //Main GPA functions
        $scope.addClass = function () {
            $scope.classCheck();
            $scope.gradeCheck();
            $scope.creditCheck();
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
            $scope.currentGpa();
        };

        $scope.removeClass = function (index) {
            $http.delete('/api/dbClass/' + $scope.classes[index]._id).success(function () {
                $scope.getClasses();
            });
            $scope.updateGPA();
            $scope.currentGpa();
        };

        //More helper functions for correctly displaying the GPA
        $scope.currentGpa = function(){
            return ($scope.totalGradePoint/$scope.totalCredits).toFixed(3);
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