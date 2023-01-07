import {
  EventHandlers,
  LinkEventClickHandler,
  mediaSingleClassName,
} from '@uidu/editor-common';
import { colors } from '@uidu/theme';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { getEventHandler } from '../../utils';

export const defaultMediaLinkOpacity = '0.8';

const StyledAnchor = styled.a`
  color: ${colors.B400};

  & > .${mediaSingleClassName} {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover {
    & > .${mediaSingleClassName} {
      opacity: ${defaultMediaLinkOpacity};
    }

    color: ${colors.B300};
    text-decoration: underline;
  }
`;

export default function Link({
  children,
  href,
  target,
  eventHandlers,
}: {
  children?: ReactNode;
  href: string;
  target?: string;
  eventHandlers?: EventHandlers;
}) {
  const anchorProps = {
    href,
    target,
    title: href,
    rel: undefined,
  };

  if (target === '_blank') {
    anchorProps.rel = 'noreferrer noopener';
  }

  const handler = getEventHandler(
    eventHandlers,
    'link',
    'onClick',
  ) as LinkEventClickHandler;

  return (
    <StyledAnchor
      onClick={(e) => {
        if (handler) {
          handler(e, href);
        }
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...anchorProps}
    >
      {children}
    </StyledAnchor>
  );
}
