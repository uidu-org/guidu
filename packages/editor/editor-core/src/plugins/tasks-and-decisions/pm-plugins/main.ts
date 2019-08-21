import { uuid } from '@atlaskit/adf-schema';
import {
  ContextIdentifierProvider,
  ProviderFactory,
} from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { findParentNodeOfType } from 'prosemirror-utils';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import { Dispatch } from '../../../event-dispatcher';
import { Command, EditorAppearance } from '../../../types';
import { nodesBetweenChanged } from '../../../utils';
import { decisionItemNodeView } from '../nodeviews/decisionItem';
import { taskItemNodeViewFactory } from '../nodeviews/taskItem';

export const stateKey = new PluginKey('tasksAndDecisionsPlugin');

enum ACTIONS {
  SET_CURRENT_TASK_DECISION_ITEM,
  SET_CONTEXT_PROVIDER,
}

export interface TaskDecisionPluginState {
  currentTaskDecisionItem: PMNode | undefined;
  contextIdentifierProvider?: ContextIdentifierProvider;
}

const setCurrentTaskDecisionItem = (item: PMNode | undefined): Command => (
  state,
  dispatch,
) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(stateKey, {
        action: ACTIONS.SET_CURRENT_TASK_DECISION_ITEM,
        data: item,
      }),
    );
  }
  return true;
};

const setContextIdentifierProvider = (
  provider: ContextIdentifierProvider | undefined,
): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(stateKey, {
        action: ACTIONS.SET_CONTEXT_PROVIDER,
        data: provider,
      }),
    );
  }
  return true;
};

export function createPlugin(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  dispatch: Dispatch,
  editorAppearance?: EditorAppearance,
) {
  return new Plugin({
    props: {
      nodeViews: {
        taskItem: taskItemNodeViewFactory(portalProviderAPI, providerFactory),
        decisionItem: decisionItemNodeView(portalProviderAPI),
      },
    },
    state: {
      init() {
        return { insideTaskDecisionItem: false };
      },
      apply(tr, pluginState) {
        const { action, data } = tr.getMeta(stateKey) || {
          action: null,
          data: null,
        };
        let newPluginState = pluginState;

        switch (action) {
          case ACTIONS.SET_CURRENT_TASK_DECISION_ITEM:
            newPluginState = {
              ...pluginState,
              currentTaskDecisionItem: data,
            };
            break;

          case ACTIONS.SET_CONTEXT_PROVIDER:
            newPluginState = {
              ...pluginState,
              contextIdentifierProvider: data,
            };
            break;
        }

        dispatch(stateKey, newPluginState);
        return newPluginState;
      },
    },
    view(editorView) {
      const providerHandler = (
        name: string,
        providerPromise?: Promise<ContextIdentifierProvider>,
      ) => {
        if (name === 'contextIdentifierProvider') {
          if (!providerPromise) {
            setContextIdentifierProvider(undefined)(
              editorView.state,
              editorView.dispatch,
            );
          } else {
            (providerPromise as Promise<ContextIdentifierProvider>).then(
              provider => {
                setContextIdentifierProvider(provider)(
                  editorView.state,
                  editorView.dispatch,
                );
              },
            );
          }
        }
      };
      providerFactory.subscribe('contextIdentifierProvider', providerHandler);

      return {
        update: view => {
          if (editorAppearance !== 'mobile') {
            return;
          }

          /**
           * For composition we need to hide the placeholder when the user is
           * inside of a taskItem, this is done via pluginState since focus always
           * lies with the root PM node.
           *
           * For web this should always display the placeholder until there is content.
           * Only mobile will hide the placeholder on focus.
           *
           * @see ED-5924
           */
          const { state, dispatch } = view;
          const { selection, schema } = state;

          const {
            currentTaskDecisionItem,
          }: TaskDecisionPluginState = stateKey.getState(state);
          const taskDecisionItem = findParentNodeOfType([
            schema.nodes.taskItem,
            schema.nodes.decisionItem,
          ])(selection);

          if (!taskDecisionItem && currentTaskDecisionItem) {
            setCurrentTaskDecisionItem(undefined)(state, dispatch);
            return;
          }

          if (
            taskDecisionItem &&
            currentTaskDecisionItem &&
            taskDecisionItem.node.eq(currentTaskDecisionItem) === false
          ) {
            setCurrentTaskDecisionItem(taskDecisionItem.node)(state, dispatch);
            return;
          }

          if (taskDecisionItem && !currentTaskDecisionItem) {
            setCurrentTaskDecisionItem(taskDecisionItem.node)(state, dispatch);
            return;
          }
        },
      };
    },
    key: stateKey,
    /*
     * After each transaction, we search through the document for any decisionList/Item & taskList/Item nodes
     * that do not have the localId attribute set and generate a random UUID to use. This is to replace a previous
     * Prosemirror capabibility where node attributes could be generated dynamically.
     * See https://discuss.prosemirror.net/t/release-0-23-0-possibly-to-be-1-0-0/959/17 for a discussion of this approach.
     *
     * Note: we currently do not handle the edge case where two nodes may have the same localId
     */
    appendTransaction: (transactions, _oldState, newState) => {
      const tr = newState.tr;
      let modified = false;
      transactions.forEach(transaction => {
        if (!transaction.docChanged) {
          return;
        }

        // Adds a unique id to a node
        nodesBetweenChanged(transaction, (node, pos) => {
          const {
            decisionList,
            decisionItem,
            taskList,
            taskItem,
          } = newState.schema.nodes;
          if (
            !!node.type &&
            (node.type === decisionList ||
              node.type === decisionItem ||
              node.type === taskList ||
              node.type === taskItem)
          ) {
            const { localId, ...rest } = node.attrs;
            if (localId === undefined || localId === null || localId === '') {
              tr.setNodeMarkup(pos, undefined, {
                localId: uuid.generate(),
                ...rest,
              });
              modified = true;
            }
          }
        });
      });

      if (modified) {
        return tr;
      }
      return undefined;
    },
  });
}
