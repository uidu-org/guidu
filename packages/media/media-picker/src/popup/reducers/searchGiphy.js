import * as tslib_1 from "tslib";
import { isSearchGiphyAction, isSearchGiphyFulfilledAction, isSearchGiphyFailedAction, } from '../actions/searchGiphy';
export var giphySearchStarted = function (state, action) {
    if (isSearchGiphyAction(action)) {
        var shouldAppendResults = action.shouldAppendResults;
        var giphy = shouldAppendResults ? state.giphy : { imageCardModels: [] };
        return tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view, { isLoading: true, hasError: false }), giphy: giphy });
    }
    else {
        return state;
    }
};
export var giphySearchFullfilled = function (state, action) {
    if (isSearchGiphyFulfilledAction(action)) {
        var oldImageCardModels = state.giphy.imageCardModels;
        var newImageCardModels = action.imageCardModels, shouldAppendResults = action.shouldAppendResults, totalResultCount = action.totalResultCount;
        var imageCardModels = shouldAppendResults
            ? tslib_1.__spread(oldImageCardModels, newImageCardModels) : newImageCardModels;
        return tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view, { isLoading: false }), giphy: {
                imageCardModels: imageCardModels,
                totalResultCount: totalResultCount,
            } });
    }
    else {
        return state;
    }
};
export var giphySearchFailed = function (state, action) {
    if (isSearchGiphyFailedAction(action)) {
        return tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view, { isLoading: false, hasError: true }), giphy: {
                imageCardModels: [],
                totalResultCount: undefined,
            } });
    }
    else {
        return state;
    }
};
//# sourceMappingURL=searchGiphy.js.map