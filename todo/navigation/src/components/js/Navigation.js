// @flow
import '@atlaskit/polyfills/object-assign';
import React, {
  PureComponent,
  type Node,
  type ComponentType,
  type Element,
  type ElementRef,
} from 'react';
import { getTheme } from '@atlaskit/theme';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
  type WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../../package.json';
import {
  navigationExpandedCollapsed,
  type CollapseExpandTrigger,
} from '../../utils/analytics';
import GlobalNavigation from './GlobalNavigation';
import ContainerNavigation from './ContainerNavigation';
import NavigationFixedContainer from '../styled/NavigationFixedContainer';
import NavigationGlobalNavigationWrapper from '../styled/NavigationGlobalNavigationWrapper';
import NavigationContainerNavigationWrapper from '../styled/NavigationContainerNavigationWrapper';
import Resizer from './Resizer';
import type { IconAppearance } from '../../types';
import type { Provided } from '../../theme/types';
import Spacer from './Spacer';
import {
  containerClosedWidth,
  containerOpenWidth,
  globalOpenWidth,
  resizeClosedBreakpoint,
  standardOpenWidth,
} from '../../shared-variables';
import { defaultContainerTheme, defaultGlobalTheme } from '../../theme/util';
import WithElectronTheme from '../../theme/with-electron-theme';

const warnIfCollapsedPropsAreInvalid = ({ isCollapsible, isOpen }) => {
  if (!isCollapsible && !isOpen) {
    // eslint-disable-next-line no-console
    console.warn(`
        Navigation is being told it cannot collapse and that it is not open.
        When Navigation cannot collapse it must always be open.
        Ignoring isOpen={true}
      `);
  }
};

const defaultWidth = globalOpenWidth() + containerOpenWidth;

type resizeObj = {
  width: number,
  isOpen: boolean,
};

type Props = {
  ...WithAnalyticsEventsProps,
  /** Elements to be displayed in the ContainerNavigationComponent */
  children?: Node,
  /** Theme object to be used to color the navigation container. */
  containerTheme?: Provided,
  /** Component(s) to be rendered as the header of the container.  */
  containerHeaderComponent?: () => Array<Node>,
  /** Standard React ref for the container navigation scrollable element. */
  containerScrollRef?: (ref: ElementRef<*>) => void,
  /** Location to pass in an array of drawers (AkCreateDrawer, AkSearchDrawer, AkCustomDrawer)
   to be rendered. There is no decoration done to the components passed in here. */
  drawers: Array<Element<any>>,
  /** Theme object to be used to color the global container. */
  globalTheme?: Provided,
  /** Icon to be used as the 'create' icon. onCreateDrawerOpen is called when it
   is clicked. */
  globalCreateIcon?: Element<any>,
  /** Icon to be displayed at the top of the GlobalNavigation. This is wrapped in
   the linkComponent. */
  globalPrimaryIcon?: Element<any>,
  /** Appearance of globalPrimaryIcon for shape styling of drop shadows */
  globalPrimaryIconAppearance: IconAppearance,
  /** Link to be passed to the linkComponent that wraps the globalCreateIcon. */
  globalPrimaryItemHref?: string,
  /** Icon to be used as the 'create' icon. onSearchDrawerOpen is called when it
   is clicked. */
  globalSearchIcon?: Element<any>,
  /** A list of nodes to be rendered as the global primary actions. They appear
   directly underneath the global primary icon. This must not exceed three nodes */
  globalPrimaryActions?: Array<Element<any>>,
  /** An array of elements to be displayed at the bottom of the global component.
  These should be icons or other small elements. There must be no more than five.
  Secondary Actions will not be visible when nav is collapsed. */
  globalSecondaryActions: Array<Element<any>>,
  /** Whether to display a scroll hint shadow at the top of the ContainerNavigation
   * wrapper. */
  hasScrollHintTop?: boolean,
  /** Set whether collapse should be allowed. If false, the nav cannot be dragged
   to be smaller. */
  isCollapsible?: boolean,
  /** Set whether the nav is collapsed or not. Note that this is never controlled
  internally as state, so if it is collapsible, you need to manually listen to onResize
  to determine when to change this if you are letting users manually collapse the
  nav. */
  isOpen?: boolean,
  /** Sets whether to disable all resize prompts. */
  isResizeable?: boolean,
  /** Causes leftmost navigation section to be slightly wider to accommodate macOS buttons. */
  isElectronMac: boolean,
  /** A component to be used as a link. By Default this is an anchor. when a href
   is passed to it, and otherwise is a button. */
  linkComponent?: ComponentType<*>,
  /** Function called at the end of a resize event. It is called with an object
   containing a width and an isOpen. These can be used to update the props of Navigation. */
  onResize: (resizeState: resizeObj) => void,
  /** Function to be called when a resize event starts. */
  onResizeStart: () => void,
  /** Function called when the globalCreateIcon is clicked. */
  onCreateDrawerOpen: () => void,
  /** Function called when the globalSearchIcon is clicked. */
  onSearchDrawerOpen: () => void,
  /** Function called when a collapse/expand starts */
  onToggleStart: () => void,
  /** Function called when a collapse/expand finishes */
  onToggleEnd: () => void,
  /** The offset at the top of the page before the navigation begins. This allows
  absolute items such as a banner to be placed above nav, without lower nav items
  being pushed off the screen. **DO NOT** use this outside of this use-case. Changes
  are animated. The string is any valid css height value */
  topOffset: number,
  /** Width of the navigation. Width cannot be reduced below the minimum, and the
   collapsed with will be respected above the provided width. */
  width: number,

  /** todo */
  // isCreateDrawerOpen: boolean,
  // isSearchDrawerOpen: boolean,
};

