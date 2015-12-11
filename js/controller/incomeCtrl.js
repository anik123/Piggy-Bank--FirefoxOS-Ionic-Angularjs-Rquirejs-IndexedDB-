define(['./controller'], function (controllers) {
    'use strict';
    controllers.controller('incomeCtrl', [
        '$scope', '$state', '$timeout', 'incomeSvc', '$q', '$ionicLoading', '$ionicPopup', function ($scope, $state, $timeout, incomeSvc, $q, $ionicLoading, $ionicPopup) {
            $scope.currentDate = getDate();
            $scope.back = back;
            $scope.transaction = {};
            $scope.accountEntity = {};
            $scope.accountList = [];
            $scope.oneTimeOnly = true;//IE Hack
            $scope.getBalance = getBalance;
            $scope.save = save;

            function transaction(entity) {
                var dfltVal = entity || {};
                this.AccountID = dfltVal.AccountID || 0;
                this.TransactionDate = dfltVal.TransactionDate || new Date(getDate());
                this.Amount = dfltVal.Amount || 0.0;
                this.TransactionType = dfltVal.TransactionType || "I";
                this.Remarks = dfltVal.Remarks || null;
                this.TransactionBalance = dfltVal.TransactionBalance || 0.0;
            }

            showLoading();
            init();
            function init() {
                getAllAccount();
                $timeout(function () {
                    $scope.transaction = new transaction();

                }, 0);
            }
            function back() {
                $state.transitionTo('deshboard');
            }
            function getAllAccount() {
                $q.all([incomeSvc.getAllAccount()]).then(function (data) {
                    $scope.accountList = formateDataList(data[0]);
                    hideLoading();
                });
            }
            function formateDataList(dataList) {
                var tmpData = Enumerable.From(dataList).OrderBy("$.AccountName");
                return tmpData.ToArray();
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
            function getBalance(entity) {
                try {
                    var data = Enumerable.From($scope.accountList).Where(function (x) {
                        return x.AccountID === entity.AccountID;
                    });
                    if (data.Count() > 0) {
                        var fixed = data.First().Balance.toFixed(2);
                        $scope.transaction.TransactionBalance = parseFloat(fixed);
                    }
                } catch (e) {
                    alert("Exception", e);
                }
            }
            function alert(title, msg) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msg
                });
                alertPopup.then(function (res) {

                });
            }
            function save(form, entity) {
                if ($scope.oneTimeOnly) {

                    try {

                        //if()
                        if (entity.AccountID === 0 || entity.AccountID === null || entity.AccountID === "") {
                            alert("Validation Error", "Please choose an account");
                            return;
                        }
                        if (!entity.TransactionDate || !isValidDate(entity.TransactionDate)) {
                            alert("Validation Error", "Please select a valid date");
                            return;
                        }
                        if (!entity.Amount || isNaN(entity.Amount)) {
                            alert("Validation Error", "Please select a valid date");
                            return;
                        } if (parseFloat(entity.Amount) <= 0) {
                            alert("Validation Error", "Negetive or zero Balance is not allowed");
                            return;
                        }
                        $scope.oneTimeOnly = false;

                        delete entity.TransactionBalance;
                        showLoading();
                        $scope.accountEntity = Enumerable.From($scope.accountList).Where(function (x) { return x.AccountID === entity.AccountID }).First();
                        incomeSvc.insert(entity, $scope.accountEntity).then(function () {
                            form.$setPristine();
                            afterSave();
                        });


                    } catch (e) {
                        $scope.oneTimeOnly = true;
                        hideLoading();
                        alert("Exception", e);
                    }
                }
            }
            function afterSave() {
                $scope.oneTimeOnly = true;
                init();
                alert("Success", "Balance deposited successfully");
            }
            function isValidDate(date) {
                return Object.prototype.toString.call(date) === "[object Date]" ? true : false;
            }
        }
    ]);
});