/* tslint:disable:variable-name */

import styled, { css, keyframes } from 'styled-components';
import { borderRadius, colors, gridSize } from '@uidu/theme';
import { checkeredBg } from './images';
import { AVATAR_DIALOG_WIDTH } from '../avatar-picker-dialog/layout-const';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const ImageBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 256px;
  height: 256px;
  background: url('${checkeredBg}');
  border-radius: ${borderRadius()};
`;

export const Container = styled.div`
  width: ${gridSize() * 32}px;
  box-sizing: border-box;
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  position: relative;
`;

export const SliderContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  margin-top: ${gridSize()}px;

  input {
    box-sizing: content-box;
    padding: 0;
  }
  background-color: #fff;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImageUploader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px 20px 10px;
`;
const droppingAnimation = css`
  border-color: #0e56c4;
  animation: ${spin} 8s linear infinite;
`;

export interface DragZoneProps {
  isDroppingFile: boolean;
  showBorder: boolean;
}

export const DragZone = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  position: relative;
  border-radius: 100%;
  transition: background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

  &::after {
    content: '';
    border: ${(props: DragZoneProps) =>
      props.showBorder ? '2px dashed #d0d6d0' : 'none'};
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: border-color 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  }

  ${(props: DragZoneProps) =>
    (props.isDroppingFile &&
      `
    background-color: #ddecfe;
    &:after {
      ${droppingAnimation}
    }
  `) ||
    ''};
`;

DragZone.displayName = 'DragZone';

export const DragZoneImage = styled.img`
  width: 100px;
`;

export interface DragZoneTextProps {
  isFullSize: boolean;
}

export const DragZoneText = styled.div`
  text-align: center;
  color: ${colors.N200};
  ${(props: DragZoneTextProps) =>
    props.isFullSize
      ? `width: ${AVATAR_DIALOG_WIDTH - gridSize() * 8}px`
      : 'width: auto'};
`;

export const SelectionBlocker = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  user-select: none;
`;

export const PaddedBreak = styled.p`
  margin-top: 10px !important;
  margin-bottom: 10px;
`;
