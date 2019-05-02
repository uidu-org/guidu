import React, { PureComponent } from 'react';
import StyledNavigationGroupHeading, {
  StyledNavigationGroupHeadingBefore,
  StyledNavigationGroupHeadingText,
  StyledNavigationGroupHeadingAfter,
} from './styled';

export default class NavigationGroupHeading extends PureComponent<any> {
  render() {
    const { before, text, after } = this.props;
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
}
