/* global angular */

;(function () {
  angular.module('directive.validation', [])
    .directive('emailcheck', emailcheck)

  emailcheck.$inject = ['$http', '$timeout']
  function emailcheck ($http, $timeout) {
    var checking = null
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
              }).success(function (response) {
                if (response.status === 'valid') {
                  c.$setValidity('emailvalid', true)
                } else {
                  c.$setValidity('emailvalid', false)
                }
                checking = null
              }).error(function (response) {
                console.log(response)
                checking = null
              })
            }, 500)
          }
        })
      }
    }
  }
})()
