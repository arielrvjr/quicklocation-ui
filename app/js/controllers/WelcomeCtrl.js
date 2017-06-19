'use strict';

var WelcomeCtrl = function($log,$scope) {
  $scope.testVar = 'We are up and running from a required module!';
};

module.exports = WelcomeCtrl;