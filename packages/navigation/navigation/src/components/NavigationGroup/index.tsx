import React, { PureComponent } from 'react';
import NavigationGroupHeading from '../NavigationGroupHeading';

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
    } = this.props;
    let className = 'nav flex-column';
    if (withMargin) {
      className += ' mb-4';
    }
    if (withPadding) {
      className += ' px-3 px-xl-4';
    }

    return (
      <ul className={className}>
        {heading && (
          <NavigationGroupHeading
            before={before}
            after={after}
            text={heading}
          />
        )}
        {children}
        {separator && <hr />}
      </ul>
    );
  }
}
