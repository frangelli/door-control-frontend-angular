'use strict';

angular.module('app')
	.controller('MainController', function($state, SessionService, FlashService) {
		//scope variables
		this.$state = $state;
		this.currentUser = SessionService.get('currentUser');
		//scope methods
		this.signout = function() {
			SessionService.unset('currentUser');
			$state.go('signin');
		};
	});
