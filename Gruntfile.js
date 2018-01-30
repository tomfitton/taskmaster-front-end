module.exports = function(grunt) { // jshint ignore:line

  "use strict";

  var directories = {
    "app": {
      "conf": "app/conf/",
      "images": "app/images/",
      "js": {
        "root": "app/js/",
        "controllers": "app/js/controllers/",
        "libraries": "app/js/libraries/",
        "services": "app/js/services/"
      },
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
      "scripts": "dist/scripts/",
      "styles": "dist/styles/"
    },
    "nodeModules": "node_modules/"
  };

  grunt.initConfig({
    "pkg": grunt.file.readJSON("package.json"),
    "clean": {
      "dev": [directories.build],
      "dist": [directories.dist.root]
    },
    "concat": {
      "dist": {
        "src": [
          directories.app.js.libraries + "Init.js",
          directories.app.js.libraries + "StringUtils.js",
          directories.app.js.root + "app.js",
          directories.app.js.root + "config.js",
          directories.app.js.services + "Board.js",
          directories.app.js.controllers + "Boards.js",
          directories.app.js.controllers + "CreateBoard.js"
        ],
        "dest": directories.build + "<%= pkg.name %>.js"
      }
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
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.nodeModules + "angular/angular.min.js"],
            "dest": directories.dist.scripts
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.nodeModules + "angular-route/angular-route.min.js"],
            "dest": directories.dist.scripts
          },
          {
            "expand": true,
            "flatten": true,
            "src": [directories.app.views.components + "angular/**"],
            "dest": directories.dist.root
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
    "uglify": {
      "dist": {
        "files": [{
          "src": directories.build + "<%= pkg.name %>.js",
          "dest": directories.dist.scripts + "<%= pkg.name %>.min.js"
        }]
      }
    },
    "watch": {
      "dev": {
        "files": [
          directories.app.views.root + "**",
          directories.app.conf + "**",
          directories.app.images + "**",
          directories.app.js.root + "**"
        ],
        "tasks": ["build"],
        "options": {
          "spawn": false
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-html-build");

  grunt.registerTask("build", [
    "clean:dist",
    "htmlbuild",
    "copy",
    "concat",
    "uglify",
    "clean:dev"
  ]);

};
