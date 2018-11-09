// @flow
import packages from '../../../packages';

function getPkg(packages, groupId, pkgId) {
  return packages
    .filter(g => g.id === groupId)[0]
    .items.filter(p => p.id === pkgId)[0];
}

const getJSON = pkgInfo => {
  return import(`../../../../../packages/${pkgInfo.id}/package.json`)
    .then(r => r.default)
    .catch(error => Promise.resolve({}));
};

const getDocs = pkgInfo => {
  return import(`../../../../../packages/${pkgInfo.id}/docs`)
    .then(r => {
      console.log(r);
      return r.default;
    })
    .catch(error => Promise.resolve([]));
};

const getChangelog = pkgInfo => {
  return import(`../../../../../packages/${pkgInfo.id}/CHANGELOG.md`)
    .then(r => r.default)
    .catch(error => Promise.resolve());
};

export default function fetchPackageData(groupId, pkgId) {
  const pkgInfo = getPkg(packages, groupId, pkgId);

  return Promise.all([
    getJSON(pkgInfo),
    getDocs(pkgInfo),
    getChangelog(pkgInfo),
  ]).then(([pkg, doc, changelog]) => ({
    pkgInfo,
    pkg,
    doc,
    changelog,
  }));
}
