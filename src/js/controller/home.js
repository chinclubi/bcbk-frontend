/* global angular */
/* global $ */
/* global google */

;
(function () {
    angular
        .module('controller.homepage', [])
        .run(loadGoogleMap)
        .controller('HomePageController', HomePageController)

    HomePageController.$inject = ['$scope', '$window']
    function HomePageController($scope, $window) {
        var self = this

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

        //$window.initMap = function () {
        //    function initialize() {
        //        var G = google.maps
        //
        //        var mapCanvas = document.getElementById('map')
        //        var mapOptions = {
        //            center: new G.LatLng(13.846458, 100.5695385),
        //            zoom: 15,
        //            scrollwheel: false,
        //            mapTypeId: G.MapTypeId.ROADMAP
        //        }
        //
        //        var map = new G.Map(mapCanvas, mapOptions)
        //
        //        var marker = new G.Marker({
        //            map: map,
        //            place: {
        //                location: {lat: 13.846458, lng: 100.5695385},
        //                query: 'Karsetsart University, Computer Engineer Faculty, 17th Building IUP'
        //            },
        //            attribution: {
        //                source: 'Google Maps JavaScript API',
        //                webUrl: 'https://developers.google.com/maps/'
        //            }
        //        })
        //
        //        var infoWindow = new google.maps.InfoWindow({
        //            content: 'อาคารนานาชาติ (IUP) 17 คณะวิศวกรรมศาสตร์'
        //        })
        //
        //        google.maps.event.addListener(marker, 'click', function () {
        //            infowindow.open(map, marker)
        //        })
        //
        //        infoWindow.open(map, marker)
        //    }
        //
        //    google.maps.event.addDomListener(window, 'load', initialize)
        //}
    }

    function loadGoogleMap() {
        //var head = document.getElementsByTagName('head')[0]
        //var script = document.createElement('script')
        //script.type = 'text/javascript'
        //script.src = '//maps.google.com/maps/api/js?sensor=false&v=3.4'
        //////script.src = '//maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&libraries=places'
        ////script.async = false
        //head.appendChild(script)
    }
})()
