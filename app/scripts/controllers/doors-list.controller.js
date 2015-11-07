'use strict';

angular.module('app').controller('DoorsListController', function(DoorsService, $uibModal, AuthService, doors, users) {
	//scope variables
	var vm = this;
	this.doors = doors;
	this.users = users;

	//scope methods
	this.listDoors = function() {
		var listPromise = DoorsService.list();
		listPromise.then(function(result) {
			vm.doors = result;
		});
	};

	this.showDoorModal = function(door) {
		var modal = $uibModal.open({
			animation: true,
			templateUrl: 'doorModal.html',
			size: 'lg',
			controller: function($scope, $uibModalInstance, door, doorsService) {
				$scope.door = door;

				$scope.ok = function() {
					var savePromise = null;
					if (door.id) {
						savePromise = doorsService.update(door);
					} else {
						savePromise = doorsService.create(door);
					}
					savePromise.then(function(result) {
						$uibModalInstance.close($scope.door);
					});
				};

				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};

			},
			resolve: {
				door: function() {
					return door;
				},
				doorsService: DoorsService
			}

		});

		modal.result.then(function(door) {
			vm.listDoors();
		}, function() {

		});
	};

	this.removeDoor = function(door) {
		var shouldRemove = window.confirm('Do you really want to remove the door: ' + door.title + '?');
		if (!shouldRemove) {
			return;
		}
		var removePromise = DoorsService.remove(door.id);
		removePromise.then(function(result) {
			vm.listDoors();
		});
	};

	this.toggleDoorStatus = function(door) {
		door.is_open = !door.is_open;
		var updatePromise = DoorsService.toggle(door, AuthService.currentUser().id);
		updatePromise.then(function(result) {
			vm.listDoors();
		});
	};

	this.userHasAccess = function(door) {
		var currentUser = AuthService.currentUser();
		var doorUsers = door.users.map(function(u) {
			return u.id;
		});

		if (doorUsers.indexOf(currentUser.id) == -1) {
			return false;
		}

		return true;
	};

	this.showPermissionsModal = function(door) {
		var modal = $uibModal.open({
			animation: true,
			templateUrl: 'permissionsModal.html',
			size: 'lg',
			controller: function($scope, $uibModalInstance, door, doorsService, users) {
				$scope.door = door;
				$scope.users = users;
				console.log(users);
				$scope.ok = function() {
					var savePromise = null;
					savePromise = doorsService.updateUsers(door);
					savePromise.then(function(result) {
						$uibModalInstance.close($scope.door);
					});
				};

				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};

				$scope.addUsersToDoor = function() {
					angular.forEach($scope.available_users, function(u) {
						door.users.push(u);
					});
				};

				$scope.removeUsersFromDoor = function() {
					angular.forEach($scope.selected_users, function(u) {
						door.users.pop(u);
					});
				};

			},
			resolve: {
				door: function() {
					return door;
				},
				doorsService: DoorsService,
				users: function() {
					return vm.users;
				}
			}

		});

		modal.result.then(function(door) {
			vm.listDoors();
		}, function() {

		});
	};

	this.init = function() {};
	this.init();
	//scope listeners
});
