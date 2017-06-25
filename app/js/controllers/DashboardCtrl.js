'use strict';

var dashboardCtrl= function($log,$scope,$firebaseArray) {
var reportsRef = firebase.database().ref('places').child('reports');
	$scope.top10lastReview = $firebaseArray(reportsRef.child('top10lastReview'));
	$scope.top10user = $firebaseArray(reportsRef.child('top10lastReview'));

};

module.exports = /*@ngInject*/ dashboardCtrl;

