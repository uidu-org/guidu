import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';
import { browser } from '@atlaskit/editor-common';
import CornerControls from './CornerControls';
import RowControls from './RowControls';
import NumberColumn from './NumberColumn';
import { isSelectionUpdated } from '../../utils';
import { hoverRows, selectRow } from '../../commands';

export interface Props {
  editorView: EditorView;
  selection?: Selection;
  tableRef?: HTMLTableElement;
  tableActive?: boolean;
  isInDanger?: boolean;
  isResizing?: boolean;
  isHeaderColumnEnabled?: boolean;
  isHeaderRowEnabled?: boolean;
  isNumberColumnEnabled?: boolean;
  hasHeaderRow?: boolean;
  tableHeight?: number;
  hoveredRows?: number[];
  insertColumnButtonIndex?: number;
  insertRowButtonIndex?: number;
}

export default class TableFloatingControls extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const {
      tableRef,
      isInDanger,
      isResizing,
      isHeaderRowEnabled,
      isHeaderColumnEnabled,
      isNumberColumnEnabled,
      hoveredRows,
      selection,
      tableHeight,
      tableActive,
      insertColumnButtonIndex,
      insertRowButtonIndex,
    } = this.props;
    return (
      tableRef !== nextProps.tableRef ||
      insertColumnButtonIndex !== nextProps.insertColumnButtonIndex ||
      insertRowButtonIndex !== nextProps.insertRowButtonIndex ||
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
      isHeaderColumnEnabled,
      isHeaderRowEnabled,
      tableActive,
      hasHeaderRow,
      hoveredRows,
      insertColumnButtonIndex,
      insertRowButtonIndex,
    } = this.props;

    if (!tableRef) {
      return null;
    }

    return (
      <div onMouseDown={e => e.preventDefault()}>
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
          isHeaderColumnEnabled={isHeaderColumnEnabled}
          isHeaderRowEnabled={isHeaderRowEnabled}
          insertColumnButtonIndex={insertColumnButtonIndex}
          insertRowButtonIndex={insertRowButtonIndex}
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
          insertRowButtonIndex={insertRowButtonIndex}
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
