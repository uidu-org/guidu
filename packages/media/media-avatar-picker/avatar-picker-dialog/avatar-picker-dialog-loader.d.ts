import * as React from 'react';
import { AvatarPickerDialog } from '.';
import { AvatarPickerDialogProps } from './types';
interface AsyncAvatarPickerDialogState {
    AvatarPickerDialog?: typeof AvatarPickerDialog;
}
export default class AsyncAvatarPickerDialog extends React.PureComponent<AvatarPickerDialogProps & AsyncAvatarPickerDialogState, AsyncAvatarPickerDialogState> {
    static displayName: string;
    static AvatarPickerDialog?: typeof AvatarPickerDialog;
    state: {
        AvatarPickerDialog: typeof AvatarPickerDialog;
    };
    componentWillMount(): Promise<void>;
    render(): JSX.Element;
}
export {};
