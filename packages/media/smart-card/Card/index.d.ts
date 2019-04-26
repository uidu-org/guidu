import * as React from 'react';
import { CardAppearance } from './types';
import { CardProps } from './types';
export { CardAppearance, CardProps };
export declare const Card: React.ComponentClass<({
    appearance: CardAppearance;
    isSelected?: boolean;
    onClick?: () => void;
    importer?: (target: any) => void;
} & {
    url: string;
    client?: import("..").Client;
} & import("@atlaskit/analytics-next-types").WithAnalyticsEventProps) | ({
    appearance: CardAppearance;
    isSelected?: boolean;
    onClick?: () => void;
    importer?: (target: any) => void;
} & {
    data: any;
} & import("@atlaskit/analytics-next-types").WithAnalyticsEventProps), any>;
