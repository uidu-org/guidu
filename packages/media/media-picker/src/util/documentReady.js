import * as exenv from 'exenv';
// https://gist.github.com/dragosh/e9baf2d7bf3673a98c91
var checkDomReady = function () {
    if (document.readyState === 'complete') {
        return Promise.resolve();
    }
    return new Promise(function (resolve) {
        window.addEventListener('load', resolve);
    });
};
export var whenDomReady = exenv.canUseDOM
    ? checkDomReady()
    : Promise.resolve();
//# sourceMappingURL=documentReady.js.map