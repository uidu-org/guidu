// @ts-ignore: unused variable
import {
  akEditorSmallZIndex,
  akEditorTableBorder,
  akEditorTableNumberColumnWidth,
  akEditorTableToolbarSize,
  akEditorUnitZIndex,
  browser,
  tableCellPadding,
  tableMarginBottom,
  tableMarginTop,
  tableSharedStyle,
} from '@atlaskit/editor-common';
import { borderRadius, colors, fontSize } from '@uidu/theme';
import { css } from 'styled-components';
import { scrollbarStyles } from '../../../components/styles';
import { TableCssClassName as ClassName } from '../types';

const {
  N40A,
  B100,
  B300,
  N300,
  B75,
  N20,
  N50,
  R50,
  R300,
  R75,
  N20A,
  N60A,
  N30,
  N90,
  N200,
  N0,
  R500,
} = colors;

export const tableToolbarColor = N20;
export const tableBorderColor = N50;
export const tableFloatingControlsColor = N20;
export const tableCellSelectedColor = B75;
export const tableToolbarSelectedColor = B100;
export const tableBorderSelectedColor = B300;
export const tableCellDeleteColor = R50;
export const tableBorderDeleteColor = R300;
export const tableToolbarDeleteColor = R75;

export const tableToolbarSize = akEditorTableToolbarSize;
export const tableBorderRadiusSize = 3;
export const tableInsertColumnButtonSize = 20;
export const tableDeleteButtonSize = 16;
export const tablePadding = 8;
export const contextualMenuTriggerSize = 16;
export const contextualMenuDropdownWidth = 180;
export const layoutButtonSize = 32;
export const tableInsertColumnButtonLeftOffset = 22;
export const tableInsertColumnButtonTopOffset = 22;
export const tableScrollbarOffset = 15;
export const tableMarginFullWidthMode = 2;

const isIE11 = browser.ie_version === 11;

const InsertLine = (css?: string) => `
  .${ClassName.CONTROLS_INSERT_LINE} {
    background: ${tableBorderSelectedColor};
    display: none;
    position: absolute;
    z-index: ${akEditorUnitZIndex};
    ${css}
  }
`;

const InsertMarker = (css?: string) => `
  .${ClassName.CONTROLS_INSERT_MARKER} {
    background-color: ${tableBorderColor};
    position: absolute;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    pointer-events: none;
    ${css}
  }
`;

const Button = (css?: string) => `
  border-radius: ${borderRadius()}px;
  border-width: 0px;
  display: inline-flex;
  max-width: 100%;
  text-align: center;
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
  outline: none !important;
  cursor: none;

  > .${ClassName.CONTROLS_BUTTON_ICON} {
    display: inline-flex;
    max-height: 100%;
    max-width: 100%;
  }
  ${css}
`;

const HeaderButton = (css?: string) => `
  .${ClassName.CONTROLS_BUTTON} {
    background: ${tableToolbarColor};
    border-top: 1px solid ${tableBorderColor};
    border-left: 1px solid ${tableBorderColor};
    display: block;
    box-sizing: border-box;
    padding: 0;

    :focus {
      outline: none;
    }
    ${css}
  }
  .active .${ClassName.CONTROLS_BUTTON} {
    color: ${N0};
    background-color: ${tableToolbarSelectedColor};
    border-color: ${tableBorderSelectedColor};
  }
`;

const HeaderButtonHover = () => `
  .${ClassName.CONTROLS_BUTTON}:hover {
    color: ${N0};
    background-color: ${tableToolbarSelectedColor};
    border-color: ${tableBorderSelectedColor};
    cursor: pointer;
  }
`;

const HeaderButtonDanger = () => `
  .danger .${ClassName.CONTROLS_BUTTON} {
    background-color: ${tableToolbarDeleteColor};
    border-color: ${tableBorderDeleteColor};
    position: relative;
    z-index: ${akEditorUnitZIndex};
  }
`;

