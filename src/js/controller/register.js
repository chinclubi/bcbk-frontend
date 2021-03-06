/* global angular */
/* global $ */

;(function () {
  angular
    .module('controller.register', ['ui.select'])
    .config(['uiSelectConfig', function (uiSelectConfig) {
      uiSelectConfig.theme = 'bootstrap'
    }])
    .controller('RegisterController', RegisterController)

  RegisterController.$inject = ['$scope', '$http', '$q']
  function RegisterController ($scope, $http, $q) {
    var self = this
    self.interest = {'selected': []}
    self.tmps = ['JavaScript', 'Dota2', 'startup', 'Food', 'Vim', 'UX/UI', 'NodeJs', 'Twitter', 'Web Design', 'AngularJs', 'Manga', 'SCSS', 'ruby']
    self.regisSubmit = submit
    self.regispage = regispage
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
      registerBtn: $('#register-btn'),
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

    function regispage () {
      self.email = $scope.initial
      self.firstname = $scope.initial
      self.lastname = $scope.initial
      self.gender.data = 'Male'
      self.profession = $scope.initial
      self.foodRequirement.data = 'None'
      self.allergy = $scope.initial
      self.interest.selected = []
      self.twitter = $scope.initial
      self.website = $scope.initial
      self.workplace = $scope.initial
      form.successForm.fadeOut(function () {
        form.registerForm.fadeIn()
      })
      form.registerBtn.show()
    }

    function submit () {
      if ($scope.register.$invalid) {
        if ($scope.register.$error.required) {
          angular.forEach($scope.register.$error.required, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.register.$error.email) {
          angular.forEach($scope.register.$error.email, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.register.$error.pattern) {
          angular.forEach($scope.register.$error.patter, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.register.$error.emailvalid) {
          angular.forEach($scope.register.$error.emailvalid, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.register.$error.emailsame) {
          angular.forEach($scope.register.$error.emailsame, function (value, key) {
            value.$setDirty(true)
          })
        }
        if ($scope.register.$error.empty) {
          angular.forEach($scope.register.$error.empty, function (value, key) {
            value.$setDirty(true)
          })
        }
      } else {
        form.registerBtn.fadeOut(function () {
          form.registerLoad.fadeIn()
        })
        checkEmail().then(function () {
          var strInterest = self.interest.selected.join()
          register(strInterest).then(function (res, status) {
            form.registerForm.fadeOut(function () {
              form.registerLoad.hide()
              form.successForm.fadeIn()
              $scope.register.$setPristine()
            })
          }, function (res, status) {})
        }, function (status) {})
      }
    }

    function checkEmail () {
      var deferred = $q.defer()
      $http({
        method: 'GET',
        url: 'http://api.barcampbangkhen.org/checkemail?email=' + self.email
      }).success(function (response, status) {
        $scope.register.$setValidity('emailvalid', true)
        $scope.register.$setValidity('emailsame', true)
        deferred.resolve()
      }).error(function (response, status) {
        if (status === 401) {
          $scope.register.$setValidity('emailvalid', false)
        } else if (status === 402) {
          $scope.register.$setValidity('emailsame', false)
        }
        deferred.reject(status)
      })
      return deferred.promise
    }

    function register (strInterest) {
      var deferred = $q.defer()
      $http({
        method: 'POST',
        url: 'http://api.barcampbangkhen.org/register',
        data: {
          'email': self.email,
          'firstname': self.firstname,
          'lastname': self.lastname,
          'gender': self.gender.data,
          'profession': self.profession,
          'food_req': self.foodRequirement.data,
          'food_allergy': self.allergy,
          'interests': strInterest,
          'twitter': self.twitter,
          'website': self.website,
          'workplace': self.workplace
        }
      }).success(function (response, status) {
        deferred.resolve(response, status)
      }).error(function (response, status) {
        deferred.reject(response, status)
      })
      return deferred.promise
    }

  }

})()
