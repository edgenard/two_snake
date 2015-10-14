(function() {
  'use strict';

  var semver = require("semver");

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


}());
