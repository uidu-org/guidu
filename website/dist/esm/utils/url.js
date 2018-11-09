export var packageUrl = function packageUrl(groupId, pkgId) {
  return "/packages/".concat(groupId, "/").concat(pkgId);
};
export var packageDocUrl = function packageDocUrl(groupId, pkgId, docId) {
  return "".concat(packageUrl(groupId, pkgId), "/docs/").concat(docId);
};
export var packageExampleUrl = function packageExampleUrl(groupId, pkgId, exampleId) {
  return "/examples/".concat(groupId, "/").concat(pkgId).concat(exampleId ? "/".concat(exampleId) : '');
};