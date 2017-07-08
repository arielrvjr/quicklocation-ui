'use strict';
var moment = require('moment');

module.exports =/* @ngInject */ function($routeProvider,$mdThemingProvider,$mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('YYYY-MM-DD');
    };
	$mdThemingProvider.theme('default')
    .primaryPalette('deep-orange')
    .accentPalette('blue');
    $mdThemingProvider.enableBrowserColor();
    $routeProvider
    .when('/', {
        templateUrl : 'views/dashboard.html',
        controller : 'DashboardCtrl'

    })
    .when('/reports/lastcomments', {
        templateUrl : 'views/reports/lastcomments.html',
        controller : 'LastCommentsCtrl'

    })
    .when('/reports/statisticsperhour', {
        templateUrl : 'views/reports/statisticsperhour.html',
        controller : 'StatisticsPerHourCtrl'

    })
    .when('/reports/topusers', {
        templateUrl : 'views/reports/topusers.html',
        controller : 'TopUsersCtrl'

    })
    .when('/login', {
        templateUrl : 'views/login.html',
        controller : 'LoginCtrl'
    })
    .when('/register', {
        templateUrl : 'views/register.html',
        controller : 'LoginCtrl'
    })
    .when('/place', {
        templateUrl : 'views/place.html',
        controller : 'PlaceCtrl'
    })
    .when('/place/:id', {
        templateUrl : 'views/showplace.html',
        controller : 'PlaceCtrl'
    })
    .when('/comment', {
        templateUrl : 'views/comment.html',
        controller : 'CommentCtrl'
    })
    .when('/main', {
        templateUrl : 'views/main.html'
    });
    
};
