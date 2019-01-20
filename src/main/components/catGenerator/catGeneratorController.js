import Cat from "../../models/cat";
import FormValidator from "../../../shared/form/formValidator";

const CatGeneratorController = [
  "$scope",
  "catService",
  "$state",
  ($scope, catService, $state) => {
    $scope.cat = new Cat();
    $scope.catsex = "Male";
    $scope.catsexOptions = ["Male", "Female"];
    $scope.cats = catService.getCats();
    $scope.selectedCat = $scope.cats[0];
    selectFirstCatByDefault();

    $scope.addCat = () => {
      const cat = new Cat(
        $scope.cat.name,
        $scope.cat.breed,
        $scope.cat.photo,
        $scope.cat.age,
        $scope.catsex
      );
      catService.addCat(cat);
      selectNewlyAddedCat(cat);
      prepareForNextSubmit();
      refreshNicescroll();
    };
    $scope.selectCat = cat => {
      $scope.selectedCat = cat;
    };

    $scope.showCats = () => $scope.cats.length !== 0;
    $scope.isCatSelected = cat => angular.equals(cat, $scope.selectedCat);
    $scope.isFieldValid = fieldName =>
      FormValidator.isFieldValid($scope.catform, fieldName);
    $scope.isFormValid = () => FormValidator.isFormValid($scope.catform);

    function selectFirstCatByDefault() {
      $state.go("main.cat", { catId: 1 });
    }
    function selectNewlyAddedCat(newCat) {
      $scope.selectCat(newCat);
      $state.go("main.cat", { catId: $scope.cats.length });
    }
    function prepareForNextSubmit() {
      $scope.cats = catService.getCats();
      $scope.cat = new Cat();
      $scope.catform.$setUntouched();
    }
    function refreshNicescroll() {
      $scope.$emit("refreshNicescroll");
    }
  }
];

export default CatGeneratorController;
