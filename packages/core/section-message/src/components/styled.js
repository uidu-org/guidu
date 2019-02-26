// @flow
import styled from 'styled-components';
import { borderRadius, colors, math, gridSize, typography } from '@uidu/theme';

export const Container = styled.section`
  display: flex;
  border-radius: ${borderRadius}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${math.multiply(gridSize, 2)}px;
`;

export const Title = styled.h1`
  margin: 0;
  ${typography.h500};
`;

export const Description = styled.div`
  * + & {
    margin-top: 8px;
  }
`;

export const Actions = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  * + & {
    margin-top: 8px;
  }
`;

export const Action = styled.li`
  align-items: center;
  display: flex;
  margin: 0;
  & + &::before {
    color: ${colors.N500};
    content: '·';
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: ${math.multiply(gridSize, 2)}px;
  }
`;

// If the icon is not wrapped in a div with a width, and we instead use margin or
// padding, the icon is shrunk by the padding.
// Since the icons will have a consistent size, we can treat them as pre-calculated
// space.
export const IconWrapper = styled.div`
  flex: 0 0 auto;
  width: ${math.multiply(gridSize, 5)}px;
  > span {
    margin: -2px 0;
    vertical-align: top;
  }
`;
