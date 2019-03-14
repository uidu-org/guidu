import * as React from 'react';

import { ModalSpinner } from '@uidu/media-ui';

import { AvatarPickerDialog } from '.';
import { AvatarPickerDialogProps } from './types';

interface AsyncAvatarPickerDialogState {
  AvatarPickerDialog?: typeof AvatarPickerDialog;
}

export default class AsyncAvatarPickerDialog extends React.PureComponent<
  AvatarPickerDialogProps & AsyncAvatarPickerDialogState,
  AsyncAvatarPickerDialogState
> {
  static displayName = 'AsyncAvatarPickerDialog';
  static AvatarPickerDialog?: typeof AvatarPickerDialog;

  state = {
    // Set state value to equal to current static value of this class.
    AvatarPickerDialog: AsyncAvatarPickerDialog.AvatarPickerDialog,
  };

  async componentWillMount() {
    if (!this.state.AvatarPickerDialog) {
      const module = await import(/* webpackChunkName:"@uidu-internal_media-avatar-picker" */
      '.');
      AsyncAvatarPickerDialog.AvatarPickerDialog = module.AvatarPickerDialog;
      this.setState({ AvatarPickerDialog: module.AvatarPickerDialog });
    }
  }

  render() {
    if (!this.state.AvatarPickerDialog) {
      return (
        <ModalSpinner
          blankedColor="rgba(255, 255, 255, 0.53)"
          invertSpinnerColor={false}
        />
      );
    }

    return <this.state.AvatarPickerDialog {...this.props} />;
  }
}
