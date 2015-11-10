/* global angular */
/* global $ */
/* global google */

;(function () {
  angular
    .module('controller.about', [])
    .controller('AboutController', AboutController)

  AboutController.$inject = ['$scope', '$window']
  function AboutController ($scope, $window) {
  }
})()
