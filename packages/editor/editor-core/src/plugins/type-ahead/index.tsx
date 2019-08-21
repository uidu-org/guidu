import { typeAheadQuery } from '@atlaskit/adf-schema';
import * as React from 'react';
import WithPluginState from '../../components/WithPluginState';
import { EditorPlugin } from '../../types';
import { inputRulePlugin } from './pm-plugins/input-rules';
import { keymapPlugin } from './pm-plugins/keymap';
import {
  createInitialPluginState,
  createPlugin,
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState,
} from './pm-plugins/main';
import { TypeAheadHandler } from './types';
import { TypeAhead } from './ui/TypeAhead';

const typeAheadPlugin = (): EditorPlugin => ({
  name: 'typeAhead',

  marks() {
    return [{ name: 'typeAheadQuery', mark: typeAheadQuery }];
  },

  pmPlugins(typeAhead: Array<TypeAheadHandler> = []) {
    return [
      {
        name: 'typeAhead',
        plugin: ({ dispatch, reactContext, intl }) =>
          createPlugin(dispatch, reactContext, intl, typeAhead),
      },
      {
        name: 'typeAheadInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema, typeAhead),
      },
      {
        name: 'typeAheadKeymap',
        plugin: () => keymapPlugin(),
      },
    ];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
  }) {
    return (
      <WithPluginState
        plugins={{
          typeAhead: typeAheadPluginKey,
        }}
        render={({
          typeAhead = createInitialPluginState(),
        }: {
          typeAhead: TypeAheadPluginState;
        }) => {
          const { queryMarkPos } = typeAhead;
          const domRef =
            queryMarkPos !== null ? editorView.domAtPos(queryMarkPos) : null;
          const anchorElement = domRef
            ? ((domRef.node as HTMLElement).childNodes[
                domRef.offset
              ] as HTMLElement)
            : undefined;

          return (
            <TypeAhead
              editorView={editorView}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
              anchorElement={anchorElement}
              active={typeAhead.active}
              isLoading={!!typeAhead.itemsLoader}
              items={typeAhead.items}
              currentIndex={typeAhead.currentIndex}
            />
          );
        }}
      />
    );
  },
});

export { typeAheadPluginKey, TypeAheadPluginState };
export default typeAheadPlugin;
