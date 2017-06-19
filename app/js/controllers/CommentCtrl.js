
'use strict';

var CommentCtrl = function($log, $scope,$firebaseArray) {
	$scope.testVar = 'CommentCtrl';

	var commentsRef = firebase.database().ref("comments");
	$scope.comments = $firebaseArray(commentsRef);
	console.log('comments',$scope.comments);
};

module.exports = CommentCtrl;