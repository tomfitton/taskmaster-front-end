module.exports = function(grunt) { // jshint ignore:line

  "use strict";

  var directories = {
    "appConf": "app/conf/",
    "appImages": "app/images/",
    "appViews": {
      "root": "app/view/",
      "layouts": "app/view/layouts/",
      "partials": "app/view/partials/"
    },
    "build": "build/",
    "dist": "dist/"
  };

  grunt.initConfig({
    "clean": {
      "dev": [directories.build],
      "dist": [directories.dist]
    },
    "copy": {
      "dist": {
        "files": [
          {
            "expand": true,
            "flatten": true,
            "src": [directories.build + "*"],
            "dest": directories.dist
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.appConf + "favicon/*"],
            "dest": directories.dist
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.appImages + "favicon/*"],
            "dest": directories.dist
          }
        ]
      }
    },
    "htmlbuild": {
      "dist": {
        "src": directories.appViews.layouts + "index.html",
        "dest": directories.build,
        "options": {
          "beautify": true,
          "sections": {
            "partials": {
              "meta": directories.appViews.partials + "meta.html",
              "favicon": directories.appViews.partials + "favicon.html"
            }
          }
        }
      }
    },
    "watch": {
      "dev": {
        "files": [
          directories.appViews.root + "**",
          directories.appConf + "**",
          directories.appImages + "**"
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
  grunt.loadNpmTasks("grunt-html-build");

  grunt.registerTask("build", ["clean:dist", "htmlbuild", "copy", "clean:dev"]);

};
