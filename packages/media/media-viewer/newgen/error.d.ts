import * as React from 'react';
import { ReactNode } from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { FileState } from '@uidu/media-core';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
export declare type ErrorName = 'previewFailed' | 'metadataFailed' | 'unsupported' | 'idNotFound' | 'noPDFArtifactsFound';
export declare type Props = Readonly<{
    error: MediaViewerError;
    children?: ReactNode;
}>;
export declare type FormatMessageFn = (messageDescriptor: FormattedMessage.MessageDescriptor) => string;
export declare class MediaViewerError {
    readonly errorName: ErrorName;
    readonly file?: FileState;
    readonly innerError?: Error;
    constructor(errorName: ErrorName, file?: FileState, innerError?: Error);
}
export declare const createError: (name: ErrorName, innerError?: Error, file?: FileState) => MediaViewerError;
export declare class ErrorMessage extends React.Component<Props & InjectedIntlProps & WithAnalyticsEventProps, {}> {
    private fireAnalytics;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<Readonly<{
    error: MediaViewerError;
    children?: React.ReactNode;
}> & WithAnalyticsEventProps, "error" | "children" | "createAnalyticsEvent">, "error" | "children">, any>;
export default _default;
