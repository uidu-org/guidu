import { Node as PMNode, ResolvedPos, Schema } from 'prosemirror-model';
import { findDomRefAtPos, findPositionOfNodeBefore } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { closestElement } from '../../utils/dom';
import { TableCssClassName } from '../table/types';
import { tableInsertColumnButtonSize } from '../table/ui/styles';
import { GapCursorSelection, Side } from './selection';

// we don't show gap cursor for those nodes
const IGNORED_NODES = [
  'paragraph',
  'bulletList',
  'orderedList',
  'listItem',
  'taskItem',
  'decisionItem',
  'heading',
  'blockquote',
];

// Returns DOM node's vertical margin. It descents into the node and reads margins of nested DOM nodes
const getDomNodeVerticalMargin = (
  ref: HTMLElement | null,
  side: 'top' | 'bottom',
): number => {
  let margin = 0;
  while (ref && ref.nodeType === 1) {
    const css = window.getComputedStyle(ref);
    const curMargin = parseInt((css as any)[`margin-${side}`], 10);
    if (curMargin > margin) {
      margin = curMargin;
    }
    ref = ref[side === 'top' ? 'firstChild' : 'lastChild'] as HTMLElement;
  }
  return margin;
};

export const isIgnored = (node?: PMNode | null): boolean => {
  return !!node && IGNORED_NODES.indexOf(node.type.name) !== -1;
};

export const isValidTargetNode = (node?: PMNode | null): boolean => {
  return !!node && !isIgnored(node);
};

export function getMediaNearPos(
  doc: PMNode,
  $pos: ResolvedPos,
  schema: Schema,
  dir = -1,
): PMNode | null {
  let $currentPos = $pos;
  let currentNode: PMNode | null = null;
  const { mediaSingle, media, mediaGroup } = schema.nodes;

  do {
    $currentPos = doc.resolve(
      dir === -1 ? $currentPos.before() : $currentPos.after(),
    );

    if (!$currentPos) {
      return null;
    }

    currentNode =
      (dir === -1 ? $currentPos.nodeBefore : $currentPos.nodeAfter) ||
      $currentPos.parent;

    if (!currentNode || currentNode.type === schema.nodes.doc) {
      return null;
    }

    if (
      currentNode.type === mediaSingle ||
      currentNode.type === media ||
      currentNode.type === mediaGroup
    ) {
      return currentNode;
    }
  } while ($currentPos.depth > 0);

  return null;
}

export const isTextBlockNearPos = (
  doc: PMNode,
  schema: Schema,
  $pos: ResolvedPos,
  dir: number,
) => {
  let $currentPos = $pos;
  let currentNode: PMNode | null = null;

  while ($currentPos.depth > 0) {
    $currentPos = doc.resolve(
      dir === -1 ? $currentPos.before() : $currentPos.after(),
    );

    if (!$currentPos) {
      return false;
    }

    currentNode =
      (dir === -1 ? $currentPos.nodeBefore : $currentPos.nodeAfter) ||
      $currentPos.parent;

    if (!currentNode || currentNode.type === schema.nodes.doc) {
      return false;
    }

    if (currentNode.isTextblock) {
      return true;
    }
  }

  let childNode: PMNode | null = currentNode;

  while (childNode && childNode.firstChild) {
    childNode = childNode.firstChild;
    if (childNode && childNode.isTextblock) {
      return true;
    }
  }

  return false;
};

const isMediaSingle = (node?: HTMLElement | null): boolean => {
  if (!node) {
    return false;
  }
  const firstChild = node.firstChild as HTMLElement;
  return (
    !!firstChild &&
    firstChild.nodeType === Node.ELEMENT_NODE &&
    firstChild.classList.contains('media-single')
  );
};

const isNodeViewWrapper = (node?: HTMLElement | null): boolean => {
  if (!node) {
    return false;
  }
  return (
    !!node &&
    node.nodeType === Node.ELEMENT_NODE &&
    node.className.indexOf('-content-wrap') !== -1
  );
};

function getBreakoutModeFromTargetNode(node: PMNode): string {
  if (node.attrs.layout) {
    return node.attrs.layout;
  }

  if (node.marks && node.marks.length) {
    return (
      node.marks.find((mark) => mark.type.name === 'breakout') || {
        attrs: { mode: '' },
      }
    ).attrs.mode;
  }

  return '';
}

