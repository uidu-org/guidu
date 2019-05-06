import React, { PureComponent } from 'react';
import StyledNavigationHeader, {
  StyledNavigationHeaderAfter,
  StyledNavigationHeaderBefore,
  StyledNavigationHeaderText,
} from './styled';

export default class NavigationHeader extends PureComponent<any> {
  render() {
    const { before, text, after } = this.props;
    return (
      <StyledNavigationHeader>
        {!!before && (
          <StyledNavigationHeaderBefore>{before}</StyledNavigationHeaderBefore>
        )}
        <StyledNavigationHeaderText>
          <h5 className="mb-0">{text}</h5>
        </StyledNavigationHeaderText>
        {!!after && (
          <StyledNavigationHeaderAfter>{after}</StyledNavigationHeaderAfter>
        )}
      </StyledNavigationHeader>
    );
  }
}
