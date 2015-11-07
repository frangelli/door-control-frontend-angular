'use strict';

angular.module('app').service('DoorsService', function($http, $q, API_URL) {
	return {
		list: function() {
			var deferred = $q.defer();
			var req = {
				method: 'get',
				url: API_URL + '/doors'
			};
			$http(req).then(function(response) {
				deferred.resolve(response.data);
			}, function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		},
		find: function(id) {
			var deferred = $q.defer();
			var req = {
				method: 'get',
				url: API_URL + '/doors/' + id
			};
			$http(req).then(function(response) {
				deferred.resolve(response.data);
			}, function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		},
		remove: function(id) {
			var deferred = $q.defer();
			var req = {
				method: 'delete',
				url: API_URL + '/doors/' + id
			};
			$http(req).then(function(response) {
				deferred.resolve(response.data);
			}, function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		},
		findByUserId: function(user_d) {
			var deferred = $q.defer();
			var req = {
				method: 'get',
				url: API_URL + '/doors/find_by_user_id/' + id
			};
			$http(req).then(function(response) {
				deferred.resolve(response.data);
			}, function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		},
		create: function(door) {
			var deferred = $q.defer();
			var req = {
				method: 'POST',
				url: API_URL + '/doors',
				headers: {
					'Content-Type': 'application/json'
				},
				data: door
			};
			$http(req).then(
				function(response) {
					deferred.resolve(response.data);
				},
				function(response) {
					deferred.reject(response.data);
				});

			return deferred.promise;
		},
		update: function(door) {
			var deferred = $q.defer();
			var req = {
				method: 'PUT',
				url: API_URL + '/doors/' + door.id,
				headers: {
					'Content-Type': 'application/json'
				},
				data: door
			};
			$http(req).then(
				function(response) {
					deferred.resolve(response.data);
				},
				function(response) {
					deferred.reject(response.data);
				});

			return deferred.promise;
		},
		updateUsers: function(door) {
			var deferred = $q.defer();
			var req = {
				method: 'PUT',
				url: API_URL + '/doors/set_users/' + door.id,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					user_ids: door.users.map(function(u) {
						return u.id;
					})
				}
			};
			$http(req).then(
				function(response) {
					deferred.resolve(response.data);
				},
				function(response) {
					deferred.reject(response.data);
				});

			return deferred.promise;
		},
		toggle: function(door, userId) {
			var deferred = $q.defer();
			var req = {
				method: 'PUT',
				url: API_URL + '/doors/toggle_door/' + door.id,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					door: door,
					user_id: userId
				}
			};
			$http(req).then(
				function(response) {
					deferred.resolve(response.data);
				},
				function(response) {
					deferred.reject(response.data);
				});

			return deferred.promise;
		},
		getActivities: function() {
			var deferred = $q.defer();
			var req = {
				method: 'get',
				url: API_URL + '/doors_activities'
			};
			$http(req).then(function(response) {
				deferred.resolve(response.data);
			}, function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		}
	};
});
