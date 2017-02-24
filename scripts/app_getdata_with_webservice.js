/// <reference path="../node_modules/angular/angular.js" />
/*
var app = angular
            .module("myModule", [])
            .controller("myController", function ($scope, $http) {
                $http.get("http://ipims.ccsmed.com/MedicationApi/api/medicine?term=tylenol*")
                .then(function (response) {
                    var medicines = response.data;
                    $scope.medicines = medicines;
                    
                });
            });
*/
var app = angular
            .module("myModule", [])
            .controller("myController", function ($scope, $http, $log) {

                var successCallBack = function (response) {
                    $scope.medicines = response.data;
                    $log.info(response);
                };

                var errorCallBack = function (response) {
                    $scope.error = response.data;
                    $log.info(response);
                };

                $http({
                    method: 'GET',
                    url: 'http://ipims.ccsmed.com/MedicationApi/api/medicine?term=tylenol*'
                })
                    .then(successCallBack, errorCallBack);
            });