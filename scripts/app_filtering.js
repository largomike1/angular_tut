/// <reference path="../node_modules/angular/angular.min.js" />

var myApp = angular
    .module("myModule", [])
    .controller("myController",function ($scope) {

        var employees = [
            {
                firstName: "Michael",
                lastName: "Stein",
                gender: 1,
                birthday: new Date("1/1/1962"),
                salary: 100000
            },
            {
                firstName: "Jane",
                lastName: "Feiner",
                gender: 2,
                birthday: new Date("2/1/1962"),
                salary: 100000.234
            },
            {
                firstName: "Mary",
                lastName: "Jane",
                gender: 2,
                birthday: new Date("3/1/1962"),
                salary: 200000.234
            },
            {
                firstName: "Maurice",
                lastName: "Steiner",
                gender: 1,
                birthday: new Date("4/1/1962"),
                salary: 400000.234
            },
            {
                firstName: "Kim",
                lastName: "Bailey",
                gender: 2,
                birthday: new Date("5/1/1961"),
                salary: 300000.234
            }
        ];

        $scope.sortColumn = "lastName";
        $scope.reverseSort = false;
        $scope.employees = employees;
        $scope.rowLimit = 3;

        $scope.sortData = function (column) {
            $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
            $scope.sortColumn = column;
        };
       
        $scope.getSortClass = function (column) {
            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? "glyphicon glyphicon-triangle-bottom" : "glyphicon glyphicon-triangle-top";
            }
            else
            {
                return "";
            }
        };

        //custom filter for searching on first and last name only
        $scope.searchFirstLast = function (item) {
            if ($scope.firstLastText == undefined) {
                return true;
            }
            else {
                if ((item.firstName.toLowerCase().indexOf($scope.firstLastText.toLowerCase()) != -1) ||
                    (item.lastName.toLowerCase().indexOf($scope.firstLastText.toLowerCase()) != -1))
                {
                    return true;
                }
                    
            }
            return false;
        };

});


