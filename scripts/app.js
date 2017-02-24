/// <reference path="../node_modules/angular/angular.min.js" />

var myApp = angular
    .module("myModule", [])
    .controller("myController",function ($scope) {

        var employees = [
            {
                firstName: "Michael",
                lastName: "Stein",
                gender: "Male",
                hobbies: [
                    { name: "Skiing" },
                    { name: "Boxing" },
                    { name: "Throwing"}
                ],
                likes: 0,
                dislikes: 0
            },
            {
                firstName: "Jane",
                lastName: "Steiner",
                gender: "Female",
                hobbies: [
                    { name: "Dancing" },
                    { name: "Harping" },
                    { name: "Throwing Up" }
                ],
                likes: 0,
                dislikes: 0
            }
        ];

        $scope.employees = employees;

        $scope.incrementLikes = function (employee) {
            employee.likes++;
        };

        $scope.incrementDisLikes = function (employee) {
            employee.dislikes++;
        };

        $scope.employeeView = "EmployeeTable.html";


});


