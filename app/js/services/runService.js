'user strict';
var runService = function($rootScope, $location, $mdToast,LoginService) {
    $rootScope.$on('$routeChangeStart', function (event,nueva) {
        /*if (!LoginService.currentUser() && (['/','/login', '/register', '/place', '/comment'].indexOf(nueva.$$route.originalPath) < 0)  ) {
            event.preventDefault();
            $mdToast.show(
            $mdToast.simple()
              .textContent('Acceso no permitido')
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
            $location.path('/login');
        }*/
       
    });
};
module.exports = runService;