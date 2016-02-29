/*global angular*/
angular.module('nextFrame', [])
    .controller("nextFrameCtrl", ["$rootScope", "$scope", function($rootScope, $scope) {
        $scope.title = "Hello NEXT fRAME";
        $scope.msg = "Welcome to the shit!@";

        $scope.trailers = $rootScope.transition;
    }]);