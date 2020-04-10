import { uuid } from '@uidu/adf-schema';
import { ContextIdentifierProvider } from '@uidu/editor-common';
import {
  Node as PMNode,
  NodeType,
  ResolvedPos,
  Schema,
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
  replaceParentNodeOfType,
  safeInsert,
} from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  AnalyticsEventPayload,
  EVENT_TYPE,
  INPUT_METHOD,
  USER_CONTEXT,
} from '../analytics';
import { GapCursorSelection } from '../gap-cursor';
import { TOOLBAR_MENU_TYPE } from '../insert-block/ui/ToolbarInsertBlock';
import { stateKey as taskDecisionStateKey } from './pm-plugins/main';
import {
  AddItemTransactionCreator,
  ContextData,
  TaskDecisionInputMethod,
  TaskDecisionListType,
} from './types';

const getContextData = (
  contextProvider: ContextIdentifierProvider = {} as ContextIdentifierProvider,
): ContextData => {
  const { objectId, containerId } = contextProvider;
  const userContext: USER_CONTEXT = objectId
    ? USER_CONTEXT.EDIT
    : USER_CONTEXT.NEW;

  return {
    objectId,
    containerId,
    userContext,
  };
};

const generateAnalyticsPayload = (
  listType: TaskDecisionListType,
  contextData: ContextData,
  inputMethod: TaskDecisionInputMethod,
  itemLocalId: string,
  listLocalId: string,
  itemIdx: number,
  listSize: number,
): AnalyticsEventPayload => {
  let containerId;
  let objectId;
  let userContext: USER_CONTEXT | undefined;
  if (contextData) {
    ({ containerId, objectId, userContext } = contextData);
  }

  return {
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId:
      listType === 'taskList'
        ? ACTION_SUBJECT_ID.ACTION
        : ACTION_SUBJECT_ID.DECISION,
    eventType: EVENT_TYPE.TRACK,
    attributes: {
      inputMethod,
      containerAri: containerId,
      objectAri: objectId,
      userContext,
      localId: itemLocalId,
      listLocalId,
      position: itemIdx,
      listSize,
    },
  };
};

export const getListTypes = (
  listType: TaskDecisionListType,
  schema: Schema,
): { list: NodeType; item: NodeType } => {
  const { decisionList, decisionItem, taskList, taskItem } = schema.nodes;
  if (listType === 'taskList') {
    return {
      list: taskList,
      item: taskItem,
    };
  }

  return {
    list: decisionList,
    item: decisionItem,
  };
};

export const insertTaskDecision = (
  view: EditorView,
  listType: TaskDecisionListType,
  inputMethod: TOOLBAR_MENU_TYPE = INPUT_METHOD.TOOLBAR,
): boolean => {
  const { state } = view;
  const { schema } = state;
  const addAndCreateList = ({
    tr,
    list,
    item,
    listLocalId,
    itemLocalId,
  }: {
    tr: Transaction;
    list: any;
    item: any;
    listLocalId?: string;
    itemLocalId?: string;
  }) =>
    createListAtSelection(
      tr,
      list,
      item,
      schema,
      state,
      listLocalId,
      itemLocalId,
    );
  const addToList = ({
    state,
    tr,
    item,
    itemLocalId,
  }: {
    state: EditorState;
    tr: Transaction;
    item: any;
    itemLocalId: string;
  }) => {
    const { $to } = state.selection;
    const pos = $to.end($to.depth);
    return tr
      .split(pos, 1, [{ type: item, attrs: { localId: itemLocalId } }])
      .setSelection(new TextSelection(tr.doc.resolve(pos + $to.depth)));
  };

  const tr = insertTaskDecisionWithAnalytics(
    state,
    listType,
    inputMethod,
    addAndCreateList,
    addToList,
  );
  if (tr) {
    view.dispatch(tr);
    return true;
  }
  return false;
};

export const insertTaskDecisionWithAnalytics = (
  state: EditorState,
  listType: TaskDecisionListType,
  inputMethod: TaskDecisionInputMethod,
  addAndCreateList: AddItemTransactionCreator,
  addToList?: AddItemTransactionCreator,
): Transaction | null => {
  const { schema } = state;
  const { list, item } = getListTypes(listType, schema);
  const { tr } = state;
  const { $to } = state.selection;
  const listNode = findParentNodeOfType(list)(state.selection);
  const itemLocalId = uuid.generate() as string;
  const contextIdentifierProvider = taskDecisionStateKey.getState(state)
    .contextIdentifierProvider;
  const contextData = getContextData(contextIdentifierProvider);
  let listLocalId;
  let insertTrCreator;
  let itemIdx;
  let listSize;

  if (!listNode) {
    // Not a list - convert to one.
    listLocalId = uuid.generate() as string;
    itemIdx = 0;
    listSize = 1;
    insertTrCreator = addAndCreateList;
  } else if ($to.node().textContent.length > 0) {
    listSize = listNode.node.childCount + 1;
    listLocalId = listNode.node.attrs.localId;
    const listItemNode = findParentNodeOfType(item)(state.selection); // finds current item in list
    itemIdx = listItemNode
      ? state.doc.resolve(listItemNode.pos).index() + 1
      : 0;
    insertTrCreator = addToList ? addToList : addAndCreateList;
  }

  if (insertTrCreator) {
    let insertTr = insertTrCreator({
      state,
      tr,
      list,
      item,
      listLocalId,
      itemLocalId,
    });
    if (insertTr) {
      insertTr = addAnalytics(
        state,
        insertTr,
        generateAnalyticsPayload(
          listType,
          contextData,
          inputMethod,
          itemLocalId,
          listLocalId,
          itemIdx || 0,
          listSize || 0,
        ),
      );
    }
    return insertTr;
  }

  return null;
};

