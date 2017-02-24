/// <reference path="../node_modules/angular/angular.min.js" />

var myApp = angular
    .module("myModule", [])
    .controller("myController",function ($scope) {

        var employees = [
            {
                firstName: "Gary",
                lastName: "Stein",
                gender: "Male",
                birthday: new Date("1/1/1962"),
                salary: 100000
            },
            {
                firstName: "Jane",
                lastName: "Steiner1",
                gender: "Female",
                birthday: new Date("2/1/1962"),
                salary: 100000.234
            },
            {
                firstName: "Jane",
                lastName: "Steiner2",
                gender: "Female",
                birthday: new Date("2/1/1962"),
                salary: 100000.234
            },
            {
                firstName: "Jane",
                lastName: "Steiner3",
                gender: "Female",
                birthday: new Date("2/1/1962"),
                salary: 100000.234
            },
            {
                firstName: "Jane",
                lastName: "Steiner4",
                gender: "Female",
                birthday: new Date("2/1/1962"),
                salary: 100000.234
            }
        ];

        $scope.employees = employees;
        $scope.rowLimit = 3;
       

});


