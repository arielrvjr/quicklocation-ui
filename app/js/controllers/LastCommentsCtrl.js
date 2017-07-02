'use strict';
var moment = require('moment');

var lastComments= function($log,$scope,$rootScope ,$firebaseArray,$firebaseObject, $mdToast ) {
var reportsRef = firebase.database().ref("places").child("reports").child("top10lastReview");
$scope.user =$rootScope.currentUser();
	/*	$scope.top10lastReview.$save();*/
			$scope.buscando = false;


	$scope.buscar = function(){
		$scope.buscando = true;
		if (typeof $scope.desde === 'undefined'){
			$scope.desde = new Date();
		}
		if (typeof $scope.hasta === 'undefined'){
			$scope.hasta = new Date();
		}
		console.log(
			moment($scope.desde), 
			moment($scope.hasta),
			moment($scope.desde).diff(moment($scope.hasta)));
		if ((moment($scope.desde).diff(moment($scope.hasta)))>=0){
			$mdToast.show(
            $mdToast.simple()
              .textContent("Fecha desde debe ser inferior a Fecha hasta.")
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );  						
			$scope.buscando = false;

			return;
		}
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
  						$scope.buscando = false;

  			}
		});

	};
};
module.exports = /*@ngInject*/ lastComments;

