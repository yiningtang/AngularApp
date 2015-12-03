'use strict';

/* Filters */

angular.module('filter', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

