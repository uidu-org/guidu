import { PanelType } from '@uidu/adf-schema';
import { removeParentNodeOfType, setParentNodeMarkup } from 'prosemirror-utils';
import { Command } from '../../types';
import { pluginKey } from './pm-plugins/main';

export type DomAtPos = (pos: number) => { node: HTMLElement; offset: number };

export const removePanel = (): Command => (state, dispatch) => {
  const {
    schema: { nodes },
    tr,
  } = state;

  if (dispatch) {
    dispatch(removeParentNodeOfType(nodes.panel)(tr));
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

    const changePanelTypeTr = setParentNodeMarkup(nodes.panel, null, {
      panelType,
    })(tr).setMeta(pluginKey, { activePanelType: panelType });
    changePanelTypeTr.setMeta('scrollIntoView', false);

    if (dispatch) {
      dispatch(changePanelTypeTr);
    }
    return true;
  };
