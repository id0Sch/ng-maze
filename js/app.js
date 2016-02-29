var app = angular.module('ngMaze', ['main', 'stages']);


app.run(['$rootScope', function ($rootScope) {

}]);

angular.module('main', []).controller('mainCtrl', ['$rootScope', function ($rootScope) {
    console.log('hi');
}]);