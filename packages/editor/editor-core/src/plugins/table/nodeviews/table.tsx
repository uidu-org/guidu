import { DOMOutputSpec, DOMSerializer, Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import * as React from 'react';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import WithPluginState from '../../../components/WithPluginState';
import ReactNodeView, { ForwardRef, getPosHandler } from '../../../nodeviews/ReactNodeView';
import { closestElement } from '../../../utils';
import { pluginKey as widthPluginKey } from '../../width';
import { pluginConfig as getPluginConfig } from '../index';
import { getPluginState, pluginKey } from '../pm-plugins/main';
import { handleBreakoutContent } from '../pm-plugins/table-resizing/commands';
import { pluginKey as tableResizingPluginKey } from '../pm-plugins/table-resizing/index';
import { contentWidth, generateColgroup } from '../pm-plugins/table-resizing/utils';
import { TableCssClassName as ClassName } from '../types';
import TableComponent from './TableComponent';

export type TableOptions = {
  dynamicTextSizing?: boolean;
  isBreakoutEnabled?: boolean;
  isFullWidthModeEnabled?: boolean;
  wasFullWidthModeEnabled?: boolean;
};

export interface Props {
  node: PmNode;
  view: EditorView;
  allowColumnResizing?: boolean;
  cellMinWidth?: number;
  portalProviderAPI: PortalProviderAPI;
  getPos: () => number;
  options?: TableOptions;
}

const tableAttributes = (node: PmNode) => {
  return {
    'data-number-column': node.attrs.isNumberColumnEnabled,
    'data-layout': node.attrs.layout,
    'data-autosize': node.attrs.__autoSize,
  };
};

const toDOM = (node: PmNode, props: Props) => {
  let colgroup: DOMOutputSpec = '';

  if (props.allowColumnResizing) {
    // @ts-ignore
    colgroup = ['colgroup', {}].concat(generateColgroup(node));
  }

  return [
    'table',
    tableAttributes(node),
    colgroup,
    ['tbody', 0],
  ] as DOMOutputSpec;
};

export default class TableView extends ReactNodeView {
  private table: HTMLElement | undefined;
  private observer?: MutationObserver;

  constructor(props: Props) {
    super(props.node, props.view, props.getPos, props.portalProviderAPI, props);

    const MutObserver = (window as any).MutationObserver;
    this.observer = MutObserver && new MutObserver(this.handleMutation);
  }

  getContentDOM() {
    const rendered = DOMSerializer.renderSpec(
      document,
      toDOM(this.node, this.reactComponentProps as Props),
    );

    if (rendered.dom) {
      this.table = rendered.dom as HTMLElement;

      // Ignore mutation doesn't pick up children updates
      // E.g. inserting a bodiless extension that renders
      // arbitrary nodes (aka macros).
      if (this.observer) {
        this.observer.observe(rendered.dom, {
          subtree: true,
          childList: true,
          attributes: true,
        });
      }
    }

    return rendered;
  }

  setDomAttrs(node: PmNode) {
    if (!this.table) {
      return undefined;
    }

    const attrs = tableAttributes(node);
    (Object.keys(attrs) as Array<keyof typeof attrs>).forEach(attr => {
      this.table!.setAttribute(attr, attrs[attr]);
    });
  }

  render(props: Props, forwardRef: ForwardRef) {
    return (
      <WithPluginState
        plugins={{
          containerWidth: widthPluginKey,
          pluginState: pluginKey,
          tableResizingPluginState: tableResizingPluginKey,
        }}
        editorView={props.view}
        render={pluginStates => (
          <TableComponent
            {...props}
            {...pluginStates}
            node={this.node}
            width={pluginStates.containerWidth.width}
            contentDOM={forwardRef}
          />
        )}
      />
    );
  }

  ignoreMutation() {
    return true;
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    super.destroy();
  }

  private resizeForBreakoutContent = (target: HTMLElement) => {
    const { view } = this;
    const elemOrWrapper = closestElement(
      target,
      `.${ClassName.TABLE_HEADER_NODE_WRAPPER}, .${ClassName.TABLE_CELL_NODE_WRAPPER}`,
    );
    const { minWidth } = contentWidth(target, target);

    // This can also trigger for a non-resized table.
    if (this.node && elemOrWrapper && elemOrWrapper.offsetWidth < minWidth) {
      const cellPos = view.posAtDOM(elemOrWrapper, 0);
      const domAtPos = view.domAtPos.bind(view);
      const { state, dispatch } = view;
      handleBreakoutContent(
        elemOrWrapper as HTMLTableElement,
        cellPos - 1,
        this.getPos() + 1,
        minWidth,
        this.node,
        domAtPos,
      )(state, dispatch);
    }
  };

  private resizeForExtensionContent = (target: HTMLTableElement) => {
    if (!this.node) {
      return undefined;
    }
    const { view } = this;
    const elemOrWrapper = closestElement(
      target,
      '.inlineExtensionView-content-wrap, .extensionView-content-wrap',
    );
    if (!elemOrWrapper) {
      return undefined;
    }
    const container = closestElement(
      target,
      `.${ClassName.TABLE_HEADER_NODE_WRAPPER}, .${ClassName.TABLE_CELL_NODE_WRAPPER}`,
    ) as HTMLTableElement;
    if (!container) {
      return undefined;
    }

    if (container.offsetWidth < elemOrWrapper.offsetWidth) {
      const domAtPos = view.domAtPos.bind(view);
      const cellPos = view.posAtDOM(container, 0);
      const { state, dispatch } = view;
      handleBreakoutContent(
        container,
        cellPos - 1,
        this.getPos() + 1,
        elemOrWrapper.offsetWidth,
        this.node,
        domAtPos,
      )(state, dispatch);
    }
  };

  private handleMutation = (records: Array<MutationRecord>) => {
    if (!records.length || !this.contentDOM) {
      return undefined;
    }

    const uniqueTargets: Set<HTMLElement> = new Set();
    records.forEach(record => {
      const target = record.target as HTMLTableElement;
      // If we've seen this target already in this set of targets
      // We dont need to reprocess.
      if (!uniqueTargets.has(target)) {
        this.resizeForBreakoutContent(target);
        this.resizeForExtensionContent(target);
        uniqueTargets.add(target);
      }
    });
  };
}

export const createTableView = (
  node: PmNode,
  view: EditorView,
  getPos: getPosHandler,
  portalProviderAPI: PortalProviderAPI,
  options: TableOptions,
): NodeView => {
  const { pluginConfig } = getPluginState(view.state);
  const { allowColumnResizing } = getPluginConfig(pluginConfig);
  return new TableView({
    node,
    view,
    allowColumnResizing,
    portalProviderAPI,
    getPos,
    options,
  }).init();
};
