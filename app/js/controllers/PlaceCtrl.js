
'use strict';

var PlaceCtrl = function($log, $scope,$firebaseArray) {
		$scope.place = {
		formattedAddress:'',
		formattedPhoneNumber:'',
	    openingHours:{
	    	weekdayText: [],
	    	openNow: false,
	    },
		url:'',
		website:'',
		photos:[],
		reviews:[],
		}
	    var placesRef = firebase.database().ref("places");
	    $scope.places = $firebaseArray(placesRef);
		console.log('places',$scope.places);
};

module.exports = PlaceCtrl;