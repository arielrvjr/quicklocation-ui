
'use strict';

var CommentCtrl = function($log, $scope,$firebaseArray) {
	$scope.testVar = 'CommentCtrl';

	var commentsRef = firebase.database().ref("places").child("reviews");
	$scope.comments = [];
	$scope.places = $firebaseArray(commentsRef);
	console.log($scope.places);
	$scope.places.$loaded().then(function(){
		angular.forEach($scope.places,function(place){
		angular.forEach(place,function(comment){ if (typeof comment === 'object' && comment != null)this.push(comment);},$scope.comments);
		});
		console.log('comments',$scope.comments);
	});
	
};

module.exports = CommentCtrl;