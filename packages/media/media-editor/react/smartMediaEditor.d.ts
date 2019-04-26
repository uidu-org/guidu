import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Context, FileIdentifier } from '@uidu/media-core';
import { InjectedIntlProps } from 'react-intl';
export interface SmartMediaEditorProps {
    identifier: FileIdentifier;
    context: Context;
    onUploadStart: (identifier: FileIdentifier) => void;
    onFinish: () => void;
}
export interface SmartMediaEditorState {
    hasError: boolean;
    errorMessage?: any;
    imageUrl?: string;
}
export declare class SmartMediaEditor extends React.Component<SmartMediaEditorProps & InjectedIntlProps, SmartMediaEditorState> {
    fileName?: string;
    state: SmartMediaEditorState;
    getFileSubscription?: Subscription;
    uploadFileSubscription?: Subscription;
    static contextTypes: {
        intl: ReactIntl.IntlShape;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Readonly<SmartMediaEditorProps>): void;
    componentWillUnmount(): void;
    getFile: (identifier: FileIdentifier) => Promise<void>;
    setImageUrl: (identifier: FileIdentifier) => Promise<void>;
    private onSave;
    onCancel: () => void;
    onError: (error: any) => void;
    renderLoading: () => JSX.Element;
    renderEditor: (imageUrl: string) => JSX.Element;
    renderError: (error: any) => JSX.Element;
    render(): JSX.Element;
}
export default class extends React.Component<SmartMediaEditorProps> {
    render(): JSX.Element;
}
