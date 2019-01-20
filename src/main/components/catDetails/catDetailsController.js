const CatDetailsController = [
  "$scope",
  "$stateParams",
  "$transitions",
  "catService",
  ($scope, $stateParams, $transitions, catService) => {
    $scope.catId = $stateParams.catId;
    $scope.cat = catService.getCatById(parseInt($scope.catId));
    listenToStateChanges();

    function listenToStateChanges() {
      $transitions.onSuccess({}, $transition => {
        $scope.catId = $transition.params("to").catId;
        $scope.cat = catService.getCatById(parseInt($scope.catId));
        // need a better way to tell if the url is valid
        if ($scope.cat.photo.indexOf("https") === -1) {
          $scope.cat.photo = "";
        }
      });
    }
  }
];

export default CatDetailsController;
