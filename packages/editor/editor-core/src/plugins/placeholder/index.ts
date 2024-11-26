import { SafePlugin } from '@uidu/editor-common/safe-plugin';
import { Node } from 'prosemirror-model';
import { EditorState, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { EditorPlugin } from '../../types';
import {
  isEmptyDocument,
  isInEmptyLine,
  isNodeEmpty,
} from '../../utils/document';
import { focusStateKey } from '../base/pm-plugins/focus-handler';
import { isTypeAheadOpen } from '../type-ahead/utils';

export const pluginKey = new PluginKey<PlaceholderPluginState>(
  'placeholderPlugin',
);

export interface PlaceholderPluginOptions {
  /**
   * **The class name for the empty editor**
   * @default 'is-editor-empty'
   */
  emptyEditorClass: string;

  /**
   * **The class name for empty nodes**
   * @default 'is-empty'
   */
  emptyNodeClass: string;

  /**
   * **The placeholder content**
   *
   * You can use a function to return a dynamic placeholder or a string.
   * @default 'Write something …'
   */
  placeholder:
    | ((PlaceholderProps: {
        doc: Node;
        node: Node;
        pos: number;
        hasAnchor: boolean;
      }) => string)
    | string;
  /**
   * **Checks if the placeholder should be only shown when the current node is empty.**
   *
   * If true, the placeholder will only be shown when the current node is empty.
   * If false, the placeholder will be shown when any node is empty.
   * @default true
   */
  showOnlyCurrent: boolean;
  /**
   * **Controls if the placeholder should be shown for all descendents.**
   *
   * If true, the placeholder will be shown for all descendents.
   * If false, the placeholder will only be shown for the current node.
   * @default false
   */
  includeChildren: boolean;
}

interface PlaceholderPluginState {
  pos?: number;
  placeholder: PlaceholderPluginOptions['placeholder'];
}

function getPlaceholderState(editorState: EditorState): PlaceholderPluginState {
  return pluginKey.getState(editorState);
}

function setPlaceholderState(
  placeholder: PlaceholderPluginOptions['placeholder'],
  pos?: number,
): PlaceholderPluginState {
  return {
    placeholder,
    pos: pos || 1,
  };
}

const emptyPlaceholder: PlaceholderPluginState = { placeholder: null };

function createPlaceholderStateFrom(
  editorState: EditorState,
  placeholder: PlaceholderPluginOptions['placeholder'],
): PlaceholderPluginState {
  const isEditorFocused = focusStateKey.getState(editorState);

  if (isTypeAheadOpen(editorState)) {
    return emptyPlaceholder;
  }

  if (placeholder && isEmptyDocument(editorState.doc)) {
    return setPlaceholderState(placeholder);
  }

  if (placeholder && isInEmptyLine(editorState) && isEditorFocused) {
    const { $from } = editorState.selection;
    return setPlaceholderState(placeholder, $from.pos);
  }

  // if (bracketPlaceholderText && bracketTyped(editorState) && isEditorFocused) {
  //   const { $from } = editorState.selection;
  //   // Space is to account for positioning of the bracket
  //   const bracketHint = '  ' + bracketPlaceholderText;
  //   return setPlaceholderState(bracketHint, $from.pos - 1);
  // }
  return emptyPlaceholder;
}

export function createPlugin({
  placeholder,
  emptyEditorClass = 'is-editor-empty',
  emptyNodeClass = 'is-empty',
  showOnlyCurrent = true,
}: PlaceholderPluginOptions): SafePlugin<PlaceholderPluginOptions> | undefined {
  if (!placeholder) {
    return undefined;
  }
  return new SafePlugin<PlaceholderPluginState>({
    key: pluginKey,
    state: {
      init: (_, state) => createPlaceholderStateFrom(state, placeholder),
      apply: (tr, _oldPluginState, _oldEditorState, newEditorState) => {
        const meta = tr.getMeta(pluginKey);

        // console.log('meta', meta);

        if (meta) {
          if (meta.removePlaceholder) {
            return emptyPlaceholder;
          }

          if (meta.applyPlaceholderIfEmpty) {
            return createPlaceholderStateFrom(newEditorState, placeholder);
          }
        }

        return createPlaceholderStateFrom(newEditorState, placeholder);
      },
    },
    props: {
      decorations(editorState): DecorationSet | undefined {
        const decorations: Decoration[] = [];

        const { doc, selection } = editorState;
        const { anchor } = selection;

        const isEmptyDoc = isEmptyDocument(doc);

        const { placeholder } = getPlaceholderState(editorState);

        doc.descendants((node, pos) => {
          const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
          const isEmpty = !node.isLeaf && isNodeEmpty(node);

          if ((hasAnchor || !showOnlyCurrent) && isEmpty) {
            const classes = [emptyNodeClass];

            if (isEmptyDoc) {
              classes.push(emptyEditorClass);
            }

            const decoration = Decoration.node(pos, pos + node.nodeSize, {
              class: classes.join(' '),
              'data-placeholder':
                typeof placeholder === 'function'
                  ? placeholder({
                      doc,
                      node,
                      pos,
                      hasAnchor,
                    })
                  : placeholder,
            });

            decorations.push(decoration);
          }

          return false; // this.options.includeChildren;
        });

        return DecorationSet.create(doc, decorations);
      },
    },
  });
}

const placeholderPlugin = (
  options?: PlaceholderPluginOptions,
): EditorPlugin => ({
  name: 'placeholder',

  pmPlugins() {
    return [
      {
        name: 'placeholder',
        plugin: () => createPlugin(options),
      },
    ];
  },
});

export default placeholderPlugin;
