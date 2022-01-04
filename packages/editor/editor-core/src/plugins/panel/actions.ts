import { PanelType } from '@uidu/adf-schema';
import { removeParentNodeOfType, setParentNodeMarkup } from 'prosemirror-utils';
import { analyticsService } from '../../analytics';
import { Command } from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  addAnalytics,
  AnalyticsEventPayload,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { PANEL_TYPE } from '../analytics/types/node-events';
import { pluginKey } from './pm-plugins/main';

export type DomAtPos = (pos: number) => { node: HTMLElement; offset: number };

export const removePanel = (): Command => (state, dispatch) => {
  const {
    schema: { nodes },
    tr,
  } = state;
  const payload: AnalyticsEventPayload = {
    action: ACTION.DELETED,
    actionSubject: ACTION_SUBJECT.PANEL,
    attributes: { inputMethod: INPUT_METHOD.TOOLBAR },
    eventType: EVENT_TYPE.TRACK,
  };
  analyticsService.trackEvent(`uidu.editor-core.format.panel.delete.button`);

  if (dispatch) {
    dispatch(
      addAnalytics(state, removeParentNodeOfType(nodes.panel)(tr), payload),
    );
  }
  return true;
};

export const changePanelType =
  (panelType: PanelType): Command =>
  (state, dispatch) => {
    const {
      schema: { nodes },
      tr,
    } = state;

    let previousType: PANEL_TYPE = pluginKey.getState(state).activePanelType;
    const payload: AnalyticsEventPayload = {
      action: ACTION.CHANGED_TYPE,
      actionSubject: ACTION_SUBJECT.PANEL,
      attributes: {
        newType: panelType as PANEL_TYPE,
        previousType: previousType,
      },
      eventType: EVENT_TYPE.TRACK,
    };

    analyticsService.trackEvent(
      `uidu.editor-core.format.panel.${panelType}.button`,
    );

    const changePanelTypeTr = addAnalytics(
      state,
      setParentNodeMarkup(nodes.panel, null, { panelType })(tr).setMeta(
        pluginKey,
        { activePanelType: panelType },
      ),
      payload,
    );
    changePanelTypeTr.setMeta('scrollIntoView', false);

    if (dispatch) {
      dispatch(changePanelTypeTr);
    }
    return true;
  };
