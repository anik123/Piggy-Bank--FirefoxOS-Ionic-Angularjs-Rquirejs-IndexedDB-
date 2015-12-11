define(['./directive'], function (directives) {
    'use strict';
    directives.directive('iconSet', ['$ionicModal', '$parse', function ($ionicModal, $parse) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, $element, $attr, $ctrl) {
                $scope.chooseIcon = chooseIcon;
                $scope.appIcon = [
                {
                    'icon':
                    [
                    'ion-ionic',
                    'ion-navicon-round',
                    'ion-arrow-expand',
                    'ion-log-in'
                    ]
                },
                {
                    'icon': [
                    'ion-log-out',
                    'ion-checkmark-round',
                    'ion-minus-circled',
                    'ion-help-circled'
                    ]
                },
            {
                'icon': [
                   'ion-help-buoy',
                   'ion-asterisk',
                   'ion-home',
                   'ion-flag']
            }, {
                'icon': [
                'ion-heart',
                'ion-heart-broken',
                'ion-clipboard',
                'ion-funnel']
            }, {
                'icon': [
                'ion-bookmark',
                'ion-email',
                'ion-filing',
                'ion-archive']
            }, {
                'icon': [
                'ion-paper-airplane',
                'ion-paperclip',
                'ion-link',
                'ion-medkit']
            }, {
                'icon': [
                    'ion-quote',
                    'ion-lock-combination',
                    'ion-arrow-graph-up-right',
                    'ion-chatbubble-working']
            },
            {
                'icon': [
                'ion-beer',
                'ion-coffee',
                'ion-icecream',
                'ion-camera']
            }, {
                'icon': [
                    'ion-speakerphone',
                    'ion-bag',
                    'ion-cash',
                    'ion-ribbon-a']
            }, {
                'icon': [
                    'ion-planet',
                    'ion-cube',
                    'ion-model-s',
                    'ion-plane']
            }, {
                'icon': [
                    'ion-ios-pricetag',
                    'ion-ios-pulse-strong',
                    'ion-ios-medkit',
                    'ion-android-restaurant']
            }, {
                'icon': [
                'ion-social-snapchat',
                'ion-social-usd',
                'ion-social-bitcoin',
                'ion-social-euro']
            }, {
                'icon': [
                    'ion-at',
                    'ion-pound',
                    'ion-location',
                    'ion-key'
                ]
            },
             {
                 'icon': [
                     'ion-battery-full',
                     'ion-bug',
                     'ion-closed-captioning',
                     'ion-music-note'
                 ]
             },
             {
                 'icon': [
                     'ion-tshirt',
                     'ion-social-tux',
                     'ion-social-freebsd-devil',
                     'ion-android-locate'
                 ]
             }
                ];
                $ionicModal.fromTemplateUrl('views/iconSet.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                });

                function click(e) {
                    $scope.modal.show();
                }

                function chooseIcon(icon) {
                    try {
                        $scope.modal.hide();

                        $attr.onIconChoose && $parse($attr.onIconChoose)($scope)({
                            "icon": icon
                        });

                    } catch (e) {
                        throw e;
                    }

                }

                $scope.$on("$destroy", function () {
                    $scope.modal.remove();
                });

                $element.on("click", click);
            }
        };
    }]);
});