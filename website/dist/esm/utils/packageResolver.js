import * as fs from './fs';
var packagesData = [];
export default (function (groupId, packageId, exampleId) {
  var groups = fs.getDirectories(packagesData.children);
  var resolvedGroupId = groupId || groups[0].id;
  var group = fs.getById(groups, resolvedGroupId);
  var packages = fs.getDirectories(group.children);
  var resolvedPackageId = packageId || packages[0].id;
  var pkg = fs.getById(packages, resolvedPackageId);
  var examples = fs.maybeGetById(fs.getDirectories(pkg.children), 'examples');
  var example;

  if (examples) {
    example = fs.find(examples, function (file) {
      if (exampleId) {
        return fs.normalize(file.id) === exampleId;
      }

      return true;
    });
  }

  var resolvedExampleId = example ? example.id : null;
  var hasChanged = groupId !== resolvedGroupId || packageId !== resolvedPackageId || (exampleId || null) !== (resolvedExampleId ? fs.normalize(resolvedExampleId) : null);
  return {
    hasChanged: hasChanged,
    groups: groups,
    packages: packages,
    examples: examples,
    example: example,
    groupId: resolvedGroupId,
    packageId: resolvedPackageId,
    exampleId: resolvedExampleId
  };
});
export var getLoaderUrl = function getLoaderUrl(groupId, packageId, exampleId) {
  if (!groupId || !packageId || !exampleId) {
    console.error("Warning missing parameter: Please ensure that you have passed in the correct arguments:\n      \n  groupId: ".concat(String(groupId), "\n      \n  packageId: ").concat(String(packageId), "\n      \n  exampleId: ").concat(String(exampleId), "\n    "));
    return null;
  }

  return "/examples.html?groupId=".concat(groupId, "&packageId=").concat(packageId, "&exampleId=").concat(exampleId);
};