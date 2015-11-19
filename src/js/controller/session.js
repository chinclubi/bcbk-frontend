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

        $scope.sessions = [];
        $scope.rooms = ['17201', '17302', '17303', '17304', '17401', '17402'];
        $scope.favorites = JSON.parse(localStorage.favorite || '{}');
        $scope.timeslots = [
            '10:40 - 11:10',
            '11:10 - 11:40',
            '11:40 - 12:10',
            '13:00 - 13:30',
            '13:30 - 14:00',
            '14:00 - 14:30',
            '14:30 - 15:00',
            '15:20 - 15:50',
            '15:50 - 16:20',
            '16:20 - 16:50'
        ];
    }
})()