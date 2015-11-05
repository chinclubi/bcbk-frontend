/* global angular */

;(function () {
  angular
    .module('controller.register', [])
    .controller('RegisterController', RegisterController)

  RegisterController.$inject = ['$scope', '$http']
  function RegisterController ($scope, $http) {
    var self = this
    var successForm = $('.regisSuccess')
    successForm.hide()
    $(document).ready(function () {
      var regisContent = $('.regisContent');
      var firstnameE = $('#firstname');
      var lastnameE = $('#lastname');
      var genderE = $('#gender');
      var professionE = $('#profession');
      var workplaceE = $('#workplace');
      var emailE = $('#email');
      var twitterE = $('#twitter');
      var websiteE = $('#website');
      var food_reqE = $('#food-requirement');
      var food_allergyE = $('#allergy');
      var interestE = $('#interest');
      var elementArr = [firstnameE, lastnameE, genderE, professionE, workplaceE, emailE, food_reqE, food_allergyE, interestE]

      $('.regis-btn').click(function () {
        var isEmpty = false
        for (var i = 0;i < elementArr.length;i++) {
          if (elementArr[i].val() == '') {
            isEmpty = true
            elementArr[i].effect('shake')
            elementArr[i].effect('highlight')

          }
        }
        if (!isEmpty) {
          var firstnamex = firstnameE.val()
          var lastnamex = lastnameE.val()
          var genderx = genderE.val()
          var professionx = professionE.val()
          var workplacex = workplaceE.val()
          var emailx = emailE.val()
          var twitterx = twitterE.val()
          var websitex = emailE.val()
          var food_reqx = food_reqE.val()
          var food_allergyx = food_allergyE.val()
          var interestx = interestE.val()

          var sendingData = {
            firstname: firstnamex,
            lastname: lastnamex,
            gender: genderx,
            profession: professionx,
            workplace: workplacex,
            email: emailx,
            twitter: twitterx,
            website: websitex,
            food_req: food_reqx,
            food_allergy: food_allergyx,
            interest: interestx
          }
          regisContent.fadeOut();
          // successForm.fadeIn()

          $.post(
            'http://api.barcampbangkhen.org/register', sendingData,
            function (data) {
              console.log(data)
              successForm.fadeIn()
            }
          ).fail(function (data) {
            console.log(data)
          })
        }

        $scope.backToRegister = function () {
          regisContent.fadeIn()
          successForm.fadeOut()
        }

      })
    })
  }

})()
