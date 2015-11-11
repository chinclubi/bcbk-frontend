/* global angular */
/* global $ */
/* global jQuery */

;(function () {
  angular
    .module('bcbk-app', [
      'services.route',
      'controller.homepage',
      'controller.about',
      'controller.register',
      'controller.whoscoming',
      'controller.edituser',
      'directive.validation',
      'directive.interestValidation'
    // 'directive.navbar'
    ])
})()
$(function () {
  var bg = jQuery('.background')
  jQuery(window).resize('resizeBackground')
  function resizeBackground () {
    bg.height(jQuery(window).height() + 60)
  }
  resizeBackground()
})
