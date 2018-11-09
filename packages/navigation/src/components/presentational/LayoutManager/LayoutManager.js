// @flow

import React, {
  Component,
  Fragment,
  PureComponent,
  type ElementRef,
  type Ref,
  type Node,
} from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { colors } from '@atlaskit/theme';

import {
  name as packageName,
  version as packageVersion,
} from '../../../../package.json';
import { Shadow } from '../../../common/primitives';
import { light, ThemeProvider } from '../../../theme';
import ContentNavigation from './ContentNavigation';
import ResizeTransition, {
  isTransitioning,
  type TransitionState,
} from './ResizeTransition';
import ResizeControl from './ResizeControl';
import {
  ContainerNavigationMask,
  ContentNavigationWrapper,
  LayoutContainer,
  NavigationContainer,
  PageWrapper,
} from './primitives';
import type { LayoutManagerProps, CollapseListeners } from './types';

import {
  CONTENT_NAV_WIDTH_COLLAPSED,
  CONTENT_NAV_WIDTH_FLYOUT,
  GLOBAL_NAV_WIDTH,
  FLYOUT_DELAY,
} from '../../../common/constants';
import RenderBlocker from '../../common/RenderBlocker';
import { LayoutEventListener } from './LayoutEvent';

type RenderContentNavigationArgs = {
  isDragging: boolean,
  transitionState: TransitionState,
  transitionStyle: Object,
  width: number,
};
type State = {
  flyoutIsOpen: boolean,
  mouseIsOverNavigation: boolean,
  itemIsDragging: boolean,
};

function defaultTooltipContent(isCollapsed: boolean) {
  return isCollapsed
    ? { text: 'Expand', char: '[' }
    : { text: 'Collapse', char: '[' };
}

type PageProps = CollapseListeners & {
  children: Node,
  flyoutIsOpen: boolean,
  innerRef: Ref<'div'>,
  isResizing: boolean,
  isCollapsed: boolean,
  productNavWidth: number,
};

// FIXME: Move to separate file
// eslint-disable-next-line react/no-multi-comp
class PageInner extends PureComponent<{ children: Node }> {
  render() {
    return this.props.children;
  }
}

// FIXME: Move to separate file
// eslint-disable-next-line react/no-multi-comp
export class Page extends PureComponent<PageProps> {
  render() {
    const {
      flyoutIsOpen,
      innerRef,
      isResizing,
      isCollapsed,
      productNavWidth,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
    } = this.props;
    return (
      <ResizeTransition
        from={[CONTENT_NAV_WIDTH_COLLAPSED]}
        in={!isCollapsed}
        productNavWidth={productNavWidth}
        properties={['paddingLeft']}
        to={[flyoutIsOpen ? CONTENT_NAV_WIDTH_FLYOUT : productNavWidth]}
        userIsDragging={isResizing}
        /* Attach expand/collapse callbacks to the page resize transition to ensure they are only
         * called when the nav is permanently expanded/collapsed, i.e. when page content position changes. */
        onExpandStart={onExpandStart}
        onExpandEnd={onExpandEnd}
        onCollapseStart={onCollapseStart}
        onCollapseEnd={onCollapseEnd}
      >
        {({ transitionStyle, transitionState }) => (
          <PageWrapper
            disableInteraction={isResizing || isTransitioning(transitionState)}
            innerRef={innerRef}
            offset={GLOBAL_NAV_WIDTH}
            style={transitionStyle}
          >
            <PageInner>{this.props.children}</PageInner>
          </PageWrapper>
        )}
      </ResizeTransition>
    );
  }
}

/* NOTE: experimental props use an underscore */
/* eslint-disable camelcase */

// eslint-disable-next-line react/no-multi-comp
export default class LayoutManager extends Component<
  LayoutManagerProps,
  State,
