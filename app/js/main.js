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




app.config(Config);



//service
var LoginService = require('./services/LoginService');
app.factory('LoginService', ['$rootScope','$firebaseAuth','$location', LoginService]);
//Controllers;
var MainCtrl = require('./controllers/MainCtrl'); // We can use our WelcomeCtrl.js as a module. Rainbows.
var WelcomeCtrl = require('./controllers/WelcomeCtrl'); // We can use our WelcomeCtrl.js as a module. Rainbows.
var LoginCtrl =   require('./controllers/LoginCtrl');
var PlaceCtrl =   require('./controllers/PlaceCtrl');
var CommentCtrl =   require('./controllers/CommentCtrl');

app.controller('MainCtrl', ['$log', '$rootScope','$window','$mdMedia','$mdSidenav','LoginService', MainCtrl]);
app.controller('WelcomeCtrl', ['$log, $scope', WelcomeCtrl]);
app.controller('LoginCtrl', ['$log', '$scope','LoginService', LoginCtrl]);
app.controller('PlaceCtrl', ['$log', '$scope','$firebaseArray', PlaceCtrl]);
app.controller('CommentCtrl', ['$log', '$scope','$firebaseArray', CommentCtrl]);