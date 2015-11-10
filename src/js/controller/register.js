/* global angular */

;
(function () {
    angular
        .module('controller.register', [])
        .controller('RegisterController', RegisterController)

    RegisterController.$inject = ['$scope', '$http']
    function RegisterController($scope, $http) {
        var self = this
        var successRegistration = $('#success-registration')
        var allowRegister = false
        successRegistration.hide()
        $('#loading').hide()
        var checkEmail = function (thisEmail, cb) {
            if (thisEmail != '') {
                sendingData = {
                    email: thisEmail,
                }
                $.post(
                    'http://api.barcampbangkhen.org/checkemail', sendingData,
                    function (data) {
                        $('div[name="emailformMessage"]').text('')
                    }
                ).success(function () {
                        allowRegister = true
                        cb()
                    })
                    .fail(function (data) {
                        if (data.status == 402) {
                            $('div[name="emailformMessage"]').text('Bruh, that email address is already taken')
                        }
                        if (data.status == 401) {
                            $('div[name="emailformMessage"]').text('Bruh, that email address is invalid')
                        }
                        $('div[name="emailform"]').addClass('has-error')
                        $('#register-btn').addClass('disabled')

                    })
            }
        }
        $('input[name="email"]').focusout(function () {
            checkEmail(this.value, function () {
            })
        })

        $(document).ready(function () {
            var registerForm = $('#register-form')
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
            var elementArr = [firstnameE, lastnameE, genderE, emailE, interestE]

            submitRegistration = function () {
                if ($('#register-btn').hasClass('disabled')) {
                    return
                }
                if (allowRegister) {
                    var callBack = function () {
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
                                interests: interestx
                            }
                            $('#register-btn').fadeOut(function () {
                                $('#loading').fadeIn()
                            })
                            // successRegistration.fadeIn()

                            $.post(
                                'http://api.barcampbangkhen.org/register', sendingData,
                                function (data) {
                                    registerForm.fadeOut(function () {
                                        successRegistration.fadeIn()
                                    })

                                }
                            ).fail(function (data) {
                                })
                        }

                        $scope.backToRegister = function () {
                            $('#firstname').val('')
                            $('#lastname').val('')
                            $('#gender').val('Male')
                            $('#profession').val('')
                            $('#workplace').val('')
                            $('#email').val('')
                            $('#twitter').val('')
                            $('#website').val('')
                            $('#food-requirement').val('None')
                            $('#allergy').val('')
                            $('#interest').val('')

                            $('#loading').hide()
                            $('#register-btn').show()
                            successRegistration.fadeOut(function () {
                                registerForm.fadeIn()
                                allowRegister = false
                            })
                            $('#register-btn').addClass('disabled')
                        }
                    }
                    checkEmail(emailE.val(), callBack)
                }
            }
        })
    }

})()
