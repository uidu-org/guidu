var ResourceManager = /** @class */ (function () {
    function ResourceManager() {
        this.releaseFunctions = [];
    }
    ResourceManager.prototype.add = function (resource) {
        this.releaseFunctions.push(function () {
            resource.unload();
        });
    };
    ResourceManager.prototype.addCustom = function (releaseFunction) {
        this.releaseFunctions.push(releaseFunction);
    };
    ResourceManager.prototype.releaseAll = function () {
        this.releaseFunctions.reverse();
        this.releaseFunctions.forEach(function (fn) { return fn(); });
        this.releaseFunctions = [];
    };
    return ResourceManager;
}());
export { ResourceManager };
//# sourceMappingURL=resourceManager.js.map