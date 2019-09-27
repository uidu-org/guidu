import { borderRadius, colors, gridSize } from '@uidu/theme';
import styled from 'styled-components';

export const ButtonContent = styled.span`
  display: flex;
  height: 24px;
  line-height: 24px;
  min-width: 70px;
`;

export const Wrapper = styled.span`
  display: flex;
  margin-right: ${({ width }: { width?: 'small' | 'large' }) =>
    !width || width === 'large' ? 0 : gridSize()}px;
`;

export const ConfirmationPopup = styled.div`
  background: #fff;
  border-radius: ${borderRadius()}px;
  box-shadow: 0 4px 8px -2px ${colors.N60A}, 0 0 1px ${colors.N60A};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto;
  max-height: none;
  height: 410px;
  width: 280px;
`;

export const ConfirmationText = styled.div`
  font-size: 14px;
  word-spacing: 4px;
  line-height: 22px;
  color: ${colors.N400};
  margin-top: 30px;
  padding: 20px;
  & > div {
    width: 240px;
  }
  & > div:first-of-type {
    margin-bottom: 12px;
  }
  & > div:nth-of-type(2) {
    margin-bottom: 20px;
  }
`;

export const ConfirmationHeader = styled.div`
  background-color: ${colors.P400};
  height: 100px;
  width: 100%;
  display: inline-block;
`;

export const ConfirmationImg = styled.img`
  width: 100px;
  display: block;
  margin: 25px auto 0 auto;
`;
