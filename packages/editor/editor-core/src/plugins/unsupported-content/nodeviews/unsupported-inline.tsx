import { borderRadius, colors, fontSize } from '@uidu/theme';
import React from 'react';
import styled from 'styled-components';

const InlineNode = styled.span`
  align-items: center;
  background: ${colors.N30};
  border: 1px dashed ${colors.N50};
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;
  cursor: default;
  display: inline-flex;
  font-size: ${fontSize()}px;
  margin: 0 2px;
  min-height: 24px;
  padding: 0 10px;
  user-select: all;
  vertical-align: middle;
  white-space: nowrap;

  &.ProseMirror-selectednode {
    background: ${colors.N50};
    outline: none;
  }
`;

export default function UnsupportedInlineNode() {
  return (
    <span>
      <InlineNode>Unsupported inline content</InlineNode>
    </span>
  );
}
