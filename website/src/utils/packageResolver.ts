import * as fs from './fs';
import { packages as packagesData } from '../site';
import { Directory } from '../types';

export default (
  groupId?: string,
  packageId?: string,
  exampleId?: string,
  // Path relative to the package dir to load examples from
  examplesPath: string = 'examples',
) => {
  const groups = fs.getDirectories(packagesData.children);
  const resolvedGroupId = groupId || groups[0].id;
  const group = fs.getById(groups, resolvedGroupId);
  const packages = fs.getDirectories(group.children);
  const resolvedPackageId = packageId || packages[0].id;
  const pkg = fs.getById(packages, resolvedPackageId);

  let examples = fs.findNormalized(pkg, `${resolvedPackageId}/${examplesPath}`);

  examples =
    examples && examples.type === 'dir' ? (examples as Directory) : null;

  let example;

  if (examples) {
    example = fs.find(examples, file => {
      if (exampleId) {
        return fs.normalize(file.id) === exampleId;
      }
      return true;
    });
  }

  const resolvedExampleId = example ? example.id : null;

  const hasChanged =
    groupId !== resolvedGroupId ||
    packageId !== resolvedPackageId ||
    (exampleId || null) !==
      (resolvedExampleId ? fs.normalize(resolvedExampleId) : null);

  return {
    hasChanged,
    groups,
    packages,
    examples,
    example,
    groupId: resolvedGroupId,
    packageId: resolvedPackageId,
    exampleId: resolvedExampleId,
  };
};

export const getLoaderUrl = (
  groupId?: string,
  packageId?: string,
  exampleId?: string,
) => {
  if (!groupId || !packageId || !exampleId) {
    console.error(`Warning missing parameter: Please ensure that you have passed in the correct arguments:
      \n  groupId: ${String(groupId)}
      \n  packageId: ${String(packageId)}
      \n  exampleId: ${String(exampleId)}
    `);
    return null;
  }
  return `/examples.html?groupId=${groupId}&packageId=${packageId}&exampleId=${exampleId}`;
};
