import { MouseEvent } from 'react';
import { FileDetails, MediaType, FileProcessingStatus, Context, Identifier, ImageResizeMode } from '@uidu/media-core';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
import { CardAction } from './actions';
export { default as Card } from './root/card/cardLoader';
export { CardView } from './root/cardViewLoader';
export { CardViewState, CardViewOwnProps as CardViewProps, } from './root/cardView';
export * from './actions';
export declare type CardStatus = 'uploading' | 'loading' | 'processing' | 'complete' | 'error' | 'failed-processing';
export declare type CardAppearance = 'auto' | 'image' | 'square' | 'horizontal';
export declare type CardDimensionValue = number | string;
export interface CardDimensions {
    width?: CardDimensionValue;
    height?: CardDimensionValue;
}
export interface CardEvent {
    event: MouseEvent<HTMLElement>;
    mediaItemDetails?: FileDetails;
}
export interface OnSelectChangeFuncResult {
    selected: boolean;
    mediaItemDetails?: FileDetails;
}
export interface OnSelectChangeFunc {
    (result: OnSelectChangeFuncResult): void;
}
export interface OnLoadingChangeState {
    readonly type: CardStatus;
    readonly payload?: Error | FileDetails;
}
export interface OnLoadingChangeFunc {
    (state: OnLoadingChangeState): void;
}
export interface SharedCardProps {
    readonly appearance?: CardAppearance;
    readonly dimensions?: CardDimensions;
    readonly actions?: Array<CardAction>;
    readonly selectable?: boolean;
    readonly selected?: boolean;
}
export interface CardOnClickCallback {
    (result: CardEvent, analyticsEvent?: UIAnalyticsEventInterface): void;
}
export interface CardEventProps {
    readonly onClick?: CardOnClickCallback;
    readonly onMouseEnter?: (result: CardEvent) => void;
    readonly onSelectChange?: OnSelectChangeFunc;
    readonly onLoadingChange?: OnLoadingChangeFunc;
}
export interface AnalyticsFileAttributes {
    fileMediatype?: MediaType;
    fileMimetype?: string;
    fileStatus?: FileProcessingStatus;
    fileSize?: number;
}
export interface AnalyticsLinkAttributes {
    linkDomain: string;
}
export interface AnalyticsViewAttributes {
    viewPreview: boolean;
    viewActionmenu: boolean;
    viewSize?: CardAppearance;
}
export interface BaseAnalyticsContext {
    packageVersion: string;
    packageName: string;
    componentName: string;
    actionSubject: string;
    actionSubjectId: string | null;
}
export interface CardAnalyticsContext extends BaseAnalyticsContext {
}
export interface CardViewAnalyticsContext extends BaseAnalyticsContext {
    loadStatus: 'fail' | 'loading_metadata' | 'uploading' | 'complete';
    type: 'file' | 'link' | 'smart' | 'external-image';
    viewAttributes: AnalyticsViewAttributes;
    fileAttributes?: AnalyticsFileAttributes;
    linkAttributes?: AnalyticsLinkAttributes;
}
export interface CardProps extends SharedCardProps, CardEventProps {
    readonly context: Context;
    readonly identifier: Identifier;
    readonly isLazy?: boolean;
    readonly resizeMode?: ImageResizeMode;
    readonly disableOverlay?: boolean;
    readonly useInlinePlayer?: boolean;
}
export interface CardState {
    status: CardStatus;
    isCardVisible: boolean;
    previewOrientation: number;
    readonly isPlayingFile: boolean;
    metadata?: FileDetails;
    dataURI?: string;
    progress?: number;
    readonly error?: Error;
}
export { defaultImageCardDimensions } from './utils';
