'use strict';

var config = function($routeProvider,$mdThemingProvider) {

	$mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');
    $mdThemingProvider.enableBrowserColor();
    $routeProvider
    .when('/', {
        templateUrl : 'views/main.html'
    })
    .when('/login', {
        templateUrl : 'views/login.html',
        controller : 'LoginCtrl'
    })
    .when('/place', {
        templateUrl : 'views/place.html',
        controller : 'PlaceCtrl'
    })
    .when('/comment', {
        templateUrl : 'views/comment.html',
        controller : 'CommentCtrl'
    })
    ;
};
module.exports = config;