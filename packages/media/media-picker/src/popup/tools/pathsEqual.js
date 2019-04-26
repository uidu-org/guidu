export function pathsEqual(path1, path2) {
    if (!Array.isArray(path1) ||
        !Array.isArray(path2) ||
        path1.length !== path2.length) {
        return false;
    }
    var isEqual = path1.reduce(function (wasEqual, folder, i) {
        return wasEqual && folder.id === path2[i].id;
    }, true);
    return isEqual;
}
//# sourceMappingURL=pathsEqual.js.map