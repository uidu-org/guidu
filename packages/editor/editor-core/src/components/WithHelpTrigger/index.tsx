import * as React from 'react';
import * as PropTypes from 'prop-types';
import { openHelpCommand } from '../../plugins/help-dialog';
import { analyticsService } from '../../analytics';
import {
  analyticsEventKey,
  AnalyticsDispatch,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
} from '../../plugins/analytics';
import { createDispatch } from '../../event-dispatcher';

export default class WithHelpTrigger extends React.Component<
  { render: (openHelp: () => void) => React.ReactNode },
  any
> {
  static contextTypes = {
    editorActions: PropTypes.object.isRequired,
  };

  openHelp = () => {
    const { editorActions } = this.context;

    const dispatch: AnalyticsDispatch = createDispatch(
      editorActions.eventDispatcher,
    );
    dispatch(analyticsEventKey, {
      payload: {
        action: ACTION.CLICKED,
        actionSubject: ACTION_SUBJECT.BUTTON,
        actionSubjectId: ACTION_SUBJECT_ID.BUTTON_HELP,
        attributes: { inputMethod: INPUT_METHOD.TOOLBAR },
        eventType: EVENT_TYPE.UI,
      },
    });
    analyticsService.trackEvent('atlassian.editor.help.button');

    const editorView = editorActions._privateGetEditorView();
    if (editorView) {
      openHelpCommand(editorView.state.tr, editorView.dispatch);
    }
  };

  render() {
    return this.props.render(this.openHelp);
  }
}
