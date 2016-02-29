/*global angular*/
angular.module('pages', ['ngAnimate', 'helloWorld', 'nextFrame'])
    .directive('pages', [function() {
        return {
            restrict: 'A',
            controller: function($rootScope, $scope) {
                $scope.pageTree = {
                    "helloWorld": {
                        html: "hello-world.html",
                        bottom: "nextFrame"
                    },
                    "nextFrame": {
                        html: "next-frame.html",
                        left: "helloWorld"
                    }
                };
                $scope.activePage = $scope.pageTree['helloWorld'];

                $rootScope.transition = function(direction) {
                    $scope.activePage = $scope.pageTree[$scope.activePage[direction]];
                };

                $scope.getActiveHtml = function() {
                    return 'js/pages/' + $scope.activePage.html;
                };
            },
            templateUrl: 'js/pages/index.html'
        };
    }])
    .animation('.slide', [function() {
        return {
            // make note that other events (like addClass/removeClass)
            // have different function input parameters
            enter: function(element, doneFn) {
                jQuery(element).fadeIn(1000, doneFn);

                // remember to call doneFn so that angular
                // knows that the animation has concluded
            },

            move: function(element, doneFn) {
                jQuery(element).fadeIn(1000, doneFn);
            },

            leave: function(element, doneFn) {
                jQuery(element).fadeOut(1000, doneFn);
            }
        }
    }])
    .animation('.slide-left', [function() {
        return {
            // make note that other events (like addClass/removeClass)
            // have different function input parameters
            enter: function(element, doneFn) {
                jQuery(element).fadeIn(1000, doneFn);

                // remember to call doneFn so that angular
                // knows that the animation has concluded
            },

            move: function(element, doneFn) {
                jQuery(element).fadeIn(1000, doneFn);
            },

            leave: function(element, doneFn) {
                jQuery(element).fadeOut(1000, doneFn);
            }
        }
    }]);
