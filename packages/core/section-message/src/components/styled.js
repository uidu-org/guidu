// @flow
import { borderRadius, colors, gridSize, math, typography } from '@uidu/theme';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  border-radius: ${borderRadius}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 1.5rem;
`;

export const Title = styled.h1`
  ${typography.h500};
  margin-top: 0rem;
`;

export const Description = styled.div`
  * + & {
    margin-top: 8px;
    margin-bottom: 0px;
  }
`;

export const Actions = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  * + & {
    margin-top: 8px;
    margin-bottom: 0px;
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
