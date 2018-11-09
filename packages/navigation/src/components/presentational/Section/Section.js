// @flow

import React, { PureComponent, type Node } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import { css as parseJss } from 'emotion';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

import { transitionDurationMs } from '../../../common/constants';
import getAnimationStyles from './getAnimationStyles';
import type { SectionProps, SectionState } from './types';

/** The below components are exported for testing purposes only. */
type StyledComponentProps = { children: Node };
export const StaticTransitionGroup = (props: StyledComponentProps) => (
  <div className={parseJss({ position: 'relative' })} {...props} />
);
export const ScrollableTransitionGroup = (props: StyledComponentProps) => (
  <div
    className={parseJss({
      position: 'relative',
      flex: '1 1 100%',
      overflowY: 'hidden',
    })}
    {...props}
  />
);
export const ScrollableWrapper = (props: StyledComponentProps) => (
  <div {...props} />
);
export const ScrollableInner = (props: StyledComponentProps) => (
  <div {...props} />
);
export const StaticWrapper = (props: StyledComponentProps) => (
  <div {...props} />
);

export default class Section extends PureComponent<SectionProps, SectionState> {
  state = {
    traversalDirection: null,
  };

  isMounted = false;

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillReceiveProps(nextProps: SectionProps) {
    if (nextProps.parentId && nextProps.parentId === this.props.id) {
      this.setState({ traversalDirection: 'down' });
    }
    if (this.props.parentId && this.props.parentId === nextProps.id) {
      this.setState({ traversalDirection: 'up' });
    }
  }

  render() {
    const {
      alwaysShowScrollHint,
      id,
      children,
      shouldGrow,
      styles: styleReducer,
      theme,
    } = this.props;

    const { mode, context } = theme;
    const styles = styleReducer(
      mode.section({ alwaysShowScrollHint })[context],
    );

    return (
      <TransitionGroup
        component={
          shouldGrow ? ScrollableTransitionGroup : StaticTransitionGroup
        }
        appear
      >
        <Transition
          key={id}
          timeout={this.isMounted ? transitionDurationMs : 0}
        >
          {state => {
            const { traversalDirection } = this.state;
            const animationStyles = getAnimationStyles({
              state,
              traversalDirection,
            });

            // We provide both the styles object and the computed className.
            // This allows consumers to patch the styles if they want to, or
            // simply apply the className if they're not using a JSS parser like
            // emotion.
            const className = parseJss(styles.children);
            const resolvedChildren = children({
              className,
              css: styles.children,
            });

            return (
              <NavigationAnalyticsContext
                data={{
                  attributes: { viewSection: id },
                  componentName: 'Section',
                }}
              >
                {shouldGrow ? (
                  <ScrollableWrapper
                    className={parseJss({
                      ...styles.wrapper,
                      ...animationStyles,
                    })}
                  >
                    <ScrollableInner className={parseJss(styles.inner)}>
                      {resolvedChildren}
                    </ScrollableInner>
                  </ScrollableWrapper>
                ) : (
                  <StaticWrapper className={parseJss(animationStyles)}>
                    {resolvedChildren}
                  </StaticWrapper>
                )}
              </NavigationAnalyticsContext>
            );
          }}
        </Transition>
      </TransitionGroup>
    );
  }
}
