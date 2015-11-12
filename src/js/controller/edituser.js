/* global angular */
/* global $ */

;(function () {
  angular
    .module('controller.edituser', [])
    .config(['uiSelectConfig', function (uiSelectConfig) {
      uiSelectConfig.theme = 'bootstrap'
    }])
    .controller('EditUserController', EditUserController)

  EditUserController.$inject = ['$scope', '$stateParams', '$http', '$state', '$q']
  function EditUserController ($scope, $stateParams, $http, $state, $q) {
    var self = this
    self.interest = {'selected': []}
    self.tmps = ['Java', 'DotA2', 'JavaScript', 'PHP', 'Phyton', 'AngularJS', 'NodeJS', 'C++', 'HTML', 'CSS', 'SASS', 'SCSS', 'ruby']
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
    self.urlEmail = $stateParams.email
    self.urlCode = $stateParams.c
    self.submit = submit
    self.editpage = editpage

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

    init()
    form.registerLoad.hide()
    form.successForm.hide()

    $('.nav a').each(function () {
      $(this).on('click', function () {
        $('.navbar-toggle').click()
      })
    })

    function editpage () {
      form.successForm.fadeOut(function () {
        form.registerForm.fadeIn()
      })
      form.registerBtn.show()
    }

    function submit () {
      if ($scope.$$childHead.edit.$invalid) {
        if ($scope.$$childHead.edit.$error.required) {
          angular.forEach($scope.register.$error.required, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.$$childHead.edit.$error.email) {
          angular.forEach($scope.register.$error.email, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.$$childHead.edit.$error.emailvalid) {
          angular.forEach($scope.register.$error.emailvalid, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.$$childHead.edit.$error.emailsame) {
          angular.forEach($scope.register.$error.emailsame, function (value, key) {
            value.$setDirty(true)
          })
        }
      } else {
        form.registerBtn.fadeOut(function () {
          form.registerLoad.fadeIn()
        })
        var strInterest = self.interest.selected.join()
        edit(strInterest).then(function (res, status) {
          form.registerForm.fadeOut(function () {
            form.registerLoad.hide()
            form.successForm.fadeIn()
            $scope.$$childHead.edit.$setPristine()
          })
        }, function (res, status) {})
      }
    }

    function edit (strInterest) {
      var deferred = $q.defer()
      $http({
        method: 'POST',
        url: 'http://api.barcampbangkhen.org/edit',
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
          'workplace': self.workplace,
          'unique_code': self.urlCode
        }
      }).success(function (response, status) {
        deferred.resolve(response, status)
      }).error(function (response, status) {
        deferred.reject(response, status)
      })
      return deferred.promise
    }

    function init () {
      var apiURL = 'http://api.barcampbangkhen.org/valid?'
      $http({
        method: 'GET',
        url: apiURL + 'email=' + self.urlEmail + '&unique_code=' + self.urlCode
      }).success(function (response, status) {
        self.email = self.urlEmail
        self.firstname = response.data.firstname
        self.lastname = response.data.lastname
        self.allergy = response.data.food_allergy
        self.foodRequirement.data = response.data.food_req
        self.gender.data = response.data.gender
        self.profession = response.data.profession
        self.twitter = response.data.twitter
        self.workplace = response.data.workplace
        self.website = response.data.website
        self.interest.selected = response.data.interests.split(',')
      }).error(function (response, status) {
        $state.go('home')
      })
    }
    $(window).scroll(function () {
      if ($('.navbar').offset().top > 50) {
        $('.navbar-fixed-top').addClass('top-nav-collapse')
      } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse')
      }
    })
  }

})()
