import { Component } from 'react';
import { BinaryUploader } from '../../../../components/types';
import { EditorData, EditorError } from '../../../domain';
import { Selection } from '../../../actions/editorClose';
export interface MainEditorViewStateProps {
    readonly editorData?: EditorData;
}
export interface MainEditorViewOwnProps {
    readonly binaryUploader: BinaryUploader;
}
export interface MainEditorViewDispatchProps {
    readonly onCloseEditor: (selection: Selection) => void;
    readonly onShowEditorError: (error: EditorError) => void;
    readonly onDeselectFile: (fileId: string) => void;
}
export declare type MainEditorViewProps = MainEditorViewStateProps & MainEditorViewOwnProps & MainEditorViewDispatchProps;
export declare class MainEditorView extends Component<MainEditorViewProps> {
    render(): JSX.Element | null;
    private renderContent;
    private renderError;
    private onEditorError;
    private onEditorSave;
    private onCancel;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof MainEditorView, Pick<MainEditorViewProps, "editorData" | "binaryUploader"> & MainEditorViewOwnProps>;
export default _default;
