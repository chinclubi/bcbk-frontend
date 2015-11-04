/* global angular */
;(function () {
  angular
    .module('services.route', ['ui.router'])
    .config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider']

  function config ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/home')
    $urlRouterProvider.otherwise('/404')
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.tmpl',
        controller: 'HomePageController',
        controllerAs: 'homepageCtrl'
      })
      // .state('register', {
      //   url: '/register',
      //   templateUrl: 'templates/register.html',
      //   controller: 'RegisterController',
      //   controllerAs: 'RegisterCtrl',
      // })
      .state('whoscoming', {
        url: '/whoscoming',
        templateUrl: 'templates/whoscoming.html',
        controller: 'WhoscomingController',
        controllerAs: 'WhoscomingCtrl',
      })
      .state('edituser', {
        url: '/edituser',
        templateUrl: 'templates/edituser.html',
        controller: 'EditUserController',
        controllerAs: 'EditUserCtrl',
      })
  }
})()
