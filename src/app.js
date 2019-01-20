import ModuleHandler from "./shared/moduleHandler";
import router from "@uirouter/angularjs";
import templates from "./shared/views";
import mainModule from "./modules/mainModule";
import NiceScroll from "./shared/directives/niceScrollDirective";

(() => {
  "use strict";

  ModuleHandler.createModule("sample", [
    router,
    templates.name,
    mainModule.name
  ]);
  ModuleHandler.registerControllerForModule("sample", "appController", [
    "$scope",
    $scope => {
      $scope.title = "AngularJS Sample Architecture";
      $scope.subtitle = "© Vlad Orbulescu";
    }
  ]);
  ModuleHandler.registerProviderForModule("sample", [
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    ($stateProvider, $locationProvider, $urlRouterProvider) => {
      $stateProvider
        .state({
          name: "main",
          url: "/cats",
          templateUrl: "/views/main/main.html",
          controller: "mainController"
        })
        .state({
          name: "main.cat",
          url: "/cat?catId"
        });
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("/cats");
    }
  ]);
  ModuleHandler.registerDirectiveForModule("sample", "niceScroll", NiceScroll);
})();
