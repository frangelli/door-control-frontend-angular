'use strict';

angular.module('app').controller('DashboardController', function(DoorsService) {
	//scope variables
	var vm = this;
	this.activities = [];
	//scope methods
	this.listActivities = function() {
		var activitiesPromise = DoorsService.getActivities();
		activitiesPromise.then(function(result) {
			vm.activities = result;
		});
	};
	this.init = function() {
		this.listActivities();
	};
	this.init();
});
