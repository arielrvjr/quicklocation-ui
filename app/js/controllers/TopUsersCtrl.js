'use strict';
var moment = require('moment');
var TopUsersCtrl= function($log,$scope,$rootScope, $mdToast  ,$firebaseArray) {
	var reportsRef = firebase.database().ref("places").child("reports").child("top10User");
	$scope.user =$rootScope.currentUser();
	/*	$scope.top10lastReview.$save();*/


	$scope.mostActiveUsers = {
		options: {
			chart: {
				type: 'pie'
			}
		},
		series: [{
			data: [],
			name: 'Actividad',
			type: 'pie'
		}],
		xAxis:{categories:[]},
		title: {
			text: 'Usuarios más activos'
		},
		 tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
		plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%'

                    },
                    showInLegend: true
                }
            },
		loading: true
	};

  						$scope.buscando = false;

	$scope.buscar = function(){
		  						$scope.buscando = true;

				if (typeof $scope.desde === 'undefined'){
			$scope.desde = new Date();
		}
		if (typeof $scope.hasta === 'undefined'){
			$scope.hasta = new Date();
		}
		console.log(
			moment($scope.desde), 
			moment($scope.hasta),
			moment($scope.desde).diff(moment($scope.hasta)));
		if ((moment($scope.desde).diff(moment($scope.hasta)))>=0){
			$mdToast.show(
            $mdToast.simple()
              .textContent("Fecha desde debe ser inferior a Fecha hasta.")
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
			  						$scope.buscando = false;

			return;
		}
		$scope.mostActiveUsers.series[0].data =[];
		//uid
		//$scope.info = $firebaseObject($scope.reportsRef.child($scope.user.uid));
		$scope.info={};

		$scope.info.request = {desde: moment($scope.desde).format('YYYY-MM-DD'), hasta: moment($scope.hasta).format('YYYY-MM-DD'), flag: true};
		reportsRef.child($scope.user.uid).set($scope.info);
		$scope.topusers = $firebaseArray(reportsRef.child($scope.user.uid));
		
		$scope.topusers.$watch(function(event) {
			if (event.event == "child_added" && event.key== "response"){
				$scope.topuser = $scope.topusers.$getRecord("response");
				angular.forEach($scope.topuser, function(r){
					$scope.mostActiveUsers.series[0].data.push({y:Number(r.count), name: r.name});
				});
				  						$scope.buscando = false;

			}
		});

	};
};


module.exports = /*@ngInject*/ TopUsersCtrl;

