/*global angular*/
angular.module("helloWorld", [])
    .controller("helloWorldCtrl", ["$rootScope", "$scope", function($rootScope, $scope) {
        $scope.title = "Hello World";
        $scope.msg = "Welcome to the shit!";

        $scope.trailers = $rootScope.transition;
    }]);