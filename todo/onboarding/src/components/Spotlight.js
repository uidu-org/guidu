// @flow
import React, { type ComponentType, type Node } from 'react';
import SpotlightInner from './SpotlightInner';
import { SpotlightConsumer } from './SpotlightManager';
import type { ActionsType } from '../types';

export type Props = {
  /** Buttons to render in the footer */
  actions?: ActionsType,
  /** An optional node to be rendered beside the footer actions */
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
  /** Whether or not to display a pulse animation around the spotlighted element */
  pulse: boolean,
  /** The name of the SpotlightTarget */
  target?: string,
  /** The spotlight target node */
  targetNode?: HTMLElement,
  /** The background color of the element being highlighted */
  targetBgColor?: string,
  /** Function to fire when a user clicks on the cloned target */
  targetOnClick?: ({ event: MouseEvent, target?: string }) => void,
  /** The border-radius of the element being highlighted */
  targetRadius?: number,
  /** Alternative element to render than the wrapped target */
  targetReplacement?: ComponentType<*>,
};

class Spotlight extends React.Component<Props> {
  static defaultProps = {
    dialogWidth: 400,
    pulse: true,
  };
  render() {
    const { targetNode, target, ...rest } = this.props;
    return (
      <SpotlightConsumer>
        {({ opened, closed, targets }) => {
          // use the targetNode prop or try get the target from context targets using name
          const actualTargetNode =
            targetNode ||
            (typeof target === 'string' ? targets[target] : undefined);
          return actualTargetNode ? (
            <SpotlightInner
              {...rest}
              targetNode={actualTargetNode}
              target={target}
              onOpened={opened}
              onClosed={closed}
            />
          ) : null;
        }}
      </SpotlightConsumer>
    );
  }
}

export default Spotlight;
