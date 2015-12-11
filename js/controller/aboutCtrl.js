define(['./controller'], function (controllers) {
    'use strict';
    controllers.controller('aboutCtrl', [
        '$scope', '$ionicSlideBoxDelegate', '$state', function ($scope, $ionicSlideBoxDelegate, $state) {
            $scope.myActiveSlide = 0;
            $scope.slide = slide;
            $scope.back = back;

            function back() {
                $state.go('deshboard');
            }

            function slide(index) {
                $ionicSlideBoxDelegate.slide(index, 500);
                // $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
            }
        }
    ]);
});