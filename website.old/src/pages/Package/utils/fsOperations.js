// @flow
import { packages } from '../../../site';
import * as fs from '../../../utils/fs';
import { divvyChangelog } from '../../../utils/changelog';

function getPkg(packages, groupId, pkgId) {
  const groups = fs.getDirectories(packages.children);
  const group = fs.getById(groups, groupId);
  const pkgs = fs.getDirectories(group.children);
  const pkg = fs.getById(pkgs, pkgId);
  return pkg;
}

const getJSON = files => fs.getById(files, 'package.json').exports();
const getDocs = dirs => {
  const docs = fs.maybeGetById(dirs, 'docs');
  let doc;
  if (docs) {
    doc = fs.find(docs, () => true);
  }

  return doc && doc.exports().then(mod => mod.default);
};
const getExamples = dirs => {
  const examples = fs.maybeGetById(dirs, 'examples');
  return examples && examples.children;
};
const getChangelog = files => {
  const changelog = fs.maybeGetById(files, 'CHANGELOG.md');
  return (
    (changelog &&
      changelog.contents().then(changelog => divvyChangelog(changelog))) ||
    []
  );
};

export default function fetchPackageData(groupId, pkgId) {
  const pkgInfo = getPkg(packages, groupId, pkgId);
  const dirs = fs.getDirectories(pkgInfo.children);
  const files = fs.getFiles(pkgInfo.children);

  return Promise.all([
    getJSON(files),
    getDocs(dirs),
    getChangelog(files),
    getExamples(dirs),
  ]).then(([pkg, doc, changelog, examples]) => ({
    pkg,
    doc,
    examples,
    changelog,
  }));
}
