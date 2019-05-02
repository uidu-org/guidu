import React, { PureComponent } from 'react';
import StyledNavigationHeader, {
  StyledNavigationHeaderBefore,
  StyledNavigationHeaderText,
  StyledNavigationHeaderAfter,
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
          <h5 className="ml-2 mb-0">{text}</h5>
        </StyledNavigationHeaderText>
        {!!after && (
          <StyledNavigationHeaderAfter>{after}</StyledNavigationHeaderAfter>
        )}
      </StyledNavigationHeader>
    );
  }
}
