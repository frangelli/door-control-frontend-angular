'use strict';

angular.module('app').factory('FlashService', function(toaster) {
    return {
        info: function(msg, callback, fix) {
            toaster.pop('info', "Info.", msg);
        },
        success: function(msg, callback, fix) {
            toaster.pop('success', "Success!", msg);
        },
        warn: function(msg, callback, fix) {
            toaster.pop('warn', "Warning!", msg);
        },
        wait: function(msg, callback, fix) {
            toaster.pop('wait', "Loading...", msg);
        },
        error: function(msg, callback, fix) {
            toaster.pop('error', "Error!", msg);
        }
    }
});
