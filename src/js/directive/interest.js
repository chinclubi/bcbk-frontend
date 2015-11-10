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
          if (!checking) {
            checking = $timeout(function () {
              console.log(c.$modelValue)
              if (c.$modelValue.length !== 0) {
                c.$setValidity('interest', true)
              } else {
                c.$setValidity('interest', false)
              }
              checking = null
            }, 500)
          }
        })
      }
    }
  }
})()
