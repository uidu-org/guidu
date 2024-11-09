import { MentionAttributes } from '@uidu/adf-schema';
import { closeHistory } from 'prosemirror-history';
import {
  Fragment,
  Mark,
  Node as PMNode,
  Node as ProsemirrorNode,
  Schema,
  Slice,
} from 'prosemirror-model';
import {
  EditorState,
  Selection,
  TextSelection,
  Transaction,
} from 'prosemirror-state';
import {
  findParentNodeOfType,
  hasParentNodeOfType,
  safeInsert,
} from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { Command, CommandDispatch } from '../../types';
import { insideTable, processRawValue } from '../../utils';
import { mapSlice } from '../../utils/slice';
import { insertCard, queueCardsFromChangedTr } from '../card/pm-plugins/doc';
import { CardOptions } from '../card/types';
import { GapCursorSelection, Side } from '../gap-cursor/';
import { runMacroAutoConvert } from '../macro';
import { insertMediaAsMediaSingle } from '../media/utils/media-single';
import {
  pluginKey as textFormattingPluginKey,
  TextFormattingState,
} from '../text-formatting/pm-plugins/main';
import { applyTextMarksToSlice, hasOnlyNodesOfType } from './util';

// remove text attribute from mention for copy/paste (GDPR)
export function handleMention(slice: Slice, schema: Schema): Slice {
  return mapSlice(slice, (node) => {
    if (node.type.name === schema.nodes.mention.name) {
      const mention = node.attrs as MentionAttributes;
      const newMention = { ...mention, text: '' };
      return schema.nodes.mention.create(newMention, node.content, node.marks);
    }
    return node;
  });
}

export function handlePasteIntoTaskAndDecision(slice: Slice): Command {
  return (state: EditorState, dispatch?: CommandDispatch): boolean => {
    const {
      schema,
      tr: { selection },
    } = state;

    const {
      marks: { code: codeMark },
      nodes: { emoji, hardBreak, mention, paragraph, text },
    } = schema;

    return false;
  };
}

export function handlePasteAsPlainText(
  slice: Slice,
  _event: ClipboardEvent,
): Command {
  return (state: EditorState, dispatch?, view?: EditorView): boolean => {
    // In case of SHIFT+CMD+V ("Paste and Match Style") we don't want to run the usual
    // fuzzy matching of content. ProseMirror already handles this scenario and will
    // provide us with slice containing paragraphs with plain text, which we decorate
    // with "stored marks".
    // @see prosemirror-view/src/clipboard.js:parseFromClipboard()).
    // @see prosemirror-view/src/input.js:doPaste().
    if (view && (view as any).shiftKey) {
      const tr = closeHistory(state.tr);

      // <- using the same internal flag that prosemirror-view is using

      const { selection } = tr;
      tr.replaceSelection(slice);
      (state.storedMarks || []).forEach((mark) => {
        tr.addMark(selection.from, selection.from + slice.size, mark);
      });
      tr.scrollIntoView();
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }
    return false;
  };
}

export function handlePastePreservingMarks(slice: Slice): Command {
  return (state: EditorState, dispatch?): boolean => {
    const {
      schema,
      tr: { selection },
    } = state;

    const {
      marks: { code: codeMark, link: linkMark },
      nodes: {
        bulletList,
        emoji,
        hardBreak,
        heading,
        listItem,
        mention,
        orderedList,
        paragraph,
        text,
      },
    } = schema;

    if (!(selection instanceof TextSelection)) {
      return false;
    }

    const selectionMarks = selection.$head.marks();
    if (selectionMarks.length === 0) {
      return false;
    }

    const textFormattingState: TextFormattingState =
      textFormattingPluginKey.getState(state);

    // special case for codeMark: will preserve mark only if codeMark is currently active
    // won't preserve mark if cursor is on the edge on the mark (namely inactive)
    if (codeMark.isInSet(selectionMarks) && !textFormattingState.codeActive) {
      return false;
    }

    const isPlainTextSlice =
      slice.content.childCount === 1 &&
      slice.content.firstChild!.type === paragraph &&
      slice.content.firstChild!.content.childCount === 1 &&
      slice.content.firstChild!.firstChild!.type === text;

    // special case for plainTextSlice & linkMark: merge into existing link
    if (
      isPlainTextSlice &&
      linkMark.isInSet(selectionMarks) &&
      selectionMarks.length === 1
    ) {
      const tr = closeHistory(state.tr)
        .replaceSelectionWith(slice.content.firstChild!.firstChild!, true)
        .setStoredMarks(selectionMarks)
        .scrollIntoView();

      queueCardsFromChangedTr(state, tr);
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }

    if (
      hasOnlyNodesOfType(
        bulletList,
        hardBreak,
        heading,
        listItem,
        paragraph,
        text,
        emoji,
        mention,
        orderedList,
      )(slice)
    ) {
      const transformedSlice = applyTextMarksToSlice(
        schema,
        selectionMarks,
      )(slice);

      const tr = closeHistory(state.tr)
        .replaceSelection(transformedSlice)
        .setStoredMarks(selectionMarks)
        .scrollIntoView();

      queueCardsFromChangedTr(state, tr);
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }

    return false;
  };
}

