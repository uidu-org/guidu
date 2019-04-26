import * as React from 'react';
import EditorViewType, { EditorViewProps } from './editorView';
interface AsyncEditorViewState {
    EditorView?: typeof EditorViewType;
}
export default class AsyncEditorView extends React.PureComponent<EditorViewProps & AsyncEditorViewState, AsyncEditorViewState> {
    static displayName: string;
    static EditorView?: typeof EditorViewType;
    state: {
        EditorView: React.ComponentClass<Pick<EditorViewProps, "onError" | "imageUrl" | "onSave" | "onCancel">, any> & {
            WrappedComponent: React.ComponentType<EditorViewProps & ReactIntl.InjectedIntlProps>;
        };
    };
    componentWillMount(): Promise<void>;
    render(): JSX.Element;
}
export {};
