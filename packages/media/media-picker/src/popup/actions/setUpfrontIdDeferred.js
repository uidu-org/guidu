export var SET_UPFRONT_ID_DEFERRED = 'SET_UPFRONT_ID_DEFERRED';
export function setUpfrontIdDeferred(id, resolver, rejecter) {
    return {
        type: SET_UPFRONT_ID_DEFERRED,
        id: id,
        resolver: resolver,
        rejecter: rejecter,
    };
}
//# sourceMappingURL=setUpfrontIdDeferred.js.map