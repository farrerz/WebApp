var verifyInput = function(e, id){
  var item = $(id);
  if (item.val().length < 1){
      item.addClass("rw-invalid");
      e.preventDefault();
  }else{
      item.removeClass("rw-invalid");
  }
};

var changeLocation = function($scope, url, forceReload) {
    $scope = $scope || angular.element(document).scope();
    if (forceReload || $scope.$$phase) {
        window.location = url;
    } else {
        $location.path(url);
        $scope.$apply();
    }
};
