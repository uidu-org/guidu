export default (function (_a) {
    var width = _a.width, height = _a.height, containerWidth = _a.containerWidth, gapSize = _a.gapSize, numberOfColumns = _a.numberOfColumns;
    var desiredWith = Math.floor((containerWidth - gapSize * (numberOfColumns - 1)) / numberOfColumns);
    return {
        width: desiredWith,
        height: Math.round((desiredWith / width) * height),
    };
});
//# sourceMappingURL=gridCellScaler.js.map