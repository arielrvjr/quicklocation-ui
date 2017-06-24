
'use strict';
var faker = require('faker');

var PlaceCtrl = function($log, $scope,$location,$routeParams,$firebaseArray,$firebaseObject,$mdDialog,$mdToast) {
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
		};
		$scope.edit = function(event){
		  var confirm = $mdDialog.confirm()
          .title('Editar')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
		};
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
  				$scope.prepareItem = function(item, place){
  				$scope.edititem = angular.copy(item);
    			$scope.editid = angular.copy(place.$id);
		    	$scope.record = $scope.placeReviews.$getRecord(place.$id);
  				};
  				$scope.deleteComment = function(place,item,ev){
		var confirm = $mdDialog.confirm()
          .title('¿Deseas eliminar el comentario?')
          .textContent(item.comment)
          .targetEvent(ev)
          .ok('Eliminar')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
    	//vamos a eliminar
    	$scope.prepareItem(item,place);
    	delete $scope.record[$scope.editid];
    	$scope.placeReviews.$save($scope.record);
    	$mdToast.show(
            $mdToast.simple()
              .textContent("Comentario Eliminado")
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
    }, function() {
    });
};
  				$scope.editComment = function(place,item,event){
		  var confirm = $mdDialog.prompt()
          .title('Editar Comentario')
          .placeholder('Comentario')
          .ariaLabel('Comentario')
          .initialValue(item.comment)
          .targetEvent(event)
          .cancel('Cancelar')
          .ok('Guardar');

    $mdDialog.show(confirm).then(function(result) {
    	item.comment = result;
    	console.log('actualizar:', item);
    	$scope.prepareItem(item,place);
    	$scope.record[$scope.editid]= $scope.edititem;
    	$scope.placeReviews.$save($scope.record);
    	$mdToast.show(
            $mdToast.simple()
              .textContent("Comentario Actualizado")
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
    }, function() {
    });
		};
			
		}
};

module.exports = PlaceCtrl;