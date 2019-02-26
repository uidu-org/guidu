// @flow
import React from 'react';
import { TargetOverlay, TargetInner } from '../styled/Target';

type Props = {
  /** Whether or not to display a pulse animation around the spotlighted element */
  pulse: boolean,
  /* An object containining the information used for positioning clone */
  rect: {},
  /** The name of the SpotlightTarget */
  target?: string,
  /** The spotlight target node */
  targetNode: HTMLElement,
  /** The background color of the element being highlighted */
  targetBgColor?: string,
  /** Function to fire when a user clicks on the cloned target */
  targetOnClick?: ({ event: MouseEvent, target?: string }) => void,
  /** The border-radius of the element being highlighted */
  targetRadius?: number,
};

function cloneAndOverrideStyles(node: HTMLElement): HTMLElement {
  const shouldCloneChildren = true;
  const clonedNode = node.cloneNode(shouldCloneChildren);

  clonedNode.style.margin = '0';
  clonedNode.style.position = 'static';
  // The target may have other transforms applied. Avoid unintended side effects
  // by zeroing out "translate" rather than applying a value of "none".
  clonedNode.style.transform = 'translate(0, 0) translate3d(0, 0, 0)';

  return clonedNode;
}

const Clone = (props: Props) => {
  const {
    pulse,
    rect,
    target,
    targetBgColor,
    targetOnClick,
    targetNode,
    targetRadius,
  } = props;

  return (
    <TargetInner
      pulse={pulse}
      bgColor={targetBgColor}
      radius={targetRadius}
      style={rect}
    >
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: cloneAndOverrideStyles(targetNode).outerHTML,
        }}
        style={{ pointerEvents: 'none' }}
      />
      <TargetOverlay
        onClick={
          targetOnClick ? event => targetOnClick({ event, target }) : undefined
        }
      />
    </TargetInner>
  );
};

export default Clone;
