import * as React from 'react';
import { MediaItemType } from '@uidu/media-core';
import { CardViewOwnProps } from './cardView';
export declare type WithCardViewAnalyticsContextProps = CardViewOwnProps & {
    readonly mediaItemType: MediaItemType;
};
export declare class WithCardViewAnalyticsContext extends React.Component<WithCardViewAnalyticsContextProps> {
    private getBaseAnalyticsContext;
    private getFileCardAnalyticsContext;
    private readonly analyticsContext;
    render(): JSX.Element;
}
