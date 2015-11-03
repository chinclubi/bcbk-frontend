/* global angular */

;(function () {
  angular
    .module('controller.register', [])
    .controller('RegisterController', RegisterController)

  RegisterController.$inject = ['$scope']
  function RegisterController ($scope) {
    var self = this;
    console.log("HER");
  }

})()
