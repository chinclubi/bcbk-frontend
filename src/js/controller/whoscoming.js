/* global angular */

;
(function () {
    angular
        .module('controller.whoscoming', ['ui.select'])
        .config(['uiSelectConfig', function (uiSelectConfig) {
            uiSelectConfig.theme = 'bootstrap'
        }])
        .controller('WhoscomingController', WhoscomingController)

    WhoscomingController.$inject = ['$scope', '$http']
    function WhoscomingController($scope, $http) {
        var self = this
        self.people = []
        self.interests = []
        self.filter = {'selected': []}
        self.find = function (obj, filter) {
            if (filter.length === 0) {
                return obj
            }
            filter = filter.map(function (item) {
                return item.toLowerCase()
            })
            return obj.filter(function (x) {
                return x.interests.some(function (y) {
                    return filter.indexOf(y.toLowerCase()) !== -1
                })
            })
        }
        $http.get('http://api.barcampbangkhen.org/all').success(function (data) {
            self.interests = []
            data = data.data.map(function (person) {
                person.name = person.firstname + ' ' + person.lastname
                person.interests = person.interests.split(/[ ]*,[ ]*/)
                person.interests.forEach(function (interest) {
                    interest = interest.toLowerCase()
                    if (self.interests.indexOf(interest) === -1 && interest !== '') {
                        self.interests.push(interest)
                    }
                })
                return person
            })
            self.people = data
        })
    }
})()
