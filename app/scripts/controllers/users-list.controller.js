'use strict';

angular.module('app').controller('UsersListController', function(UsersService, users, $uibModal) {

	//scope models
	this.users = users;
	var vm = this;

	//scope methods
	this.showUserModal = function(user) {
		var modal = $uibModal.open({
			animation: true,
			templateUrl: 'userModal.html',
			size: 'lg',
			controller: function($scope, $uibModalInstance, user, usersService) {
				$scope.user = user;

				$scope.ok = function() {
					var savePromise = null;
					if (user.id) {
						savePromise = usersService.update(user);
					} else {
						savePromise = usersService.create(user);
					}
					savePromise.then(function(result) {
						$uibModalInstance.close($scope.user);
					});
				};

				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};

			},
			resolve: {
				user: function() {
					return user;
				},
				usersService: UsersService
			}

		});

		modal.result.then(function(user) {
			vm.listUsers();
		}, function() {

		});
	};

	this.listUsers = function() {
		var listPromise = UsersService.list();
		listPromise.then(function(result) {
			vm.users = result;
		});
	};

	this.removeUser = function(user) {
		var confirm = window.confirm("Do you really would like to remove the user " + user.name + "?");
		if (confirm) {
			var removePromise = UsersService.remove(user.id);
			removePromise.then(function(result) {
				vm.listUsers();
			});
		}
	};

	this.init = function() {};
	this.init();

	//scope listeners

});
