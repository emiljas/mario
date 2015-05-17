/// <reference path="../typings/tsd.d.ts" />

requirejs.config({
    baseUrl: "../bower_components/",
    paths: {
        bluebird: "bluebird/js/browser/bluebird",
        underscore: "underscore/underscore"
    }
});

requirejs(["../scripts/main"]);
