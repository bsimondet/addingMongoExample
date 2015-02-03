'use strict';

angular.module("appModule")
    .controller('mainCtrl', function($scope, $http){
        console.log("main controller loaded!");

        $scope.textField = "";

        $scope.weightField = "";

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.data = pets;
            });
        };

        $scope.getPets();

        $scope.addData = function(){
            if($scope.textField.length >= 1) {
                $http.post('api/pets', {text: $scope.textField , weight: $scope.weightField}).success(function(){
                    $scope.getPets();
                });
                $scope.textField = "";
                $scope.weightField = "";
            }
        };

        $scope.removeData = function(index){
            $http.delete('/api/pets/' + $scope.data[index]._id).success(function(){
                $scope.getPets();
            });
        };

        $scope.cat = function(str1, str2){
            return str1 + str2;
        };

        $scope.itemsInList = function(){
            return $scope.data.length;
        };

    });