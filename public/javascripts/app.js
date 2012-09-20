'use strict';

// Declare app level module which depends on filters, and services
angular.module('nonUser', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/partials/home',
      controller: IndexCtrl
    }).
    when('/login', {
      templateUrl: '/partials/login',
      controller: LoginCtrl
    }).
    when('/register', {
      templateUrl: '/partials/register',
      controller: RegisterCtrl
    }).
    otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);

angular.module('user', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/user', {
      templateUrl: '/partials/user/dashboard',
      controller: UserDashCtrl
    }).
    when('/user/dashboard', {
      templateUrl: '/partials/user/dashboard',
      controller: UserDashCtrl
    }).
    when('/user/profile', {
      templateUrl: '/partials/user/profile',
      controller: UserProfileCtrl
    }).
    otherwise({
      redirectTo: '/user'
    });
  $locationProvider.html5Mode(true);
}]);
