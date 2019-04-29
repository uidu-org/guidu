import { Action } from 'redux';
import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isEditorShowImageAction } from '../../actions/editorShowImage';
import { HandlerResult } from '.';

export default (action: Action): HandlerResult => {
  if (isEditorShowImageAction(action)) {
    return [
      {
        name: 'fileEditorModal',
        eventType: SCREEN_EVENT_TYPE,
      },
    ];
  }
};
