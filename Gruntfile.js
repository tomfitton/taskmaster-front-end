module.exports = function(grunt) { // jshint ignore:line

  "use strict";

  var directories = {
    "appViews": "app/view/",
    "dist": "dist/"
  };

  grunt.initConfig({
    "clean": [directories.dist],
    "copy": {
      "dist": {
        "files": [
          {
            "expand": true,
            "flatten": true,
            "src": [directories.appViews + "*"],
            "dest": directories.dist
          }
        ]
      }
    },
    "watch": {
      "dev": {
        "files": [
          directories.appViews + "*"
        ],
        "tasks": ["build"],
        "options": {
          "spawn": false
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("build", ["clean", "copy"]);

};
