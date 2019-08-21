import { akEditorUnitZIndex } from '@uidu/editor-common';
import { borderRadius, colors } from '@uidu/theme';
import styled from 'styled-components';

export const Header: any = styled.div`
  z-index: ${akEditorUnitZIndex};
  min-height: 24px;
  padding: 20px 40px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props: any) =>
    props.showKeyline ? `0 2px 0 ${colors.N30}` : 'none'};
  color: ${colors.N400};
  background-color: ${colors.N0};
  border-radius: ${borderRadius()}px;
`;

export const Footer: any = styled.div`
  z-index: ${akEditorUnitZIndex};
  font-size: 14px;
  line-height: 20px;
  color: ${colors.N300};
  padding: 24px;
  text-align: right;
  box-shadow: ${(props: any) =>
    props.showKeyline ? `0 -2px 0 ${colors.N30}` : 'none'};
`;

export const ContentWrapper = styled.div`
  padding: 18px 20px;
  border-bottom-right-radius: ${borderRadius()}px;
  overflow: auto;
  position: relative;
  color: ${colors.N400};
  background-color: ${colors.N0};
`;

export const Line = styled.div`
  background: #fff;
  content: '';
  display: block;
  height: 2px;
  left: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  min-width: 604px;
`;

export const Content = styled.div`
  min-width: 524px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const ColumnLeft = styled.div`
  width: 44%;
`;

export const ColumnRight = styled.div`
  width: 44%;
`;

export const Row = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

export const CodeSm = styled.span`
  background-color: ${colors.N20};
  border-radius: ${borderRadius()}px;
  width: 24px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  text-align: center;
`;

export const CodeMd = styled.span`
  background-color: ${colors.N20};
  border-radius: ${borderRadius()}px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  width: 50px;
  text-align: center;
`;

export const CodeLg = styled.span`
  background-color: ${colors.N20};
  border-radius: ${borderRadius()}px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  text-align: center;
`;
