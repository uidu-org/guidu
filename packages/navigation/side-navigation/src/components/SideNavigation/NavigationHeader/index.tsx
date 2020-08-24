import React, { PureComponent } from 'react';
import StyledNavigationHeader, {
  StyledNavigationHeaderAfter,
  StyledNavigationHeaderBefore,
  StyledNavigationHeaderText,
} from './styled';

export default class NavigationHeader extends PureComponent<any> {
  render() {
    const { before, text, after, description } = this.props;
    return (
      <StyledNavigationHeader>
        {!!before && (
          <StyledNavigationHeaderBefore>{before}</StyledNavigationHeaderBefore>
        )}
        <StyledNavigationHeaderText>
          <h5 className="mb-0 font-weight-bold">{text}</h5>
          {description && (
            <p className="mb-0 text-muted small">{description}</p>
          )}
        </StyledNavigationHeaderText>
        {!!after && (
          <StyledNavigationHeaderAfter>{after}</StyledNavigationHeaderAfter>
        )}
      </StyledNavigationHeader>
    );
  }
}
