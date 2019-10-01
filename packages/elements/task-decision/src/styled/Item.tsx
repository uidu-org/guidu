import { borderRadius, colors, gridSize, themed } from '@uidu/theme';
import styled from 'styled-components';

const akGridSize = gridSize();

export const ContentWrapper = styled.div`
  margin: 0;
  word-wrap: break-word;
  min-width: 0;
  flex: 1 1 auto;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  line-height: 20px;
  border-radius: ${borderRadius()}px;
  margin: ${akGridSize / 2}px 0;
  padding: ${akGridSize}px ${akGridSize}px;
  min-height: 36px;
  box-sizing: border-box;
  box-shadow: none;

  &:hover {
    box-shadow: none;
    transition: box-shadow 0.2s ease-in-out;
    background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
  }

  border: 1px solid: ${themed({ light: 'none', dark: colors.DN60 })};
`;

export const ParticipantWrapper = styled.div`
  margin: -2px 8px;
`;

export const AttributionWrapper = styled.div`
  color: ${colors.N200};
  margin-top: ${akGridSize}px;
  font-size: 12px;
  font-weight: 500;
`;
