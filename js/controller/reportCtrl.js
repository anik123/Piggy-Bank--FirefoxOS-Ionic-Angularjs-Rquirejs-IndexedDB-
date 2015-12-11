define(['./controller'], function (controllers) {
    'use strict';
    controllers.controller('reportCtrl', [
        '$scope', '$state', '$ionicSideMenuDelegate', '$q', 'reportSvc', '$ionicLoading', '$ionicPopup', function ($scope, $state, $ionicSideMenuDelegate, $q, reportSvc, $ionicLoading, $ionicPopup) {
            $scope.back = back;
            $scope.toggleLeftSideMenu = toggleLeftSideMenu;
            $scope.accountList = [];
            $scope.transaction = [];
            $scope.transactionHistory = [];

            init();

            function back() {
                $state.go('deshboard');
            }
            function toggleLeftSideMenu() {
                $ionicSideMenuDelegate.toggleLeft();
            };
            function init() {
                showLoading();
                loadData();
                //$ionicSideMenuDelegate.canDragContent(true);
            }
            function loadData() {
                try {
                    $q.all([
                    reportSvc.getAllAccount(),
                    reportSvc.getAllTransaction()
                    ]).then(function (data) {
                        $scope.accountList = data[0];
                        $scope.transaction = data[1];
                        joinTable();
                    });
                } catch (e) {
                    alert("Exception", e);
                }
            }
            function joinTable() {
                try {
                    var temp = Enumerable.From($scope.accountList).Join($scope.transaction, '$.AccountID', '$.AccountID', function (account, transaction) {
                        return {
                            AccountID: account.AccountID,
                            AccountName: account.AccountName,
                            AccountIcon: account.AccountIcon,
                            AccountNo: account.AccountNo,
                            Balance: account.Balance,
                            AccountDescription: account.AccountDescription,
                            TotalIncome: account.TotalIncome,
                            TotalExpense: account.TotalExpense,
                            TransactionID: transaction.TransactionID,
                            TransactionDate: transaction.TransactionDate,
                            Amount: transaction.Amount,
                            TransactionType: transaction.TransactionType === "I" ? "Diposit" : "Withdraw",
                            Remarks: transaction.Remarks
                        }
                    }).ToArray();
                    console.log(temp);
                    $scope.transactionHistory = temp;
                    hideLoading();
                } catch (e) {
                    alert("Exception", e);
                }
            }
            function showLoading() {
                $ionicLoading.show({
                    template: '<img src="./img/loading.GIF" style="height:32px;width:32px;">',
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200
                });
            }
            function hideLoading() {
                $ionicLoading.hide();
            }
            function alert(title, msg) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msg
                });
                alertPopup.then(function (res) {

                });
            }
        }
    ]);
});