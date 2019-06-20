import { Plugin, PluginKey } from 'prosemirror-state';
import DateNodeView from './nodeviews/date';
import { ReactNodeView } from '../../nodeviews';
import { PMPluginFactory } from '../../types';

export const pluginKey = new PluginKey('datePlugin');

export type DateState = {
  showDatePickerAt: number | null;
};

const createPlugin: PMPluginFactory = ({ dispatch, portalProviderAPI }) =>
  new Plugin({
    state: {
      init: () => ({ showDatePickerAt: null }),

      apply(tr, state: DateState) {
        const meta = tr.getMeta(pluginKey);

        if (meta) {
          // ED-5033, calendar control open for element in plugin state, when node-view is clicked.
          // Following chanek ensures that if same node-view is clicked twice calendar should close,
          // but if a different node-view is clicked, calendar should open next the that node-view.
          let newState;
          if (meta.showDatePickerAt === state.showDatePickerAt) {
            newState = { ...state, showDatePickerAt: null };
          } else {
            newState = { ...state, ...meta };
          }
          dispatch(pluginKey, newState);
          return newState;
        }

        if (tr.docChanged && state.showDatePickerAt) {
          const { pos, deleted } = tr.mapping.mapResult(state.showDatePickerAt);
          const newState = {
            showDatePickerAt: deleted ? null : pos,
          };

          if (newState.showDatePickerAt !== state.showDatePickerAt) {
            dispatch(pluginKey, newState);

            return newState;
          }
        }

        return state;
      },
    },
    key: pluginKey,
    props: {
      nodeViews: {
        date: ReactNodeView.fromComponent(DateNodeView, portalProviderAPI),
      },
    },
  });

export default createPlugin;
