import { akEditorTableNumberColumnWidth } from '@uidu/editor-common';
import Tooltip from '@uidu/tooltip';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';
import * as keymaps from '../../../../keymaps';
import { closestElement } from '../../../../utils/';
import { TableCssClassName as ClassName } from '../../types';
import tableMessages from '../messages';
import { tableToolbarSize } from '../styles';

export interface ButtonProps {
  type: 'row' | 'column';
  tableRef: HTMLElement;
  index: number;
  showInsertButton: boolean;
  onMouseDown: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

const getInsertLineHeight = (tableRef: HTMLElement) => {
  // The line gets height 100% from the table,
  // but since we have an overflow on the left,
  // we should add an offset to make up for it.
  const LINE_OFFSET = 3;
  return tableRef.offsetHeight + tableToolbarSize + LINE_OFFSET;
};

const getToolbarSize = (tableRef: HTMLElement): number => {
  const parent = closestElement(tableRef, `.${ClassName.TABLE_CONTAINER}`);
  if (parent) {
    return parent.querySelector(`.${ClassName.NUMBERED_COLUMN}`)
      ? tableToolbarSize + akEditorTableNumberColumnWidth - 1
      : tableToolbarSize;
  }

  return tableToolbarSize;
};

const getInsertLineWidth = (tableRef: HTMLElement) => {
  // The line gets width 100% from the table,
  // but since we have an overflow on the left,
  // we should add an offset to make up for it.
  const LINE_OFFSET = 4;
  const { parentElement, offsetWidth } = tableRef;
  const parentOffsetWidth = parentElement!.offsetWidth;
  const { scrollLeft } = parentElement!;
  const diff = offsetWidth - parentOffsetWidth;
  const toolbarSize = getToolbarSize(tableRef);
  return (
    Math.min(
      offsetWidth + toolbarSize,
      parentOffsetWidth + toolbarSize - Math.max(scrollLeft - diff, 0),
    ) + LINE_OFFSET
  );
};

const tooltipMessageByType = (type: string) => {
  return type === 'row' ? tableMessages.insertRow : tableMessages.insertColumn;
};

const shortcutMessageByType = (type?: string) => {
  return type === 'row'
    ? keymaps.tooltip(keymaps.addRowAfter)
    : keymaps.tooltip(keymaps.addColumnAfter);
};

const shortcutTooltip = (message: string, shortcut?: string) => (
  <span>
    {message} <small>{shortcut}</small>
  </span>
);

const InsertButton = ({
  onMouseDown,
  index,
  tableRef,
  showInsertButton,
  type,
  intl,
}: ButtonProps & WrappedComponentProps) => (
  <div
    data-index={index}
    className={`${ClassName.CONTROLS_INSERT_BUTTON_WRAP} ${
      type === 'row'
        ? ClassName.CONTROLS_INSERT_ROW
        : ClassName.CONTROLS_INSERT_COLUMN
    }`}
  >
    {showInsertButton && (
      <FormattedMessage {...tooltipMessageByType(type)}>
        {(text: string) => (
          <Tooltip
            content={shortcutTooltip(text, shortcutMessageByType(type))}
            position="top"
          >
            <>
              <div className={ClassName.CONTROLS_INSERT_BUTTON_INNER}>
                <button
                  type="button"
                  className={ClassName.CONTROLS_INSERT_BUTTON}
                  onMouseDown={onMouseDown}
                >
                  <svg className={ClassName.CONTROLS_BUTTON_ICON}>
                    <path
                      d="M10 4a1 1 0 0 1 1 1v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H5a1 1 0 1 1 0-2h4V5a1 1 0 0 1 1-1z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={ClassName.CONTROLS_INSERT_LINE}
                style={
                  type === 'row'
                    ? { width: getInsertLineWidth(tableRef) }
                    : { height: getInsertLineHeight(tableRef) }
                }
              />
            </>
          </Tooltip>
        )}
      </FormattedMessage>
    )}
    <div className={ClassName.CONTROLS_INSERT_MARKER} />
  </div>
);

export default injectIntl(InsertButton);
