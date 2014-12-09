'use strict';

describe('localstorage-space', function () {

  beforeEach(function () {
    window.localStorage.clear();
  });

  describe('=> space method', function () {
    it('should throw exception on set', function () {
      expect(function () { localStorage.space = 10 }).toThrow();
    });
    it('should return size of local storage', function () {
      expect(localStorage.space).toEqual(2621440);
    });
  });

  describe('=> remainingSpace', function () {
    it('should throw exception on set', function () {
      expect(function () { localStorage.spaceRemained = 10 }).toThrow();
    });
    it('should calculate the remaining space', function () {
      localStorage.setItem('1', new Array(1024).join('x'));
      expect(localStorage.spaceRemained).toEqual(2621440 - 1024);
    });
  });
});
