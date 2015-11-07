'use strict';
angular.module('app').config(function($stateProvider, $urlRouterProvider) {
	var states = {

		'index': {
			url: '',
			controller: ['$location', function($location) {
				$location.path('/doors');
			}]
		},

		'signin': {
			url: '/signin',
			templateUrl: '/views/signin.html',
			controller: 'AuthController',
			controllerAs: 'auth'
		},

		'main': {
			abstract: true,
			templateUrl: '/views/main.html',
			controller: 'MainController',
			controllerAs: 'main'
		},

		'main.dashboard': {
			url: '/dashboard',
			views: {
				'content@main': {
					templateUrl: '/views/dashboard.html',
					controller: 'DashboardController',
					controllerAs: 'dashboard'
				}
			}

		},

		'main.users': {
			url: '/users',
			views: {
				'content@main': {
					templateUrl: '/views/users-list.html',
					controller: 'UsersListController',
					controllerAs: 'usersList',
					resolve: {
						users: function(UsersService) {
							return UsersService.list();
						}
					}
				}
			}

		},

		'main.doors': {
			url: '/doors',
			views: {
				'content@main': {
					templateUrl: '/views/doors-list.html',
					controller: 'DoorsListController',
					controllerAs: 'doorsList',
					resolve: {
						doors: function(DoorsService) {
							return DoorsService.list();
						},
						users: function(UsersService) {
							return UsersService.list();
						}
					}
				}
			}

		},



	};

	angular.forEach(states, function(stateConfig, stateName) {
		$stateProvider.state(stateName, stateConfig);
	});

	$urlRouterProvider.otherwise('/404');
});
