/* global angular */

;
(function () {
    angular
        .module('controller.register', [])
        .controller('RegisterController', RegisterController)

    RegisterController.$inject = ['$scope', '$http']
    function RegisterController($scope, $http) {
        var self = this
        var successForm = $('.regisSuccess')
        successForm.hide()
        $('.regis-loading').hide();
        $('input[name="email"]').focusout(function(){
          if(this.value != ""){
            sendingData = {
              email: this.value,
            }
            $.post(
                'http://api.barcampbangkhen.org/checkemail', sendingData,
                function (data) {

                }
            ).fail(function (data) {
                    $('div[name="emailform"]').addClass("has-error");
                    $('div[name="emailformMessage"]').text("this emali is already taken.")
                })
          }
        });

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
            var elementArr = [firstnameE, lastnameE, genderE, professionE, workplaceE, emailE, food_reqE]

            submitRegistration = function () {
              if( $('.regis-btn').hasClass("disabled") ) {
                return;
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
                        interests: interestx
                    }
                    $('.regis-btn').fadeOut(function() {
                      $('.regis-loading').fadeIn();
                    });
                    // successForm.fadeIn()

                    $.post(
                        'http://api.barcampbangkhen.org/register', sendingData,
                        function (data) {
                            console.log(data)
                            regisContent.fadeOut(function() {
                              successForm.fadeIn();
                            });

                        }
                    ).fail(function (data) {
                            console.log(data)
                        })
                }

                $scope.backToRegister = function () {
                    $('#firstname').val("");
                    $('#lastname').val("");
                    $('#gender').val("Male");
                    $('#profession').val("");
                    $('#workplace').val("");
                    $('#email').val("");
                    $('#twitter').val("");
                    $('#website').val("");
                    $('#food-requirement').val("None");
                    $('#allergy').val("");
                    $('#interest').val("");

                    $('.regis-loading').hide();
                    $('.regis-btn').show();
                    successForm.fadeOut(function() {
                      regisContent.fadeIn();
                    });
                    $('.regis-btn').addClass("disabled");
                }


            };
        })
    }

})()
