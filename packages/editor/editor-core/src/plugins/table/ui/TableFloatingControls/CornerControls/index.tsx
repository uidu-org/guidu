import * as React from 'react';
import { Component } from 'react';
import classnames from 'classnames';
import { EditorView } from 'prosemirror-view';
import { isTableSelected, selectTable, findTable } from 'prosemirror-utils';
import { TableMap } from 'prosemirror-tables';

import { INPUT_METHOD } from '../../../../analytics';
import { clearHoverSelection, hoverTable } from '../../../commands';
import { TableCssClassName as ClassName } from '../../../types';
import {
  insertRowWithAnalytics,
  insertColumnWithAnalytics,
} from '../../../commands-with-analytics';
import InsertButton from '../InsertButton';

export interface Props {
  editorView: EditorView;
  tableRef?: HTMLTableElement;
  isInDanger?: boolean;
  isResizing?: boolean;
  isHeaderColumnEnabled?: boolean;
  isHeaderRowEnabled?: boolean;
  isNumberColumnEnabled?: boolean;
  insertColumnButtonIndex?: number;
  insertRowButtonIndex?: number;
  hoveredRows?: number[];
}

export default class CornerControls extends Component<Props, any> {
  render() {
    const {
      isInDanger,
      isResizing,
      isHeaderRowEnabled,
      isHeaderColumnEnabled,
      insertColumnButtonIndex,
      insertRowButtonIndex,
      tableRef,
    } = this.props;
    if (!tableRef) {
      return null;
    }
    const isActive = this.isActive();

    return (
      <div
        className={classnames(ClassName.CORNER_CONTROLS, {
          active: isActive,
        })}
      >
        <button
          type="button"
          className={classnames(ClassName.CONTROLS_CORNER_BUTTON, {
            danger: isActive && isInDanger,
          })}
          onClick={this.selectTable}
          onMouseOver={this.hoverTable}
          onMouseOut={this.clearHoverSelection}
        />
        {!isHeaderColumnEnabled && (
          <InsertButton
            type="column"
            tableRef={tableRef}
            index={0}
            showInsertButton={!isResizing && insertColumnButtonIndex === 0}
            onMouseDown={this.insertColumn}
          />
        )}
        {!isHeaderRowEnabled && (
          <InsertButton
            type="row"
            tableRef={tableRef}
            index={0}
            showInsertButton={!isResizing && insertRowButtonIndex === 0}
            onMouseDown={this.insertRow}
          />
        )}
      </div>
    );
  }

  private isActive = () => {
    const { editorView, hoveredRows, isResizing } = this.props;
    const { selection } = editorView.state;
    const table = findTable(selection);
    if (!table) {
      return false;
    }
    return (
      isTableSelected(selection) ||
      (hoveredRows &&
        hoveredRows.length === TableMap.get(table.node).height &&
        !isResizing)
    );
  };

  private clearHoverSelection = () => {
    const { state, dispatch } = this.props.editorView;
    clearHoverSelection()(state, dispatch);
  };

  private selectTable = () => {
    const { state, dispatch } = this.props.editorView;
    dispatch(selectTable(state.tr).setMeta('addToHistory', false));
  };

  private hoverTable = () => {
    const { state, dispatch } = this.props.editorView;
    hoverTable()(state, dispatch);
  };

  private insertColumn = () => {
    const { state, dispatch } = this.props.editorView;
    insertColumnWithAnalytics(INPUT_METHOD.BUTTON, 0)(state, dispatch);
  };

  private insertRow = () => {
    const { state, dispatch } = this.props.editorView;
    insertRowWithAnalytics(INPUT_METHOD.BUTTON, 0)(state, dispatch);
  };
}
