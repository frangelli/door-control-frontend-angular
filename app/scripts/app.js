'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
	.module('app', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngTouch',
		'ui.router',
		'ui.bootstrap',
		'ngStorage',
		'toaster',
		'angular-loading-bar'
	]).constant('API_URL', 'http://localhost:3000');

angular.module('app').config(function() {

});

angular.module('app').run(function($rootScope, SessionService, $location, FlashService) {
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		console.log(error);
	});

	$rootScope.$on('$stateChangeStart', function(e) {
		var currentUser = SessionService.get('currentUser');
		if (!currentUser) {
			$location.path('/signin');
			FlashService.info('Please, login to continue!');
		}
	});
});
