define(['./service'], function (services) {
    'use strict';
    services.factory('accountSvc', [
        'database',
        function (database) {
            open();
            var service = {
                insert: insert,
                update: update,
                deleteEntity: deleteEntity,
                getAllAccount: getAllAccount,
                isExists: isExists
            };
            return service;
            function open() {
                try {
                    database.open();
                } catch (e) {
                    throw e;
                }
            }
            function insert(entity) {
                try {
                    return database.insert(database.account.tableName, entity);
                } catch (e) {
                    throw e;
                }
            }
            function update(entity) {
                try {
                    return database.update(database.account.tableName, entity);
                } catch (e) {
                    throw e;
                }
            }
            function deleteEntity(entity) {
                try {
                    return database.deleteEntry(database.account.tableName, entity);
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
            function isExists(entityList, entity, isEdit) {
                var list = Enumerable.From(entityList);
                list = isEdit ? list.Where(function (x) { return x.AccountName.trim() === entity.AccountName.trim() && x.AccountNo.trim() === entity.AccountNo.trim() && x.AccountID !== entity.AccountID }) : list.Where(function (x) { return x.AccountName.trim() === entity.AccountName.trim() && x.AccountNo.trim() === entity.AccountNo.trim() });
                return list.Count() > 0;
            }
        }
    ]);
});