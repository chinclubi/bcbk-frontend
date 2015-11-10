/* global angular */
/* global $ */

;(function () {
  angular
    .module('controller.register', ['ui.select'])
    .config(['uiSelectConfig', function (uiSelectConfig) {
      uiSelectConfig.theme = 'bootstrap'
    }])
    .controller('RegisterController', RegisterController)

  RegisterController.$inject = ['$scope', '$http']
  function RegisterController ($scope, $http) {
    var self = this
    self.interest = {'selected': []}
    self.tmps = ['Java', 'DotA2', 'JavaScript', 'PHP', 'Phyton', 'AngularJS', 'NodeJS', 'C++', 'HTML', 'CSS', 'SASS', 'SCSS', 'ruby']
    self.regisSubmit = submit
    self.gender = {
      type: 'select',
      data: 'Male',
      availableGender: ['Male', 'Female']
    }
    self.foodRequirement = {
      type: 'select',
      data: 'None',
      available: ['None', 'Islam (อิสลาม)', 'Vegeterian (มังสวิรัติ)']
    }
    var form = {
      registerForm: $('#register-form'),
      registerLoad: $('#loading'),
      successForm: $('#success-registration'),
      email: $('[name="email"]'),
      emailStatus: $('#email-status'),
      firstname: $('[name="firstname"]'),
      firstnameStatus: $('#firstname-status'),
      lastname: $('[name="lastname"]'),
      lastnameStatus: $('#lastname-status')
    }

    form.registerLoad.hide()
    form.successForm.hide()

    function submit () {
      $scope.register.email
      $scope.register.firstname
      $scope.register.lastname
      $scope.register.interest
      console.log($scope.register)
    }

  }

})()
