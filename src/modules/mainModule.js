import ModuleHandler from "../shared/moduleHandler";
import MainController from "../main/mainController";
import CatGeneratorController from "../main/components/catGenerator/catGeneratorController";
import CatService from "../main/services/catService";
import CatGenerator from "../main/components/catGenerator/catGeneratorComponent";
import CatDetailsController from "../main/components/catDetails/catDetailsController";
import CatDetails from "../main/components/catDetails/catDetailsComponent";
import AgeFilter from "../shared/filters/ageFilter";
import CatPhotoDirective from "../main/directives/catPhoto/catPhotoDirective";

const mainModule = ModuleHandler.createModule("sample.main");

ModuleHandler.registerControllerForModule(
  "sample.main",
  "mainController",
  MainController
);
ModuleHandler.registerControllerForModule(
  "sample.main",
  "catGeneratorController",
  CatGeneratorController
);
ModuleHandler.registerFactoryForModule("sample.main", "catService", CatService);
ModuleHandler.registerComponentForModule(
  "sample.main",
  "catGenerator",
  CatGenerator
);
ModuleHandler.registerControllerForModule(
  "sample.main",
  "catDetailsController",
  CatDetailsController
);
ModuleHandler.registerComponentForModule(
  "sample.main",
  "catDetails",
  CatDetails
);
ModuleHandler.registerFilterForModule("sample.main", "ageFilter", AgeFilter);
ModuleHandler.registerDirectiveForModule(
  "sample.main",
  "catPhoto",
  CatPhotoDirective
);

export default mainModule;