// incapsulated this hack into a separate util function
export const fixCursorAlignment = (view: EditorView) => {
  const {
    state: { selection, schema },
    domAtPos,
  } = view;

  if (!(selection instanceof GapCursorSelection)) {
    return undefined;
  }

  const { side, $from } = selection;

  // gap cursor is positioned relative to that node
  const targetNode = side === Side.LEFT ? $from.nodeAfter! : $from.nodeBefore!;
  if (!targetNode) {
    return undefined;
  }
  const targetNodePos =
    side === Side.LEFT ? $from.pos + 1 : findPositionOfNodeBefore(selection);
  if (targetNodePos === undefined) {
    return undefined;
  }

  let targetNodeRef = findDomRefAtPos(
    targetNodePos,
    domAtPos.bind(view),
  ) as HTMLElement | null;

  const gapCursorRef = view.dom.querySelector<HTMLSpanElement>(
    '.ProseMirror-gapcursor span',
  );
  if (!gapCursorRef) {
    return undefined;
  }

  const gapCursorParentNodeRef = gapCursorRef.parentElement;
  if (!gapCursorParentNodeRef) {
    return undefined;
  }

  const previousSibling = gapCursorParentNodeRef.previousSibling as HTMLElement | null;
  const isTargetNodeMediaSingle = isMediaSingle(targetNodeRef);
  const isMediaWithWrapping =
    isTargetNodeMediaSingle &&
    /wrap-[right|left]/i.test(targetNode.attrs.layout);
  const prevNodeMarginBottom = getDomNodeVerticalMargin(
    previousSibling,
    'bottom',
  );

  const minHeight = 20;
  let height = 0;
  let width = 0;
  let marginTop = 0;
  let breakoutWidth = 0;
  let paddingLeft = 0;

  // gets width and height of the prevNode DOM element, or its nodeView wrapper DOM element
  do {
    if (!targetNodeRef) {
      break;
    }

    const isTargetNodeNodeViewWrapper = isNodeViewWrapper(targetNodeRef);
    const firstChild = targetNodeRef.firstElementChild;
    const css = window.getComputedStyle(
      isTargetNodeNodeViewWrapper && !isTargetNodeMediaSingle
        ? firstChild || targetNodeRef
        : targetNodeRef,
    );

    const isInTableCell =
      !!targetNodeRef.parentElement &&
      /td|th/i.test(targetNodeRef.parentElement.nodeName);

    height = parseInt(css.height!, 10);
    width = parseInt(css.width!, 10);

    width += parseInt(css.paddingLeft!, 10);
    width += parseInt(css.paddingRight!, 10);
    height += parseInt(css.paddingTop!, 10);
    height += parseInt(css.paddingBottom!, 10);

    // padding is cumulative
    paddingLeft += parseInt(css.paddingLeft!, 10);

    if (previousSibling || isMediaWithWrapping || isInTableCell) {
      const curNodeMarginTop = getDomNodeVerticalMargin(targetNodeRef, 'top');
      if (curNodeMarginTop > prevNodeMarginBottom) {
        marginTop = curNodeMarginTop - prevNodeMarginBottom;
      }
      if (isMediaWithWrapping) {
        marginTop = curNodeMarginTop;
      }
    }

    if (isTargetNodeNodeViewWrapper || isTargetNodeMediaSingle) {
      breakoutWidth = width;
    }

    if (
      targetNodeRef.parentElement &&
      targetNodeRef.parentElement.classList.contains('ProseMirror')
    ) {
      break;
    }
    targetNodeRef = targetNodeRef.parentElement;
  } while (targetNodeRef && !targetNodeRef.contains(gapCursorRef));

  // height of the rule (<hr>) is 0, that's why we set minHeight
  if (height < minHeight) {
    height = minHeight;
    marginTop -= Math.round(minHeight / 2) - 1;
  }

  // breakout mode
  const breakoutMode = getBreakoutModeFromTargetNode(targetNode);
  const hasBreakoutEnable = /full-width|wide/i.test(breakoutMode);
  if (hasBreakoutEnable) {
    gapCursorRef.setAttribute('layout', breakoutMode);
  }

  // table nodeView margin fix
  if (targetNodeRef && targetNode.type === schema.nodes.table) {
    const tableNode = targetNodeRef.querySelector('table');
    if (!tableNode) {
      return undefined;
    }
    const style = window.getComputedStyle(tableNode);
    const halfPlusButtonSize = tableInsertColumnButtonSize / 2;
    marginTop = parseInt(style.marginTop!, 10);
    paddingLeft =
      side === Side.RIGHT
        ? hasBreakoutEnable
          ? tableInsertColumnButtonSize
          : halfPlusButtonSize
        : 0;
    height = parseInt(style.height!, 10);

    gapCursorRef.style.paddingLeft = `${paddingLeft}px`;
  }

  // mediaSingle with layout="wrap-left" or "wrap-right"
  if (isMediaWithWrapping) {
    gapCursorParentNodeRef.setAttribute('layout', targetNode.attrs.layout);
    if (targetNode.attrs.layout === 'wrap-right') {
      gapCursorRef.style.marginLeft = `-${width}px`;
    }
  }

  gapCursorRef.style.height = `${height}px`;
  gapCursorRef.style.marginTop = `${marginTop}px`;
  gapCursorRef.style.width = `${breakoutWidth || width}px`;
};

export const isIgnoredClick = (elem: HTMLElement) => {
  if (elem.nodeName === 'BUTTON' || closestElement(elem, 'button')) {
    return true;
  }

  // check if target node has a parent table node
  let tableWrap;
  let node = elem;
  while (node) {
    if (
      node.className &&
      (node.getAttribute('class') || '').indexOf(
        TableCssClassName.TABLE_CONTAINER,
      ) > -1
    ) {
      tableWrap = node;
      break;
    }
    node = node.parentNode as HTMLElement;
  }

  if (tableWrap) {
    const rowControls = tableWrap.querySelector(
      `.${TableCssClassName.ROW_CONTROLS_WRAPPER}`,
    );
    const isColumnControlsDecoration =
      elem &&
      elem.classList &&
      elem.classList.contains(TableCssClassName.COLUMN_CONTROLS_DECORATIONS);
    return (
      (rowControls && rowControls.contains(elem)) || isColumnControlsDecoration
    );
  }

  return false;
};
