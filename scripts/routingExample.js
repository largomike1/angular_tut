/// <reference path="../node_modules/angular/angular.min.js" />
/// <reference path="../node_modules/angular/angular-route.min.js" />

/*
When route navigation occurs in an Angular application, the following events are triggered
1. $locationChangeStart
2. $routeChangeStart
3. $locationChangeSuccess
4. $routeChangeSuccess
*/

var app = angular
           .module("myModule", ["ngRoute"])
           .config(function ($routeProvider,$locationProvider) {
               $locationProvider.hashPrefix('');
               $routeProvider.caseInsensitiveMatch = true;
               
               $routeProvider
                   .when("/home", {
                       template: "<h1>Inline Template in action </h1>",  //inline template
                       controller: "homeController as homeCtrl",
                   })
                   .when("/courses", {
                       templateUrl: "Templates/courses.html",
                       controller: "coursesController as coursesCtrl"
                   })
                   .when("/students", {
                       templateUrl: "Templates/students.html",
                       controller: "studentsController as studentsCtrl",
                       resolve: {
                           studentsList: function ($http) {
                               return $http.get("StudentService.asmx/GetAllStudents")
                                       .then(function (response) {
                                           return response.data;
                                       })
                           }
                        }
                   })
                   .when("/students/:id", {
                       templateUrl: "Templates/StudentDetails.html",
                       controller: "studentDetailsController",
                       controllerAs: "studentDetailsCtrl"  //this is another way to do the controler As specification
                   })
                   .when("/studentsSearch/:name?", {          //? at the end makes the parameter optional
                       templateUrl: "Templates/studentsSearch.html",
                       controller: "studentsSearchController",
                       controllerAs: "studentsSearchCtrl"  
                   })
                   .otherwise({
                       redirectTo: "/home"
                   });
               $locationProvider.html5Mode(true);
               
           })
           .controller("homeController", function ($rootScope) {
               this.message = "Home Page";
               $rootScope.loadingStudents = false;
           })
           .controller("coursesController", function () {
               this.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server"];
           })
            .controller("studentsController", function (studentsList, $route, $scope, $rootScope, $log, $location) {
                var vm = this;  //get reference to controller

                /* unremark to see how to cancel navigation
                $scope.$on("$locationChangeStart", function (event, next, current) {
                    //This will allow us to cancel the route change
                    if (!confirm("Are you sure you want to navigate away from this page to " + next)==true)
                    {
                        event.preventDefault();
                    }
                });*/
                
                vm.searchStudent = function () {
                    if (vm.name) {
                        $location.url("/studentsSearch/" + vm.name)
                    }
                    else {
                        $location.url("/studentsSearch/");
                    }
                };


                //Logging events
                $rootScope.$on("$locationChangeStart", function () {
                    $rootScope.loadingStudents = true;
                    $log.debug("$locationChangeStart fired");
                });

                $rootScope.$on("$routeChangeStart", function () {
                    $log.debug("$routeChangeStart fired");
                });

                $rootScope.$on("$locationChangeSuccess", function () {
                    $log.debug("$locationChangeSuccess fired");
                });

                $rootScope.$on("$routeChangeSuccess", function () {
                    $log.debug("$routeChangeSuccess fired");
                    $rootScope.loadingStudents = false;
                });


                vm.reloadData = function () {
                    $route.reload();  //This reloads just the students page
                };

                vm.students = studentsList;
            })
             .controller("studentDetailsController", function ($http, $routeParams) {
                 var ctrl = this;
                 $http({
                     url: "StudentService.asmx/GetStudent",
                     method: "get",
                     params: { id: $routeParams.id }
                 }).then(function (response) {
                     ctrl.student = response.data;
                 })

             })
            .controller("studentsSearchController", function ($http, $routeParams) {
                var vm = this;

                if ($routeParams.name)
                {
                    $http({
                        url: "StudentService.asmx/GetStudentsByName",
                        method: "get",
                        params: { name: $routeParams.name }
                    }).then(function (response) {
                        vm.students = response.data;
                    })
                } else
                {
                    $http.get("StudentService.asmx/GetAllStudents")
                                       .then(function (response) {
                                           vm.students = response.data;
                                       })
                }

                

            })