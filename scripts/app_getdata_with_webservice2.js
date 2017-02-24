/// <reference path="../node_modules/angular/angular.js" />

var app = angular
            .module("myModule", [])
            .controller("myController", function ($scope, $http, $log) {
                $http({
                    method: 'GET',
                    url: 'http://ccsdc-chwebdev:3003/api/campaignEmployers?CampaignId=1'})
                .then(function (response) {
                    $log.info(response);
                    var accounts = JSON.parse(response.data[0].Result);
                    $scope.accounts = accounts;
                    
                });
            });