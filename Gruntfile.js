module.exports = function(grunt) { // jshint ignore:line

  "use strict";

  var directories = {
    "app": {
      "conf": "app/conf/",
      "images": "app/images/",
      "views": {
        "root": "app/view/",
        "layouts": "app/view/layouts/",
        "components": "app/view/components/",
        "partials": "app/view/partials/"
      }
    },
    "build": "build/",
    "dist": {
      "root": "dist/",
      "styles": "dist/styles/"
    },
    "nodeModules": "node_modules/"
  };

  grunt.initConfig({
    "clean": {
      "dev": [directories.build],
      "dist": [directories.dist.root]
    },
    "copy": {
      "dist": {
        "files": [
          {
            "expand": true,
            "flatten": true,
            "src": [directories.build + "*"],
            "dest": directories.dist.root
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.app.conf + "favicon/*"],
            "dest": directories.dist.root
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.app.images + "favicon/*"],
            "dest": directories.dist.root
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.nodeModules + "bootstrap/dist/css/bootstrap.min.css"],
            "dest": directories.dist.styles
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
              "favicon": directories.app.views.partials + "favicon.html",
              "style": directories.app.views.partials + "style.html"
            },
            "components": {
              "header": directories.app.views.components + "header.html"
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
