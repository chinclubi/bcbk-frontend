/* global angular */

;(function () {
  angular
    .module('controller.whoscoming', [ 'ui.select' ])
    .config(['uiSelectConfig', function(uiSelectConfig) {
	uiSelectConfig.theme = 'select2';
}])
    .controller('WhoscomingController', WhoscomingController)

  WhoscomingController.$inject = ['$scope', '$http']
  function WhoscomingController ($scope, $http) {
    var self = this;
    $scope.people = [];
    $scope.interests = [];
    $scope.filter = {'selected': []};
    $scope.find = function(obj, filter){
      console.log(filter);
      if(filter.length === 0){
        return obj;
      }
      filter = filter.map(function(item){
        return item.toLowerCase();
      });
      return obj.filter(function(x){
        return x.interests.some(function(y){
          return filter.indexOf(y.toLowerCase()) != -1;
        });
      });
    };
    $http.get('http://localhost:3030/regis.json').success(function(data){
      $scope.interests = [];
      data = data.map(function(person){
        person.interests = person.interests.split(/[ ]*,[ ]*/);
        person.interests.forEach(function(interest){
          interest = interest.toLowerCase();
          if($scope.interests.indexOf(interest) == -1){
            $scope.interests.push(interest);
          }
        });
        return person;
      });
      $scope.people = data;

    });
  }
})()
