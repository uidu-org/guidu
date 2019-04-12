export var getArtifactUrl = function (artifacts, prop) {
    var artifact = artifacts[prop];
    if (!artifact || artifact.processingStatus !== 'succeeded' || !artifact.url) {
        return undefined;
    }
    return artifact.url;
};
//# sourceMappingURL=artifacts.js.map