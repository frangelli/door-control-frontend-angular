angular.module('app').factory("SessionService", function($sessionStorage) {
    return {
        get: function(key) {
            return $sessionStorage[key];
        },
        set: function(key, val) {
            return $sessionStorage[key] = val;
        },
        unset: function(key) {
            delete $sessionStorage[key];
        }
    }
});