> {
  state = {
    flyoutIsOpen: false,
    mouseIsOverNavigation: false,
    itemIsDragging: false,
  };
  productNavRef: HTMLElement;
  pageRef: HTMLElement;
  containerRef: HTMLElement;
  flyoutMouseOverTimeout: TimeoutID;

  static defaultProps = {
    collapseToggleTooltipContent: defaultTooltipContent,
    experimental_flyoutOnHover: false,
  };
  static getDerivedStateFromProps(props: LayoutManagerProps, state: State) {
    // kill the flyout when the user commits to expanding navigation
    if (!props.navigationUIController.state.isCollapsed && state.flyoutIsOpen) {
      return { flyoutIsOpen: false };
    }

    return null;
  }

  nodeRefs = {
    expandCollapseAffordance: React.createRef(),
  };

  componentDidMount() {
    this.publishRefs();
  }

  componentDidUpdate() {
    this.publishRefs();
  }

  publishRefs() {
    const { getRefs } = this.props;
    if (typeof getRefs === 'function') {
      getRefs(this.nodeRefs);
    }
  }

  getContainerRef = (ref: ElementRef<*>) => {
    this.containerRef = ref;
  };
  getNavRef = (ref: ElementRef<*>) => {
    this.productNavRef = ref;
  };
  getPageRef = (ref: ElementRef<*>) => {
    this.pageRef = ref;
  };

  mouseOutFlyoutArea = ({ currentTarget, relatedTarget }: *) => {
    if (currentTarget.contains(relatedTarget)) return;
    clearTimeout(this.flyoutMouseOverTimeout);
    this.setState({ flyoutIsOpen: false });
  };
  mouseOverFlyoutArea = ({ currentTarget, target }: *) => {
    if (!currentTarget.contains(target)) return;
    clearTimeout(this.flyoutMouseOverTimeout);

    this.flyoutMouseOverTimeout = setTimeout(() => {
      this.setState({ flyoutIsOpen: true });
    }, FLYOUT_DELAY);
  };

  mouseEnter = () => {
    this.setState({ mouseIsOverNavigation: true });
  };
  mouseLeave = () => {
    clearTimeout(this.flyoutMouseOverTimeout);
    this.setState({ mouseIsOverNavigation: false });
  };

  onItemDragStart = () => {
    this.setState({ itemIsDragging: true });
  };

  onItemDragEnd = () => {
    this.setState({ itemIsDragging: false });
  };

  renderGlobalNavigation = () => {
    const {
      containerNavigation,
      globalNavigation: GlobalNavigation,
    } = this.props;
    return (
      <ThemeProvider
        theme={theme => ({
          mode: light, // If no theme already exists default to light mode
          ...theme,
        })}
      >
        <Fragment>
          <Shadow
            isBold={!!containerNavigation}
            isOverDarkBg
            style={{ marginLeft: GLOBAL_NAV_WIDTH }}
          />
          <GlobalNavigation />
        </Fragment>
      </ThemeProvider>
    );
  };

  renderContentNavigation = (args: RenderContentNavigationArgs) => {
    const { transitionState, transitionStyle } = args;
    const {
      containerNavigation,
      experimental_flyoutOnHover,
      navigationUIController,
      productNavigation,
    } = this.props;
    const {
      isCollapsed,
      isPeekHinting,
      isPeeking,
      isResizing,
    } = navigationUIController.state;

    const isVisible = transitionState !== 'exited';
    const shouldDisableInteraction =
      isResizing || isTransitioning(transitionState);

    return (
      <ContentNavigationWrapper
        key="product-nav-wrapper"
        innerRef={this.getNavRef}
        disableInteraction={shouldDisableInteraction}
        style={transitionStyle}
      >
        <ContentNavigation
          container={containerNavigation}
          isPeekHinting={isPeekHinting}
          isPeeking={isPeeking}
          isVisible={isVisible}
          key="product-nav"
          product={productNavigation}
        />
        {isCollapsed && !experimental_flyoutOnHover ? (
          <div
            aria-label="Click to expand the navigation"
            role="button"
            onClick={navigationUIController.expand}
            css={{
              cursor: 'pointer',
              height: '100%',
              outline: 0,
              position: 'absolute',
              transition: 'background-color 100ms',
              width: CONTENT_NAV_WIDTH_COLLAPSED,

              ':hover': {
                backgroundColor: containerNavigation
                  ? colors.N30
                  : 'rgba(255, 255, 255, 0.08)',
              },
              ':active': {
                backgroundColor: colors.N40A,
              },
            }}
            tabIndex="0"
          />
        ) : null}
      </ContentNavigationWrapper>
    );
  };

  renderNavigation = () => {
    const { navigationUIController, experimental_flyoutOnHover } = this.props;
    const { flyoutIsOpen, mouseIsOverNavigation, itemIsDragging } = this.state;
    const {
      isCollapsed,
      isResizeDisabled,
      isResizing,
      productNavWidth,
    } = navigationUIController.state;

    return (
      <LayoutEventListener
        onItemDragStart={this.onItemDragStart}
        onItemDragEnd={this.onItemDragEnd}
      >
        <NavigationAnalyticsContext
          data={{
            attributes: {
              isExpanded: !isCollapsed,
              flyoutOnHoverEnabled: experimental_flyoutOnHover,
            },
            componentName: 'navigation',
            packageName,
            packageVersion,
          }}
        >
          <ResizeTransition
            from={[CONTENT_NAV_WIDTH_COLLAPSED]}
            in={!isCollapsed || flyoutIsOpen}
            properties={['width']}
            to={[flyoutIsOpen ? CONTENT_NAV_WIDTH_FLYOUT : productNavWidth]}
            userIsDragging={isResizing}
            // only apply listeners to the NAV resize transition
            productNavWidth={productNavWidth}
          >
            {({ transitionStyle, transitionState }) => {
              const onMouseOut =
                isCollapsed && experimental_flyoutOnHover && flyoutIsOpen
                  ? this.mouseOutFlyoutArea
                  : null;
              return (
                <NavigationContainer
                  innerRef={this.getContainerRef}
                  onMouseEnter={this.mouseEnter}
                  onMouseOut={onMouseOut}
                  onMouseLeave={this.mouseLeave}
                >
                  <ResizeControl
                    collapseToggleTooltipContent={
                      // $FlowFixMe
                      this.props.collapseToggleTooltipContent
                    }
                    expandCollapseAffordanceRef={
                      this.nodeRefs.expandCollapseAffordance
                    }
                    experimental_flyoutOnHover={experimental_flyoutOnHover}
                    isDisabled={isResizeDisabled}
                    flyoutIsOpen={flyoutIsOpen}
                    isGrabAreaDisabled={itemIsDragging}
                    mouseIsOverNavigation={mouseIsOverNavigation}
                    mutationRefs={[
                      { ref: this.pageRef, property: 'padding-left' },
                      { ref: this.productNavRef, property: 'width' },
                    ]}
                    navigation={navigationUIController}
                  >
                    {({ isDragging, width }) => {
                      const onMouseOver =
                        isCollapsed &&
                        experimental_flyoutOnHover &&
                        !flyoutIsOpen
                          ? this.mouseOverFlyoutArea
                          : null;
                      return (
                        <ContainerNavigationMask
                          disableInteraction={itemIsDragging}
                          onMouseOver={onMouseOver}
                        >
                          <RenderBlocker
                            blockOnChange
                            itemIsDragging={itemIsDragging}
                          >
                            {this.renderGlobalNavigation()}
                            {this.renderContentNavigation({
                              isDragging,
                              transitionState,
                              transitionStyle,
                              width,
                            })}
                          </RenderBlocker>
                        </ContainerNavigationMask>
                      );
                    }}
                  </ResizeControl>
                </NavigationContainer>
              );
            }}
          </ResizeTransition>
        </NavigationAnalyticsContext>
      </LayoutEventListener>
    );
  };

  render() {
    const {
      navigationUIController,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
    } = this.props;
    const { flyoutIsOpen } = this.state;
    const {
      isResizing,
      isCollapsed,
      productNavWidth,
    } = navigationUIController.state;

    return (
      <LayoutContainer>
        {this.renderNavigation()}
        <Page
          flyoutIsOpen={flyoutIsOpen}
          innerRef={this.getPageRef}
          isResizing={isResizing}
          isCollapsed={isCollapsed}
          productNavWidth={productNavWidth}
          onExpandStart={onExpandStart}
          onExpandEnd={onExpandEnd}
          onCollapseStart={onCollapseStart}
          onCollapseEnd={onCollapseEnd}
        >
          {this.props.children}
        </Page>
      </LayoutContainer>
    );
  }
}
