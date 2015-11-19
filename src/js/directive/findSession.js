;
(function () {
    angular.module('directive.findSession', [])
        .directive('findSession', findSession)

    function findSession() {
        return {
            scope: {
                'sessionRoom': '=sessionRoom',
                'sessionTime': '=sessionTime',
                'session': '=session'
            },

            controller: ['$scope', function ($scope) {

                var searchScope = $scope;
                while (searchScope['sessions'] === undefined && searchScope != $scope.$root) {
                    searchScope = searchScope.$parent;
                }

                if (searchScope.sessions === undefined) {
                    return;
                }

                searchScope.$watch('sessionsIndex', function (sessions) {
                    if (!sessions) {
                        return;
                    }

                    $scope.session = null;

                    var slot = sessions[$scope.sessionTime];
                    if (!slot) {
                        return;
                    }

                    $scope.session = slot[$scope.sessionRoom];
                });
            }]
        }
    }
})()
