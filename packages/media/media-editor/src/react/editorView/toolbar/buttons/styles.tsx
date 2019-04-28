import styled from 'styled-components';
import { colors } from '@uidu/theme';

const optionsColorNormal = colors.N500;
const optionsColorActive = colors.B400;
const colorSampleOutlineColor = 'rgba(255, 255, 255, 0.5)';

export const ToolbarButton = styled.div`
  cursor: pointer;
  position: relative; /* for the child OptionsAreaBase which uses absolute positioning */
  min-width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-left: 4px;
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActiveToolbarButton = styled(ToolbarButton)`
  background-color: ${colors.N500};
  color: ${colors.N0};
`;

export interface OptionsIconWrapperProps {
  isActive: boolean;
}

export const OptionsIconWrapper = styled.div<OptionsIconWrapperProps>`
  position: absolute;
  right: -7px;
  bottom: -10px;
  color: ${({ isActive }: OptionsIconWrapperProps) =>
    isActive ? optionsColorActive : optionsColorNormal};
`;

export const ColorSample = styled.div`
  width: 18px;
  height: 18px;
  margin: 4px;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  border-color: ${colorSampleOutlineColor};
  box-sizing: border-box;
`;

export const DropdownLeftIconWrapper = styled.div`
  margin-right: -6px;
  margin-left: -8px;
`;

export const DropdownRightIconWrapper = styled.div`
  margin-right: -10px;
  margin-left: -8px;
`;

export const ButtonIconWrapper = styled.div`
  margin-right: -2px;
  margin-left: -2px;
`;

export const ShapeTitle = styled.span`
  text-transform: capitalize;
`;

export const GroupItem = styled.div`
  flex: 1 0 auto;
  margin: 0 4px;
`;

export const Group = styled.div`
  display: inline-flex;
  margin: 0 -4px;
`;
