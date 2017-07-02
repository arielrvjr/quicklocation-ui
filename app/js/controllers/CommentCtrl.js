
'use strict';

var commentCtrl = function($log, $scope,$mdDialog,$firebaseArray,$mdToast) {
	$scope.testVar = 'CommentCtrl';

  $scope.setOrderProperty = function(propertyName) {
    if ($scope.orderProperty === propertyName) {
        $scope.orderProperty = '-' + propertyName;
    } else if ($scope.orderProperty === '-' + propertyName) {
        $scope.orderProperty = propertyName;
    } else {
        $scope.orderProperty = propertyName;
    }
};
	var commentsRef = firebase.database().ref("places").child("reviews");
	var placesRef = firebase.database().ref('places').child('data');
	$scope.places = $firebaseArray(placesRef);
	$scope.placesComment = $firebaseArray(commentsRef);
	$scope.setOrderProperty('date.time');
  $scope.loadcomment = function(){
		$scope.comments = [];
		$scope.placesComment.$loaded().then(function(){
/*		console.log($scope.placesComment);
*/		angular.forEach($scope.placesComment,function(place){
		angular.forEach(place,function(comment,id){ 
			if (typeof comment === 'object' && comment != null){
        var comentario = angular.copy(comment);
				$scope.places.$loaded().then(function(x) {
    				comentario.place = x.$getRecord(place.$id);
				});
				comentario.$id = id;
				this.push(comentario);
			}
			
		},$scope.comments);
		});
		//console.log('comments',$scope.comments);
	});
	};
	$scope.loadcomment();
  

  $scope.prepareItem = function(item){
  		$scope.edititem = angular.copy(item);
    	$scope.editplace  = angular.copy($scope.edititem.place);
    	$scope.editid = angular.copy($scope.edititem.$id);
    	delete $scope.edititem.place;
    	delete $scope.edititem.$id;
    	$scope.record = $scope.placesComment.$getRecord($scope.editplace.$id);
  				};

	$scope.deleteComment = function(item,ev){
		var confirm = $mdDialog.confirm()
          .title('¿Deseas eliminar el comentario?')
          .textContent(item.comment)
          .targetEvent(ev)
          .ok('Eliminar')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
    	//vamos a eliminar
      item.remove=true;
    	$scope.prepareItem(item);
      $scope.placesComment.$save($scope.record);
    	delete $scope.record[$scope.editid];
      console.log('guardamos:', $scope.record);
    	$scope.placesComment.$save($scope.record);
    	$mdToast.show(
            $mdToast.simple()
              .textContent("Comentario Eliminado")
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
    	$scope.loadcomment();
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
    	$scope.prepareItem(item);
    	$scope.record[$scope.editid]= $scope.edititem;
      
    	$scope.placesComment.$save($scope.record);
    	$mdToast.show(
            $mdToast.simple()
              .textContent("Comentario Actualizado")
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
    	$scope.loadcomment();
    }, function() {
    });
		};
	
};

module.exports = /*@ngInject*/ commentCtrl;

