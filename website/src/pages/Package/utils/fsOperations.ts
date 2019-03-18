import { packages } from '../../../site';
import * as fs from '../../../utils/fs';
import { divvyChangelog } from '../../../utils/changelog';
import { Directory, File } from '../../../types';
import { Log } from '../../../components/ChangeLog';

function getPkg(packages, groupId, pkgId) {
  const groups = fs.getDirectories(packages.children);
  const group = fs.getById(groups, groupId);
  const pkgs = fs.getDirectories(group.children);
  const pkg = fs.getById(pkgs, pkgId);
  return pkg;
}

// No need to export as it is exported through PackageJson
type Primitive = string | number | boolean | PackageJson;

export type PackageJson = {
  [key: string]: Primitive | Primitive[];
};

const getJSON = (files: File[]) =>
  (fs.getById(files, 'package.json').exports() as any) as PackageJson;
const getDocs = (dirs: Directory[]) => {
  const docs = fs.maybeGetById(dirs, 'docs');
  let doc;
  if (docs) {
    doc = fs.find(docs, () => true);
  }

  return doc && doc.exports().then(mod => mod.default);
};
const getExamples = (dirs: Directory[]) => {
  const examples = fs.maybeGetById(dirs, 'examples');
  return examples && examples.children;
};
const getChangelog = (files: File[]) => {
  const changelog = fs.maybeGetById(files, 'CHANGELOG.md');
  return (
    (changelog &&
      changelog.contents().then(changelog => divvyChangelog(changelog))) ||
    []
  );
};

export type PackageData = {
  pkg: PackageJson;
  doc: any;
  examples: Array<Directory | File> | null;
  changelog: Array<Log>;
  error: undefined;
};

export default function fetchPackageData(groupId, pkgId): Promise<PackageData> {
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
    error: undefined,
  }));
}
