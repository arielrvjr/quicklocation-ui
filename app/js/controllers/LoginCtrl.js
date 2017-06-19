
'use strict';

var LoginCtrl = function($log, $scope,LoginService) {
	  $scope.testVar = 'LoginCtrl';

	  $scope.loginFacebook = function(){
	  	$log.debug('Iniciar Sesion Facebook');
	  	LoginService.loginFacebook();
	  };
	  $scope.loginGoogle = function(){
	  	$log.debug('Iniciar Sesion Google');
	  	LoginService.loginGoogle();
	  };

	  

};

module.exports = LoginCtrl;