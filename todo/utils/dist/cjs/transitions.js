"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitionToPromise = void 0;

var transitionToPromise = function transitionToPromise(el) {
  return new Promise(function (resolve) {
    var transitionEnded = function transitionEnded() {
      el.removeEventListener('transitionend', transitionEnded);
      resolve();
    };

    el.addEventListener('transitionend', transitionEnded);
  });
};

exports.transitionToPromise = transitionToPromise;