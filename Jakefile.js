/* globals desc: false, task: false, complete: false, fail: false, jake:false */

(function() {
  'use strict';

  var semver = require("semver");
  var jshint = require("simplebuild-jshint");
  var karma = require("simplebuild-karma");

  desc("Default Talks");
  task("default",["check-node"], function () {

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
    files: ["Jakefile.js", "src/**/*.js"],
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
    chai       : false,
  };
}


}());
