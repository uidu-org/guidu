import { uuid } from '@uidu/adf-schema';
import { ProviderFactory } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { nodesBetweenChanged } from '../../../utils';
import { decisionItemNodeView } from '../nodeviews/decisionItem';
import { taskItemNodeViewFactory } from '../nodeviews/taskItem';
import { stateKey } from './plugin-key';

export { stateKey } from './plugin-key';

enum ACTIONS {
  SET_CONTEXT_PROVIDER,
}

export interface TaskDecisionPluginState {
  currentTaskDecisionItem: PMNode | undefined;
}

export function createPlugin(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  dispatch: Dispatch,
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

        dispatch(stateKey, newPluginState);
        return newPluginState;
      },
    },
    view(editorView) {
      return {};
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
      transactions.forEach((transaction) => {
        if (!transaction.docChanged) {
          return;
        }

        // Adds a unique id to a node
        nodesBetweenChanged(transaction, (node, pos) => {
          const { decisionList, decisionItem, taskList, taskItem } =
            newState.schema.nodes;
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
