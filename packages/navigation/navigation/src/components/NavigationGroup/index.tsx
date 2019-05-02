import React, { PureComponent, Fragment } from 'react';
import NavigationGroupHeading from '../NavigationGroupHeading';

export default class NavigationGroup extends PureComponent<any> {
  static defaultProps = {
    heading: undefined,
    separator: undefined,
  };

  render() {
    const { heading, before, after, separator, children } = this.props;
    return (
      <ul className="nav flex-column mb-4 px-3">
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