const InsertButton = () => `
  .${ClassName.CONTROLS_INSERT_BUTTON_INNER} {
    position: absolute;
    z-index: ${akEditorUnitZIndex + 10};
    bottom: 1px;
  }
  .${ClassName.CONTROLS_INSERT_BUTTON_INNER},
  .${ClassName.CONTROLS_INSERT_BUTTON} {
    height: ${tableInsertColumnButtonSize}px;
    width: ${tableInsertColumnButtonSize}px;
  }
  .${ClassName.CONTROLS_INSERT_BUTTON} {
    ${Button(`
      background: white;
      box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
      color: ${N300};
    `)}
  }
  .${ClassName.CONTROLS_INSERT_LINE} {
    display: none;
  }
`;

const InsertButtonHover = () => `
  .${ClassName.CONTROLS_INSERT_BUTTON}:hover {
    background: ${B300};
    color: white;
    cursor: pointer;
  }
`;

const DeleteButton = (css?: string) => `
  .${ClassName.CONTROLS_DELETE_BUTTON_WRAP},
  .${ClassName.CONTROLS_DELETE_BUTTON} {
    height: ${tableDeleteButtonSize}px;
    width: ${tableDeleteButtonSize}px;
  }
  .${ClassName.CONTROLS_DELETE_BUTTON_WRAP} {
    position: absolute;
    ${css}

    .${ClassName.CONTROLS_DELETE_BUTTON} {
      ${Button(`
        background: ${N20A};
        color: ${N300};
      `)}
    }
  }
`;

const DeleteButtonHover = () => `
  .${ClassName.CONTROLS_DELETE_BUTTON}:hover {
    background: ${R300};
    color: white;
    cursor: pointer;
  }
`;

