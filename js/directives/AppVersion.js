define(['./directive'], function (directives) {
    'use strict';
    directives.directive('appVersion', [function () {
        return function (scope, elm) {
            //elm.text(version);
        };
    }]);
});