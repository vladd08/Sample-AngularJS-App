import angular from "angular";

const ModuleHandler = {
  getModule: moduleName => angular.module(moduleName),
  createModule: (moduleName, dependencies = []) =>
    angular.module(moduleName, dependencies),
  registerControllerForModule: (moduleName, controllerName, controller) => {
    angular.module(moduleName).controller(controllerName, controller);
  },
  registerProviderForModule: (moduleName, provider) => {
    angular.module(moduleName).config(provider);
  },
  registerComponentForModule: (moduleName, componentName, component) => {
    angular.module(moduleName).component(componentName, component);
  },
  registerFactoryForModule: (moduleName, factoryName, factory) => {
    angular.module(moduleName).factory(factoryName, factory);
  },
  registerServiceForModule: (moduleName, serviceName, service) => {
    angular.module(moduleName).factory(serviceName, service);
  },
  registerFilterForModule: (moduleName, filterName, filter) => {
    angular.module(moduleName).filter(filterName, filter);
  },
  registerDirectiveForModule: (moduleName, directiveName, directive) => {
    angular.module(moduleName).directive(directiveName, directive);
  }
};

export default ModuleHandler;
