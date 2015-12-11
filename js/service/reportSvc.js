define(['./service'], function (services) {
    'use strict';
    services.factory('reportSvc', [
        'database',
        function (database) {
            open();
            var service = {
                insert: insert,
                update: update,
                deleteEntity: deleteEntity,
                getAllAccount: getAllAccount,
                getAllTransaction: getAllTransaction


            };
            return service;
            function open() {
                try {
                    database.open();
                } catch (e) {
                    throw e;
                }
            }
            function insert(entity, accountEntity) {
                try {
                    return database.insertTransaction(database.trnsactionHistory.tableName, entity, accountEntity);
                } catch (e) {
                    throw e;
                }
            }
            function update(entity) {
                try {
                    return database.update(database.trnsactionHistory.tableName, entity);
                } catch (e) {
                    throw e;
                }
            }
            function deleteEntity(entity) {
                try {
                    return database.deleteEntry(database.trnsactionHistory.tableName, entity);
                } catch (e) {
                    throw e;
                }
            }
            function getAllAccount() {
                try {
                    return database.getAllAccount();
                } catch (e) {
                    throw e;
                }
            }
            function getAllTransaction() {
                try {
                    return database.getAllTransaction();
                } catch (e) {
                    throw e;
                }
            }

        }
    ]);
});