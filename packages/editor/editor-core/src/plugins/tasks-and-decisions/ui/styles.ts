// @ts-ignore: unused variable
// prettier-ignore
import { akEditorTableCellMinWidth } from '@uidu/editor-common';
import { fontSize } from '@uidu/theme';
import { css } from 'styled-components';

export const tasksAndDecisionsStyles = css`
  .ProseMirror .taskItemView-content-wrap,
  .ProseMirror .decisionItemView-content-wrap {
    font-size: ${fontSize()}px;
    min-width: ${akEditorTableCellMinWidth}px;
  }
`;
