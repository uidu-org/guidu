import * as React from 'react';
import { Component } from 'react';
import { Identifier, FileIdentifier } from '@uidu/media-core';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
export declare type NavigationDirection = 'prev' | 'next';
export declare type NavigationProps = Readonly<{
    items: FileIdentifier[];
    selectedItem: FileIdentifier;
    onChange: (item: Identifier) => void;
}> & WithAnalyticsEventProps;
export declare type NavigationSource = 'keyboard' | 'mouse';
export declare class NavigationBase extends Component<NavigationProps, {}> {
    private navigate;
    private fireAnalytics;
    readonly selectedIndex: number;
    render(): JSX.Element;
}
export declare const Navigation: React.ComponentClass<Pick<NavigationProps, "items" | "onChange" | "selectedItem">, any>;
