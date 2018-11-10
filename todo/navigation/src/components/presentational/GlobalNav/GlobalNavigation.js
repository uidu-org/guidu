// @flow

/**
 * NOTE: 'GlobalNav' is the layout primitive, which will be wrapped by the more
 * opinionated 'GlobalNavigation' component.
 */

import React, { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

import {
  FirstPrimaryItemWrapper,
  PrimaryItemsList,
  SecondaryItemsList,
} from './primitives';
import type { GlobalNavigationProps } from './types';

export default class GlobalNavigation extends Component<GlobalNavigationProps> {
  render() {
    const {
      itemComponent: ItemComponent,
      primaryItems,
      secondaryItems,
      theme,
    } = this.props;
    const wrapperStyles = theme.mode.globalNav();

    return (
      <NavigationAnalyticsContext
        data={{
          attributes: { navigationLayer: 'global' },
          componentName: 'globalNav',
        }}
      >
        <div css={wrapperStyles}>
          <PrimaryItemsList>
            <NavigationAnalyticsContext
              data={{ attributes: { navigationIconGrouping: 'primary' } }}
            >
              <Fragment>
                {primaryItems.map((props, index) => {
                  // Render the first item with a margin beneath it and a large icon
                  if (!index) {
                    const { icon: Icon, ...rest } = props;
                    return (
                      <FirstPrimaryItemWrapper
                        key={props.id || props.key || props.label}
                      >
                        <ItemComponent
                          {...rest}
                          icon={provided => <Icon {...provided} size="large" />}
                          size="large"
                          index={index}
                        />
                      </FirstPrimaryItemWrapper>
                    );
                  }
                  return (
                    <ItemComponent
                      {...props}
                      key={props.id || props.key || props.label}
                      size="large"
                      index={index}
                    />
                  );
                })}
              </Fragment>
            </NavigationAnalyticsContext>
          </PrimaryItemsList>

          <SecondaryItemsList>
            <NavigationAnalyticsContext
              data={{ attributes: { navigationIconGrouping: 'secondary' } }}
            >
              <Fragment>
                {secondaryItems.map((props, index) => (
                  <ItemComponent
                    {...props}
                    key={props.id || props.label}
                    size="small"
                    index={index}
                  />
                ))}
              </Fragment>
            </NavigationAnalyticsContext>
          </SecondaryItemsList>
        </div>
      </NavigationAnalyticsContext>
    );
  }
}
