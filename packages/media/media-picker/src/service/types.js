export var MAX_FILE_SIZE_FOR_PREVIEW = 10e6; // 10 MB
export var LocalFileSource;
(function (LocalFileSource) {
    LocalFileSource[LocalFileSource["PastedFile"] = 0] = "PastedFile";
    LocalFileSource[LocalFileSource["PastedScreenshot"] = 1] = "PastedScreenshot";
    LocalFileSource[LocalFileSource["LocalUpload"] = 2] = "LocalUpload";
})(LocalFileSource || (LocalFileSource = {}));
//# sourceMappingURL=types.js.map