/* global angular */
/* global $ */
/* global google */

;
(function () {
    angular
        .module('controller.session', [])
        .controller('SessionController', SessionController)

    var endpoint = 'sessions.json';

    var index = function (data) {
        var out = {};
        angular.forEach(data, function (val) {
            if (!out[val.slot]) {
                out[val.slot] = {};
            }
            out[val.slot][val.room] = val;
        });
        return out;
    };

    SessionController.$inject = ['$scope', '$http']
    function SessionController($scope, $http) {

        $scope.sessions = [];
        $scope.rooms = ['17201', '17302', '17303', '17304', '17401', '17402'];
        $scope.favorites = JSON.parse(localStorage.favorite || '{}');
        $scope.timeslots = [
            '10:40 - 11:05',
            '11:10 - 11:35',
            '11:40 - 12:05',
            '13:00 - 13:25',
            '13:30 - 13:55',
            '14:00 - 14:25',
            '14:30 - 14:55',
            '15:20 - 15:45',
            '15:50 - 16:15',
            '16:20 - 16:45'
        ];

        var save = function () {
            localStorage.favorite = JSON.stringify($scope.favorites);
        };

        var refreshFav = function () {
            angular.forEach($scope.favorites, function (val, key) {
                if (val.length > 0) {
                    var id = val[0].id;
                    var session = $scope.sessions.filter(function (x) {
                        return x.id === id;
                    });
                    if (session.length === 0) {
                        $scope.favorites[key] = undefined;
                        return;
                    }
                    if (session[0].slot != val[0].slot) {
                        $scope.favorites[session[0].slot] = [session[0]];
                        $scope.favorites[key] = undefined;
                    } else {
                        val[0] = session[0];
                    }
                }
            });
            save();
        };

        $scope.fav = function (session) {
            if ($scope.isFav(session)) {
                $scope.favorites[session.slot] = undefined;
                return;
            }
            $scope.favorites[session.slot] = [session];
            save();
        };

        $scope.isFav = function (session) {
            return $scope.favorites[session.slot] && $scope.favorites[session.slot][0].id == session.id;
        };

        var refresh = function () {
            $http.get(endpoint).success(function (data) {
                $scope.sessions = data;
                $scope.sessionsIndex = index(data);
                refreshFav();
            });
        };

        refresh();
    }
})()