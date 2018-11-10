"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isModuleNotFoundError = isModuleNotFoundError;

function isModuleNotFoundError(e, pkgId) {
  var a = new RegExp("^Missing ".concat(pkgId, " in file system"));
  return e.message && e.message.indexOf('Cannot find module') > -1 || a.test(e.message);
}