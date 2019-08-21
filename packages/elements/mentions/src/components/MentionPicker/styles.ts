import { colors } from '@uidu/theme';
import styled from 'styled-components';
import {
  mentionListWidth,
  noDialogContainerBorderColor,
  noDialogContainerBorderRadius,
  noDialogContainerBoxShadow,
} from '../../shared-styles';

export interface MentionPickerStyleProps {
  visible?: boolean | string;
}

export const MentionPickerStyle = styled.div`
  display: ${(props: MentionPickerStyleProps) =>
    props.visible ? 'block' : 'none'};
`;

export const MentionPickerInfoStyle = styled.div`
  background: #fff;
  color: ${colors.N100};
  border: 1px solid ${noDialogContainerBorderColor};
  border-radius: ${noDialogContainerBorderRadius};
  box-shadow: ${noDialogContainerBoxShadow};
  display: block;
  width: ${mentionListWidth};
  white-space: nowrap;

  & {
    p {
      margin: 0;
      overflow: hidden;
      padding: 9px;
      text-overflow: ellipsis;
    }
  }
`;
