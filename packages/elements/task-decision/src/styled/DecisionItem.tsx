import { colors, gridSize, themed } from '@uidu/theme';
import styled from 'styled-components';

export interface EditorIconWrapperProps {
  showPlaceholder?: boolean;
}

export const EditorIconWrapper = styled.span<EditorIconWrapperProps>`
  flex: 0 0 16px;
  height: 16px;
  width: 16px;
  color: ${(props: EditorIconWrapperProps) =>
    props.showPlaceholder
      ? colors.N100
      : themed({ light: colors.G300, dark: colors.G200 })};
  margin: 2px ${gridSize}px 0 0;

  > span {
    margin: -8px;
  }
`;
