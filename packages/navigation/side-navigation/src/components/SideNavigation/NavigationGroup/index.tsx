import React, { PureComponent } from 'react';
import tw from 'twin.macro';
import NavigationGroupHeading from './NavigationGroupHeading';

export default class NavigationGroup extends PureComponent<any> {
  static defaultProps = {
    heading: undefined,
    separator: undefined,
    withPadding: true,
    withMargin: true,
  };

  render() {
    const {
      heading,
      before,
      after,
      separator,
      withPadding,
      withMargin,
      children,
      className,
    } = this.props;

    return (
      <>
        <ul
          css={[tw`flex flex-col space-y-0.5 px-5`, withMargin && tw`mb-4`]}
          className={className}
        >
          {heading && (
            <NavigationGroupHeading
              before={before}
              after={after}
              text={heading}
            />
          )}
          {children}
        </ul>
        {separator && <hr tw="mx-5" />}
      </>
    );
  }
}
