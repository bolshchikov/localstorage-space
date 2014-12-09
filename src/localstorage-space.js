/*
 * localstorage-space
 * https://github.com/bolshchikov/localstorage-space
 *
 * Copyright (c) 2014 Sergey N. Bolshchikov
 */

(function (window) {
  'use strict';

  var KEY = 'bolshchikov';
  var fill = new Array(1025 * 10).join('x');

  var ls = window.localStorage;
  var counter = window.bytesCounter.count;
  var curr = fill;

  var availableSpace = 0;

  var setFill = function () {
    try {
      var record = ls.getItem(KEY);
      var value = (record === null) ? '' : record;
      value += curr;
      ls.setItem(KEY, value);
      setFill();
    }
    catch(err) {
      if (curr.length !== 1) {
        curr = curr.slice(curr.length / 2);
        setFill();
      }
    }
  };

  var calculateSize = function () {
    var i = 0, keys = Object.keys(ls), len = keys.length, acc = 0;
    for (i; i < len; i += 1) {
      acc = acc + counter(keys[i]) + counter(ls.getItem(keys[i]));
    }
    return acc;
  };

  var clearFill = function () {
    ls.removeItem(KEY);
  };

  var calculateAvailableSpace = function () {
    if (!availableSpace) {
      setFill();
      availableSpace = calculateSize();
      clearFill();
    }
    return availableSpace;
  };

  Object.defineProperty(ls, 'space', {
    get: calculateAvailableSpace
  });

  Object.defineProperty(ls, 'spaceRemained', {
    get: function () {
      return calculateAvailableSpace() - calculateSize();
    }
  });

})(window);
