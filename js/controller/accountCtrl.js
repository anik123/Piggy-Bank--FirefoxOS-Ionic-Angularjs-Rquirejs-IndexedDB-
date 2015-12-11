define(['./controller'], function (controllers) {
    'use strict';
    controllers.controller('accountCtrl', [
        '$scope', '$ionicModal', '$timeout', '$ionicPopup', 'accountSvc', '$q', '$ionicActionSheet', '$ionicLoading', '$state', function ($scope, $ionicModal, $timeout, $ionicPopup, accountSvc, $q, $ionicActionSheet, $ionicLoading, $state) {
            $ionicModal.fromTemplateUrl('views/addAccount.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });


            function account(entity) {
                var dflt = entity || {};
                //this.AccountID = dflt.AccountID || 0;
                this.AccountName = dflt.AccountName || null;
                this.AccountIcon = dflt.AccountIcon || "ion-plus-round";
                this.AccountNo = dflt.AccountNo || null;
                this.AccountDescription = dflt.AccountDescription || null;
                this.Balance = dflt.Balance || 0;
                this.TotalIncome = dflt.TotalIncome || 0;
                this.TotalExpense = dflt.TotalExpense || 0;
            }

            $scope.addAcount = addAcount;
            $scope.closeModal = closeModal;
            $scope.getIcon = getIcon;
            $scope.account = {};
            $scope.saveAccount = saveAccount;
            $scope.edit = edit;
            $scope.oneTimeOnly = true;//IE Hack
            $scope.accountList = [];
            $scope.back = back;

            getAccount();

            $scope.button = {
                isEdit: false,
                buttonText: '',
                editText: 'Update account',
                insertText: 'Add new account'
            }
            $scope.search = {
                serachText: ''
            };
            showLoading();

            function init() {
                try {
                    $timeout(function () {
                        $scope.account = new account();
                    }, 0);
                    setButtonText();
                } catch (e) {
                    throw e;
                }
            }
            function setButtonText() {
                $timeout(function () {
                    $scope.button.buttonText = $scope.button.isEdit ? $scope.button.editText : $scope.button.insertText;
                }, 0);
            }

            function addAcount() {
                $scope.oneTimeOnly = true;
                init();
                $scope.modal.show();
            }

            function closeModal() {
                $scope.button.isEdit = false;
                $scope.modal.hide();
            }
            function getIcon(e) {
                $scope.account.AccountIcon = e.icon;
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

            function saveAccount(form, entity) {
                if ($scope.oneTimeOnly) {
                    try {
                        if (!entity.AccountName) {
                            alert("Validation Error!", "Account name is required");
                            return;
                        }
                        else if (accountSvc.isExists($scope.accountList, entity, $scope.button.isEdit)) {
                            console.log("Edit");
                            alert("Duplication", "Data already exists");
                            return;
                        }
                        else {
                            showLoading();
                            $scope.oneTimeOnly = false;
                            if (!$scope.button.isEdit) {
                                accountSvc.insert(entity).then(function () {
                                    form.$setPristine();
                                    afterSave();
                                });
                            } else {
                                accountSvc.update(entity).then(function () {

                                    form.$setPristine();
                                    afterSave();
                                });
                            }
                        }
                    } catch (e) {
                        alert("Exception", e);
                        hideLoading();
                    }
                }
            }
            function edit(entity) {
                //var v = entity;
                //console.log(entity);
                $scope.button.isEdit = true;
                $scope.oneTimeOnly = true;
                $ionicActionSheet.show({
                    buttons: [
                      { text: 'Edit Account' },
                      { text: 'Delete Account' }
                    ],
                    titleText: 'Modify account',
                    cancelText: 'Cancel',
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            //edit
                            $scope.account = angular.copy(entity);
                            setButtonText();
                            $scope.modal.show();
                        }
                        else if (index === 1) {
                            //Delete
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Confirm actions',
                                template: 'Are you sure you want to delete this account?'
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    accountSvc.deleteEntity(entity).then(function () {
                                        alert("Success", "Successfully deleted!");
                                        afterSave();
                                    });
                                } else {
                                    console.log('You are not sure');
                                }
                            });
                        }
                        return true;
                    }
                });

            }
            function afterSave() {
                // $scope.form.$setPristine();
                init();
                getAccount();
                $scope.button.isEdit = false;
                setButtonText();
                $scope.modal.hide();
            }

            function getAccount() {
                try {
                    $q.all([accountSvc.getAllAccount()]).then(function (data) {
                        loadAccount(data[0]);
                    });
                } catch (e) {
                    alert("Exception", e);
                }
            }
            function loadAccount(data) {
                var temp = Enumerable.From(data).OrderByDescending("$.AccountID");
                $scope.accountList = temp.ToArray();
                hideLoading();
            }
            function back() {
                $state.transitionTo('deshboard');
            }

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
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