/* global angular */
/* global $ */

;(function () {
  angular
    .module('controller.whoscoming', ['ui.select'])
    .config(['uiSelectConfig', function (uiSelectConfig) {
      uiSelectConfig.theme = 'bootstrap'
    }])
    .controller('WhoscomingController', WhoscomingController)

  WhoscomingController.$inject = ['$scope', '$http']
  function WhoscomingController ($scope, $http) {
    $('.nav a').each(function () {
      $(this).on('click', function () {
        $('.navbar-toggle').click()
      })
    })

    $(window).scroll(function () {
      if ($('.navbar').offset().top > 50) {
        $('.navbar-fixed-top').addClass('top-nav-collapse')
      } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse')
      }
    })

    var self = this
    self.people = []
    self.interests = []
    self.filter = {'selected': []}
    self.find = function (obj, filter) {
      if (filter.length === 0) {
        return obj
      }
      filter = filter.map(function (item) {
        return item.toLowerCase()
      })
      return obj.filter(function (x) {
        return x.interests.some(function (y) {
          return filter.indexOf(y.toLowerCase()) !== -1
        })
      })
    }
    $http.get('http://api.barcampbangkhen.org/all').success(function (response) {
      self.interests = []
      var data = response.data.reverse()
      data = data.map(function (person) {
        person.name = person.firstname + ' ' + person.lastname
        person.interests = person.interests.split(/[ ]*,[ ]*/)
        person.interests.forEach(function (interest) {
          interest = interest.toLowerCase()
          if (self.interests.indexOf(interest) === -1 && interest !== '') {
            self.interests.push(interest)
          }
        })
        return person
      })
      self.people = data
    })
  }
})()