type State = {
  containerTheme: Provided,
  globalTheme: Provided,
  isResizing: boolean,
  isTogglingIsOpen: boolean,
  resizeDelta: number,
};

class Navigation extends PureComponent<Props, State> {
  static defaultProps = {
    drawers: [],
    globalPrimaryIconAppearance: 'round',
    globalSecondaryActions: [],
    isCollapsible: true,
    isOpen: true,
    isResizeable: true,
    isElectronMac: false,
    onCreateDrawerOpen: () => {},
    onResize: () => {},
    onResizeStart: () => {},
    onSearchDrawerOpen: () => {},
    onToggleEnd: () => {},
    onToggleStart: () => {},
    topOffset: 0,
    width: defaultWidth,
  };

  constructor(props: Props, context: mixed) {
    super(props, context);

    const { containerTheme, globalTheme } = props;
    // $FlowFixMe  - theme is not found in props
    const { mode } = getTheme(props);

    this.state = {
      containerTheme: defaultContainerTheme(containerTheme, mode),
      globalTheme: defaultGlobalTheme(globalTheme, mode),
      resizeDelta: 0,
      isResizing: false,
      isTogglingIsOpen: false,
    };

    warnIfCollapsedPropsAreInvalid(props);
  }

  spacerRef: ?Node;

