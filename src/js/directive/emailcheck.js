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
        scope.$watch(attrs.ngModel, function () {
          if (!checking && c.$modelValue) {
            checking = $timeout(function () {
              $http({
                method: 'POST',
                url: 'http://api.barcampbangkhen.org/checkemail',
                data: {'email': c.$modelValue}
              }).success(function (response, status) {
                form.emailStatus.text('')
                form.emailStatus.hide()
                console.log(response)
                c.$setValidity('emailvalid', true)
                c.$setValidity('emailsame', true)
                console.log('Email is ok')
                checking = null
              }).error(function (response, status) {
                if (status === 401) {
                  c.$setValidity('emailvalid', false)
                  console.log('Email is bad 401')
                } else if (status === 402) {
                  c.$setValidity('emailsame', false)
                  console.log('Email is bad 402')
                }
                checking = null
              })
            }, 500)
          }
        })
      }
    }
  }
})()
