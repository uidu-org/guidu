import React, { memo } from 'react';
import StyledNavigationHeader, {
  StyledNavigationHeaderAfter,
  StyledNavigationHeaderBefore,
  StyledNavigationHeaderText,
} from './styled';

function NavigationHeader({ before, after, text, description }) {
  return (
    <StyledNavigationHeader tw="border-b">
      {!!before && (
        <StyledNavigationHeaderBefore>{before}</StyledNavigationHeaderBefore>
      )}
      <StyledNavigationHeaderText>
        <h5 tw="text-xl font-bold">{text}</h5>
        {description && <p tw="mb-0 text-gray-500 text-sm">{description}</p>}
      </StyledNavigationHeaderText>
      {!!after && (
        <StyledNavigationHeaderAfter>{after}</StyledNavigationHeaderAfter>
      )}
    </StyledNavigationHeader>
  );
}

export default memo(NavigationHeader);
