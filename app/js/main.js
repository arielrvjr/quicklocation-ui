
'user strict';
global.firebase = require('firebase');
var angular = require('angular'); // That's right! We can just require angular as if we were in node
var ngMaterial = require('angular-material');
var ngRoutes = require('angular-route');
var angularfire = require('angularfire');


//config;
var Config = require('./config.js');
var configFirebase = require('./firebaseconfig');
global.firebase.initializeApp(configFirebase());



var app = angular.module('myApp', [ngMaterial, ngRoutes,angularfire]);


//service
var LoginService = require('./services/LoginService');
//var RunService = require('./services/RunService');

app.factory('LoginService', ['$log','$rootScope','$firebaseAuth','$location','$mdToast', LoginService]);
//Controllers;
var MainCtrl = require('./controllers/MainCtrl'); // We can use our WelcomeCtrl.js as a module. Rainbows.
var DashboardCtrl = require('./controllers/DashboardCtrl'); // We can use our DashboardCtrl.js as a module. Rainbows.
var LoginCtrl =   require('./controllers/LoginCtrl');
var PlaceCtrl =   require('./controllers/PlaceCtrl');
var CommentCtrl =   require('./controllers/CommentCtrl');
//reports
var LastCommentsCtrl =   require('./controllers/LastCommentsCtrl');
var TopUsersCtrl =   require('./controllers/TopUsersCtrl');

app.controller('MainCtrl', ['$log','$location', '$rootScope','$window','$mdMedia','$mdSidenav','LoginService', MainCtrl]);
app.controller('DashboardCtrl', ['$log', '$scope','$firebaseArray', DashboardCtrl]);
app.controller('LastCommentsCtrl', ['$log', '$scope','$firebaseArray', LastCommentsCtrl]);
app.controller('TopUsersCtrl', ['$log', '$scope','$firebaseArray', TopUsersCtrl]);

app.controller('LoginCtrl', ['$log', '$scope','LoginService', LoginCtrl]);
app.controller('PlaceCtrl', ['$log', '$scope','$location','$routeParams','$firebaseArray','$firebaseObject','$mdDialog','$mdToast', PlaceCtrl]);
app.controller('CommentCtrl', ['$log', '$scope','$mdDialog','$firebaseArray','$mdToast', CommentCtrl]);
app.config(Config);

require('./components/ratingstar');
/*app.run(['$rootScope', '$location','$mdToast','LoginService', RunService]);*/