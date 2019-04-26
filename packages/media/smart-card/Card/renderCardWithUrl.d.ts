/// <reference types="react" />
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { Client } from '../Client';
import { CardAppearance } from './types';
export declare type CardWithUrlContentProps = {
    client: Client;
    url: string;
    appearance: CardAppearance;
    onClick?: () => void;
    isSelected?: boolean;
    authFn: (startUrl: string) => Promise<void>;
} & WithAnalyticsEventProps;
export declare function CardWithUrlContent(props: CardWithUrlContentProps): JSX.Element;
