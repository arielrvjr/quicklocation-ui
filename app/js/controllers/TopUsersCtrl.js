'use strict';
var moment = require('moment');
var _ = require('lodash');

var TopUsersCtrl= function($log,$scope,$rootScope, $mdToast  ,$firebaseArray) {
	var reviewsRef = firebase.database().ref("places").child("reviews");
	var updatesRef = firebase.database().ref("places").child("report-issue");
	$scope.user =$rootScope.currentUser();

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
			headerFormat: '',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>:<b>{point.y:.2f}%</b> del total<br/>'
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

		$scope.mostActiveUsers.series[0].data =[];
		//uid
		$scope.response = {};
		var total = 0;
		$scope.request = {desde: Number(moment($scope.desde).startOf('day').format("x")), hasta: Number(moment($scope.hasta).endOf('day').format("x"))};
		$scope.reviews = $firebaseArray(reviewsRef);
		$scope.updates = $firebaseArray(updatesRef);

		$scope.reviews.$loaded().then(function(places) {

			$scope.updates.$loaded().then(function(updates){
/*				console.log(places,updates);
*/				angular.forEach(updates,function(update){
					angular.forEach(update,function(u){
						if (typeof u === 'object' && u !== null){
/*						console.log("update:",u);
*/
						if ((moment($scope.request.desde).diff(moment(u.date)))<0 
							&& (moment(u.date).diff(moment($scope.request.hasta)))<0 ){

							if ( typeof $scope.response[u.author] == 'undefined'){
								$scope.response[u.author] = {name:u.author, count:0}
							}
							$scope.response[u.author].count++ ;
							total++;
						}
					}
					});
					
				});
				angular.forEach(places, function(p){
					angular.forEach(p,function(r){
						if (typeof r === 'object' && r !== null){
/*						console.log("review:",r);
*/
						if ((moment($scope.request.desde).diff(moment(r.date)))<0 
							&& (moment(r.date).diff(moment($scope.request.hasta)))<0 ){
							if ( typeof $scope.response[r.authorName] == 'undefined'){
								$scope.response[r.authorName] = {name:r.authorName, count:0}
							}
							$scope.response[r.authorName].count++ ;
							total++;
						}
					}
					});
				});

				var salida = {otros: {name:'otros',count:0, porcent:0}};
/*				console.log('Recorremos $scope.response:',$scope.response);
*/				_.map($scope.response,function(d){
					//console.log('Response Map:',d);
					if (typeof d === 'object' && d !== null){
						d.porcent = d.count / total * 100;
					if (d.porcent < 5){
/*						console.log('Es menor a 5%', d);
*/						salida.otros.count += d.count;
						salida.otros.porcent += d.porcent;
					}
					else {
/*						console.log('Es mayor a 5%',d);
*/						salida[d.name] = d;
					}
					}
					
				});
				angular.forEach(salida,function(s){
					$scope.mostActiveUsers.series[0].data.push({y:Number(s.porcent), name: s.name.toUpperCase()});
				});
			});


			
			$scope.buscando = false;

		});

	};
	$scope.buscar();
};


module.exports = /*@ngInject*/ TopUsersCtrl;

