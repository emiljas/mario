/// <reference path="../typings/tsd.d.ts" />
requirejs.config({
    baseUrl: "../bower_components/",
    paths: {
        "bluebird": "bluebird/js/browser/bluebird",
        "underscore": "underscore/underscore",
        "Stats": "stats.js/build/stats.min"
    },
    shim: {
        "Stats": {
            exports: "Stats"
        }
    }
});
requirejs(["../scripts/main"]);
