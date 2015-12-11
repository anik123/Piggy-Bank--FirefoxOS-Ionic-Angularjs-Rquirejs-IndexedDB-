/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'uiRouter',
    'angular_ionic',
    'mfb',
    './controller/index',
    //'./filters/index',
    './directives/index',
    './service/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'app.directives',
        //'app.filters',
        'ui.router',
        'ionic',
        'ng-mfb'
    ]);
});