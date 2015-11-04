/* global angular */

;(function () {
  angular
    .module('controller.register', [])
    .controller('RegisterController', RegisterController)

  RegisterController.$inject = ['$scope']
  function RegisterController ($scope) {
    var self = this;
    var successForm = $('.regisSuccess');
    successForm.hide();
    $(document).ready(function(){

        var regisContent = $('.regisContent');
        var firstnameE = $('#firstname');
        var lastnameE = $('#lastname');
        var genderE = $('#gender');
        var professionE = $('#profession');
        var workplaceE = $('#workplace');
        var emailE = $('#email');
        var sizeE = $('#shirt-size');
        var food_reqE = $('#food-requirement');
        var food_allergyE = $('#allergy');
        var interestE = $('#interest');
        var elementArr = [firstnameE,lastnameE,genderE,professionE,workplaceE,emailE,sizeE,food_reqE,food_allergyE,interestE];

        $('.regis-btn').click(function(){
          console.log(genderE.val());
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
                var sizex = sizeE.val();
                var food_reqx = food_reqE.val();
                var food_allergyx = food_allergyE.val();
                var interestx = interestE.val();

                        regisContent.fadeOut();
                        successForm.fadeIn();
                $.post(
                    "http://barcampbangkhen.org/2015/php/save_user.php",
                    {
                        firstname : firstnamex,
                        lastname : lastnamex,
                        gender : genderx,
                        profession : professionx,
                        workplace : workplacex,
                        email : emailx,
                        size : sizex,
                        food_req : food_reqx,
                        food_allergy : food_allergyx,
                        interest : interestx

                    },
                    function(data){
                    }
                );
            }

    $scope.backToRegister = function() {
      regisContent.fadeIn();
      successForm.fadeOut();
    };

    });
    });
  }

})()
