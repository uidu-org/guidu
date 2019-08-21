import { Node } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
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
    Decoration.widget(1, placeholderDecoration, {
      side: -1,
      key: 'placeholder',
    }),
  ]);
}

function removePlaceholderIfData(view: EditorView, event: Event) {
  const havePlaceholder = pluginKey.getState(view.state);
  const compositionEvent = event as CompositionEvent;

  const hasData =
    compositionEvent.type === 'compositionstart' ||
    (compositionEvent.type === 'compositionupdate' && !!compositionEvent.data);

  if (havePlaceholder && hasData) {
    view.dispatch(
      view.state.tr.setMeta(pluginKey, { removePlaceholder: true }),
    );
  }

  return false;
}

function applyPlaceholderIfEmpty(view: EditorView, event: Event) {
  const havePlaceholder = pluginKey.getState(view.state);
  const compositionEvent = event as CompositionEvent;

  const emptyData = compositionEvent.data === '';

  if (!havePlaceholder && emptyData) {
    view.dispatch(
      view.state.tr.setMeta(pluginKey, {
        applyPlaceholderIfEmpty: true,
      }),
    );
  }

  return false;
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
        compositionstart: removePlaceholderIfData,
        compositionupdate: (view: EditorView, event: Event) =>
          applyPlaceholderIfEmpty(view, event) ||
          removePlaceholderIfData(view, event),
        compositionend: applyPlaceholderIfEmpty,
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
