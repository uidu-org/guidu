import * as React from 'react';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { CardProps, CardWithData, CardWithUrl } from './types';
import { CardWithUrlContent as CardWithUrlContentType } from './renderCardWithUrl';
import { CardWithDataContent as CardWithDataContentType } from './renderCardWithData';
export declare const isCardWithData: (props: CardProps) => props is CardWithData;
export declare class CardWithURLRenderer extends React.PureComponent<CardWithUrl & WithAnalyticsEventProps> {
    static CardContent: typeof CardWithUrlContentType | null;
    static moduleImporter(target: CardWithURLRenderer): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export declare class CardWithDataRenderer extends React.PureComponent<CardWithData & WithAnalyticsEventProps> {
    static CardContent: typeof CardWithDataContentType | null;
    static moduleImporter(target: CardWithDataRenderer): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
