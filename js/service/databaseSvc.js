define(['./service'], function (services) {
    services.factory('database', ['$window', '$q',
    function ($window, $q) {
        var config = {
            databaseName: 'piggybank',
            databaseVersion: 1.0,
            database: {}
        };
        var account = {
            tableName: 'account',
            primaryKey: 'AccountID',
            fields: [
                'AccountName',
                'AccountIcon',
                'AccountNo',
                'AccountDescription',
                'Balance',
                'TotalIncome',
                'TotalExpense'
            ]
        }
        var trnsactionHistory = {
            tableName: 'transaction',
            primaryKey: 'TransactionID',
            fields: [
                'AccountID',
                'TransactionDate',
                'Amount',
                'TransactionType',
                'Remarks'
            ]
        }
        var expenseLimit = {
            tableName: 'expenseLimit',
            primaryKey: 'LimitID',
            fields: [
                'LimitMonth',
                'LimitDate',
                'Amount'
            ]
        }
        var userInfo = {
            tableName: 'userInfo',
            primaryKey: 'UserID',
            fields: [
                'DeviceID',
                'Password'
            ]
        }
        return {
            config: config,
            account: account,
            trnsactionHistory: trnsactionHistory,
            expenseLimit: expenseLimit,
            userInfo: userInfo,
            isSupported: isSupported,
            open: open,
            close: close,
            upgrade: upgrade,
            createTable: createTable,
            removeDatabase: removeDatabase,
            insert: insert,
            update: update,
            deleteEntry: deleteEntry,
            getAllAccount: getAllAccount,
            insertTransaction: insertTransaction,
            insertTransactionExpense: insertTransactionExpense,
            getAllTransaction: getAllTransaction

        };

        function inialize() {
            try {
                //removeDatabase();
                $window.indexedDB = $window.indexedDB || $window.mozIndexedDB || $window.webkitIndexedDB || $window.msIndexedDB;
                $window.IDBTransaction = $window.IDBTransaction || $window.webkitIDBTransaction || $window.msIDBTransaction;
                $window.IDBKeyRange = $window.IDBKeyRange || $window.webkitIDBKeyRange || $window.msIDBKeyRange;
            } catch (e) {
                throw e;
            }
        }

        function isSupported() {
            return $window.indexedDB ? true : false;
        }

        function open() {
            try {
                //removeDatabase();
                if (isSupported()) {
                    inialize();
                    var req = $window.indexedDB.open(config.databaseName, config.databaseVersion);
                    req.onsuccess = function (evt) {
                        config.database = evt.target.result;
                    }
                    req.onerror = function (e) {
                        throw e;
                    };
                    req.onupgradeneeded = function (evt) {
                        createTable(evt.target.result);
                    }
                } else {
                    throw "IndexedDB not supported";
                }
            } catch (e) {
                throw e;
            }
        }

        function close() {

        }

        function upgrade(entity) {

        }

        function error(e) {
            throw e;
        }
        function createTable(dbHandle) {
            try {


                if (dbHandle == null) {
                    throw "Can't create database objects; the database is not open.";
                } else {
                    createAccount(dbHandle);
                    createTransaction(dbHandle);
                    createExpanse(dbHandle);
                    createUserinfo(dbHandle);
                }
            } catch (e) {
                throw e;
            }


        }

        function removeDatabase() {
            try {
                $window.indexedDB.deleteDatabase(config.databaseName);
            } catch (e) {
                throw e;
            }
        }

        function createAccount(dbHandle) {
            try {
                var oOptions = { keyPath: account.primaryKey, autoIncrement: true };
                var oStore = dbHandle.createObjectStore(account.tableName, oOptions);

                var oIxOptions = { unique: false };
                account.fields.forEach(function (item) {
                    oStore.createIndex(item + "Index", item, oIxOptions);
                });
            } catch (e) {
                throw e;
            }
        }

        function createTransaction(dbHandle) {
            try {
                var oOptions = { keyPath: trnsactionHistory.primaryKey, autoIncrement: true };
                var oStore = dbHandle.createObjectStore(trnsactionHistory.tableName, oOptions);

                var oIxOptions = { unique: false, multientry: false };
                trnsactionHistory.fields.forEach(function (item) {
                    oStore.createIndex(item + "Index", item, oIxOptions);
                });
            } catch (e) {
                throw e;
            }
        }
        function createExpanse(dbHandle) {
            try {
                var oOptions = { keyPath: expenseLimit.primaryKey, autoIncrement: true };
                var oStore = dbHandle.createObjectStore(expenseLimit.tableName, oOptions);

                var oIxOptions = { unique: false, multientry: false };
                expenseLimit.fields.forEach(function (item) {
                    oStore.createIndex(item + "Index", item, oIxOptions);
                });

                dbHandle.transaction.oncomplete = function (event) {
                    // Store values in the newly created objectStore.
                    var expenseObjectStore = config.database.transaction(expenseLimit.tableName, "readwrite").objectStore(expenseLimit.tableName);
                    expenseObjectStore.add({ 'LimitMonth': getDate().split('/')[1], 'LimitDate': getDate(), 'Amount': 0 });
                }
            } catch (e) {
                throw e;
            }
        }
        function createUserinfo(dbHandle) {
            try {
                var oOptions = { keyPath: userInfo.primaryKey, autoIncrement: true };
                var oStore = dbHandle.createObjectStore(userInfo.tableName, oOptions);

                var oIxOptions = { unique: false, multientry: false };
                userInfo.fields.forEach(function (item) {
                    oStore.createIndex(item + "Index", item, oIxOptions);
                });
            } catch (e) {
                throw e;
            }
        }

        //#region account

        function insert(tableName, entity) {
            var defered = $q.defer();
            var req = $window.indexedDB.open(config.databaseName, config.databaseVersion);
            req.onsuccess = function (evt) {
                config.database = evt.target.result;

                var objectStore = config.database.transaction(tableName, "readwrite").objectStore(tableName);
                var result = objectStore.add(entity);
                result.onerror = function (e) {
                    defered.reject(e);
                    throw e;
                }

                result.onsuccess = function (e) {
                    defered.resolve(e);
                }

            }
            req.onerror = function (e) {
                defered.reject(e);
            };
            return defered.promise;
        }
        function insertTransaction(tableName, entity, accountEntity) {
            var defered = $q.defer();
            var req = $window.indexedDB.open(config.databaseName, config.databaseVersion);
            req.onsuccess = function (evt) {
                config.database = evt.target.result;

                var objectStore = config.database.transaction(tableName, "readwrite").objectStore(tableName);
                var result = objectStore.add(entity);
                result.onerror = function (e) {
                    defered.reject(e);
                    throw e;
                }

                result.onsuccess = function (e) {
                    //defered.resolve(e);
                    objectStore = config.database.transaction(account.tableName, "readwrite").objectStore(account.tableName);
                    accountEntity.Balance += entity.Amount;
                    accountEntity.TotalIncome += entity.Amount;
                    result = objectStore.put(accountEntity);
                    result.onerror = function (e) {
                        defered.reject(e);
                        console.log(e);
                        throw e;
                    }
                    result.onsuccess = function (e) {
                        defered.resolve(e);
                    }

                }

            }
            req.onerror = function (e) {
                defered.reject(e);
            };
            return defered.promise;
        }
        function insertTransactionExpense(tableName, entity, accountEntity) {
            var defered = $q.defer();
            var req = $window.indexedDB.open(config.databaseName, config.databaseVersion);
            req.onsuccess = function (evt) {
                config.database = evt.target.result;

                var objectStore = config.database.transaction(tableName, "readwrite").objectStore(tableName);
                var result = objectStore.add(entity);
                result.onerror = function (e) {
                    defered.reject(e);
                    throw e;
                }

                result.onsuccess = function (e) {
                    //defered.resolve(e);
                    objectStore = config.database.transaction(account.tableName, "readwrite").objectStore(account.tableName);
                    accountEntity.Balance -= entity.Amount;
                    accountEntity.TotalExpense += entity.Amount;
                    result = objectStore.put(accountEntity);
                    result.onerror = function (e) {
                        defered.reject(e);
                        console.log(e);
                        throw e;
                    }
                    result.onsuccess = function (e) {
                        defered.resolve(e);
                    }

                }

            }
            req.onerror = function (e) {
                defered.reject(e);
            };
            return defered.promise;
        }
        function update(tableName, entity) {
            var defered = $q.defer();
            var req = $window.indexedDB.open(config.databaseName, config.databaseVersion);
            req.onsuccess = function (evt) {
                config.database = evt.target.result;

                var objectStore = config.database.transaction(tableName, "readwrite").objectStore(tableName);
                var result = objectStore.put(entity);
                result.onerror = function (e) {
                    defered.reject(e);
                    console.log(e);
                    throw e;
                }
                result.onsuccess = function (e) {
                    defered.resolve(e);
                }

            }
            return defered.promise;
        }
        function deleteEntry(tableName, entity) {
            var defered = $q.defer();
            var req = $window.indexedDB.open(config.databaseName, config.databaseVersion);
            req.onsuccess = function (evt) {
                config.database = evt.target.result;

                var objectStore = config.database.transaction(tableName, "readwrite").objectStore(tableName);
                var result = objectStore.delete(entity.AccountID);
                result.onerror = function (e) {
                    defered.reject(e);
                    console.log(e);
                    throw e;
                }
                result.onsuccess = function (e) {
                    defered.resolve(e);
                }

            }
            return defered.promise;
        }
        function getAllAccount() {
            var defered = $q.defer();
            try {
                var req = $window.indexedDB.open(config.databaseName, 1.0);
                req.onsuccess = function (evt) {
                    config.database = evt.target.result;
                    var transaction = config.database.transaction(account.tableName, IDBTransaction.READ_ONLY);
                    var objectStore = transaction.objectStore(account.tableName);
                    var tmpData = [];
                    objectStore.openCursor().onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (!cursor) {
                            defered.resolve(tmpData);
                            return;
                        }
                        tmpData.push(cursor.value);
                        cursor.continue();
                    };
                }

            } catch (e) {
                defered.reject("Can't pull from account");
                throw e;
            }
            return defered.promise;
        }
        function getAllTransaction() {
            var defered = $q.defer();
            try {
                var req = $window.indexedDB.open(config.databaseName, 1.0);
                req.onsuccess = function (evt) {
                    config.database = evt.target.result;
                    var transaction = config.database.transaction(trnsactionHistory.tableName, IDBTransaction.READ_ONLY);
                    var objectStore = transaction.objectStore(trnsactionHistory.tableName);
                    var tmpData = [];
                    objectStore.openCursor().onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (!cursor) {
                            defered.resolve(tmpData);
                            return;
                        }
                        tmpData.push(cursor.value);
                        cursor.continue();
                    };
                }

            } catch (e) {
                defered.reject("Can't pull from transaction");
                throw e;
            }
            return defered.promise;
        }

        //#endregion
        //#region transaction
        //#endregion
        //#region expense
        //#endregion
        //#region user
        //#endregion

    }
    ]);
});