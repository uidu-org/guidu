export var featureFlagsMap = {};
export var getFeatureFlag = function (featureName, featureFlags) {
    if (window.localStorage) {
        var devOverride = window.localStorage.getItem(featureFlagsMap[featureName]);
        if (devOverride !== null) {
            // localStorage stores strings only.
            // Every string except 'false' will enable the flag.
            return devOverride !== 'false';
        }
    }
    return Boolean(featureFlags && featureFlags[featureName]);
};
//# sourceMappingURL=getFeatureFlag.js.map