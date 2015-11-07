'use strict';

angular.module('app').service('AuthService', function(API_URL, $http, $q, SessionService) {
	return {
		signin: function(email, password) {
			var deferred = $q.defer();
			var req = {
				method: 'POST',
				url: API_URL + '/auth/sign_in',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					email: email,
					password: password
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
		currentUser: function() {
			return SessionService.get('currentUser');
		}
	};
});
