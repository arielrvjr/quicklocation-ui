'use strict';
var moment = require('moment');
var TopUsersCtrl= function($log,$scope,$rootScope ,$firebaseArray) {
var reportsRef = firebase.database().ref("places").child("reports").child("top10User");
	$scope.user =$rootScope.currentUser();
	/*	$scope.top10lastReview.$save();*/

	$scope.buscar = function(){
		//uid
		//$scope.info = $firebaseObject($scope.reportsRef.child($scope.user.uid));
		$scope.info={};
		
		$scope.info.request = {desde: moment($scope.desde).format('YYYY-MM-DD'), hasta: moment($scope.hasta).format('YYYY-MM-DD'), flag: true};
		reportsRef.child($scope.user.uid).set($scope.info);
		$scope.topusers = $firebaseArray(reportsRef.child($scope.user.uid));
		$scope.topusers.$watch(function(event) {
  			if (event.event == "child_added" && event.key== "response"){
  				$scope.topuser = $scope.topusers.$getRecord("response");
  			}
		});

	};
};


module.exports = /*@ngInject*/ TopUsersCtrl;

