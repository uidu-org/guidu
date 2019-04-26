export var SEARCH_GIPHY = 'SEARCH_GIPHY';
export var SEARCH_GIPHY_FULFILLED = 'SEARCH_GIPHY_FULFILLED';
export var SEARCH_GIPHY_FAILED = 'SEARCH_GIPHY_FAILED';
export function isSearchGiphyAction(action) {
    return action.type === SEARCH_GIPHY;
}
export function searchGiphy(query, shouldAppendResults) {
    return {
        type: SEARCH_GIPHY,
        query: query,
        shouldAppendResults: shouldAppendResults,
    };
}
export function isSearchGiphyFulfilledAction(action) {
    return action.type === SEARCH_GIPHY_FULFILLED;
}
export function searchGiphyFulfilled(imageCardModels, totalResultCount, shouldAppendResults) {
    return {
        type: SEARCH_GIPHY_FULFILLED,
        imageCardModels: imageCardModels,
        totalResultCount: totalResultCount,
        shouldAppendResults: shouldAppendResults,
    };
}
export function isSearchGiphyFailedAction(action) {
    return action.type === SEARCH_GIPHY_FAILED;
}
export function searchGiphyFailed() {
    return {
        type: SEARCH_GIPHY_FAILED,
    };
}
//# sourceMappingURL=searchGiphy.js.map