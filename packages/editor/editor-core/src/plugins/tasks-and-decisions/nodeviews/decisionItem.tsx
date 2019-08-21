import { Node as PMNode } from 'prosemirror-model';
import { Decoration, EditorView, NodeView } from 'prosemirror-view';
import * as React from 'react';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import WithPluginState from '../../../components/WithPluginState';
import { ReactComponentProps, ReactNodeView } from '../../../nodeviews';
import {
  stateKey as taskPluginKey,
  TaskDecisionPluginState,
} from '../pm-plugins/main';
import DecisionItem from '../ui/Decision';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

class Decision extends ReactNodeView {
  private isContentEmpty(node: PMNode) {
    return node.content.childCount === 0;
  }

  createDomRef() {
    const domRef = document.createElement('li');
    domRef.style['list-style-type' as any] = 'none';
    return domRef;
  }

  getContentDOM() {
    return { dom: document.createElement('div') };
  }

  render(_props: ReactComponentProps, forwardRef: any) {
    return (
      <WithPluginState
        plugins={{
          taskDecisionPlugin: taskPluginKey,
        }}
        render={({
          taskDecisionPlugin,
        }: {
          taskDecisionPlugin: TaskDecisionPluginState;
        }) => {
          let insideCurrentNode = false;
          if (
            taskDecisionPlugin &&
            taskDecisionPlugin.currentTaskDecisionItem
          ) {
            insideCurrentNode = this.node.eq(
              taskDecisionPlugin.currentTaskDecisionItem,
            );
          }
          return (
            <DecisionItem
              contentRef={forwardRef}
              showPlaceholder={
                !insideCurrentNode && this.isContentEmpty(this.node)
              }
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
    return this.isContentEmpty(this.node) && nextNode.content.childCount === 1;
  }

  update(node: PMNode, decorations: Decoration[]) {
    return super.update(
      node,
      decorations,
      // Toggle the placeholder based on whether user input exists.
      (_currentNode, _newNode) => !this.isContentEmpty(_newNode),
    );
  }
}

export const decisionItemNodeView = (portalProviderAPI: PortalProviderAPI) => (
  node: any,
  view: any,
  getPos: () => number,
): NodeView => {
  return new Decision(node, view, getPos, portalProviderAPI).init();
};
