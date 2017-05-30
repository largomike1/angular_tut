/// <reference path="../node_modules/angular/angular.min.js" />
/// <reference path="../node_modules/angular/angular-route.min.js" />
/// <reference path="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.4.2/angular-ui-router.js" />

/*
When route navigation occurs in an Angular application, the following events are triggered
1. $locationChangeStart
2. $routeChangeStart
3. $locationChangeSuccess
4. $routeChangeSuccess
*/

/*
Notice ["ui.router"] below instead of ["ngRoute"] for use of UI Routing
Instead of $routeProvider service we'll use $stateProvider service
*/
var app = angular
           .module("myModule", ["ui.router"])
           .config(function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
               $urlRouterProvider.otherwise("/home");
               $urlMatcherFactoryProvider.caseInsensitive(true);
               $stateProvider
                   .state("home", {
                       url:"/home",
                       templateUrl: "Templates/homeUIRoute.html", 
                       controller: "homeController as homeCtrl",
                       data: {
                           customData1: "Home State custom data 1",
                           customData2: "Home State custom data 2"
                       }
                   })
                   .state("courses", {
                       url: "/courses",
                       templateUrl: "Templates/courses.html",
                       controller: "coursesController as coursesCtrl",
                       data: {
                           customData1: "Course State custom data 1",
                           customData2: "Course State custom data 2"
                       }
                   })
                    .state("studentParent", {
                        url: "/students",
                        controller: "studentParentController",
                        controllerAs: "stdParentCtrl",
                        templateUrl: "Templates/studentParent.html",
                        resolve: {
                            studentTotals: function ($http) {
                                return $http.get("StudentService.asmx/GetStudentTotals")
                                        .then(function (response) {
                                            return response.data;
                                        })
                            }
                        },
                        abstract: true

                    })
                   .state("studentParent.students", {
                       url: "/",
                       views: {
                           "studentData" : {
                               templateUrl: "Templates/studentsUIRouting.html",
                               controller: "studentsController as studentsCtrl",
                               resolve: {
                                   studentsList: function ($http) {
                                       return $http.get("StudentService.asmx/GetAllStudents")
                                               .then(function (response) {
                                                   return response.data;
                                               })
                                   }
                               }
                           },
                           "totalData": {
                               templateUrl: "Templates/studentsTotal.html",
                               controller: "studentsTotalController as studentsTotalCtrl"
                               }
                        }
                   })
                   .state("studentParent.studentDetails", {
                       url: "/:id",
                       views : {
                           "studentData": {
                               templateUrl: "Templates/StudentDetailsUIRouting.html",
                               controller: "studentDetailsController",
                               controllerAs: "studentDetailsCtrl"  //this is another way to do the controler As specification
                           }
                       }
                       
                   })
                   .state("studentsSearch", {          //? at the end makes the parameter optional
                       url: "/studentsSearch/:name",
                       templateUrl: "Templates/studentsSearch.html",
                       controller: "studentsSearchController",
                       controllerAs: "studentsSearchCtrl"  
                   })
                    


                   //.otherwise({
                   //    redirectTo: "/home"
                   //});
               $locationProvider.html5Mode(true);
               
           })
           .controller("homeController", function ($state) {
               this.message = "Home Page";
               this.homeCustomData1 = $state.current.data.customData1;
               this.homeCustomData2 = $state.current.data.customData2;

               this.coursesCustomData1 = $state.get("courses").data.customData1;
               this.coursesCustomData2 = $state.get("courses").data.customData2;
               
           })
           .controller("coursesController", function () {
               this.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server"];
           })
            .controller("studentsTotalController", function (studentTotals) {
                this.total = studentTotals.total;
            })
            .controller("studentParentController", function (studentTotals) {
                 this.males = studentTotals.males;
                 this.females = studentTotals.females;
                 this.total = studentTotals.total;
             })
            .controller("studentsController", function (studentsList, $state, $scope, $rootScope, $log, $location,studentTotals) {
                var vm = this;  //get reference to controller

                /* unremark to see how to cancel navigation
                $scope.$on("$locationChangeStart", function (event, next, current) {
                    //This will allow us to cancel the route change
                    if (!confirm("Are you sure you want to navigate away from this page to " + next)==true)
                    {
                        event.preventDefault();
                    }
                });*/
                
                vm.studentTotals = studentTotals;  //the studentTotals was injected into this controller from the parent controller
                vm.studentsSearch = function () {
                    $state.go("studentsSearch",{name:vm.name});
                };


                //Logging events
                $rootScope.$on("$locationChangeStart", function () {
                    
                    //$log.debug("$locationChangeStart fired");
                });

                $rootScope.$on("$routeChangeStart", function () {
                    //$log.debug("$routeChangeStart fired");
                });

                $rootScope.$on("$locationChangeSuccess", function () {
                    //$log.debug("$locationChangeSuccess fired");
                });

                $rootScope.$on("$routeChangeSuccess", function () {
                    //$log.debug("$routeChangeSuccess fired");
                    
                });


                vm.reloadData = function () {
                    $state.reload();  //This reloads just the students page
                };

                vm.students = studentsList;
            })
             .controller("studentDetailsController", function ($http, $stateParams) {
                 var ctrl = this;
                 $http({
                     url: "StudentService.asmx/GetStudent",
                     method: "get",
                     params: { id: $stateParams.id }
                 }).then(function (response) {
                     ctrl.student = response.data;
                 })

            })
            .controller("studentsSearchController", function ($http, $stateParams) {
                var vm = this;

                if ($stateParams.name)
                {
                    $http({
                        url: "StudentService.asmx/GetStudentsByName",
                        method: "get",
                        params: { name: $stateParams.name }
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