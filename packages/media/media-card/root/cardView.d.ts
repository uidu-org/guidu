import * as React from 'react';
import { MediaItemType, FileDetails, ImageResizeMode } from '@uidu/media-core';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { SharedCardProps, CardStatus, CardEvent, OnSelectChangeFuncResult, CardOnClickCallback } from '../index';
export interface CardViewOwnProps extends SharedCardProps {
    readonly status: CardStatus;
    readonly mediaItemType?: MediaItemType;
    readonly metadata?: FileDetails;
    readonly resizeMode?: ImageResizeMode;
    readonly onRetry?: () => void;
    readonly onClick?: CardOnClickCallback;
    readonly onMouseEnter?: (result: CardEvent) => void;
    readonly onSelectChange?: (result: OnSelectChangeFuncResult) => void;
    readonly dataURI?: string;
    readonly progress?: number;
    readonly disableOverlay?: boolean;
    readonly previewOrientation?: number;
}
export interface CardViewState {
    elementWidth?: number;
}
export declare type CardViewBaseProps = CardViewOwnProps & WithAnalyticsEventProps & {
    readonly mediaItemType: MediaItemType;
};
/**
 * This is classic vanilla CardView class. To create an instance of class one would need to supply
 * `createAnalyticsEvent` prop to satisfy it's Analytics Events needs.
 */
export declare class CardViewBase extends React.Component<CardViewBaseProps, CardViewState> {
    state: CardViewState;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: CardViewBaseProps): void;
    private fireOnSelectChangeToConsumer;
    private readonly width;
    saveElementWidth(): void;
    render(): JSX.Element;
    private renderFile;
    private onClick;
    private onMouseEnter;
}
/**
 * With this CardView class constructor version `createAnalyticsEvent` props is supplied for you, so
 * when creating instance of that class you don't need to worry about it.
 */
export declare const CardViewWithAnalyticsEvents: React.ComponentClass<Pick<CardViewBaseProps, "progress" | "metadata" | "appearance" | "onClick" | "onMouseEnter" | "selected" | "onRetry" | "actions" | "status" | "dimensions" | "selectable" | "disableOverlay" | "dataURI" | "previewOrientation" | "resizeMode" | "mediaItemType" | "onSelectChange">, any>;
/**
 * This if final version of CardView that is exported to the consumer. This version wraps everything
 * with Analytics Context information so that all the Analytics Events created anywhere inside CardView
 * will have it automatically.
 */
export declare class CardView extends React.Component<CardViewOwnProps, CardViewState> {
    static defaultProps: Partial<CardViewOwnProps>;
    private readonly mediaItemType;
    render(): JSX.Element;
}
