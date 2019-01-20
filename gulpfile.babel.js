import gulp from "gulp";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import connect from "gulp-connect";
import minifyHtml from "gulp-minify-html";
import templatecache from "gulp-angular-templatecache";
import livereload from "gulp-livereload";
import sass from "gulp-sass";
import cleanCss from "gulp-clean-css";
import jshint from "gulp-jshint";
import htmlhint from "gulp-htmlhint";
import sasslint from "gulp-sass-lint";
import spritesmith from "gulp.spritesmith";
import imagemin from "gulp-imagemin";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import del from "del";
import opn from "opn";
import merge from "merge-stream";
import jshintOptions from "./config/jshintConfig";
import htmlhintOptions from "./config/htmlhintConfig";
import sasslintOptions from "./config/sasslintConfig";

const paths = {
  javascript: {
    allEs6Scripts: "./src/**/*.js",
    transpiledScriptsPath: "./assets/scripts",
    allTranspiledScripts: "./assets/scripts/*.js",
    browserifyEntry: "./assets/scripts/app.js",
    distScriptsPath: "./dist/scripts"
  },
  scss: {
    allScssFiles: "./assets/styles/*.scss",
    scssFiles: "./assets/styles"
  },
  css: {
    cssFilesPath: "./dist/styles",
    allCssFiles: "./dist/styles/*.css"
  },
  html: {
    partialViews: "./src/**/*.html",
    cachedViews: "./src/shared/views.js",
    index: "./src/index.html"
  },
  misc: {
    dist: "./dist",
    distImg: "./dist/assets/img",
    shared: "./src/shared",
    images: "./assets/img/*.png",
    devWatchPaths: [
      "./src/**",
      "./assets/styles/**",
      "!./src/shared/views.js",
      "!./assets/styles/_sprites.scss",
      "!./src/**/*Tests.js"
    ],
    spritesScssFilePath: "./assets/styles/_sprites.scss",
    vendorAssets: "./assets/vendor/*.js",
    distVendor: "./dist/assets/vendor",
    tests: "./src/**/*Tests.js"
  }
},
  webServerConfig = {
    rootDir: "./dist",
    livereload: true,
    port: 4200,
    fallback: "dist/index.html"
  },
  templateCachingOptions = {
    module: "templates",
    standalone: true,
    moduleSystem: "Browserify",
    root: "/views"
  },
  cssMinifyOptions = {
    compatibility: "ie7"
  },
  spritesConfig = {
    imgName: "sprites.png",
    imgPath: "/dist/assets/img/sprites.png",
    cssName: "_sprites.scss",
    padding: 5
  },
  defaultWebserverAddress = "http://localhost:4200/cats",
  defaultBundleFileName = "bundle.js",
  defaultCachedViewsFileName = "views.js",
  defaultJshintReporter = "jshint-stylish";

const pipes = {
  clean: () =>
    del([
      paths.misc.dist,
      paths.html.cachedViews,
      paths.javascript.transpiledScriptsPath,
      paths.misc.spritesScssFilePath
    ]),
  deleteTranspiledScripts: () => del([paths.javascript.transpiledScriptsPath]),
  jshint: () =>
    gulp
      .src([paths.javascript.allEs6Scripts, "!" + paths.html.cachedViews, "!" + paths.misc.tests])
      .pipe(jshint(jshintOptions))
      .pipe(jshint.reporter(defaultJshintReporter)),
  htmlhint: () =>
    gulp
      .src(paths.html.partialViews)
      .pipe(htmlhint(htmlhintOptions))
      .pipe(htmlhint.reporter()),
  sasslint: () =>
    gulp
      .src(paths.scss.allScssFiles)
      .pipe(sasslint(sasslintOptions))
      .pipe(sasslint.format()),
  transpileEs6: () =>
    gulp
      .src([paths.javascript.allEs6Scripts, "!" + paths.misc.tests])
      .pipe(babel())
      .pipe(gulp.dest(paths.javascript.transpiledScriptsPath)),
  compileScss: () =>
    gulp
      .src(paths.scss.allScssFiles)
      .pipe(sass())
      .pipe(cleanCss(cssMinifyOptions))
      .pipe(gulp.dest(paths.css.cssFilesPath)),
  buildSprites: () => {
    let spritesData = gulp
      .src(paths.misc.images)
      .pipe(spritesmith(spritesConfig));

    let imgStream = spritesData.img
      .pipe(buffer())
      .pipe(imagemin())
      .pipe(gulp.dest(paths.misc.distImg));

    let scssStream = spritesData.css.pipe(gulp.dest(paths.scss.scssFiles));

    return merge(imgStream, scssStream);
  },
  moveVendorAssets: () =>
    gulp.src(paths.misc.vendorAssets).pipe(gulp.dest(paths.misc.distVendor)),
  browserify: () =>
    browserify(paths.javascript.browserifyEntry)
      .bundle()
      .pipe(source(defaultBundleFileName))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(paths.javascript.distScriptsPath)),
  addPartialViewsToCache: () =>
    gulp
      .src(paths.html.partialViews)
      .pipe(minifyHtml())
      .pipe(templatecache(defaultCachedViewsFileName, templateCachingOptions))
      .pipe(gulp.dest(paths.misc.shared)),
  buildIndex: () =>
    gulp
      .src(paths.html.index)
      .pipe(minifyHtml())
      .pipe(gulp.dest(paths.misc.dist))
      .pipe(pipes.reloadWebServer()),
  webServer: () => {
    connect.server(webServerConfig);
    opn(defaultWebserverAddress);
  },
  reloadWebServer: () => livereload(),
  listen: () => {
    livereload.listen();
    gulp.watch(paths.misc.devWatchPaths, gulp.series("prepareApp"));
  }
};

gulp.task("clean", () => pipes.clean());

gulp.task("deleteTranspiledScripts", () => pipes.deleteTranspiledScripts());

gulp.task("jshint", done => {
  pipes.jshint();
  done();
});

gulp.task("htmlhint", done => {
  pipes.htmlhint();
  done();
});

gulp.task("sasslint", done => {
  pipes.sasslint();
  done();
});

gulp.task("transpileEs6", () => pipes.transpileEs6());

gulp.task("browserify", () => pipes.browserify());

gulp.task("moveVendor", () => pipes.moveVendorAssets());

gulp.task("buildIndex", () => pipes.buildIndex());

gulp.task("buildSprites", () => pipes.buildSprites());

gulp.task("server", done => {
  pipes.webServer();
  done();
});

gulp.task("templateCaching", () => pipes.addPartialViewsToCache());

gulp.task("compileSass", done => {
  pipes.compileScss();
  done();
});

gulp.task("listen", done => {
  pipes.listen();
  done();
});

gulp.task("reloadWebserver", done => {
  pipes.reloadWebServer();
  done();
});

gulp.task(
  "buildScripts",
  gulp.series(
    "jshint",
    "transpileEs6",
    "browserify",
    "moveVendor",
    "buildIndex"
  )
);

gulp.task(
  "prepareApp",
  gulp.series(
    "clean",
    gulp.parallel(
      gulp.series("htmlhint", "templateCaching", "buildScripts"),
      gulp.series("buildSprites", "sasslint", "compileSass")
    ),
    "deleteTranspiledScripts"
  ),
  done => done()
);

gulp.task("default", gulp.series("prepareApp", "server", "listen"));
