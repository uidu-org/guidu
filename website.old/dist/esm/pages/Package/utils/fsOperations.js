import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import packages from '../../../packages';

function getPkg(packages, groupId, pkgId) {
  return packages.filter(function (g) {
    return g.id === groupId;
  })[0].items.filter(function (p) {
    return p.id === pkgId;
  })[0];
}

var getJSON = function getJSON(pkgInfo) {
  return import("../../../../../packages/".concat(pkgInfo.id, "/package.json")).then(function (r) {
    return r.default;
  }).catch(function (error) {
    return Promise.resolve({});
  });
};

var getDocs = function getDocs(pkgInfo) {
  return import("../../../../../packages/".concat(pkgInfo.id, "/docs")).then(function (r) {
    console.log(r);
    return r.default;
  }).catch(function (error) {
    return Promise.resolve([]);
  });
};

var getChangelog = function getChangelog(pkgInfo) {
  return import("../../../../../packages/".concat(pkgInfo.id, "/CHANGELOG.md")).then(function (r) {
    return r.default;
  }).catch(function (error) {
    return Promise.resolve();
  });
};

export default function fetchPackageData(groupId, pkgId) {
  var pkgInfo = getPkg(packages, groupId, pkgId);
  return Promise.all([getJSON(pkgInfo), getDocs(pkgInfo), getChangelog(pkgInfo)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
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