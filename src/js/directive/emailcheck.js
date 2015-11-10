/* global angular */
/* global $ */

;(function () {
  angular.module('directive.validation', [])
    .directive('emailcheck', emailcheck)

  emailcheck.$inject = ['$http', '$timeout']
  function emailcheck ($http, $timeout) {
    var checking = null
    var form = {
      email: $('[name="email"]'),
      emailStatus: $('#email-status')
    }
    return {
      require: 'ngModel',
      link: function (scope, ele, attrs, c) {
        var checkEmail = function () {
          if (!checking && c.$modelValue) {
            checking = $timeout(function () {
              $http({
                method: 'POST',
                url: 'http://api.barcampbangkhen.org/checkemail',
                data: {'email': c.$modelValue}
              }).success(function (response, status) {
                form.emailStatus.text('')
                form.emailStatus.hide()
                c.$setValidity('emailvalid', true)
                c.$setValidity('emailsame', true)
                checking = null
              }).error(function (response, status) {
                if (status === 401) {
                  c.$setValidity('emailsame', true)
                  c.$setValidity('emailvalid', false)
                } else if (status === 402) {
                  c.$setValidity('emailsame', false)
                  c.$setValidity('emailvalid', true)
                }
                checking = null
              })
            }, 500)
          }
        }
        scope.$watch(attrs.ngModel, checkEmail)
      }
    }
  }
})()
