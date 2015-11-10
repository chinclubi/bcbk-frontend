/* global angular */

;
(function () {
    angular
        .module('controller.edituser', [])
        .controller('EditUserController', EditUserController)

    EditUserController.$inject = ['$scope', '$stateParams', '$http', '$location']
    function EditUserController($scope, $stateParams, $http, $location) {
        var urlEmail = $stateParams.email
        var urlCode = $stateParams.c
        var self = this
        var registerForm = $('#register-form')
        var successForm = $('#success-registration')
        successForm.hide()
        $('#loading').hide()

        $(document).ready(function () {
            var apiURL = 'http://api.barcampbangkhen.org/valid?'
            $http.get(apiURL + 'email=' + urlEmail + '&unique_code=' + urlCode).success(function (response) {
                if (response.allow == true) {
                    $('#firstname').val(response.data.firstname)
                    $('#lastname').val(response.data.lastname)
                    $('#gender').val(response.data.gender)
                    $('#profession').val(response.data.profession)
                    $('#workplace').val(response.data.workplace)
                    $('#email').val(urlEmail)
                    $('#twitter').val(response.data.twitter)
                    $('#website').val(response.data.website)
                    $('#food-requirement').val(response.data.food_req)
                    $('#allergy').val(response.data.food_allergy)
                    $('#interest').val(response.data.interests)
                } else {
                    $location.path('/home')
                }
            }).error(function (data, status) {
                console.log('Error status : ' + status)
                $location.path('/home')
            })

            var firstnameE = $('#firstname')
            var lastnameE = $('#lastname')
            var genderE = $('#gender')
            var professionE = $('#profession')
            var workplaceE = $('#workplace')
            var emailE = $('#email')
            var twitterE = $('#twitter')
            var websiteE = $('#website')
            var food_reqE = $('#food-requirement')
            var food_allergyE = $('#allergy')
            var interestE = $('#interest')
            var elementArr = [firstnameE, lastnameE, genderE, emailE, food_reqE, interestE]

            submitRegistration = function () {
                if ($('.update-btn').hasClass('disabled')) {
                    return
                }
                var isEmpty = false
                for (var i = 0; i < elementArr.length; i++) {
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
                    var websitex = websiteE.val()
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
                        interests: interestx,
                        unique_code: urlCode,
                    }
                    $('#update-btn').fadeOut(function () {
                        $('#loading').fadeIn()
                    })

                    $.post(
                        'http://api.barcampbangkhen.org/edit', sendingData,
                        function (data) {
                            console.log(data)
                            registerForm.fadeOut(function () {
                                successForm.fadeIn()
                            })

                        }
                    ).fail(function (data) {
                            console.log(data)
                        })

                }

                $scope.backToEditUser = function () {
                    $('#loading').hide()
                    $('#update-btn').show()
                    successForm.fadeOut(function () {
                        registerForm.fadeIn()
                    })

                }

            }
        })
    }

})()