  // It is possible that Navigation.width will not be supplied by the product, which means the
  // default width will be used, which assumes a non-Electron environment. We update the width
  // for this specific case in componentDidMount.
  componentDidMount() {
    if (
      this.props.isElectronMac &&
      this.props.isOpen &&
      this.props.width === defaultWidth
    ) {
      this.onPropsResize({
        isOpen: true,
        width: globalOpenWidth(true) + containerOpenWidth,
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { containerTheme, globalTheme } = nextProps;
    // TODO work out why nextProps.theme.__ATLASKIT_THEME__.mode always returns the mode
    // that was applied at time of first page load.

    // $FlowFixMe - theme is not found in props
    const { mode } = getTheme(nextProps);

    const isTogglingIsOpen = this.props.isOpen !== nextProps.isOpen;

    if (isTogglingIsOpen) {
      this.props.onToggleStart();
    }

    this.setState({
      containerTheme: defaultContainerTheme(containerTheme, mode),
      globalTheme: defaultGlobalTheme(globalTheme, mode),
      isTogglingIsOpen,
    });

    warnIfCollapsedPropsAreInvalid(nextProps);
  }

  getSnappedWidth = (width: number) => {
    // |------------------------------|
    //      |           |             |
    //    closed    breakpoint       open
    //          * snap closed
    //                       * snap open
    //                                    * maintain expanded width

    const { isElectronMac } = this.props;
    const resizeClosedBreakpointResult = resizeClosedBreakpoint(isElectronMac);

    // Snap closed if width ever goes below the resizeClosedBreakpoint
    if (width < resizeClosedBreakpointResult) {
      return globalOpenWidth(isElectronMac);
    }

    // Snap open if in between the closed breakpoint and the standard width
    if (
      width > resizeClosedBreakpointResult &&
      width < standardOpenWidth(isElectronMac)
    ) {
      return standardOpenWidth(isElectronMac);
    }

    // At this point the width > standard width.
    // We allow you to have your own wider width.
    return width;
  };

  onResize = (resizeDelta: number) => {
    this.setState({
      isResizing: true,
      resizeDelta,
    });
  };

  onPropsResize = (resizeState: resizeObj, trigger?: CollapseExpandTrigger) => {
    const { createAnalyticsEvent, isOpen } = this.props;
    if (trigger && resizeState.isOpen !== isOpen) {
      navigationExpandedCollapsed(createAnalyticsEvent, {
        isCollapsed: !resizeState.isOpen,
        trigger,
      });
    }
    this.props.onResize(resizeState);
  };

  onResizeEnd = (resizeDelta: number) => {
    const width = this.getRenderedWidth();
    const snappedWidth = this.getSnappedWidth(width);

    const resizeState = {
      isOpen: snappedWidth >= standardOpenWidth(this.props.isElectronMac),
      width: snappedWidth,
    };

    this.setState(
      {
        resizeDelta: 0,
        isResizing: false,
      },
      function callOnResizeAfterSetState() {
        const resizerClicked = resizeDelta === 0;
        this.onPropsResize(
          resizeState,
          resizerClicked ? undefined : 'resizerDrag',
        );
      },
    );
  };

  getRenderedWidth = () => {
    const { isOpen, width, isCollapsible, isElectronMac } = this.props;
    const baselineWidth = isOpen ? width : containerClosedWidth(isElectronMac);
    const minWidth = isCollapsible
      ? containerClosedWidth(isElectronMac)
      : standardOpenWidth(isElectronMac);
    return Math.max(minWidth, baselineWidth + this.state.resizeDelta);
  };

  triggerResizeButtonHandler = (
    resizeState: resizeObj,
    resizerClick: boolean,
  ) => {
    if (resizeState) {
      const trigger = resizerClick ? 'resizerClick' : 'chevron';
      this.onPropsResize(resizeState, trigger);
    }
  };

  registerSpacerRef = (spacerRef: Node) => {
    this.spacerRef = spacerRef;
  };

  onSpacerTransitionEnd = (e: TransitionEvent) => {
    if (!this.spacerRef || e.target !== this.spacerRef) {
      return;
    }
    this.props.onToggleEnd();
  };

  render() {
    const {
      children,
      containerHeaderComponent,
      containerScrollRef,
      drawers,
      globalCreateIcon,
      globalPrimaryActions,
      globalPrimaryIcon,
      globalPrimaryIconAppearance,
      globalPrimaryItemHref,
      globalSearchIcon,
      globalSecondaryActions,
      hasScrollHintTop,
      isCollapsible,
      isElectronMac,
      isOpen,
      isResizeable,
      linkComponent,
      onCreateDrawerOpen,
      onResizeStart,
      onSearchDrawerOpen,
      topOffset,
    } = this.props;

    const {
      containerTheme,
      globalTheme,
      isTogglingIsOpen,
      isResizing,
    } = this.state;

    // if collapsed then:
    // 1. isOpen is ignored
    // 2. You cannot resize to a size smaller than the default open size

    const renderedWidth = this.getRenderedWidth();

    const globalOpenWidthResult = globalOpenWidth(isElectronMac);
    const containerClosedWidthResult = containerClosedWidth(isElectronMac);

    const isGlobalNavPartiallyCollapsed =
      isResizing &&
      renderedWidth < globalOpenWidthResult + containerClosedWidthResult;

    // Cover over the global navigation when it is partially collapsed
    const containerOffsetX = isGlobalNavPartiallyCollapsed
      ? renderedWidth - (globalOpenWidthResult + containerClosedWidthResult)
      : 0;

    // always show global navigation if it is not collapsible
    const showGlobalNavigation = !isCollapsible || isOpen || isResizing;

    const containerWidth = showGlobalNavigation
      ? Math.max(
          renderedWidth - globalOpenWidthResult,
          containerClosedWidthResult,
        )
      : containerClosedWidthResult;

    const isContainerCollapsed =
      !showGlobalNavigation || containerWidth === containerClosedWidthResult;
    const shouldAnimateContainer = isTogglingIsOpen && !isResizing;

    // When the navigation is not collapsible, and the width is expanded.
    // Users should be able to click the collapse button to go back to the original width
    const canCollapse = isCollapsible || containerWidth > containerOpenWidth;

    const globalNavigation = showGlobalNavigation ? (
      <NavigationGlobalNavigationWrapper>
        <GlobalNavigation
          theme={globalTheme}
          primaryActions={globalPrimaryActions}
          createIcon={globalCreateIcon}
          linkComponent={linkComponent}
          onCreateActivate={onCreateDrawerOpen}
          onSearchActivate={onSearchDrawerOpen}
          primaryIcon={globalPrimaryIcon}
          primaryIconAppearance={globalPrimaryIconAppearance}
          primaryItemHref={globalPrimaryItemHref}
          searchIcon={globalSearchIcon}
          secondaryActions={globalSecondaryActions}
        />
      </NavigationGlobalNavigationWrapper>
    ) : null;

    const resizer = isResizeable ? (
      <Resizer
        navigationWidth={renderedWidth}
        onResize={this.onResize}
        onResizeButton={this.triggerResizeButtonHandler}
        onResizeStart={onResizeStart}
        onResizeEnd={this.onResizeEnd}
        showResizeButton={canCollapse}
      />
    ) : null;

    return (
      <WithElectronTheme isElectronMac={isElectronMac}>
        <div>
          {/* Used to push the page to the right the width of the nav */}
          <Spacer
            innerRef={this.registerSpacerRef}
            onTransitionEnd={this.onSpacerTransitionEnd}
            shouldAnimate={shouldAnimateContainer}
            width={renderedWidth}
          >
            <NavigationFixedContainer topOffset={topOffset}>
              {globalNavigation}
              <NavigationContainerNavigationWrapper
                horizontalOffset={containerOffsetX}
              >
                <ContainerNavigation
                  scrollRef={containerScrollRef}
                  theme={containerTheme}
                  showGlobalActions={!showGlobalNavigation}
                  globalCreateIcon={globalCreateIcon}
                  globalPrimaryActions={globalPrimaryActions}
                  globalPrimaryIcon={globalPrimaryIcon}
                  globalPrimaryItemHref={globalPrimaryItemHref}
                  globalSearchIcon={globalSearchIcon}
                  globalSecondaryActions={globalSecondaryActions}
                  hasScrollHintTop={hasScrollHintTop}
                  headerComponent={containerHeaderComponent}
                  linkComponent={linkComponent}
                  onGlobalCreateActivate={onCreateDrawerOpen}
                  onGlobalSearchActivate={onSearchDrawerOpen}
                  isCollapsed={isContainerCollapsed}
                >
                  {children}
                </ContainerNavigation>
              </NavigationContainerNavigationWrapper>
              {resizer}
            </NavigationFixedContainer>
          </Spacer>
          {drawers}
        </div>
      </WithElectronTheme>
    );
  }
}

export { Navigation as NavigationWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'navigationSidebar',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onResize: createAndFireEventOnAtlaskit({
      action: 'resized',
      actionSubject: 'navigationSidebar',

      attributes: {
        componentName: 'navigation',
        packageName,
        packageVersion,
      },
    }),

    onResizeStart: createAndFireEventOnAtlaskit({
      action: 'resizeStarted',
      actionSubject: 'navigationSidebar',

      attributes: {
        componentName: 'navigation',
        packageName,
        packageVersion,
      },
    }),
  })(Navigation),
);
