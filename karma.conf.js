module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["browserify", "jasmine"],
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      "karma-coverage",
      "karma-browserify"
    ],
    files: [
      "./node_modules/angular/angular.min.js",
      "./node_modules/angular-mocks/angular-mocks.js",
      "./node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
      "./src/**/*.js"
    ],
    preprocessors: {
      "./src/**/*.js": ["browserify"]
    },
    browserify: {
      debug: true,
      transform: [
        [
          "babelify",
          {
            plugins: [["istanbul", {
              "exclude": "**/*Tests.js"
            }]]
          }
        ]
      ]
    },
    reporters: ["progress", "coverage"],
    coverageReporter: {
      type: "html",
      dir: "../angularjs-sample-app/coverage"
    },
    browsers: ["PhantomJS"],
    singleRun: false,
    logLevel: config.LOG_DISABLED
  });
};
