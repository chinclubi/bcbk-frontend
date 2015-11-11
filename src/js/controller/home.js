/* global angular */
/* global $ */
/* global google */

;(function () {
  angular
    .module('controller.homepage', [])
    .controller('HomePageController', HomePageController)

  HomePageController.$inject = ['$scope', '$stateParams', '$timeout']
  function HomePageController ($scope, $stateParams, $timeout) {
    $(window).scroll(function () {
      if ($('.navbar').offset().top > 50) {
        $('.navbar-fixed-top').addClass('top-nav-collapse')
      } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse')
      }
    })

    if ($stateParams.section) {
      var checking = null
      if (!checking) {
        checking = $timeout(function () {
          if ($('#' + $stateParams.section).offset().top) {
            $('html, body').stop().animate({
              scrollTop: $('#' + $stateParams.section).offset().top
            }, 1500, 'easeInOutExpo')
            checking = null
          }
        }, 500)
      }
    }

    $(function () {
      $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this)
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo')
        event.preventDefault()
      })
    })
    if ($(window).width() < 768) {
      $('.nav a').each(function () {
        $(this).on('click', function () {
          $('.navbar-toggle').click()
        })
      })
    }
  }
})()
