import React from 'react';
import StyledNavigationHeader, {
  StyledNavigationHeaderAfter,
  StyledNavigationHeaderBefore,
  StyledNavigationHeaderText,
} from './styled';

export default function NavigationHeader({ before, after, text }) {
  return (
    <StyledNavigationHeader>
      {!!before && (
        <StyledNavigationHeaderBefore>{before}</StyledNavigationHeaderBefore>
      )}
      <StyledNavigationHeaderText>
        <h5 className="mb-0 font-weight-bold">{text}</h5>
      </StyledNavigationHeaderText>
      {!!after && (
        <StyledNavigationHeaderAfter>{after}</StyledNavigationHeaderAfter>
      )}
    </StyledNavigationHeader>
  );
}
