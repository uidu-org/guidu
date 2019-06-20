import * as React from 'react';
import { Component, SyntheticEvent } from 'react';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';
import { isCellSelection, getSelectionRect } from 'prosemirror-utils';
import { browser } from '@atlaskit/editor-common';

import { INPUT_METHOD } from '../../../../analytics';
import {
  hoverColumns,
  selectColumn,
  clearHoverSelection,
} from '../../../commands';
import {
  insertColumnWithAnalytics,
  deleteColumnsWithAnalytics,
} from '../../../commands-with-analytics';
import { TableCssClassName as ClassName } from '../../../types';
import {
  isSelectionUpdated,
  getColumnsWidths,
  isColumnDeleteButtonVisible,
  getColumnDeleteButtonParams,
  isColumnInsertButtonVisible,
  getColumnsParams,
  getColumnClassNames,
  ColumnParams,
} from '../../../utils';
import tableMessages from '../../messages';
import InsertButton from '../InsertButton';
import DeleteButton from '../DeleteButton';

export interface Props {
  editorView: EditorView;
  hoveredColumns?: number[];
  isInDanger?: boolean;
  isResizing?: boolean;
  insertColumnButtonIndex?: number;
  numberOfColumns?: number;
  selection?: Selection;
  tableRef?: HTMLTableElement;
}

export default class ColumnControls extends Component<Props, any> {
  shouldComponentUpdate(nextProps: Props) {
    const {
      tableRef,
      selection,
      numberOfColumns,
      hoveredColumns,
      insertColumnButtonIndex,
      isInDanger,
      isResizing,
    } = this.props;

    if (nextProps.tableRef) {
      const controls = nextProps.tableRef.parentNode!.firstChild as HTMLElement;
      // checks if controls width is different from table width
      // 1px difference is acceptable and occurs in some situations due to the browser rendering specifics
      const shouldUpdate =
        Math.abs(controls.offsetWidth - nextProps.tableRef.offsetWidth) > 1;
      if (shouldUpdate) {
        return true;
      }
    }

    return (
      tableRef !== nextProps.tableRef ||
      insertColumnButtonIndex !== nextProps.insertColumnButtonIndex ||
      isInDanger !== nextProps.isInDanger ||
      isResizing !== nextProps.isResizing ||
      numberOfColumns !== nextProps.numberOfColumns ||
      hoveredColumns !== nextProps.hoveredColumns ||
      isSelectionUpdated(selection!, nextProps.selection)
    );
  }

  render() {
    const {
      editorView,
      tableRef,
      insertColumnButtonIndex,
      hoveredColumns,
      isInDanger,
      isResizing,
    } = this.props;
    if (!tableRef || !tableRef.querySelector('tr')) {
      return null;
    }

    const { selection } = editorView.state;
    const columnsWidths = getColumnsWidths(editorView);
    const columnsParams = getColumnsParams(columnsWidths);
    const deleteBtnParams = getColumnDeleteButtonParams(
      columnsWidths,
      selection,
    );

    return (
      <div className={ClassName.COLUMN_CONTROLS}>
        <div className={ClassName.COLUMN_CONTROLS_INNER}>
          <>
            {columnsParams.map(
              ({ startIndex, endIndex, width }: ColumnParams) => (
                <div
                  className={`${
                    ClassName.COLUMN_CONTROLS_BUTTON_WRAP
                  } ${getColumnClassNames(
                    startIndex,
                    selection,
                    hoveredColumns,
                    isInDanger,
                    isResizing,
                  )}`}
                  key={startIndex}
                  style={{ width }}
                  onMouseDown={e => e.preventDefault()}
                >
                  <button
                    type="button"
                    className={ClassName.CONTROLS_BUTTON}
                    onClick={event =>
                      this.selectColumn(startIndex, event.shiftKey)
                    }
                    onMouseOver={() => this.hoverColumns([startIndex])}
                    onMouseOut={this.clearHoverSelection}
                  >
                    {!isCellSelection(selection) && (
                      <>
                        <div
                          className={ClassName.CONTROLS_BUTTON_OVERLAY}
                          data-index={startIndex}
                        />
                        <div
                          className={ClassName.CONTROLS_BUTTON_OVERLAY}
                          data-index={endIndex}
                        />
                      </>
                    )}
                  </button>
                  {isColumnInsertButtonVisible(endIndex, selection) && (
                    <InsertButton
                      type="column"
                      tableRef={tableRef}
                      index={endIndex}
                      showInsertButton={
                        !isResizing && insertColumnButtonIndex === endIndex
                      }
                      onMouseDown={() => this.insertColumn(endIndex)}
                    />
                  )}
                </div>
              ),
            )}
            {isColumnDeleteButtonVisible(selection) && deleteBtnParams && (
              <DeleteButton
                key="delete"
                removeLabel={tableMessages.removeColumns}
                style={{ left: deleteBtnParams.left }}
                onClick={this.deleteColumns}
                onMouseEnter={() =>
                  this.hoverColumns(deleteBtnParams.indexes, true)
                }
                onMouseLeave={this.clearHoverSelection}
              />
            )}
          </>
        </div>
      </div>
    );
  }

  private deleteColumns = (event: SyntheticEvent) => {
    event.preventDefault();
    const { state, dispatch } = this.props.editorView;

    const rect = getSelectionRect(state.selection);
    if (rect) {
      deleteColumnsWithAnalytics(INPUT_METHOD.BUTTON, rect)(state, dispatch);
    }

    this.clearHoverSelection();
  };

  private selectColumn = (column: number, expand: boolean) => {
    const { editorView } = this.props;
    const { state, dispatch } = editorView;
    // fix for issue ED-4665
    if (browser.ie_version === 11) {
      (editorView.dom as HTMLElement).blur();
    }
    selectColumn(column, expand)(state, dispatch);
  };

  private hoverColumns = (columns: number[], danger?: boolean) => {
    const { state, dispatch } = this.props.editorView;
    hoverColumns(columns, danger)(state, dispatch);
  };

  private clearHoverSelection = () => {
    const { state, dispatch } = this.props.editorView;
    clearHoverSelection()(state, dispatch);
  };

  private insertColumn = (column: number) => {
    const { state, dispatch } = this.props.editorView;
    insertColumnWithAnalytics(INPUT_METHOD.BUTTON, column)(state, dispatch);
  };
}
