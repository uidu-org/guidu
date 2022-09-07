import React, { memo } from 'react';
import StyledNavigationGroupHeading, {
  StyledNavigationGroupHeadingAfter,
  StyledNavigationGroupHeadingBefore,
  StyledNavigationGroupHeadingText,
} from './styled';

function NavigationGroupHeading({ before, after, text }) {
  return (
    <StyledNavigationGroupHeading>
      {!!before && (
        <StyledNavigationGroupHeadingBefore>
          {before}
        </StyledNavigationGroupHeadingBefore>
      )}
      <StyledNavigationGroupHeadingText>
        {text}
      </StyledNavigationGroupHeadingText>
      {!!after && (
        <StyledNavigationGroupHeadingAfter>
          {after}
        </StyledNavigationGroupHeadingAfter>
      )}
    </StyledNavigationGroupHeading>
  );
}

export default memo(NavigationGroupHeading);
