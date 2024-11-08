import React from 'react';
import { EventDispatcher } from '../../event-dispatcher';
import { MountedPortal } from './types';

export default class PortalProviderAPI extends EventDispatcher {
  portals: Map<HTMLElement, MountedPortal> = new Map();

  context: any;

  setContext = (context: any) => {
    this.context = context;
  };

  render(
    children: () => React.ReactChild | JSX.Element | null,
    container: HTMLElement,
    hasReactContext: boolean = false,
  ) {
    this.portals.set(container, { children, hasReactContext });
    // createPortal(children(), container);
    // unstable_renderSubtreeIntoContainer(
    //   this.context,
    //   children() as React.ReactElement<any>,
    //   container,
    // );
  }

  // TODO: until https://product-fabric.atlassian.net/browse/ED-5013
  // we (unfortunately) need to re-render to pass down any updated context.
  // selectively do this for nodeviews that opt-in via `hasReactContext`
  forceUpdate() {
    this.portals.forEach((portal, container) => {
      if (!portal.hasReactContext) {
      }

      // createPortal(portal.children() as React.ReactElement<any>, container);
      // unstable_renderSubtreeIntoContainer(
      //   this.context,
      //   portal.children() as React.ReactElement<any>,
      //   container,
      // );
    });
  }

  remove(container: HTMLElement) {
    this.portals.delete(container);
  }
}
