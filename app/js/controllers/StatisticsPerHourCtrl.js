'use strict';
var moment = require('moment');
var StatisticsPerHourCtrl= function($log,$scope,$rootScope, $mdToast  ,$firebaseArray) {
	var reportsRef = firebase.database().ref("places").child("statistics");
	$scope.user =$rootScope.currentUser();
			$scope.buscando = false;

	$scope.statisticsPerHour = {
		series: [],
		title: {
			text: 'Consultas a lugares por Hora'
		},
		yAxis: [{ 
    title: {
        text: 'Número de consultas'
    }
},],
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<b>{point.y}</b> consultas<br/>'
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
		$scope.request = {desde: Number(moment($scope.desde).startOf('day').format('x')), hasta: Number(moment($scope.desde).endOf('day').format('x'))};
//
		$scope.estadisticas = $firebaseArray(
			reportsRef.orderByChild('date')
			.startAt($scope.request.desde)
			.endAt($scope.request.hasta)
			);
		$scope.response = {};
		$scope.estadisticas.$loaded().then(function(x) {
			$log.debug('estadisticas obtenidas:', x);
				angular.forEach(x,function(r){
					var category = r.category;
            		if (typeof $scope.response[category] === 'undefined' ){
                		$scope.response[category] = { name: category.toUpperCase(), 
                    	data:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0} };
            		}
            		var hora = moment(r.date).format('H');
            				$log.debug($scope.request.desde,r.date, $scope.request.hasta);

            		$scope.response[category].data[hora]++ ;
					
				});

				angular.forEach($scope.response,function(d){
					var horas = [];
					angular.forEach(d.data, function(hora){
						horas.push(hora);
					});
					$scope.statisticsPerHour.series.push({name:d.name, data:horas});

				});

			
			$scope.buscando = false;

		});

	};
};


module.exports = /*@ngInject*/ StatisticsPerHourCtrl;

