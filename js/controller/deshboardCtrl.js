define(['./controller'], function (controllers) {
    'use strict';
    controllers.controller('deshboardCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        console.log("demoCtrl");


        $scope.devList = [
   { text: "HTML5", checked: true },
   { text: "CSS3", checked: false },
   { text: "JavaScript", checked: false }
        ];

        $scope.pushNotificationChange = function () {
            console.log('Push Notification Change', $scope.pushNotification.checked);
        };

        $scope.pushNotification = { checked: true };
        $scope.emailNotification = 'Subscribed';
    }]);
});