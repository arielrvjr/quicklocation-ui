
'use strict';

var CommentCtrl = function($log, $scope,$firebaseArray) {
	$scope.testVar = 'CommentCtrl';

	var commentsRef = firebase.database().ref("places").child("reviews");
	var placesRef = firebase.database().ref('places').child('data');
	$scope.places = $firebaseArray(placesRef);
	$scope.comments = [];
	$scope.placesComment = $firebaseArray(commentsRef);
	console.log($scope.placesComment);
	$scope.placesComment.$loaded().then(function(){
		angular.forEach($scope.placesComment,function(place){
		angular.forEach(place,function(comment){ 
			if (typeof comment === 'object' && comment != null){
				$scope.places.$loaded().then(function(x) {
    				comment.place = x.$getRecord(place.$id);
				});
				this.push(comment);
			}
			
		},$scope.comments);
		});
		console.log('comments',$scope.comments);
	});
	
};

module.exports = CommentCtrl;