async function isLinkSmart(
  text: string,
  type: any,
  cardOptions: CardOptions,
): Promise<boolean> {
  if (!cardOptions.provider) {
    return false;
  }
  const provider = await cardOptions.provider;
  return await provider.resolve(text, type);
}

function insertAutoMacro(
  slice: Slice,
  macro: ProsemirrorNode,
  view?: EditorView,
): boolean {
  if (view) {
    // insert the text or linkified/md-converted clipboard data
    const selection = view.state.tr.selection;

    const tr = view.state.tr.replaceSelection(slice);
    const before = tr.mapping.map(selection.from, -1);
    view.dispatch(tr);

    // replace the text with the macro as a separate transaction
    // so the autoconversion generates 2 undo steps
    view.dispatch(
      closeHistory(view.state.tr)
        .replaceRangeWith(before, before + slice.size, macro)
        .scrollIntoView(),
    );
    return true;
  }
  return false;
}

export function handleMacroAutoConvert(
  text: string,
  slice: Slice,
  cardsOptions?: CardOptions,
): Command {
  return (
    state: EditorState,
    _dispatch?: CommandDispatch,
    view?: EditorView,
  ) => {
    const macro = runMacroAutoConvert(state, text);
    if (macro) {
      /**
       * if FF enabled, run through smart links and check for result
       */
      if (
        cardsOptions &&
        cardsOptions.resolveBeforeMacros &&
        cardsOptions.resolveBeforeMacros.length
      ) {
        if (
          cardsOptions.resolveBeforeMacros.indexOf(macro.attrs.extensionKey) < 0
        ) {
          return insertAutoMacro(slice, macro, view);
        }

        isLinkSmart(text, 'inline', cardsOptions)
          .then((cardData: any) => {
            if (!view) {
              throw new Error('Missing view');
            }

            const { schema, tr } = view.state;
            const cardAdf = processRawValue(schema, cardData);

            if (!cardAdf) {
              throw new Error('Received invalid ADF from CardProvider');
            }

            view.dispatch(insertCard(tr, cardAdf, schema));
          })
          .catch(() => insertAutoMacro(slice, macro, view));
        return true;
      }
      return insertAutoMacro(slice, macro, view);
    }
    return !!macro;
  };
}

export function handleCodeBlock(text: string): Command {
  return (state, dispatch) => {
    const { codeBlock } = state.schema.nodes;
    if (text && hasParentNodeOfType(codeBlock)(state.selection)) {
      const tr = closeHistory(state.tr);
      tr.scrollIntoView();
      if (dispatch) {
        dispatch(tr.insertText(text));
      }
      return true;
    }
    return false;
  };
}

function isOnlyMedia(state: EditorState, slice: Slice) {
  const { media } = state.schema.nodes;
  return (
    slice.content.childCount === 1 && slice.content.firstChild!.type === media
  );
}

function isOnlyMediaSingle(state: EditorState, slice: Slice) {
  const { mediaSingle } = state.schema.nodes;
  return (
    mediaSingle &&
    slice.content.childCount === 1 &&
    slice.content.firstChild!.type === mediaSingle
  );
}

export function handleMediaSingle() {
  return function (slice: Slice): Command {
    return (state, dispatch, view) => {
      if (view) {
        if (isOnlyMedia(state, slice)) {
          return insertMediaAsMediaSingle(view, slice.content.firstChild);
        }

        if (insideTable(state) && isOnlyMediaSingle(state, slice)) {
          const tr = state.tr.replaceSelection(slice);
          const nextPos = tr.doc.resolve(
            tr.mapping.map(state.selection.$from.pos),
          );
          if (dispatch) {
            dispatch(
              tr.setSelection(new GapCursorSelection(nextPos, Side.RIGHT)),
            );
          }
          return true;
        }
      }
      return false;
    };
  };
}

