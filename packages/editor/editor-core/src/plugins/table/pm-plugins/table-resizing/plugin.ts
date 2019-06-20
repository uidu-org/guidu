import { Plugin, PluginKey } from 'prosemirror-state';
import classnames from 'classnames';
import { updateResizeHandle, getResizeCellPos } from './utils';
import {
  ColumnResizingPluginState,
  TableCssClassName as ClassName,
} from '../../types';
import { Dispatch } from '../../../../event-dispatcher';
import { handleMouseDown } from './event-handlers';
import { pluginFactory } from '../../../../utils/plugin-state-factory';
import reducer from './reducer';

export const pluginKey = new PluginKey('tableFlexiColumnResizing');

const { createPluginState, createCommand, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
);

export function createPlugin(
  dispatch: Dispatch<ColumnResizingPluginState>,
  {
    lastColumnResizable = true,
    dynamicTextSizing = false,
  }: ColumnResizingPluginState,
) {
  return new Plugin({
    key: pluginKey,
    state: createPluginState(dispatch, {
      lastColumnResizable,
      dynamicTextSizing,
      resizeHandlePos: null,
      dragging: null,
      lastClick: null,
    }),

    props: {
      attributes(state) {
        const pluginState = getPluginState(state);

        return {
          class: classnames(ClassName.RESIZING_PLUGIN, {
            [ClassName.RESIZE_CURSOR]: pluginState.resizeHandlePos !== null,
            [ClassName.IS_RESIZING]: !!pluginState.dragging,
          }),
        };
      },

      handleDOMEvents: {
        mousedown(view, event) {
          const { state } = view;
          const resizeHandlePos =
            // we're setting `resizeHandlePos` via command in integration tests
            getPluginState(state).resizeHandlePos ||
            getResizeCellPos(view, event as MouseEvent, lastColumnResizable);

          const { dragging } = getPluginState(state);
          if (resizeHandlePos !== null && !dragging) {
            const domAtPos = view.domAtPos.bind(view);
            if (
              handleMouseDown(
                view,
                event as MouseEvent,
                resizeHandlePos,
                dynamicTextSizing,
              )
            ) {
              updateResizeHandle(state, domAtPos, resizeHandlePos);
              return true;
            }
          }

          return false;
        },
      },
    },
  });
}

export { createCommand, getPluginState };
