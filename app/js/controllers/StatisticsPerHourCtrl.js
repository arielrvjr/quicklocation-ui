'use strict';
var moment = require('moment');
var StatisticsPerHourCtrl= function($log,$scope,$rootScope, $mdToast  ,$firebaseArray) {
	var reportsRef = firebase.database().ref("places").child("reports").child("statisticsPerHour");
	$scope.user =$rootScope.currentUser();
			$scope.buscando = false;

	$scope.statisticsPerHour = {
		series: [],
		xAxis:{categories:[]},
		title: {
			text: 'Actividad de categorias por Hora'
		},
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
		},
		 plotOptions: {
        series: {
            pointStart: 0
        }
    },
		loading: true
	};


	$scope.buscar = function(){
			$scope.buscando = true;

		if (typeof $scope.desde === 'undefined'){
			$scope.desde = new Date();
		}
		


		$scope.statisticsPerHour.series =[];
		$scope.info={};

		$scope.info.request = {desde: moment($scope.desde).startOf('day').format('x'), hasta: moment($scope.desde).startOf('day').add(1, 'day').format('x'), flag: true};
		reportsRef.child($scope.user.uid).set($scope.info);
		$scope.stadisticas = $firebaseArray(reportsRef.child($scope.user.uid));
		
		$scope.stadisticas.$watch(function(event) {
			if (event.event == "child_added" && event.key== "response"){
				var respuesta = $scope.stadisticas.$getRecord("response");
				console.log(event);
				angular.forEach(respuesta, function(r){
					console.log('r:',r);
					if (typeof r === 'object'){

						$scope.statisticsPerHour.series.push({name:r.name, data:r.data});
					}
				});

			}
			$scope.buscando = false;

		});

	};
};


module.exports = /*@ngInject*/ StatisticsPerHourCtrl;