export const isSupportedSourceNode = (
  schema: Schema,
  selection: Selection,
): boolean => {
  const { paragraph, blockquote, decisionList, taskList } = schema.nodes;

  return hasParentNodeOfType([blockquote, paragraph, decisionList, taskList])(
    selection,
  );
};

export const changeInDepth = (before: ResolvedPos, after: ResolvedPos) =>
  after.depth - before.depth;

export const createListAtSelection = (
  tr: Transaction,
  list: any,
  item: any,
  schema: Schema,
  state: EditorState,
  listLocalId = uuid.generate(),
  itemLocalId = uuid.generate(),
): Transaction | null => {
  const { selection } = state;
  const { $from, $to } = selection;
  if ($from.parent !== $to.parent) {
    // ignore selections across multiple nodes
    return null;
  }

  const {
    paragraph,
    blockquote,
    decisionList,
    taskList,
    mediaGroup,
  } = schema.nodes;
  if ($from.parent.type === mediaGroup) {
    return null;
  }

  const emptyList = list.create({ localId: listLocalId }, [
    item.create({ localId: itemLocalId }),
  ]);

  // we don't take the content of a block node next to the gap cursor and always create an empty task
  if (selection instanceof GapCursorSelection) {
    return safeInsert(emptyList)(tr);
  }

  // try to replace any of the given nodeTypes
  if (isSupportedSourceNode(schema, selection)) {
    // A text selection within one of these node types converts the node type.
    const nodeTypesToReplace = [blockquote, decisionList, taskList];
    const { type: nodeType, childCount } = selection.$from.node();
    if (nodeType === paragraph && childCount > 0) {
      // Only convert paragraphs containing content.
      // Empty paragraphs use the default flow.
      // This distinction ensures the text selection remains in the correct location.
      nodeTypesToReplace.push(paragraph);
    }
    const newTr = replaceParentNodeOfType(
      nodeTypesToReplace,
      list.create({ localId: uuid.generate() }, [
        item.create(
          { localId: uuid.generate() },
          $from.node($from.depth).content,
        ),
      ]),
    )(tr);

    // Adjust depth for new selection, if it has changed (e.g. paragraph to list (ol > li))
    const depthAdjustment = changeInDepth($to, newTr.selection.$to);

    tr = tr.setSelection(
      new TextSelection(tr.doc.resolve($to.pos + depthAdjustment)),
    );

    // replacing successful
    if (newTr !== tr) {
      return tr;
    }
  }

  return safeInsert(emptyList)(tr);
};

export const splitListAtSelection = (
  tr: Transaction,
  schema: Schema,
  // state: EditorState,
): Transaction => {
  const { selection } = tr;
  const { $from, $to } = selection;
  if ($from.parent !== $to.parent) {
    // ignore selections across multiple nodes
    return tr;
  }

  const {
    decisionItem,
    decisionList,
    paragraph,
    taskItem,
    taskList,
  } = schema.nodes;

  const parentList = findParentNodeOfType([decisionList, taskList])(selection);

  if (!parentList) {
    return tr;
  }

  const item = findParentNodeOfType([decisionItem, taskItem])(selection);
  if (!item) {
    return tr;
  }

  const resolvedItemPos = tr.doc.resolve(item.pos);

  const newListIds = [
    parentList.node.attrs['localId'] || uuid.generate(), // first new list keeps list id
    uuid.generate(), // second list gets new id
  ];

  const beforeItems: PMNode[] = [];
  const afterItems: PMNode[] = [];
  parentList.node.content.forEach((item, offset, _index) => {
    if (offset < resolvedItemPos.parentOffset) {
      beforeItems.push(item);
    } else if (offset > resolvedItemPos.parentOffset) {
      afterItems.push(item);
    }
  });

  const content: PMNode[] = [];

  if (beforeItems.length) {
    content.push(
      parentList.node.type.createChecked(
        {
          localId: newListIds.shift(),
        },
        beforeItems,
      ),
    );
  }

  content.push(paragraph.createChecked({}, item.node.content));

  if (afterItems.length) {
    content.push(
      parentList.node.type.createChecked(
        {
          localId: newListIds.shift(),
        },
        afterItems,
      ),
    );
  }

  // If no list remains at start, then the new selection is different relative to the original selection.
  const posAdjust = beforeItems.length === 0 ? -1 : 1;

  tr = tr.replaceWith(
    resolvedItemPos.start() - 1,
    resolvedItemPos.end() + 1,
    content,
  );
  tr = tr.setSelection(
    new TextSelection(tr.doc.resolve($from.pos + posAdjust)),
  );

  return tr;
};
