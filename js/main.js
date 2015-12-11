require.config({

    paths: {
        'domReady': './libs/domReady',
        'jquery': './libs/jquery-2.1.3.min',
        'linq': './libs/linq.min',
        'angular': './libs/angular.min',
        "uiRouter": "./libs/angular-ui-router.min",
        "angular_ionic": "./libs/ionic-angular.min",
        "ionic": "./libs/ionic.min",
        'angular_animate': './libs/angular-animate.min',
        'angular_sanitize': './libs/angular-sanitize.min',
        'modernizr': './libs/modernizr.touch',
        'mfb': './libs/mfb-directive'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'jquery': {
            'exports': 'jquery'
        },
        'angular': {
            'exports': 'angular'
        },
        'linq': {
            deps: ['jquery']
        }
        ,
        'uiRouter': {
            deps: ['angular', 'jquery']
        },
        'ionic': {
            deps: ['angular'],
            'exports': 'ionic'
        },
        'angular_animate': {
            deps: ['angular']
        },
        'angular_sanitize': {
            deps: ['angular']
        },
        'angular_ionic': {
            deps: ['angular', 'ionic', 'angular_sanitize', 'angular_animate', 'linq']
        },
        'mfb': {
            deps: ['angular', 'modernizr']
        }

    },

    deps: [
        // kick start application... see bootstrap.js
        './javascriptVariable', './bootstrap'
    ]
});