export const tableStyles = css`
  .${ClassName.LAYOUT_BUTTON} button {
    background: ${N20A};
    color: ${N300};
    cursor: none;
  }

  .${ClassName.LAYOUT_BUTTON}:not(.${ClassName.IS_RESIZING}) button:hover {
    background: ${B300};
    color: white !important;
    cursor: pointer;
  }

  .ProseMirror {
    ${tableSharedStyle}

    .less-padding {
      padding: 0 ${tablePadding}px;

      .${ClassName.ROW_CONTROLS_WRAPPER} {
        padding: 0 ${tablePadding}px;
      }

      &.${ClassName.TABLE_CONTAINER}[data-number-column='true'] {
        padding-left: ${akEditorTableNumberColumnWidth + tablePadding - 1}px;
      }
    }

    /* Breakout only works on top level */
    > .${ClassName.NODEVIEW_WRAPPER} .${
  ClassName.TABLE_CONTAINER
}[data-layout='full-width'],
    > .${ClassName.NODEVIEW_WRAPPER} .${
  ClassName.TABLE_CONTAINER
}[data-layout='wide'] {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    > * .${ClassName.NODEVIEW_WRAPPER} .${ClassName.TABLE_CONTAINER} {
      width: 100% !important;
    }

    /* Column controls */
    .${ClassName.COLUMN_CONTROLS} {
      height: ${tableToolbarSize}px;
      box-sizing: border-box;
      display: none;

      .${ClassName.COLUMN_CONTROLS_INNER} {
        display: flex;
      }
      .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP} {
        position: relative;
        margin-right: -1px;
      }
      .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}:last-child > button {
        border-top-right-radius: ${tableBorderRadiusSize}px;
      }
      .${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}.active .${
  ClassName.CONTROLS_BUTTON
},
      .${ClassName.CONTROLS_BUTTON}:hover {
        z-index: ${akEditorUnitZIndex};
        position: relative;
      }
      ${HeaderButton(`
        border-right: 1px solid ${tableBorderColor};
        border-bottom: none;
        height: ${tableToolbarSize}px;
        width: 100%;

        .${ClassName.CONTROLS_BUTTON_OVERLAY} {
          position: absolute;
          width: 50%;
          height: 30px;
          bottom: 0;
          right: 0;
        }
        .${ClassName.CONTROLS_BUTTON_OVERLAY}:first-child {
          left: 0;
        }
      `)}
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.COLUMN_CONTROLS} {
      ${HeaderButtonHover()}
      ${HeaderButtonDanger()}
    }
    .${ClassName.COLUMN_CONTROLS},
    .${ClassName.CORNER_CONTROLS} {
      ${DeleteButton(`
        top: -${tableDeleteButtonSize + 4}px;
      `)}
      .${ClassName.CONTROLS_INSERT_BUTTON_WRAP} {
        position: absolute;
        height: ${tableInsertColumnButtonSize}px;
        width: ${tableInsertColumnButtonSize}px;
        z-index: ${akEditorSmallZIndex};
        &:hover .${ClassName.CONTROLS_INSERT_LINE} {
          display: flex;
        }
      }
      .${ClassName.CONTROLS_INSERT_COLUMN} {
        top: -${tableInsertColumnButtonTopOffset}px;
        right: -${tableInsertColumnButtonSize / 2}px;
      }
      .${ClassName.CONTROLS_INSERT_ROW} {
        top: 2px;
        left: -${tableDeleteButtonSize + 2}px;
      }
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.COLUMN_CONTROLS},
    :not(.${ClassName.IS_RESIZING}) .${ClassName.CORNER_CONTROLS} {
      ${DeleteButtonHover()}
    }
    .${ClassName.COLUMN_CONTROLS},
    .${ClassName.CONTROLS_INSERT_COLUMN} {
      ${InsertButton()}
      ${InsertMarker(`
        bottom: 5px;
        left: 7px;
      `)}
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.CONTROLS_INSERT_COLUMN} {
      ${InsertButtonHover()}
      ${InsertLine(`
        width: 2px;
        left: 9px;
        top: ${tableInsertColumnButtonSize - 2}px;
      `)}
    }
    .${ClassName.ROW_CONTROLS},
    .${ClassName.CONTROLS_INSERT_ROW} {
      ${InsertButton()}
      ${InsertMarker(`
        top: 7px;
        right: 5px;
      `)}
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.CONTROLS_INSERT_ROW} {
      ${InsertButtonHover()}
      ${InsertLine(`
        height: 2px;
        top: 8px;
        left: ${tableInsertColumnButtonSize - 2}px;
      `)}
    }

    /* Corner controls */
    .${ClassName.CORNER_CONTROLS} {
      width: ${tableToolbarSize + 1}px;
      height: ${tableToolbarSize + 1}px;
      display: none;
    }
    .${ClassName.CONTROLS_CORNER_BUTTON} {
      position: absolute;
      top: 0;
      width: ${tableToolbarSize + 1}px;
      height: ${tableToolbarSize + 1}px;
      border: 1px solid ${tableBorderColor};
      border-radius: 0;
      border-top-left-radius: ${tableBorderRadiusSize}px;
      background: ${tableToolbarColor};
      box-sizing: border-box;
      padding: 0;
      :focus {
        outline: none;
      }
    }
    .active .${ClassName.CONTROLS_CORNER_BUTTON} {
      border-color: ${tableBorderSelectedColor};
      background: ${tableToolbarSelectedColor};
    }
    .${ClassName.TABLE_CONTAINER}[data-number-column='true'] {
      .${ClassName.CORNER_CONTROLS},
      .${ClassName.CONTROLS_CORNER_BUTTON} {
        width: ${akEditorTableToolbarSize + akEditorTableNumberColumnWidth}px;
      }
      .${ClassName.ROW_CONTROLS} .${ClassName.CONTROLS_BUTTON} {
        border-right-width: 0;
      }
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.CONTROLS_CORNER_BUTTON}:hover {
      border-color: ${tableBorderSelectedColor};
      background: ${tableToolbarSelectedColor};
      cursor: pointer;
    }
    :not(.${ClassName.IS_RESIZING}) .${
  ClassName.CONTROLS_CORNER_BUTTON
}.danger {
      border-color: ${tableBorderDeleteColor};
      background: ${tableToolbarDeleteColor};
    }

    /* Row controls */
    .${ClassName.ROW_CONTROLS} {
      width: ${tableToolbarSize}px;
      box-sizing: border-box;
      display: none;
      position: relative;

      .${ClassName.ROW_CONTROLS_INNER} {
        display: flex;
        flex-direction: column;
      }
      .${ClassName.ROW_CONTROLS_BUTTON_WRAP}:last-child > button {
        border-bottom-left-radius: ${tableBorderRadiusSize}px;
      }
      .${ClassName.ROW_CONTROLS_BUTTON_WRAP} {
        position: relative;
        margin-top: -1px;
      }
      .${ClassName.ROW_CONTROLS_BUTTON_WRAP}:hover,
      .${ClassName.ROW_CONTROLS_BUTTON_WRAP}.active,
      .${ClassName.CONTROLS_BUTTON}:hover {
        z-index: ${akEditorUnitZIndex};
      }
      .${ClassName.CONTROLS_INSERT_BUTTON_WRAP} {
        position: absolute;
        bottom: -${tableInsertColumnButtonSize / 2}px;
        left: -${tableInsertColumnButtonLeftOffset}px;
        height: ${tableInsertColumnButtonSize}px;
        width: ${tableInsertColumnButtonSize}px;
        z-index: ${akEditorSmallZIndex};
        &:hover .${ClassName.CONTROLS_INSERT_LINE} {
          display: flex;
        }
      }
      ${DeleteButton(`
        bottom: -${tableInsertColumnButtonSize / 2}px;
        left: -${tableDeleteButtonSize + 6}px;
      `)}
      ${HeaderButton(`
        border-bottom: 1px solid ${tableBorderColor};
        border-right: 1px solid ${tableBorderColor};
        border-radius: 0;
        height: 100%;
        width: ${tableToolbarSize + 1}px;

        .${ClassName.CONTROLS_BUTTON_OVERLAY} {
          position: absolute;
          width: 30px;
          height: 50%;
          right: 0;
          bottom: 0;
        }
        .${ClassName.CONTROLS_BUTTON_OVERLAY}:first-child {
          top: 0;
        }
      `)}
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.ROW_CONTROLS} {
      ${HeaderButtonHover()}
      ${HeaderButtonDanger()}
      ${DeleteButtonHover()}
    }

    /* Numbered column */
    .${ClassName.NUMBERED_COLUMN} {
      position: relative;
      float: right;
      margin-left: ${akEditorTableToolbarSize - 1}px;
      top: ${akEditorTableToolbarSize}px;
      width: ${akEditorTableNumberColumnWidth + 1}px;
      box-sizing: border-box;
      border-left: 1px solid ${akEditorTableBorder};
    }
    .${ClassName.NUMBERED_COLUMN_BUTTON} {
      border-top: 1px solid ${akEditorTableBorder};
      border-right: 1px solid ${akEditorTableBorder};
      box-sizing: border-box;
      margin-top: -1px;
      padding: 10px 2px;
      text-align: center;
      font-size: ${fontSize()}px;
      background-color: ${tableToolbarColor};
      color: ${N200};
      border-color: ${akEditorTableBorder};

      :first-child {
        margin-top: 0;
      }
      :last-child {
        border-bottom: 1px solid ${akEditorTableBorder};
      }
    }
    .${ClassName.WITH_CONTROLS} {
      .${ClassName.COLUMN_CONTROLS},
      .${ClassName.CORNER_CONTROLS},
      .${ClassName.ROW_CONTROLS} {
        display: block;
      }
      .${ClassName.NUMBERED_COLUMN} {
        border-left: 0 none;
        padding-left: 1px;
        margin-left: 0;

        .${ClassName.NUMBERED_COLUMN_BUTTON}.active {
          border-bottom: 1px solid ${tableBorderSelectedColor};
          border-color: ${tableBorderSelectedColor};
          background-color: ${tableToolbarSelectedColor};
          position: relative;
          z-index: ${akEditorUnitZIndex};
          color: ${N0};
        }
      }

      /* scroll shadows */
      .${ClassName.TABLE_RIGHT_SHADOW},
      .${ClassName.TABLE_LEFT_SHADOW}::after {
        display: block;
        position: absolute;
        pointer-events: none;
        z-index: ${akEditorSmallZIndex};
        width: 8px;
      }
      .${ClassName.TABLE_LEFT_SHADOW}::after {
        background: linear-gradient(
          to left,
          rgba(99, 114, 130, 0) 0,
          ${N40A} 100%
        );
        content: '';
        height: 100%;
        right: -8px;
        bottom: 0;
      }
      .${ClassName.TABLE_RIGHT_SHADOW} {
        background: linear-gradient(
          to right,
          rgba(99, 114, 130, 0) 0,
          ${N40A} 100%
        );
        height: calc(100% - ${tableMarginTop + tableMarginBottom - 2}px);
        left: calc(100% + 2px);
        top: ${tableMarginTop - 1}px;
      }
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.WITH_CONTROLS} {
      .${ClassName.NUMBERED_COLUMN_BUTTON} {
        cursor: pointer;
      }
      .${ClassName.NUMBERED_COLUMN_BUTTON}:hover {
        border-bottom: 1px solid ${tableBorderSelectedColor};
        border-color: ${tableBorderSelectedColor};
        background-color: ${tableToolbarSelectedColor};
        position: relative;
        z-index: ${akEditorUnitZIndex};
        color: ${N0};
      }
      .${ClassName.NUMBERED_COLUMN_BUTTON}.danger {
        background-color: ${tableToolbarDeleteColor};
        border: 1px solid ${tableBorderDeleteColor};
        color: ${R500};
        position: relative;
        z-index: ${akEditorUnitZIndex};
      }
    }

    /* Table */
    .${ClassName.TABLE_NODE_WRAPPER} > table {
      overflow: hidden;
      table-layout: fixed;

      .${ClassName.CELL_NODEVIEW_WRAPPER} {
        position: relative;
      }

      .${ClassName.SELECTED_CELL} {
        position: relative;
        border: 1px solid ${tableBorderSelectedColor};
      }
      /* Give selected cells a blue overlay */
      .${ClassName.SELECTED_CELL}::after {
        z-index: ${akEditorSmallZIndex};
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: ${tableCellSelectedColor};
        opacity: 0.3;
        pointer-events: none;
      }
    }
    :not(.${ClassName.IS_RESIZING}) .${ClassName.TABLE_NODE_WRAPPER} > table {
      .${ClassName.HOVERED_CELL} {
        position: relative;
        border: 1px solid ${tableBorderSelectedColor};
      }
      .${ClassName.SELECTED_CELL}.danger,
      .${ClassName.HOVERED_CELL}.danger {
        border: 1px solid ${tableBorderDeleteColor};
      }
      .${ClassName.SELECTED_CELL}.danger::after {
        background: ${tableCellDeleteColor};
      }
    }
    .${ClassName.COLUMN_CONTROLS_WRAPPER},
    .${ClassName.ROW_CONTROLS_WRAPPER} {
      position: absolute;
      top: ${tableMarginTop - 1}px;
    }
    .${ClassName.ROW_CONTROLS_WRAPPER}.${ClassName.TABLE_LEFT_SHADOW} {
      z-index: ${akEditorUnitZIndex};
    }
    .${ClassName.COLUMN_CONTROLS_WRAPPER} {
      left: 0;
    }
    .${ClassName.ROW_CONTROLS_WRAPPER} {
      left: -${tableToolbarSize}px;
    }
    .${ClassName.TABLE_NODE_WRAPPER} {
      padding-right: ${tableInsertColumnButtonSize / 2}px;
      margin-right: -${tableInsertColumnButtonSize / 2}px;
      padding-top: ${tableInsertColumnButtonSize / 2}px;
      margin-top: -${tableInsertColumnButtonSize / 2}px;
      padding-bottom: ${tableScrollbarOffset}px;
      margin-bottom: -${tableScrollbarOffset}px;
      z-index: ${akEditorUnitZIndex - 1};
      /* fixes gap cursor height */
      overflow: ${isIE11 ? 'none' : 'auto'};
      position: relative;
    }
    /* =============== TABLE COLUMN RESIZING ================== */
    .${ClassName.COLUMN_RESIZE_HANDLE} {
      position: absolute;
      top: 0;
      width: 2px;
      pointer-events: none;
      background-color: ${tableBorderSelectedColor};
      z-index: ${akEditorUnitZIndex};
    }
  }

  .ProseMirror.${ClassName.IS_RESIZING} {
    .${ClassName.TABLE_NODE_WRAPPER} {
      overflow-x: ${isIE11 ? 'none' : 'auto'};
      ${!isIE11 ? scrollbarStyles : ''};
    }
  }

  .ProseMirror.${ClassName.RESIZE_CURSOR} {
    cursor: col-resize;
  }


  .ProseMirror.${ClassName.RESIZING_PLUGIN} {
    .${ClassName.CELL_NODEVIEW_WRAPPER}:before,
    .${ClassName.CELL_NODEVIEW_WRAPPER}:after {
      content: '';
      display: block;
      width: ${tableCellPadding}px;
      height: calc(100% + ${tableCellPadding * 2}px);
      cursor: col-resize;
      position: absolute;
      top: -${tableCellPadding}px;
    }
    .${ClassName.CELL_NODEVIEW_WRAPPER}:before{
      left: -${tableCellPadding + 1}px;
    }
    .${ClassName.CELL_NODEVIEW_WRAPPER}:after{
      right: -${tableCellPadding + 1}px;
    }
    td:first-child .${ClassName.CELL_NODEVIEW_WRAPPER}:before,
    th:first-child .${ClassName.CELL_NODEVIEW_WRAPPER}:before {
      width: 0;
    }
  }

`;

