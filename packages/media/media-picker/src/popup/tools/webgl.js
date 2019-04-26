var isWebGLAvailableValue;
export var isWebGLAvailable = function (forceCheck) {
    if (isWebGLAvailableValue !== undefined && !forceCheck) {
        return isWebGLAvailableValue;
    }
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl'); // experimental-webgl is needed for IE11
    isWebGLAvailableValue = !!context;
    return isWebGLAvailableValue;
};
//# sourceMappingURL=webgl.js.map