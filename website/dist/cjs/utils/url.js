"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.packageExampleUrl = exports.packageDocUrl = exports.packageUrl = void 0;

var packageUrl = function packageUrl(groupId, pkgId) {
  return "/packages/".concat(groupId, "/").concat(pkgId);
};

exports.packageUrl = packageUrl;

var packageDocUrl = function packageDocUrl(groupId, pkgId, docId) {
  return "".concat(packageUrl(groupId, pkgId), "/docs/").concat(docId);
};

exports.packageDocUrl = packageDocUrl;

var packageExampleUrl = function packageExampleUrl(groupId, pkgId, exampleId) {
  return "/examples/".concat(groupId, "/").concat(pkgId).concat(exampleId ? "/".concat(exampleId) : '');
};

exports.packageExampleUrl = packageExampleUrl;