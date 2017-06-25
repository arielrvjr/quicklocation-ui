'use strict';

var TopUsersCtrl= function($log,$scope,$firebaseArray) {
var reportsRef = firebase.database().ref('places').child('reports');
	$scope.topuser = $firebaseArray(reportsRef.child('top10lastReview'));

};

module.exports = /*@ngInject*/ TopUsersCtrl;

