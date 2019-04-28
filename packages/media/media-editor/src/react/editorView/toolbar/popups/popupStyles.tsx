import styled from 'styled-components';
// TODO Extract common part from these:

export const LineWidthPopupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  right: 270px;
  width: 160px;
  padding: 9px;
  margin: -21px -28px; // Compensation for default big padding that inline dialog comes with
`;

export const ColorPopupContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 128px;
  padding: 8px;
  margin: -16px -24px; // Compensation for default big padding that inline dialog comes with
`;

export const ShapePopupContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 128px;
  padding: 8px;
  margin: -20px -32px; // Compensation for default big padding that inline dialog comes with
  > * {
    text-align: left;
    border-radius: 0;
  }
`;
