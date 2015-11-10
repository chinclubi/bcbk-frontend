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

    function editpage () {
      form.successForm.fadeOut(function () {
        form.registerForm.fadeIn()
      })
      form.registerBtn.show()
    }

    function submit () {
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
        console.log(response)
        $state.go('home')
      })
    }

    //   var registerForm = $('#register-form')
    //   var successForm = $('#success-registration')
    //   successForm.hide()
    //   $('#loading').hide()

    //   $(window).scroll(function () {
    //     if ($('.navbar').offset().top > 50) {
    //       $('.navbar-fixed-top').addClass('top-nav-collapse')
    //     } else {
    //       $('.navbar-fixed-top').removeClass('top-nav-collapse')
    //     }
    //   })

    //   $(document).ready(function () {
    //     var apiURL = 'http://api.barcampbangkhen.org/valid?'
    //     $http.get(apiURL + 'email=' + urlEmail + '&unique_code=' + urlCode).success(function (response) {
    //       if (response.allow == true) {
    //         $('#firstname').val(response.data.firstname)
    //         $('#lastname').val(response.data.lastname)
    //         $('#gender').val(response.data.gender)
    //         $('#profession').val(response.data.profession)
    //         $('#workplace').val(response.data.workplace)
    //         $('#email').val(urlEmail)
    //         $('#twitter').val(response.data.twitter)
    //         $('#website').val(response.data.website)
    //         $('#food-requirement').val(response.data.food_req)
    //         $('#allergy').val(response.data.food_allergy)
    //         $('#interest').val(response.data.interests)
    //       } else {
    //         $location.path('/home')
    //       }
    //     }).error(function (data, status) {
    //       console.log('Error status : ' + status)
    //       $location.path('/home')
    //     })

    //     var firstnameE = $('#firstname')
    //     var lastnameE = $('#lastname')
    //     var genderE = $('#gender')
    //     var professionE = $('#profession')
    //     var workplaceE = $('#workplace')
    //     var emailE = $('#email')
    //     var twitterE = $('#twitter')
    //     var websiteE = $('#website')
    //     var food_reqE = $('#food-requirement')
    //     var food_allergyE = $('#allergy')
    //     var interestE = $('#interest')
    //     var elementArr = [firstnameE, lastnameE, genderE, emailE, food_reqE, interestE]

    //     submitRegistration = function () {
    //       if ($('.update-btn').hasClass('disabled')) {
    //         return
    //       }
    //       var isEmpty = false
    //       for (var i = 0; i < elementArr.length; i++) {
    //         if (elementArr[i].val() == '') {
    //           isEmpty = true
    //           elementArr[i].effect('shake')
    //           elementArr[i].effect('highlight')

    //         }
    //       }
    //       if (!isEmpty) {
    //         var firstnamex = firstnameE.val()
    //         var lastnamex = lastnameE.val()
    //         var genderx = genderE.val()
    //         var professionx = professionE.val()
    //         var workplacex = workplaceE.val()
    //         var emailx = emailE.val()
    //         var twitterx = twitterE.val()
    //         var websitex = websiteE.val()
    //         var food_reqx = food_reqE.val()
    //         var food_allergyx = food_allergyE.val()
    //         var interestx = interestE.val()

    //         var sendingData = {
    //           firstname: firstnamex,
    //           lastname: lastnamex,
    //           gender: genderx,
    //           profession: professionx,
    //           workplace: workplacex,
    //           email: emailx,
    //           twitter: twitterx,
    //           website: websitex,
    //           food_req: food_reqx,
    //           food_allergy: food_allergyx,
    //           interests: interestx,
    //           unique_code: urlCode,
    //         }
    //         $('#update-btn').fadeOut(function () {
    //           $('#loading').fadeIn()
    //         })

    //         $.post(
    //           'http://api.barcampbangkhen.org/edit', sendingData,
    //           function (data) {
    //             console.log(data)
    //             registerForm.fadeOut(function () {
    //               successForm.fadeIn()
    //             })

    //           }
    //         ).fail(function (data) {
    //           console.log(data)
    //         })

    //       }

    //       $scope.backToEditUser = function () {
    //         $('#loading').hide()
    //         $('#update-btn').show()
    //         successForm.fadeOut(function () {
    //           registerForm.fadeIn()
    //         })

    //       }

  //     }
  //   })
  }

})()
