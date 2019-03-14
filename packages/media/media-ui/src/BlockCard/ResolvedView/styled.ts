import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';
import { ellipsis, borderRadius, size } from '../../mixins';

const thumbnailWidth = 40;
export const maxAvatarCount = 6;

export const ContentWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 8px 12px 12px 12px;
`;

export const LeftWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  /* FIXME: top padding dependent on content */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 4px;
  margin-right: 8px;
  min-width: ${thumbnailWidth}px;
`;

export const RightWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  flex-grow: 1;
  min-width: 0; /* for Chrome ellipsis */
  flex-basis: 0; /* for IE ellipsis */
`;

export const FooterWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const Title: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${colors.N900};
  font-size: 16px;
  font-weight: 500;
  line-height: ${20 / 16};
  max-height: ${20 * 4}px;
  overflow: hidden;
`;

export const Byline: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin-top: 4px;
  color: ${colors.N300};
  font-size: 12px;
  font-weight: normal;
  line-height: ${16 / 12};
  ${ellipsis('100%')};
`;

export const Description: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin-top: 7px;
  color: ${colors.N800};
  font-size: 12px;
  font-weight: normal;
  line-height: ${18 / 12};
  max-height: ${18 * 3}px;
  overflow: hidden;
`;

export const IconWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin-top: 4px;
`;

export interface ThumbnailProps {
  src: string;
}

export const Thumbnail: ComponentClass<
  HTMLAttributes<{}> & ThumbnailProps
> = styled.div`
  ${borderRadius} ${size(48)} float: right;
  margin: 4px 0 12px 12px;
  background-color: ${colors.N30};
  background-image: url(${({ src }: ThumbnailProps) => src});
  background-size: cover;
`;

export const UsersWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin-top: 8px;
`;

export const ActionsWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin-top: 8px;
  text-align: right;

  > * {
    margin-top: 4px;
  }

  > * + * {
    margin-left: 4px;
  }
`;

export const AlertWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  /* z-index has to be 1 higher than the number of avatars in the avatar stack */
  z-index: ${maxAvatarCount + 1};
`;
