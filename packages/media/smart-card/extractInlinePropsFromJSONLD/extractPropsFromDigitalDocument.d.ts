import { InlineCardResolvedViewProps } from '@uidu/media-ui';
import { BuildInlineProps } from './types';
declare type BuildInlinePropsDigitalDocument = BuildInlineProps<InlineCardResolvedViewProps>;
export declare const buildIcon: BuildInlinePropsDigitalDocument;
export declare const extractInlineViewPropsFromDigitalDocument: (json: any) => InlineCardResolvedViewProps;
export {};
