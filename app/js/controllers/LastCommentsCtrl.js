'use strict';
var moment = require('moment');

var lastComments= function($log,$scope,$rootScope ,$firebaseArray,$firebaseObject ) {
var reportsRef = firebase.database().ref("places").child("reports").child("top10lastReview");
$scope.user =$rootScope.currentUser();
	/*	$scope.top10lastReview.$save();*/
	$scope.buscar = function(){
		//uid
		//$scope.info = $firebaseObject($scope.reportsRef.child($scope.user.uid));
		$scope.info={};
		$scope.info.request = {desde: moment($scope.desde).format('YYYY-MM-DD'), hasta: moment($scope.hasta).format('YYYY-MM-DD'), flag:true};
		console.log($scope.user.uid,$scope.info);
		reportsRef.child($scope.user.uid).set($scope.info);
		$scope.top10lastReviewParent = $firebaseArray(reportsRef.child($scope.user.uid));
		$scope.top10lastReviewParent.$watch(function(event) {
			console.log(event);
  			if (event.event == "child_added" && event.key== "response"){
  				console.log("Response");
  				$scope.lastComments = $scope.top10lastReviewParent.$getRecord("response");
  				console.log($scope.topuser);
  			}
		});

		console.log($scope.lastComments);
	};
};
module.exports = /*@ngInject*/ lastComments;

