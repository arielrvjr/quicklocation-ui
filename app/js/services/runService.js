'user strict';

var runService=function($rootScope, $location, $mdToast,LoginService) {
	$rootScope.$on('$routeChangeStart', function (event,nueva) {
		if ($rootScope.ref.$resolved && $rootScope.ref.length==0){
			$location.path("/main");
		}
		else{
			if ('/' == nueva.$$route.originalPath){

				$location.path('/place');

			}
		}
	});
};

module.exports =/* @ngInject */  runService;
