/*global angular*/
angular.module("helloWorld", [])
    .controller("helloWorldCtrl", ["$rootScope", "$scope", "$interval", function($rootScope, $scope, $interval) {
        $scope.title = "Hello World";
        $scope.msg = "Welcome to the shit!";

        $scope.trailers = $rootScope.transition;
        $rootScope.active.left = false;
        var toggleLeft;
        // var toggleLeft = $interval(function() {
            // $rootScope.active.left = !$rootScope.active.left;
        // }, 1000);

        function stopInterval() {
            if (angular.isDefined(toggleLeft)) {
                $interval.cancel(toggleLeft);
                toggleLeft = undefined;
            }
        }
        
        
        $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            stopInterval();
        });
    }]);