export const tableFloatingCellButtonStyles = css`
  > div {
    background: ${N20};
    border-radius: ${borderRadius()}px;
    border: 2px solid ${N0};
    display: flex;
    height: ${contextualMenuTriggerSize - 2}px;
    flex-direction: column;
  }
  button {
    flex-direction: column;
    padding: 0;
    height: 100%;
    display: flex;
  }
  span {
    pointer-events: none;
  }
`;

export const tableFullPageEditorStyles = css`
  .ProseMirror .${ClassName.TABLE_NODE_WRAPPER} > table {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
  .ProseMirror:not(.${ClassName.IS_RESIZING}) .${ClassName.TABLE_NODE_WRAPPER} {
    .${ClassName.SELECTED_CELL}.danger, .${ClassName.HOVERED_CELL}.danger {
      border: 1px solid ${tableBorderDeleteColor};
      background: ${tableCellDeleteColor};
    }
    .${ClassName.SELECTED_CELL}.danger:after {
      background: ${tableCellDeleteColor};
    }
  }
`;

export const tableCommentEditorStyles = css`
  .ProseMirror .${ClassName.TABLE_NODE_WRAPPER} > table {
    margin-left: 0;
    margin-right: 0;

    ${scrollbarStyles};
  }
`;

export const tablePopupStyles = css`
  .${ClassName.CONTEXTUAL_SUBMENU} {
    border-radius: ${borderRadius()}px;
    background: white;
    box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
    display: block;
    position: absolute;
    width: 130px;
    height: 64px;
    top: 0;
    left: ${contextualMenuDropdownWidth}px;
    padding: 5px;

    > div {
      padding: 0;
    }
  }

  .${ClassName.CONTEXTUAL_MENU_ICON} {
    border: 1px solid ${N30};
    border-radius: ${borderRadius()}px;
    display: block;
    width: 20px;
    height: 20px;
    position: relative;
    left: -10px;

    &::after {
      content: '›';
      display: inline-block;
      width: 1px;
      position: relative;
      left: 25px;
      top: 9px;
      color: ${N90};
    }
  }
`;
