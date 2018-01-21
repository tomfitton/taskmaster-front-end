module.exports = function(grunt) { // jshint ignore:line

  "use strict";

  var directories = {
    "app": {
      "conf": "app/conf/",
      "images": "app/images/",
      "views": {
        "root": "app/view/",
        "layouts": "app/view/layouts/",
        "partials": "app/view/partials/"
      }
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
            "src": [directories.app.conf + "favicon/*"],
            "dest": directories.dist
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.app.images + "favicon/*"],
            "dest": directories.dist
          }
        ]
      }
    },
    "htmlbuild": {
      "dist": {
        "src": directories.app.views.layouts + "index.html",
        "dest": directories.build,
        "options": {
          "beautify": true,
          "sections": {
            "partials": {
              "meta": directories.app.views.partials + "meta.html",
              "favicon": directories.app.views.partials + "favicon.html"
            }
          }
        }
      }
    },
    "watch": {
      "dev": {
        "files": [
          directories.app.views.root + "**",
          directories.app.conf + "**",
          directories.app.images + "**"
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
