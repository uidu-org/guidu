import { Node } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { EditorPlugin } from '../../types';
import { isEmptyDocument } from '../../utils';

export const pluginKey = new PluginKey('placeholderPlugin');

export function createPlaceholderDecoration(
  doc: Node,
  placeholderText: string,
): DecorationSet {
  const placeholderDecoration = document.createElement('span');
  placeholderDecoration.className = 'placeholder-decoration';
  const placeholderNode = document.createElement('span');
  placeholderNode.textContent = placeholderText;
  placeholderDecoration.appendChild(placeholderNode);
  return DecorationSet.create(doc, [
    Decoration.widget(1, placeholderDecoration, { side: -1 }),
  ]);
}

export function createPlugin(placeholderText?: string): Plugin | undefined {
  if (!placeholderText) {
    return undefined;
  }

  return new Plugin({
    key: pluginKey,
    state: {
      init: (_, state) => isEmptyDocument(state.doc),
      apply: (tr, _oldPluginState, _oldEditorState, newEditorState) => {
        const meta = tr.getMeta(pluginKey);

        if (meta) {
          if (meta.removePlaceholder) {
            return false;
          }

          if (meta.applyPlaceholderIfEmpty) {
            return isEmptyDocument(newEditorState.doc);
          }
        }

        // non-plugin specific transaction; don't excessively recalculate
        // if the document is empty
        if (!tr.docChanged) {
          return _oldPluginState;
        }

        return isEmptyDocument(newEditorState.doc);
      },
    },
    props: {
      decorations(editorState): DecorationSet | undefined {
        const havePlaceholder = pluginKey.getState(editorState);

        if (havePlaceholder) {
          return createPlaceholderDecoration(editorState.doc, placeholderText);
        }
        return undefined;
      },
      // Workaround for ED-4063: On Mobile / Android, a user can start typing but it won't trigger
      // an Editor state update so the placeholder will still be shown. We hook into the compositionstart
      // and compositionend events instead, to make sure we show/hide the placeholder for these devices.
      handleDOMEvents: {
        compositionstart(view) {
          const havePlaceholder = pluginKey.getState(view.state);

          if (havePlaceholder) {
            // remove placeholder, since document definitely contains text
            view.dispatch(
              view.state.tr.setMeta(pluginKey, { removePlaceholder: true }),
            );
          }

          return false;
        },
        compositionend(view) {
          const havePlaceholder = pluginKey.getState(view.state);

          if (!havePlaceholder) {
            view.dispatch(
              view.state.tr.setMeta(pluginKey, {
                applyPlaceholderIfEmpty: true,
              }),
            );
          }

          return false;
        },
      },
    },
  });
}

const placeholderPlugin = (): EditorPlugin => ({
  pmPlugins() {
    return [
      {
        name: 'placeholder',
        plugin: ({ props }) => createPlugin(props.placeholder),
      },
    ];
  },
});

export default placeholderPlugin;
