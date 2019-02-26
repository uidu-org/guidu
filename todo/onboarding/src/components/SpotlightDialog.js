// @flow
import React, { Component, type ComponentType, type Node } from 'react';
import FocusLock from 'react-focus-lock';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import { Popper, type Placement } from '@atlaskit/popper';

import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';

import type { ActionsType } from '../types';
import { Image } from '../styled/Dialog';
import SpotlightCard from './SpotlightCard';
import ValueChanged from './ValueChanged';

type Props = {
  /** Buttons to render in the footer */
  actions?: ActionsType,
  /** An optional element rendered beside the footer actions */
  actionsBeforeElement?: Node,
  /** The elements rendered in the modal */
  children?: Node,
  /** Where the dialog should appear, relative to the contents of the children. */
  dialogPlacement?:
    | 'top left'
    | 'top center'
    | 'top right'
    | 'right top'
    | 'right middle'
    | 'right bottom'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'
    | 'left top'
    | 'left middle'
    | 'left bottom',
  /** The width of the dialog in pixels. Min 160 - Max 600 */
  dialogWidth: number,
  /** Optional element rendered below the body */
  footer?: ComponentType<any>,
  /** Optional element rendered above the body */
  header?: ComponentType<any>,
  /** Heading text rendered above the body */
  heading?: string,
  /** Path to the the your image */
  image?: string,
  /** The spotlight target node */
  targetNode: HTMLElement,
  /** js object containing the animation styles to apply to component */
  animationStyles: Object,
};

type State = {
  focusLockDisabled: boolean,
};

class SpotlightDialog extends Component<Props, State> {
  state = {
    focusLockDisabled: true,
  };

  componentDidMount() {
    setTimeout(() => {
      // we delay the enabling of the focus lock to avoid the scroll position
      // jumping around in some situations
      this.setState({ focusLockDisabled: false });
    }, 200);
  }

  render() {
    const {
      actions,
      actionsBeforeElement,
      animationStyles,
      children,
      dialogPlacement,
      dialogWidth,
      footer,
      header,
      heading,
      image,
      targetNode,
    } = this.props;
    const { focusLockDisabled } = this.state;

    const translatedPlacement: Placement | void = dialogPlacement
      ? {
          'top left': 'top-start',
          'top center': 'top',
          'top right': 'top-end',
          'right top': 'right-start',
          'right middle': 'right',
          'right bottom': 'right-end',
          'bottom left': 'bottom-start',
          'bottom center': 'bottom',
          'bottom right': 'bottom-end',
          'left top': 'left-start',
          'left middle': 'left',
          'left bottom': 'left-end',
        }[dialogPlacement]
      : undefined;

    return (
      <Popper referenceElement={targetNode} placement={translatedPlacement}>
        {({ ref, style, scheduleUpdate }) => (
          <ValueChanged value={dialogWidth} onChange={scheduleUpdate}>
            <FocusLock
              disabled={focusLockDisabled}
              returnFocus={false}
              autoFocus
            >
              <SpotlightCard
                ref={ref}
                theme={parent => {
                  const { container, ...others } = parent();
                  return {
                    ...others,
                    container: {
                      ...container,
                      ...style,
                      ...animationStyles,
                    },
                  };
                }}
                width={dialogWidth}
                actions={actions}
                actionsBeforeElement={actionsBeforeElement}
                image={image && <Image alt={heading} src={image} />}
                components={{
                  Header: header,
                  Footer: footer,
                }}
                heading={heading}
              >
                {children}
              </SpotlightCard>
            </FocusLock>
          </ValueChanged>
        )}
      </Popper>
    );
  }
}

const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'spotlight',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    targetOnClick: createAndFireEventOnAtlaskit({
      action: 'clicked',
      actionSubject: 'spotlight',

      attributes: {
        componentName: 'spotlight',
        packageName,
        packageVersion,
      },
    }),
  })(SpotlightDialog),
);
