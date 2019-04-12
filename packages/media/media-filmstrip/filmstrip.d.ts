import { Component } from 'react';
import { CardAction, CardOnClickCallback, CardEvent, OnSelectChangeFunc, OnLoadingChangeFunc } from '@uidu/media-card';
import { Context, Identifier } from '@uidu/media-core';
export interface FilmstripItem {
    readonly identifier: Identifier;
    readonly actions?: Array<CardAction>;
    readonly selectable?: boolean;
    readonly selected?: boolean;
    readonly onClick?: CardOnClickCallback;
    readonly onMouseEnter?: (result: CardEvent) => void;
    readonly onSelectChange?: OnSelectChangeFunc;
    readonly onLoadingChange?: OnLoadingChangeFunc;
}
export interface FilmstripProps {
    items: FilmstripItem[];
    context?: Context;
}
export interface FilmstripState {
    animate: boolean;
    offset: number;
}
export declare class Filmstrip extends Component<FilmstripProps, FilmstripState> {
    state: FilmstripState;
    private handleSize;
    private handleScroll;
    private renderCards;
    render(): JSX.Element;
}
