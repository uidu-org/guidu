import { browser } from '@uidu/editor-common';
import { Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { Component } from 'react';
import { hoverRows, selectRow } from '../../commands';
import { TableColumnOrdering } from '../../types';
import { isSelectionUpdated } from '../../utils';
import CornerControls from './CornerControls';
import NumberColumn from './NumberColumn';
import RowControls from './RowControls';

export interface Props {
  editorView: EditorView;
  selection?: Selection;
  tableRef?: HTMLTableElement;
  tableActive?: boolean;
  isInDanger?: boolean;
  isResizing?: boolean;
  isHeaderRowEnabled?: boolean;
  isHeaderColumnEnabled?: boolean;
  isNumberColumnEnabled?: boolean;
  hasHeaderRow?: boolean;
  tableHeight?: number;
  hoveredRows?: number[];
  ordering?: TableColumnOrdering;
}

export default class TableFloatingControls extends Component<Props> {
  static displayName = 'TableFloatingControls';

  shouldComponentUpdate(nextProps: Props) {
    const {
      tableRef,
      isInDanger,
      isResizing,
      isHeaderRowEnabled,
      isNumberColumnEnabled,
      hoveredRows,
      selection,
      tableHeight,
      tableActive,
      isHeaderColumnEnabled,
      ordering,
    } = this.props;

    return (
      ordering !== nextProps.ordering ||
      tableRef !== nextProps.tableRef ||
      tableHeight !== nextProps.tableHeight ||
      tableActive !== nextProps.tableActive ||
      isInDanger !== nextProps.isInDanger ||
      isResizing !== nextProps.isResizing ||
      hoveredRows !== nextProps.hoveredRows ||
      isHeaderRowEnabled !== nextProps.isHeaderRowEnabled ||
      isHeaderColumnEnabled !== nextProps.isHeaderColumnEnabled ||
      isNumberColumnEnabled !== nextProps.isNumberColumnEnabled ||
      isSelectionUpdated(selection!, nextProps.selection)
    );
  }

  render() {
    const {
      editorView,
      tableRef,
      isInDanger,
      isResizing,
      isNumberColumnEnabled,
      isHeaderRowEnabled,
      isHeaderColumnEnabled,
      tableActive,
      hasHeaderRow,
      hoveredRows,
    } = this.props;

    if (!tableRef) {
      return null;
    }

    return (
      <div onMouseDown={(e) => e.preventDefault()}>
        {isNumberColumnEnabled ? (
          <NumberColumn
            editorView={editorView}
            hoverRows={this.hoverRows}
            tableRef={tableRef}
            tableActive={tableActive}
            hoveredRows={hoveredRows}
            hasHeaderRow={hasHeaderRow}
            isInDanger={isInDanger}
            isResizing={isResizing}
            selectRow={this.selectRow}
          />
        ) : null}
        <CornerControls
          editorView={editorView}
          tableRef={tableRef}
          isInDanger={isInDanger}
          isResizing={isResizing}
          isHeaderRowEnabled={isHeaderRowEnabled}
          isHeaderColumnEnabled={isHeaderColumnEnabled}
          hoveredRows={hoveredRows}
        />
        <RowControls
          editorView={editorView}
          tableRef={tableRef}
          hoverRows={this.hoverRows}
          hoveredRows={hoveredRows}
          isInDanger={isInDanger}
          isResizing={isResizing}
          selectRow={this.selectRow}
        />
      </div>
    );
  }

  private selectRow = (row: number, expand: boolean) => {
    const { editorView } = this.props;
    const { state, dispatch } = editorView;
    // fix for issue ED-4665
    if (browser.ie_version === 11) {
      (editorView.dom as HTMLElement).blur();
    }
    selectRow(row, expand)(state, dispatch);
  };

  private hoverRows = (rows: Array<number>, danger?: boolean) => {
    const { state, dispatch } = this.props.editorView;
    hoverRows(rows, danger)(state, dispatch);
  };
}
