﻿(function () {
    materialAdmin.controller('userController', [
        'abp.services.app.user','ngTableParams','notifyService',
        function (userService, ngTableParams, notifyService) {
            var vm = this;
            vm.activeTab = "user";
            vm.roleTab = function () {
                vm.activeTab = "role";
            }
            vm.userTab = function () {
                vm.activeTab = "user";
            }
            vm.tableBasic = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 0,
                getData: function ($defer, params) {
                    userService.getUsers({
                        skipCount: (params.page() - 1) * params.count(), maxResultCount: params.count()
                    }).success(function (data) {
                        params.total(data.totalCount);
                        $defer.resolve(data.items);
                    });

                }
            });
            vm.add = function () {
                vm.user = {};
                userService.getUserForEdit({id:null}).success(function (data) {
                    vm.user = data;
                });
            }
            vm.getUserDetail = function (id) {
                userService.getUserForEdit({ id: id }).success(function (data) {
                    vm.user = data;
                });
            }
            vm.save = function () {
                userService.addOrUpdate(vm.user).success(function () {
                    vm.tableBasic.reload();
                    notifyService.notify('保存成功！', 'success');
                    $("#modalUserEdit").modal("hide");
                });
            }
        }
    ]);
})();