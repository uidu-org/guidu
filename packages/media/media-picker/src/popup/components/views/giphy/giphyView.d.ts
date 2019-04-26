import * as React from 'react';
import { Component } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { ImageCardModel } from '../../../tools/fetcher/fetcher';
import { SelectedItem } from '../../../domain';
export interface GiphyViewStateProps {
    hasError: boolean;
    isLoading: boolean;
    cardModels: ImageCardModel[];
    totalResultCount?: number;
    selectedItems: SelectedItem[];
}
export interface GiphyViewDispatchProps {
    onSearchQueryChange(query: string): void;
    onLoadMoreButtonClick(query: string, shouldAppendResults: boolean): void;
    onCardClick(item: ImageCardModel, upfrontId: Promise<string>): void;
    setUpfrontIdDeferred: (id: string, resolver: (id: string) => void, rejecter: Function) => void;
}
export declare type GiphyViewProps = GiphyViewStateProps & GiphyViewDispatchProps & InjectedIntlProps;
export interface GiphyViewState {
    query: string;
}
export declare class GiphyView extends Component<GiphyViewProps, GiphyViewState> {
    private searchChangeHandler;
    constructor(props: GiphyViewProps);
    componentDidUpdate({ onSearchQueryChange: oldOnSearchQueryChange, }: GiphyViewProps): void;
    render(): JSX.Element;
    private getContent;
    private renderError;
    private renderEmptyState;
    private renderSearchResults;
    private renderMasonaryLayout;
    private renderLoadMoreButton;
    private createSearchChangeHandler;
    private createClickHandler;
    private handleLoadMoreButtonClick;
    private handleRetryButtonClick;
}
declare const _default: import("react-redux").ConnectedComponentClass<React.ComponentClass<Pick<GiphyViewStateProps & GiphyViewDispatchProps, "isLoading" | "selectedItems" | "hasError" | "setUpfrontIdDeferred" | "cardModels" | "totalResultCount" | "onSearchQueryChange" | "onLoadMoreButtonClick" | "onCardClick">, any> & {
    WrappedComponent: React.ComponentType<GiphyViewProps>;
}, Pick<Pick<GiphyViewStateProps & GiphyViewDispatchProps, "isLoading" | "selectedItems" | "hasError" | "setUpfrontIdDeferred" | "cardModels" | "totalResultCount" | "onSearchQueryChange" | "onLoadMoreButtonClick" | "onCardClick">, never>>;
export default _default;
