/* globals complete: fasle, fail: false, desc: false, task: false */
(function() {
  'use strict';

  var semver = require("semver");
  var jshint = require("simplebuild-jshint");
  var karma = require("simplebuild-karma");



  desc("Default Talks");
  task("default",["check-node", "lint"], function () {

    console.log("\n\nBuild OK");
  });

  desc("Checking Node Version");
  task("check-node", function () {
  console.log("Checking Node version: .");

  var packageJSON = require("./package.json");
  var expectedVersion = "v"+packageJSON.engines.node;

  var actualVersion = process.version;
  if(semver.neq(expectedVersion, actualVersion)) {
    fail("Incorrect Node Version. Expected: " + expectedVersion  + " Actual: " + actualVersion);
  }
  });


  desc("Run JShint");
  task("lint", function () {
    process.stdout.write("Linting JavaScript: ");

    jshint.checkFiles({
      files: ["Jakefile.js", "lib/*.js"],
      options: lintOptions(),

      globals: lintGlobals()

    }, complete, fail);

  }, {async: true});


  function lintOptions() {
    return {
      bitwise  : true,
      eqeqeq   : true,
      forin    : true,
      freeze   : true,
      latedef  : "nofunc",
      noarg    : true,
      nocomma  : true,
      nonbsp   : true,
      nonew    : true,
      strict   : true,
      undef    : true,
      node     : true,
      browser  : true,
      expr     : true
    };
  }

  function lintGlobals() {
    return {
      describe   : false,
      it         : false,
      after      : false,
      before     : false,
      beforeEach : false,
      afterEach  : false,
      jasmine    : false,
      Snake      : false,
      $          : false,

    };
  }



 // Testing

  var KARMA_CONFIG = "karma.conf.js";

  desc("Start the Karma server(run this first)");
  task("karma", function () {
    console.log("Starting the Karma server:");
    karma.start({
      configFile: KARMA_CONFIG
    }, complete, fail);
  }, {async: true});

  desc("Run Tests");
  task("tests", function () {
    console.log("Running JS tests: ");
    karma.run({
      configFile: KARMA_CONFIG,
      strict: !process.env.loose
    }, complete, fail);
  }, {async: true});

}());
