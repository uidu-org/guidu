import styled from 'styled-components';
import {
  mentionListWidth,
  noDialogContainerBorderColor,
  noDialogContainerBorderRadius,
  noDialogContainerBoxShadow,
} from '../../shared-styles';

export interface MentionListStyleProps {
  empty?: boolean;
}

export const MentionListStyle = styled.div`
  display: ${(props: MentionListStyleProps) =>
    props.empty ? 'none' : 'block'};

  /* list style */
  width: ${mentionListWidth};
  color: #333;

  border: 1px solid ${noDialogContainerBorderColor};
  border-radius: ${noDialogContainerBorderRadius};
  box-shadow: ${noDialogContainerBoxShadow};
`;
