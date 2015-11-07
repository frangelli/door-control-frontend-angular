'use strict';
angular.module('app').controller('AuthController', function(AuthService, SessionService, FlashService, $state) {

	//scope variables
	var vm = this;
	this.email = null;
	this.password = null;
	//scope methods
	this.signin = function() {
		if (!this.email || !this.password) {
			FlashService.error('You should input your email and your password to signin!');
			return;
		}

		var signinPromise = AuthService.signin(this.email, this.password);
		signinPromise.then(function(result) {
			SessionService.set('currentUser', result.data);
			$state.go('main.doors');
			FlashService.info('Welcome to My Clay!');
		}, function(error) {
			FlashService.error(error.errors[0]);
		});
	};
});
