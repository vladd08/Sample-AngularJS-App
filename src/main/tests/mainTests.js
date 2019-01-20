import Cat from "../models/cat";

(() => {
  describe("Main module tests", () => {
    beforeEach(angular.mock.module("sample.main"));

    let $controller, $rootScope;

    beforeEach(inject((_$controller_, _$rootScope_) => {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    }));

    it("should create a new cat object", () => {
      const cat = new Cat("a", "a", "a", 2, "a");
      expect(cat.age).toBe(2);
      expect(cat.name).toBe("a");
      expect(cat.photo).toBe("a");
      expect(cat.sex).toBe("a");
      expect(cat.breed).toBe("a");
    });
  });
})();
