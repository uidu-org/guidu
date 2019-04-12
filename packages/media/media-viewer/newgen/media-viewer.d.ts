import { Context, Identifier } from '@uidu/media-core';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { ItemSource, MediaViewerFeatureFlags } from './domain';
export declare type Props = Readonly<{
    onClose?: () => void;
    selectedItem?: Identifier;
    featureFlags?: MediaViewerFeatureFlags;
    context: Context;
    itemSource: ItemSource;
} & WithAnalyticsEventProps>;
export declare const MediaViewer: any;
