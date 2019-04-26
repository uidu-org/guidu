import { InlineCardResolvedViewProps } from '@uidu/media-ui';
import { BuildInlineProps, AlterInlineProps } from './types';
declare type BuildInlinePropsSourceCodePullRequest = BuildInlineProps<InlineCardResolvedViewProps>;
declare type AlterInlinePropsSourceCodePullRequest = AlterInlineProps<InlineCardResolvedViewProps>;
export declare const buildName: AlterInlinePropsSourceCodePullRequest;
export declare const buildIcon: BuildInlinePropsSourceCodePullRequest;
export declare const extractInlineViewPropsFromSourceCodePullRequest: (json: any) => InlineCardResolvedViewProps;
export {};
