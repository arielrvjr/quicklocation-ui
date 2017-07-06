
'use strict';

var placeCtrl = function($log, $scope,$location,$routeParams,$firebaseArray,$firebaseObject,$mdDialog,$mdToast) {
	var placesRef = firebase.database().ref('places').child('data');
	$scope.places = $firebaseArray(placesRef);

	$scope.orderProperty = '-updatesCount';
	$scope.isSaving = false;

	$scope.goToPlace = function(id,ev){
		$location.path('/place/'+id);
	};
	$scope.setOrderProperty = function(propertyName) {
		if ($scope.orderProperty === propertyName) {
			$scope.orderProperty = '-' + propertyName;
		} else if ($scope.orderProperty === '-' + propertyName) {
			$scope.orderProperty = propertyName;
		} else {
			$scope.orderProperty = propertyName;
		}
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
	if(/\/place\/\w+/.test($location.path())){
		var id = $routeParams.id;
		
		$scope.places.$loaded()
		.then(function(x) {
			$scope.place = x.$getRecord(id);
			$scope.loadPlaceComment(id);
			$scope.loadUpdates(id);

		});

		$scope.guardarCambios = function(){
			$scope.isSaving = true;
			$scope.place.updateAcept = $scope.place.updateAcept || 0;

			angular.forEach($scope.placeUpdates,function(item){
				if (typeof item === 'object' && item.done == true){
					if ('location' == item.field){
						$scope.place['geometry']= angular.copy(item.value);
					}
					else {
						$scope.place[item.field] = angular.copy(item.value);

					}
					$scope.place.updateAcept += 1;
					$scope.placeUpdates.$save(item);
				}
			});
			/*console.log('Guardaremos: ', $scope.place);
			console.log('En: ',$scope.places);*/
			$scope.places.$save($scope.place).then(function(ref) {
				if (ref.key === $scope.place.$id){
					$scope.isSaving = false;
					$mdToast.show(
						$mdToast.simple()
						.textContent("Cambios guardados")
						.toastClass('md-warn')
						.position('bottom right')
						.hideDelay(3000)
						);
				}
				else {
					$scope.isSaving = false;
					$mdToast.show(
						$mdToast.simple()
						.textContent("Error al guardar")
						.toastClass('md-warn')
						.position('bottom right')
						.hideDelay(3000)
						);
				}
			});
			
		};
		$scope.deleteUpdate = function(item,ev){
			var confirm = $mdDialog.confirm()
			.title('¿Deseas eliminar la actualización?')
			.textContent(item.field_human + ':' + item.value)
			.targetEvent(ev)
			.ok('Eliminar')
			.cancel('Cancelar');

			$mdDialog.show(confirm).then(function() {
    	//vamos a eliminar
    	item.remove = true;
    	$scope.placeUpdates.$save(item).then(function(ref) {
    		if (ref.key === item.$id){
    			$mdToast.show(
    				$mdToast.simple()
    				.textContent("Actualización Eliminada")
    				.toastClass('md-warn')
    				.position('bottom right')
    				.hideDelay(3000)
    				);
    		} 
    		else {
    			$mdToast.show(
    				$mdToast.simple()
    				.textContent("Error al eliminar")
    				.toastClass('md-warn')
    				.position('bottom right')
    				.hideDelay(3000)
    				);
    		}
    	});
    	
    	$scope.loadUpdates($scope.place.$id);

    }, function() {
    	$mdToast.show($mdToast.simple()
    		.textContent("Error al intentar eliminar")
    		.toastClass('md-warn')
    		.position('bottom right')
    		.hideDelay(3000));
    });              	

		};
		$scope.loadPlaceComment =function(id){
			var reviews = firebase.database().ref('places').child('reviews').child(id);
			$scope.placeReviews = $firebaseArray(reviews);
		};
		$scope.loadUpdates =function(id){
			var issues = firebase.database().ref('places').child('report-issue').child(id);
			$scope.placeUpdates = $firebaseArray(issues);
		};

		$scope.prepareItem = function(item, place){
			$scope.edititem = angular.copy(item);
			$scope.editid = angular.copy(item.$id);
			$scope.record = $scope.placeReviews.$getRecord(place.$id);
		};
		$scope.deleteComment = function(item,ev){
			var confirm = $mdDialog.confirm()
			.title('¿Deseas eliminar el comentario?')
			.textContent(item.comment)
			.targetEvent(ev)
			.ok('Eliminar')
			.cancel('Cancelar');

			$mdDialog.show(confirm).then(function() {
				$scope.placeReviews.$remove(item);
				$mdToast.show(
					$mdToast.simple()
					.textContent("Comentario Eliminado")
					.toastClass('md-warn')
					.position('bottom right')
					.hideDelay(3000)
					);
				$scope.loadPlaceComment($scope.place.$id);

			}, function() {
			});              	

		};
		$scope.editComment = function(item,event){
			var confirm = $mdDialog.prompt()
			.title('Editar Comentario realizado por ' + item.authorName)
			.placeholder('Comentario')
			.ariaLabel('Comentario')
			.initialValue(item.comment)
			.targetEvent(event)
			.cancel('Cancelar')
			.ok('Guardar');

			$mdDialog.show(confirm).then(function(result) {
				item.comment = result;
				item.done=true;
/*				console.log('actualizar:', item);
*/				$scope.placeReviews.$save(item);
$mdToast.show(
	$mdToast.simple()
	.textContent("Comentario Actualizado")
	.toastClass('md-warn')
	.position('bottom right')
	.hideDelay(3000)
	);
$scope.loadPlaceComment($scope.place.$id);
}, function() {
});              	
			

		};

	}
};

module.exports = /*@ngInject*/ placeCtrl;
