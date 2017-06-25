'use strict';

var mainCtrl = function($log,$location, $rootScope,$window,$mdMedia,$mdSidenav,LoginService) {
 
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
        console.log('current:', $rootScope.currentUser());

    $rootScope.openMenu = function($mdMenu, ev){
      originatorEv = ev;
      $mdMenu.open(ev);
    };
     $rootScope.navigateTo = function(url){
    $location.path(url);
    $mdSidenav('left').close();
  };
    $rootScope.logout =function(){
      $log.debug('Cerrar Sesión');

      LoginService.logout();
    };
    $rootScope.settings = [
/*    {icon: 'dashboard', url:'/', name: 'Dashboard'},
*/    {icon: 'place', url:'/place', name: 'Lugares'},
    {icon: 'comment', url:'/comment', name: 'Comentarios'},

    ];
       $rootScope.reportes = [
    { url:'/reports/lastcomments', name: 'Últimos comentarios'},
    { url:'/reports/topusers', name: 'Usuarios más activos'},

    ];
};

module.exports = mainCtrl;

