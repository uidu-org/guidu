import { Action, MiddlewareAPI } from 'redux';
import { State } from '../../domain';
import { isHidePopupAction } from '../../actions/hidePopup';
import { buttonClickPayload, HandlerResult } from '.';

export default (action: Action, store: MiddlewareAPI<State>): HandlerResult => {
  if (isHidePopupAction(action)) {
    return [
      {
        ...buttonClickPayload,
        actionSubjectId:
          store.getState().selectedItems.length > 0
            ? 'insertFilesButton'
            : 'cancelButton',
        attributes: {
          fileCount: store.getState().selectedItems.length,
        },
      },
    ];
  }
};
