const CatPhotoDirective = () => {
  return {
    restrict: "E",
    scope: {
      url: "<"
    },
    templateUrl: "/views/main/directives/catPhoto/catPhotoDirective.html"
  };
};

export default CatPhotoDirective;
