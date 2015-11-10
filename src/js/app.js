/* global angular */

;(function () {
  angular
    .module('bcbk-app', [
      'services.route',
      'controller.homepage',
      'controller.about',
      'controller.register',
      'controller.whoscoming',
      'controller.edituser',
      'directive.validation'
    // 'directive.navbar'
    ])
})()
