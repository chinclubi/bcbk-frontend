/* global angular */

;
(function () {
    angular
        .module('services.route', ['ui.router'])
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider']

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/home')
        $urlRouterProvider.otherwise('/home')
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
                controllerAs: 'WhoscomingCtrl'
            })
            .state('edituser', {
                url: '/editprofile?email&c',
                templateUrl: 'templates/edituser.html',
                controller: 'EditUserController',
                controllerAs: 'editCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html',
                controller: 'AboutController',
                controllerAs: 'AboutCtrl'
            })
    }
})()
