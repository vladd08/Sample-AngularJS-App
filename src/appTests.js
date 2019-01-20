(() => {
  describe("App tests", () => {
    beforeEach(angular.mock.module("sample"));

    let $controller, $rootScope;

    beforeEach(inject((_$controller_, _$rootScope_) => {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    }));

    describe("Initialization", () => {
      it("should register appController", () => {
        let appController = $controller("appController", {
          $scope: $rootScope.$new()
        });
        expect(appController).not.toBe(undefined);
      });
    });
  });
})();
