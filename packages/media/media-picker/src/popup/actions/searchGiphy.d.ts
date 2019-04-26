import { ImageCardModel } from '../tools/fetcher/fetcher';
import { Action } from 'redux';
export declare const SEARCH_GIPHY = "SEARCH_GIPHY";
export declare const SEARCH_GIPHY_FULFILLED = "SEARCH_GIPHY_FULFILLED";
export declare const SEARCH_GIPHY_FAILED = "SEARCH_GIPHY_FAILED";
export interface SearchGiphyAction extends Action {
    readonly type: 'SEARCH_GIPHY';
    readonly query: string;
    readonly shouldAppendResults: boolean;
}
export declare function isSearchGiphyAction(action: Action): action is SearchGiphyAction;
export declare function searchGiphy(query: string, shouldAppendResults: boolean): SearchGiphyAction;
export interface SearchGiphyFulfilledAction extends Action {
    readonly type: 'SEARCH_GIPHY_FULFILLED';
    readonly totalResultCount: number;
    readonly imageCardModels: ImageCardModel[];
    readonly shouldAppendResults: boolean;
}
export declare function isSearchGiphyFulfilledAction(action: Action): action is SearchGiphyFulfilledAction;
export declare function searchGiphyFulfilled(imageCardModels: ImageCardModel[], totalResultCount: number, shouldAppendResults: boolean): SearchGiphyFulfilledAction;
export interface SearchGiphyFailedAction extends Action {
    readonly type: 'SEARCH_GIPHY_FAILED';
}
export declare function isSearchGiphyFailedAction(action: Action): action is SearchGiphyFailedAction;
export declare function searchGiphyFailed(): SearchGiphyFailedAction;
