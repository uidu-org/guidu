import styled from 'styled-components';

import { colors } from '@uidu/theme';

export const Container = styled.div`
  height: 100%;
  overflow-y: scroll;

  padding: 0 28px;
`;
export interface GridCellProps {
  width: number;
}
export const GridCell = styled.div<GridCellProps>`
  ${({ width }: GridCellProps) => `width: ${width}px;`} margin-top: 5px;
`;

export const Title = styled.div`
  color: #091e42;
  font-size: 20px;
  margin-top: 15px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  /* Required to allow end users to select text in the error message */
  cursor: auto;
  user-select: text;
`;

export const WarningIconWrapper = styled.div`
  width: 92px;
`;

export const WarningImage = styled.img`
  width: 200px;
`;

export const WarningHeading = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const WarningSuggestion = styled.p`
  color: ${colors.N300};
  font-size: 14px;
  margin-top: 5px;
`;
