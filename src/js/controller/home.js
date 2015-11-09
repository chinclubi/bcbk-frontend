/* global angular */
/* global $ */
/* global google */

;(function () {
  angular
    .module('controller.homepage', [])
    .controller('HomePageController', HomePageController)

  HomePageController.$inject = ['$scope', '$window']
  function HomePageController ($scope, $window) {
    $(window).scroll(function () {
      if ($('.navbar').offset().top > 50) {
        $('.navbar-fixed-top').addClass('top-nav-collapse')
      } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse')
      }
    })

    $(function () {
      $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this)
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo')
        event.preventDefault()
      })
    })
  }
})()
