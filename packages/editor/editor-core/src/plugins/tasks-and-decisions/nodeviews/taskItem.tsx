import { ProviderFactory } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { Decoration, DecorationSet, NodeView } from 'prosemirror-view';
import React from 'react';
import { ForwardRef, getPosHandler, ReactNodeView } from '../../../nodeviews';
import { getPosHandlerNode } from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import WithPluginState from '../../../ui/WithPluginState';
import { stateKey as taskPluginKey } from '../pm-plugins/plugin-key';
import TaskItem from '../ui/Task';

export interface Props {
  providerFactory: ProviderFactory;
}

class Task extends ReactNodeView<Props> {
  private isContentEmpty(node: PMNode) {
    return node.content.childCount === 0;
  }

  private handleOnChange = (taskId: string, isChecked: boolean) => {
    const { tr } = this.view.state;
    const nodePos = (this.getPos as getPosHandlerNode)();

    tr.setNodeMarkup(nodePos, undefined, {
      state: isChecked ? 'DONE' : 'TODO',
      localId: taskId,
    });

    this.view.dispatch(tr);
  };

  createDomRef() {
    const domRef = document.createElement('div');
    domRef.style['list-style-type' as any] = 'none';
    return domRef;
  }

  getContentDOM() {
    const dom = document.createElement('div');
    // setting a className prevents PM/Chrome mutation observer from
    // incorrectly deleting nodes
    dom.className = 'task-item';
    return { dom };
  }

  render(props: Props, forwardRef: ForwardRef) {
    const { localId, state } = this.node.attrs;
    return (
      <WithPluginState
        plugins={{
          taskDecisionPlugin: taskPluginKey,
        }}
        render={() => {
          return (
            <TaskItem
              taskId={localId}
              contentRef={forwardRef}
              isDone={state === 'DONE'}
              onChange={this.handleOnChange}
              showPlaceholder={this.isContentEmpty(this.node)}
              providers={props.providerFactory}
            />
          );
        }}
      />
    );
  }

  viewShouldUpdate(nextNode: PMNode) {
    /**
     * To ensure the placeholder is correctly toggled we need to allow react to re-render
     * on first character insertion.
     * Note: last character deletion is handled externally and automatically re-renders.
     */
    return this.isContentEmpty(this.node) && !!nextNode.content.childCount;
  }

  update(
    node: PMNode,
    decorations: Decoration[],
    innerDecorations: DecorationSet,
  ) {
    return super.update(
      node,
      decorations,
      innerDecorations,
      (currentNode: PMNode, newNode: PMNode) =>
        // Toggle the placeholder based on whether user input exists
        !this.isContentEmpty(newNode) &&
        !!(currentNode.attrs.state === newNode.attrs.state),
    );
  }
}

export function taskItemNodeViewFactory(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
) {
  return (node: any, view: any, getPos: getPosHandler): NodeView => {
    return new Task(node, view, getPos, portalProviderAPI, {
      providerFactory,
    }).init();
  };
}
