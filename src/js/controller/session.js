/* global angular */
/* global $ */
/* global google */

;
(function () {
    angular
        .module('controller.session', [])
        .controller('SessionController', SessionController)

    SessionController.$inject = ['$scope', '$window']
    function SessionController($scope, $window) {
    }
})()
