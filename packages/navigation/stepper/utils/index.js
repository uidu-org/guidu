export var transitionToPromise = function (el) {
    return new Promise(function (resolve) {
        var transitionEnded = function () {
            el.removeEventListener('transitionend', transitionEnded);
            resolve();
        };
        el.addEventListener('transitionend', transitionEnded);
    });
};
//# sourceMappingURL=index.js.map