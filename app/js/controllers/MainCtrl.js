'use strict';

var MainCtrl = function($log,$location, $rootScope,$window,$mdMedia,$mdSidenav,LoginService) {
	    var originatorEv;

 	$rootScope.toggleLeft = buildToggler('left');

	function buildToggler(componentId) {
      return function() {
      	$log.debug("toggle:", componentId);
        $mdSidenav(componentId).toggle();
      };
    }
      $rootScope.screenIsLarge = $mdMedia('gt-md');
      $window.onresize= function(ev){
        $log.debug('resize',ev);
        $rootScope.screenIsLarge = $mdMedia('gt-md'); 
        $log.debug('screenIsLarge:'+$rootScope.screenIsLarge); 
      };
      $rootScope.currentUser = function(){
        return LoginService.currentUser();
      };
    $rootScope.openMenu = function($mdMenu, ev){
      originatorEv = ev;
      $mdMenu.open(ev);
    };
     $rootScope.navigateTo = function(url){
    $location.path(url);
  };
    $rootScope.logout =function(){
      $log.debug('Cerrar Sesión');

      LoginService.logout();
    };
    $rootScope.settings = [
    {icon: 'dashboard', url:'/', name: 'Dashboard'},
    {icon: 'place', url:'/place', name: 'Lugares'},
    {icon: 'comment', url:'/comment', name: 'Comentarios'},

    ];
};

module.exports = MainCtrl;