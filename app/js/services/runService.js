'user strict';

var runService=function($rootScope, $location, $mdToast,LoginService) {
    $rootScope.$on('$routeChangeStart', function (event,nueva) {
		if ('/' == nueva.$$route.originalPath){
        	$location.path('/place');
      	}
       
    });
};

module.exports =/* @ngInject */  runService;
