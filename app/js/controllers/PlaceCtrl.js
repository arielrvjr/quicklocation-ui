
'use strict';
var faker = require('faker');

var PlaceCtrl = function($log, $scope,$location,$routeParams,$firebaseArray,$firebaseObject) {
	    var placesRef = firebase.database().ref('places').child('data');
	    $scope.places = $firebaseArray(placesRef);


		$scope.goToPlace = function(id,ev){
			$location.path('/place/'+id);
		};
		$scope.save = function(){
			angular.forEach($scope.placeUpdates,function(issue){
				if (issue.done == true){
					
				}
			});
		}
		if(new RegExp('\/place\/'+'\\d*').test($location.path())){
			var id = $routeParams.id;
			var issues = firebase.database().ref('places').child('report-issue').child(id);
			var reviews = firebase.database().ref('places').child('reviews').child(id);
			$scope.placeUpdates = $firebaseArray(issues);
			$scope.placeReviews = $firebaseArray(reviews);
			$scope.places.$loaded()
  				.then(function(x) {
    				$scope.place = x.$getRecord(id);
			});
  
			
		}
};

module.exports = PlaceCtrl;