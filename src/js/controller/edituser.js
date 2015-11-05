/* global angular */

;(function () {
  angular
    .module('controller.edituser', [])
    .controller('EditUserController', EditUserController)

  EditUserController.$inject = ['$scope', '$stateParams', '$http']
  function EditUserController ($scope, $stateParams, $http) {
    var urlEmail = $stateParams.email;
    var urlCode = $stateParams.code;
    var self = this;
    var successForm = $('.regisSuccess');
    successForm.hide();
    $(document).ready(function(){

      var apiURL = "http://api.barcampbangkhen.org/valid?";
      $http.get(apiURL + 'email=' + urlEmail + '&unique_code=' + urlCode).success(function(response){
        if(response.allow == true){
          console.log(response.data);
          $('#firstname').val(response.data.firstname);
          $('#lastname').val(response.data.lastname);
          $('#gender').val(response.data.gender);
          $('#profession').val(response.data.profession);
          $('#workplace').val(response.data.workplace);
          $('#email').val(response.data.email);
          $('#twitter').val(response.data.twitter);
          $('#website').val(response.data.website);
          $('#food-requirement').val(response.data.food_req);
          $('#allergy').val(response.data.food_allergy);
          $('#interest').val(response.data.interest);
        }
    	});

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
        var elementArr = [firstnameE,lastnameE,genderE,professionE,workplaceE,emailE,food_reqE,food_allergyE,interestE];


        $('.regis-btn').click(function(){
            var isEmpty = false;
            for(var i =0;i<elementArr.length;i++){
                if(elementArr[i].val()==""){
                    isEmpty = true;
                    elementArr[i].effect("shake");
                    elementArr[i].effect("highlight");

                }
            }
            if(!isEmpty){
                var firstnamex = firstnameE.val();
                var lastnamex = lastnameE.val();
                var genderx = genderE.val();
                var professionx = professionE.val();
                var workplacex = workplaceE.val();
                var emailx = emailE.val();
                var twitterx = twitterE.val();
                var websitex = emailE.val();
                var food_reqx = food_reqE.val();
                var food_allergyx = food_allergyE.val();
                var interestx = interestE.val();

                var sendingData = {
                  firstname : firstnamex,
                  lastname : lastnamex,
                  gender : genderx,
                  profession : professionx,
                  workplace : workplacex,
                  email : emailx,
                  twitter : twitterx,
                  website : websitex,
                  food_req : food_reqx,
                  food_allergy : food_allergyx,
                  interest : interestx,
                  unique_code : urlCode,
                };

                regisContent.fadeOut();
                //successForm.fadeIn();

                $.post(
                  'http://api.barcampbangkhen.org/edit', sendingData,
                  function (data) {
                    console.log(data)
                    successForm.fadeIn()
                  }
                ).fail(function (data) {
                  console.log(data)
                })

            }

    $scope.backToEditUser = function() {
      regisContent.fadeIn();
      successForm.fadeOut();
    };

    });
    });
  }

})()
