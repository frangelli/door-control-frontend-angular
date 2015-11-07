'use strict';

angular.module('app').service('UsersService', function($http, $q, API_URL) {
	return {
		list: function() {
			var deferred = $q.defer();
			var req = {
				method: 'get',
				url: API_URL + '/users'
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
				url: API_URL + '/users/' + id
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
				url: API_URL + '/users/' + id
			};
			$http(req).then(function(response) {
				deferred.resolve(response.data);
			}, function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		},
		create: function(user) {
			var deferred = $q.defer();
			var req = {
				method: 'POST',
				url: API_URL + '/auth',
				headers: {
					'Content-Type': 'application/json'
				},
				data: user
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
		update: function(user) {
			var deferred = $q.defer();
			var req = {
				method: 'PUT',
				url: API_URL + '/users/' + user.id,
				headers: {
					'Content-Type': 'application/json'
				},
				data: user
			};
			$http(req).then(
				function(response) {
					deferred.resolve(response.data);
				},
				function(response) {
					deferred.reject(response.data);
				});

			return deferred.promise;
		}
	};
});
