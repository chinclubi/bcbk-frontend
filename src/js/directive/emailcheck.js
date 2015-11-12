/* global angular */
/* global $ */

;(function () {
  angular.module('directive.validation', [])
    .directive('emailcheck', emailcheck)

  emailcheck.$inject = ['$http', '$timeout']
  function emailcheck ($http, $timeout) {
    var checking = null
    return {
      require: 'ngModel',
      link: function (scope, ele, attrs, c) {
        var checkEmail = function () {
          var emailValue = c.$modelValue
          if (!checking && emailValue) {
            checking = $timeout(function () {
              $http({
                method: 'GET',
                url: 'http://api.barcampbangkhen.org/checkemail?email=' + emailValue
              }).success(function (response, status) {
                c.$setValidity('emailvalid', true)
                c.$setValidity('emailsame', true)
                checking = null
              }).error(function (response, status) {
                if (!c.$error.required || !c.$error.email) {
                  if (status === 401) {
                    c.$setValidity('emailsame', true)
                    c.$setValidity('emailvalid', false)
                  } else if (status === 402) {
                    c.$setValidity('emailsame', false)
                    c.$setValidity('emailvalid', true)
                  }
                  checking = null
                }
              })
            }, 500)
          } else {
            c.$setValidity('emailvalid', true)
            c.$setValidity('emailsame', true)
          }
        }
        scope.$watch(attrs.ngModel, checkEmail)
      }
    }
  }
})()
