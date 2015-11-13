/* global angular */
/* global $ */

;(function () {
  angular
    .module('controller.resend', ['vcRecaptcha'])
    .controller('ResendMailController', ResendMailController)

  ResendMailController.$inject = ['$scope', '$http', '$q', 'vcRecaptchaService']
  function ResendMailController ($scope, $http, $q, vcRecaptchaService) {
    var self = this
    self.model = {
      key: '6Le75hATAAAAADVNCfVui0mQJ1OYV2XVAfsHXCoQ'
    }
    self.submit = {
      isSubmit: false,
      status: null
    }

    self.response = null
    self.widgetId = null
    self.resend = resend
    self.setResponse = response
    self.setWidgetId = setWidgetId
    self.cbExpiration = cbExpiration

    var form = {
      resendForm: $('#resend-form'),
      load: $('#loading'),
      resendBtn: $('#resend-btn'),
      successForm: $('#success-resend')
    }

    form.load.hide()
    form.successForm.hide()

    function resend () {
      if ($scope.resend.$invalid) {
        if ($scope.resend.$error.required) {
          angular.forEach($scope.resend.$error.required, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.resend.$error.email) {
          angular.forEach($scope.resend.$error.email, function (value, key) {
            value.$setDirty(true)
          })
        } else if ($scope.resend.$error.pattern) {
          angular.forEach($scope.resend.$error.patter, function (value, key) {
            value.$setDirty(true)
          })
        }
      } else {
        form.resendBtn.hide()
        form.load.show()
        self.submit.isSubmit = true
        $http({
          method: 'POST',
          url: 'http://api.barcampbangkhen.org/resend',
          data: {
            email: self.email,
            response: self.response
          }
        }).success(function (response, status) {
          form.resendForm.fadeOut(function () {
            form.load.hide()
            form.successForm.fadeIn()
          })
          self.submit.status = status
        }).error(function (response, status) {
          self.submit.status = status
          form.load.fadeOut(function () {
            form.resendBtn.fadeIn()
          })
          if (status === 404) {
            vcRecaptchaService.reload(self.widgetId)
          }
        })
      }
    }

    function response (response) {
      self.response = response
    }

    function setWidgetId (widgetId) {
      self.widgetId = widgetId
    }
    function cbExpiration () {
      self.response = null
    }
  }
})()
