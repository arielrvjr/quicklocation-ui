
'use strict';
var faker = require('faker');

var PlaceCtrl = function($log, $scope,$location,$routeParams,$firebaseArray,$firebaseObject) {
		$scope.place = {
			name:'',
			rating:'',
		formattedAddress:'',
		formattedPhoneNumber:'',
	    openingHours:{
	    	weekdayText: [],
	    	openNow: false,
	    },
		url:'',
		email:'',
		website:'',
		};
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
/*			console.log('es show place');
*/			var id = $routeParams.id;
			var issues = firebase.database().ref('places').child('report-issue').child(id);
			var reviews = firebase.database().ref('places').child('reviews').child(id);
/*			console.log('despues de refs');
*/			
			$scope.placeUpdates = $firebaseArray(issues);
			$scope.placeReviews = $firebaseArray(reviews);
			/*console.log('placeUpdates:',$scope.placeUpdates);
			console.log('placeReviews:',$scope.placeReviews);
			console.log('places:',$scope.places,id);*/
			$scope.place = $scope.places.$loaded()
  				.then(function(x) {
    				$scope.place = x.$getRecord(id);
/*    							console.log('place:', $scope.place);
*/
  				});
  
			
		}
};

module.exports = PlaceCtrl;