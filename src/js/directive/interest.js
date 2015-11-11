/* global angular */
/* global $ */

;(function () {
  angular.module('directive.interestValidation', [])
    .directive('interest', interest)

  interest.$inject = ['$timeout']
  function interest ($timeout) {
    var checking = null
    return {
      require: 'ngModel',
      link: function (scope, ele, attrs, c) {
        scope.$watch(attrs.ngModel, function () {
          checking = $timeout(function () {
            if (!c.$modelValue) {
              c.$setValidity('required', false)
            }else if (c.$modelValue.length === 0) {
              c.$setValidity('required', false)
            } else {
              c.$setValidity('required', true)
            }
            checking = null
          })
        }, 500)
      }
    }
  }
})()
