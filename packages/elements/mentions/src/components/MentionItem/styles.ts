import { colors } from '@uidu/theme';
import styled from 'styled-components';

export interface MentionItemStyleProps {
  selected?: boolean;
}

export interface AvatarSectionStyleProps {
  restricted?: boolean;
}

export interface NameSectionStyleProps {
  restricted?: boolean;
}

export interface InfoSectionStyleProps {
  restricted?: boolean;
}

export const RowStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 6px 14px;
  text-overflow: ellipsis;
  vertical-align: middle;
`;

export const AvatarStyle = styled.span`
  position: relative;
  flex: initial;
  opacity: ${(props: AvatarSectionStyleProps) =>
    props.restricted ? '0.5' : 'inherit'};
`;

export const NameSectionStyle = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 14px;
  opacity: ${(props: NameSectionStyleProps) =>
    props.restricted ? '0.5' : 'inherit'};
`;

export const FullNameStyle = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.N900};
`;

export const InfoSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  opacity: ${(props: InfoSectionStyleProps) =>
    props.restricted ? '0.5' : 'inherit'};

  & {
    /* Lozenge */
    & > span {
      margin-bottom: 2px;
    }
  }
`;

export const TimeStyle = styled.div`
  margin-left: 20px;
  flex: none;
  color: ${colors.N100};
  font-size: 12px;
`;

export const MentionItemStyle = styled.div`
  background-color: ${(props: MentionItemStyleProps) =>
    props.selected ? colors.N30 : 'transparent'};
  display: block;
  overflow: hidden;
  list-style-type: none;
  /* height: 48px; */
  /* line-height: 1.2; */
  cursor: pointer;
`;

export const AccessSectionStyle = styled.div`
  padding-left: 5px;
  color: ${colors.N500};
`;
