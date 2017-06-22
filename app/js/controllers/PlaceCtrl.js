
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
	    var placesRef = firebase.database().ref("places");
	    //$scope.places = $firebaseArray(placesRef);
		$scope.places =[
		];
		 for (var i = 0; i < 50; i++) {
		 	var obj = angular.copy($scope.place);
		 	obj.name = faker.name.findName();
		 	obj.email =faker.internet.email();
		 	obj.formattedPhoneNumber= faker.phone.phoneNumber();
		 	obj.rating = faker.random.number({max:5.0});
		 	obj.formattedAddress = faker.address.city() + " - " + faker.address.streetName();
 
  			$scope.places.push(obj);
		};
		console.log('places',$scope.places);

		$scope.goToPlace = function(id,ev){
			$location.path('/place/'+id);
		};
		if(new RegExp('\/place\/'+'\\d*').test($location.path())){
			var ref = firebase.database().ref("places").child($routeParams.id);
			$scope.place = $firebaseObject(ref);
		}
};

module.exports = PlaceCtrl;