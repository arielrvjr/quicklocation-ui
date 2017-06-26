'use strict';

var lastComments= function($log,$scope,$rootScope ,$firebaseArray,$firebaseObject ) {
var reportsRef = firebase.database().ref("places").child("reports").child("top10lastReview");
$scope.user =$rootScope.currentUser();
	/*	$scope.top10lastReview.$save();*/
	$scope.buscar = function(){
		//uid
		//$scope.info = $firebaseObject($scope.reportsRef.child($scope.user.uid));
		$scope.info={};
		$scope.info.request = {desde: $scope.desde, hasta: $scope.hasta};
		console.log($scope.user.uid,$scope.info);
		reportsRef.child($scope.user.uid).update($scope.info).then(function(d){console.log(d);}).catch(function(e){console.log(e);});
		$scope.top10lastReviewParent = $firebaseArray($scope.reportsRef.child($scope.user.uid));

	};
};
module.exports = /*@ngInject*/ lastComments;

