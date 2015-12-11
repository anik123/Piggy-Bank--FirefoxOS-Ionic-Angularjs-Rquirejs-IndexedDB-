define(['./app'], function (app) {
    'use strict';
    return app.config(function ($urlRouterProvider, $stateProvider) {
        try {
            $urlRouterProvider.otherwise('deshboard');
            $stateProvider.state('deshboard', {
                url: '/deshboard',
                templateUrl: 'views/deshboard.html',
                controller: 'deshboardCtrl'
            }).state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'aboutCtrl'
            }).state('account', {
                url: '/account',
                templateUrl: 'views/account.html',
                controller: 'accountCtrl'
            }).state('expense', {
                url: '/expense',
                templateUrl: 'views/expense.html',
                controller: 'expenseCtrl'
            }).state('income', {
                url: '/income',
                templateUrl: 'views/income.html',
                controller: 'incomeCtrl'
            }).state('report', {
                url: '/report',
                templateUrl: 'views/report.html',
                controller: 'reportCtrl'
            }).state('settings', {
                url: '/settings',
                templateUrl: 'views/settings.html',
                controller: 'settingsCtrl'
            });
        } catch (e) {
            console.log(e);
        }

    });
});