"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchPackageData;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _packages = _interopRequireDefault(require("../../../packages"));

function getPkg(packages, groupId, pkgId) {
  return packages.filter(function (g) {
    return g.id === groupId;
  })[0].items.filter(function (p) {
    return p.id === pkgId;
  })[0];
}

var getJSON = function getJSON(pkgInfo) {
  return Promise.resolve().then(function () {
    return require("../../../../../packages/".concat(pkgInfo.id, "/package.json"));
  }).then(function (r) {
    return r.default;
  }).catch(function (error) {
    return Promise.resolve({});
  });
};

var getDocs = function getDocs(pkgInfo) {
  return Promise.resolve().then(function () {
    return require("../../../../../packages/".concat(pkgInfo.id, "/docs"));
  }).then(function (r) {
    console.log(r);
    return r.default;
  }).catch(function (error) {
    return Promise.resolve([]);
  });
};

var getChangelog = function getChangelog(pkgInfo) {
  return Promise.resolve().then(function () {
    return require("../../../../../packages/".concat(pkgInfo.id, "/CHANGELOG.md"));
  }).then(function (r) {
    return r.default;
  }).catch(function (error) {
    return Promise.resolve();
  });
};

function fetchPackageData(groupId, pkgId) {
  var pkgInfo = getPkg(_packages.default, groupId, pkgId);
  return Promise.all([getJSON(pkgInfo), getDocs(pkgInfo), getChangelog(pkgInfo)]).then(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 3),
        pkg = _ref2[0],
        doc = _ref2[1],
        changelog = _ref2[2];

    return {
      pkgInfo: pkgInfo,
      pkg: pkg,
      doc: doc,
      changelog: changelog
    };
  });
}

module.exports = exports.default;