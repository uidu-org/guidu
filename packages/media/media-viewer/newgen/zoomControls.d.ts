import * as React from 'react';
import { Component } from 'react';
import { ZoomLevel } from './domain/zoomLevel';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { InjectedIntlProps } from 'react-intl';
export declare type ZoomControlsProps = Readonly<{
    onChange: (newZoomLevel: ZoomLevel) => void;
    zoomLevel: ZoomLevel;
}> & WithAnalyticsEventProps;
export declare class ZoomControlsBase extends Component<ZoomControlsProps & InjectedIntlProps, {}> {
    zoomIn: () => void;
    zoomOut: () => void;
    render(): JSX.Element;
    private fireAnalytics;
}
export declare const ZoomControls: React.ComponentClass<Pick<Pick<ZoomControlsProps, "onChange" | "createAnalyticsEvent" | "zoomLevel">, "onChange" | "zoomLevel">, any>;
