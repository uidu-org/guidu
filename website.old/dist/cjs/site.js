"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patterns = exports.pkgData = exports.externalPackages = exports.packages = exports.docs = exports.getConfig = exports.default = void 0;

var _SITE_DATA = _interopRequireDefault(require("./SITE_DATA"));

var _NAV_DATA = _interopRequireDefault(require("./NAV_DATA"));

var fs = _interopRequireWildcard(require("./utils/fs"));

// SITE_DATA is dynamically generated at runtime by bolt-fs-loader.
// Configuration for bolt-fs-loader is in webpack.config.js since it needs to be dynamically created
// depending on the subset of packages we want to represent on the website.
var productPackages = ['bitbucket', 'confluence', 'jira', 'statuspage', 'stride', 'trello'];
console.log(_SITE_DATA.default);
var siteData = _SITE_DATA.default;
var _default = siteData;
exports.default = _default;
var dirs = fs.getDirectories(_SITE_DATA.default.children);

function isInternal(groupId, pkgId) {
  var pkgInfo = _NAV_DATA.default[groupId].find(function (a) {
    return a.name === pkgId;
  });

  return pkgInfo && pkgInfo.config && pkgInfo.config.atlaskit && pkgInfo.config.atlaskit.internal;
}

var publicPackages = {
  type: 'dir',
  id: 'packages',
  children: []
};
var packageDirs = fs.getById(dirs, 'packages');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    var child = _step.value;
    var children = child.children.filter(function (pkg) {
      return !isInternal(child.id, pkg.id);
    });
    if (children.length > 0) publicPackages.children.push(Object.assign({}, child, {
      children: children
    }));
  };

  for (var _iterator = fs.getDirectories(packageDirs.children)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop();
  }
  /* If a package is related to an Atlassian products, it will appear at the bottom of the navigation */

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var productsPkgs = [];
var non_productsPkgs = [];
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = publicPackages.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var pkg = _step2.value;
    if (productPackages.includes(pkg.id)) productsPkgs.push(pkg);else non_productsPkgs.push(pkg);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

publicPackages.children = non_productsPkgs.concat(productsPkgs);

var getConfig = function getConfig(groupId, pkgId) {
  return _NAV_DATA.default[groupId] && _NAV_DATA.default[groupId].find(function (pkg) {
    return pkg.name === pkgId;
  });
};

exports.getConfig = getConfig;
var docs = fs.getById(dirs, 'docs');
exports.docs = docs;
var packages = fs.getById(dirs, 'packages');
exports.packages = packages;
var externalPackages = publicPackages;
exports.externalPackages = externalPackages;
var pkgData = _NAV_DATA.default;
exports.pkgData = pkgData;
var patterns = fs.maybeGetById(dirs, 'patterns') || {
  id: 'patterns',
  type: 'dir',
  children: []
};
exports.patterns = patterns;