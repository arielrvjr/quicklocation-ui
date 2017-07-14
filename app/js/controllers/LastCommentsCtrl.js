'use strict';
var moment = require('moment');
var _ = require('lodash');
var lastComments= function($log,$scope,$rootScope ,$firebaseArray,$firebaseObject, $mdToast ) {
	var reportsRef = firebase.database().ref("places").child("reviews");
	$scope.user =$rootScope.currentUser();
	/*	$scope.top10lastReview.$save();*/
	$scope.buscando = false;
	var placesRef = firebase.database().ref('places').child('data');
	$scope.places = $firebaseArray(placesRef);

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
		/*if ((moment($scope.desde).diff(moment($scope.hasta)))>=0){
			$mdToast.show(
            $mdToast.simple()
              .textContent("Fecha desde debe ser inferior a Fecha hasta.")
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );  						
			$scope.buscando = false;

			return;
		}*/
		$scope.response = [];

		$scope.request = {desde: Number(moment($scope.desde).startOf('day').format("x")), hasta: Number(moment($scope.hasta).endOf('day').format("x"))};
		$scope.lastReviewParent = $firebaseArray(reportsRef);
		$scope.lastReviewParent.$loaded().then(function(places) {
			angular.forEach(places,function(place){
				angular.forEach(place, function(review){
					if (typeof review === 'object' && review !== null){
						if ((moment($scope.request.desde).diff(moment(review.date)))<0 
							&& (moment(review.date).diff(moment($scope.request.hasta)))<0 ){
							$scope.places.$loaded().then(function(x) {
								review.place = x.$getRecord(place.$id);
							});
						$scope.response.push(review);
					}
				}
				else {
					console.log('no es objeto:', review);
				}
				
			});
				
			});
			$scope.lastComments = _.sortBy($scope.response, [function(o) { return o.date; }]);
			
			$scope.buscando = false;  			
		});

	};
	$scope.buscar();
};
module.exports = /*@ngInject*/ lastComments;

