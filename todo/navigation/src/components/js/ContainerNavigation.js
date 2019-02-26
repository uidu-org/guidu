// @flow
import React, {
  Component,
  type Node,
  type ComponentType,
  type Element,
} from 'react';
import { WithRootTheme } from '../../theme/util';
import ContainerHeader from './ContainerHeader';
import ContainerNavigationChildren from './ContainerNavigationChildren';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import Reveal from './Reveal';
import ContainerNavigationInner from '../styled/ContainerNavigationInner';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';
import {
  globalPrimaryActions as globalPrimaryActionsSizes,
  globalSecondaryActions as globalSecondaryActionsSizes,
} from '../../shared-variables';
import { container } from '../../theme/presets';
import type { Provided } from '../../theme/types';

type Props = {
  children?: Node,
  /** Icon to be rendered in the globalPrimaryActions internal component when
  isCollapsed is true. When clicked, onGlobalCreateActivate is called. It is
  recommended that you use an atlaskit icon. */
  globalCreateIcon?: Element<any>,
  /** A list of nodes to be rendered as the global primary actions.  They appear
   directly underneath the global primary icon. This must not exceed three nodes */
  globalPrimaryActions?: Array<Element<any>>,
  /** Icon to be rendered at the top of the globalPrimaryActions internal component
  when isCollapsed is true. It is renered as a linkComponent, using the
  globalPrimaryItemHref. It is recommended that you use an atlaskit icon. */
  globalPrimaryIcon?: Element<any>,
  /** href to be used around the globalPrimaryIcon. */
  globalPrimaryItemHref?: string,
  /** Icon to be displayed in the middle of the internal globalPrimaryActions
  component. On click, onGlobalSearchActivate is called. It is recommended
  that you use an atlaskit icon. */
  globalSearchIcon?: Element<any>,
  /** Whether to display a scroll hint shadow at the top of the ContainerNavigation
   * wrapper. */
  hasScrollHintTop?: boolean,
  /** Functional react component that is passed the prop isCollapsed. The AkContainerTitle
   component is designed to be used as the headerComponent. */
  headerComponent?: ({}) => Node,
  /** Set to determine whether the ContainerNavigation should be rendered in its
   open state or closed state. Passed through to the headerComponent. */
  isCollapsed: boolean,
  /** A component to be used as a link. By Default this is an anchor. when a href
   is passed to it, and otherwise is a button. */
  linkComponent: ComponentType<*>,
  /** Function to be called when the globalCreateIcon is clicked on. */
  onGlobalCreateActivate?: () => void,
  /** Function to be called when the globalSearchIcon is clicked on. */
  onGlobalSearchActivate?: () => void,
  /** Standard React ref for the scrollable element on the container navigation. */
  scrollRef?: () => void,
  /** Sets whether the globalyPrimaryActions should be displayed. These should be
  components shared with the GlobalNavigation component, so they can be included
  in the ContainerNavigation when Navigation is collapsed. */
  showGlobalActions: boolean,
  /** Theme object. Custom theme objects should be generated using the createGlobalTheme
   function. */
  theme: Provided,
  globalSecondaryActions: Array<Element<any>>,
};

type State = {
  isInitiallyRendered: boolean,
};

export default class ContainerNavigation extends Component<Props, State> {
  static defaultProps = {
    showGlobalActions: false,
    globalSecondaryActions: [],
    isCollapsed: false,
    linkComponent: DefaultLinkComponent,
    theme: container,
  };

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      isInitiallyRendered: false,
    };
  }

  componentWillReceiveProps() {
    // After any update we are going to start animating.
    // Not doing this in componentDidMount to prevent an
    // unneeded second render on mount.
    if (!this.state.isInitiallyRendered) {
      this.setState({
        isInitiallyRendered: true,
      });
    }
  }

  props: Props;

  render() {
    const {
      scrollRef,
      showGlobalActions,
      globalPrimaryActions,
      globalSecondaryActions,
      children,
      globalCreateIcon,
      globalPrimaryIcon,
      globalPrimaryItemHref,
      globalSearchIcon,
      hasScrollHintTop,
      headerComponent,
      linkComponent,
      onGlobalCreateActivate,
      onGlobalSearchActivate,
      isCollapsed,
      theme,
    } = this.props;

    // Only animating the revealing of GlobalPrimaryActions and GlobalSecondaryActions
    // after the first render. Before that it is rendered without animation.
    const { isInitiallyRendered } = this.state;

    return (
      <WithRootTheme provided={theme} isCollapsed={isCollapsed}>
        {/* This div is needed for legacy reasons.
        All children should use isCollapsed on the theme */}
        <ContainerNavigationInner>
          <Reveal
            shouldAnimate={isInitiallyRendered}
            isOpen={showGlobalActions}
            openHeight={
              globalPrimaryActionsSizes.height(
                globalPrimaryActions
                  ? React.Children.count(globalPrimaryActions)
                  : 2,
              ).outer
            }
          >
            <GlobalPrimaryActions
              actions={globalPrimaryActions}
              createIcon={globalCreateIcon}
              linkComponent={linkComponent}
              onCreateActivate={onGlobalCreateActivate}
              onSearchActivate={onGlobalSearchActivate}
              primaryIcon={globalPrimaryIcon}
              primaryItemHref={globalPrimaryItemHref}
              searchIcon={globalSearchIcon}
            />
          </Reveal>
          <ContainerHeader>
            {headerComponent ? headerComponent({ isCollapsed }) : undefined}
          </ContainerHeader>
          <ContainerNavigationChildren
            hasScrollHintTop={hasScrollHintTop}
            scrollRef={scrollRef}
          >
            {children}
          </ContainerNavigationChildren>
          <GlobalNavigationSecondaryContainer>
            <Reveal
              shouldAnimate={isInitiallyRendered}
              isOpen={showGlobalActions}
              openHeight={
                globalSecondaryActionsSizes.height(
                  React.Children.count(globalSecondaryActions),
                ).outer
              }
            >
              {showGlobalActions && globalSecondaryActions.length ? (
                <GlobalSecondaryActions actions={globalSecondaryActions} />
              ) : null}
            </Reveal>
          </GlobalNavigationSecondaryContainer>
        </ContainerNavigationInner>
      </WithRootTheme>
    );
  }
}