export function handleExpand(slice: Slice): Command {
  return (state, dispatch) => {
    if (!insideTable(state)) {
      return false;
    }

    const { expand, nestedExpand } = state.schema.nodes;
    let { tr } = state;
    let hasExpand = false;

    const newSlice = mapSlice(slice, (maybeNode) => {
      if (maybeNode.type === expand) {
        hasExpand = true;
        try {
          return nestedExpand.createChecked(
            maybeNode.attrs,
            maybeNode.content,
            maybeNode.marks,
          );
        } catch (e) {
          tr = safeInsert(maybeNode, tr.selection.$to.pos)(tr);
          return Fragment.empty;
        }
      }
      return maybeNode;
    });

    if (hasExpand && dispatch) {
      // If the slice is a subset, we can let PM replace the selection
      // it will insert as text where it can't place the node.
      // Otherwise we use safeInsert to insert below instead of
      // replacing/splitting the current node.
      if (slice.openStart > 1 && slice.openEnd > 1) {
        dispatch(tr.replaceSelection(newSlice));
      } else {
        dispatch(safeInsert(newSlice.content)(tr));
      }
      return true;
    }

    return false;
  };
}

export function handleMarkdown(markdownSlice: Slice): Command {
  return (state, dispatch) => {
    const tr = closeHistory(state.tr);
    tr.replaceSelection(markdownSlice);

    queueCardsFromChangedTr(state, tr);
    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }
    return true;
  };
}

function removePrecedingBackTick(tr: Transaction) {
  const {
    $from: { nodeBefore },
    from,
  } = tr.selection;
  if (nodeBefore && nodeBefore.isText && nodeBefore.text!.endsWith('`')) {
    tr.delete(from - 1, from);
  }
}

function hasInlineCode(state: EditorState, slice: Slice) {
  return (
    slice.content.firstChild &&
    slice.content.firstChild.marks.some(
      (m: Mark) => m.type === state.schema.marks.code,
    )
  );
}

function isList(schema: Schema, node: PMNode | null | undefined) {
  const { bulletList, orderedList } = schema.nodes;
  return node && (node.type === bulletList || node.type === orderedList);
}

function flattenList(state: EditorState, node: PMNode, nodesArr: PMNode[]) {
  const { listItem } = state.schema.nodes;
  node.content.forEach((child) => {
    if (
      isList(state.schema, child) ||
      (child.type === listItem && isList(state.schema, child.firstChild))
    ) {
      flattenList(state, child, nodesArr);
    } else {
      nodesArr.push(child);
    }
  });
}

function shouldFlattenList(state: EditorState, slice: Slice) {
  const node = slice.content.firstChild;
  return (
    node &&
    insideTable(state) &&
    isList(state.schema, node) &&
    slice.openStart > slice.openEnd
  );
}

export function handleRichText(slice: Slice): Command {
  return (state, dispatch) => {
    const { codeBlock, panel } = state.schema.nodes;
    // In case user is pasting inline code,
    // any backtick ` immediately preceding it should be removed.
    let tr = state.tr;
    if (hasInlineCode(state, slice)) {
      removePrecedingBackTick(tr);
    }
    /**
     * ED-6300: When a nested list is pasted in a table cell and the slice has openStart > openEnd,
     * it splits the table. As a workaround, we flatten the list to even openStart and openEnd
     *
     *  Before:
     *  ul
     *    ┗━ li
     *      ┗━ ul
     *        ┗━ li
     *          ┗━ p -> "one"
     *    ┗━ li
     *      ┗━ p -> "two"
     *
     *  After:
     *  ul
     *    ┗━ li
     *      ┗━ p -> "one"
     *    ┗━ li
     *      ┗━p -> "two"
     */
    if (shouldFlattenList(state, slice) && slice.content.firstChild) {
      const node = slice.content.firstChild;
      const nodes: PMNode[] = [];
      flattenList(state, node, nodes);
      slice = new Slice(
        Fragment.from(node.type.createChecked(node.attrs, nodes)),
        slice.openEnd,
        slice.openEnd,
      );
    }

    closeHistory(tr);

    // if inside an empty panel, try and insert content inside it rather than replace it
    let panelParent = findParentNodeOfType(panel)(tr.selection);
    if (
      tr.selection.$from === tr.selection.$to &&
      panelParent &&
      !panelParent.node.textContent
    ) {
      tr = safeInsert(slice.content, tr.selection.$to.pos)(tr);
      // set selection to end of inserted content
      panelParent = findParentNodeOfType(panel)(tr.selection);
      if (panelParent) {
        tr.setSelection(
          TextSelection.near(
            tr.doc.resolve(panelParent.pos + panelParent.node.nodeSize),
          ),
        );
      }
    } else {
      tr.replaceSelection(slice);
    }

    tr.setStoredMarks([]);
    if (tr.selection.empty && tr.selection.$from.parent.type === codeBlock) {
      tr.setSelection(TextSelection.near(tr.selection.$from, 1) as Selection);
    }
    tr.scrollIntoView();

    // queue link cards, ignoring any errors
    if (dispatch) {
      dispatch(queueCardsFromChangedTr(state, tr));
    }
    return true;
  };
}
