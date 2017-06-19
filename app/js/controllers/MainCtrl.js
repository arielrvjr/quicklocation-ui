'use strict';

var MainCtrl = function($log, $rootScope,$window,$mdMedia,$mdSidenav,LoginService) {
	    var originatorEv;

 	$rootScope.toggleLeft = buildToggler('left');

	function buildToggler(componentId) {
      return function() {
      	$log.debug("toggle:", componentId);
        $mdSidenav(componentId).toggle();
      };
    }
      var appWindow = angular.element($window);
      console.log(appWindow);
      appWindow[0].onresize = function(){
        console.log('resize');
        $rootScope.screenIsSmall = $mdMedia('xs'); 
        console.log('screenIsSmall:'+$rootScope.screenIsSmall); 
      };
      $rootScope.screenIsSmall = $mdMedia('xs');

    $rootScope.openMenu = function($mdMenu, ev){
      originatorEv = ev;
      $mdMenu.open(ev);
    };
    $rootScope.logout =function(){
      $log.debug('Cerrar Sesión');

      LoginService.logout();
    };
    $rootScope.settings = [
    {icon: 'place', url:'/#!/place', name: 'Lugares'},
    {icon: 'comment', url:'/#!/comment', name: 'Comentarios'},
    ];
};

module.exports = MainCtrl;