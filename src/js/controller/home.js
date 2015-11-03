/* global angular */

;(function () {
  angular
    .module('controller.homepage', [])
    .controller('HomePageController', HomePageController)

  HomePageController.$inject = ['$scope']
  function HomePageController ($scope) {
    var self = this
  }
})()
