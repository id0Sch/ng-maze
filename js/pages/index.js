/*global angular*/
/*global config*/
angular.module('pages', ['ngAnimate', 'helloWorld', 'nextFrame', 'bla'])
    .directive('pages', [function() {
        return {
            restrict: 'A',
            controller: function($rootScope, $scope) {
                $scope.pageTree = {
                    "helloWorld": {
                        html: "hello-world.html",
                        directions: {
                            down: "nextFrame",
                            left: "nextFrame",
                            up: "nextFrame",
                            right: "bla"
                        }
                    },
                    "bla": {
                        html: "bla.html",
                        directions: {
                            up: 'nextFrame',
                            down: '~~prev~~'
                        }
                    },
                    "nextFrame": {
                        html: "next-frame.html",
                        directions: {
                            down: "helloWorld",
                            left: "helloWorld",
                            up: "helloWorld",
                            right: "helloWorld"
                        }
                    }
                };

                $rootScope.resetDirections = function(state) {
                    $rootScope.active = {
                        down: state,
                        up: state,
                        left: state,
                        right: state
                    };
                };
                $rootScope.activePage = $scope.pageTree['helloWorld'];
                $rootScope.prev = angular.copy($rootScope.activePage);
                
                $rootScope.transition = function(direction) {
                    var nextPageName = $scope.activePage.directions[direction];
                    $rootScope.slideDirection = direction;
                    if (nextPageName == '~~prev~~' && $rootScope.prev) {
                        $rootScope.activePage = angular.copy($rootScope.prev);
                    }
                    else {
                        $rootScope.prev = angular.copy($rootScope.activePage);
                        $rootScope.activePage = $scope.pageTree[nextPageName];
                    }
                    $rootScope.resetDirections(true);
                };

                $scope.getActiveHtml = function() {
                    return 'js/pages/' + $rootScope.activePage.html;
                };
                $rootScope.resetDirections(true);
            },
            templateUrl: 'js/pages/index.html'
        };
    }])
    .directive('goTo', ['$rootScope', function($rootScope) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                'direction': '=',
                'transition': '='
            },
            templateUrl: 'js/pages/directionButton.partial.html'
        };
    }])
    .animation('.slide', ['$rootScope', function($rootScope) {
        return {
            // make note that other events (like addClass/removeClass)
            // have different function input parameters
            enter: function(element, doneFn) {

                var actions = {
                    up: {
                        k: "margin-top",
                        v: "-73vh"
                    },
                    down: {
                        k: "margin-top",
                        v: "73vh"
                    },
                    left: {
                        k: "margin-left",
                        v: "-87vw"
                    },
                    right: {
                        k: "margin-left",
                        v: "87vw"
                    }
                };
                console.log($rootScope.slideDirection);

                // Put element outside of page:
                if (actions[$rootScope.slideDirection]) {
                    jQuery(element).css(
                        actions[$rootScope.slideDirection].k,
                        actions[$rootScope.slideDirection].v
                    );
                }

                jQuery(element).animate({
                        "margin-top": 0,
                        "margin-left": 0
                    },
                    config.animationDuration,
                    config.animationEase,
                    function() {
                        doneFn();
                    });

                /*jQuery(element).fadeIn(1000, doneFn);
                console.log($rootScope.slideDirection)
                    //.animate({ "left": "+=50px" }, "slow" );

                // remember to call doneFn so that angular
                // knows that the animation has concluded*/
            },

            move: function(element, doneFn) {
                jQuery(element).fadeIn(1000, doneFn);
            },

            leave: function(element, doneFn) {

                var actions = {
                    up: {
                        "margin-top": "+=73vh"
                    },
                    down: {
                        "margin-top": "-=73vh"
                    },
                    left: {
                        "margin-left": "+=87vw"
                    },
                    right: {
                        "margin-left": "-=87vw"
                    }
                };

                jQuery(element).animate(actions[$rootScope.slideDirection],
                    config.animationDuration,
                    config.animationEase,
                    function() {
                        jQuery(element).remove();
                        doneFn();
                    });
            }
        };
    }]);