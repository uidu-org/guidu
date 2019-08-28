import React, { MouseEvent } from 'react';
import { TargetInner, TargetOverlay } from '../styled/Target';

export interface CloneProps {
  /** Whether or not to display a pulse animation around the spotlighted element */
  pulse: boolean;
  /* An object containing the information used for positioning clone */
  style: Record<string, any>;
  /** The name of the SpotlightTarget */
  target?: string;
  /** The spotlight target node */
  targetNode: HTMLElement;
  /** The background color of the element being highlighted */
  targetBgColor?: string;
  /** Function to fire when a user clicks on the cloned target */
  targetOnClick?: (eventData: {
    event: MouseEvent<HTMLElement>;
    target?: string;
  }) => any;
  /** The border-radius of the element being highlighted */
  targetRadius?: number;
}

function cloneAndOverrideStyles(node: HTMLElement): HTMLElement {
  const shouldCloneChildren = true;
  const clonedNode = node.cloneNode(shouldCloneChildren) as HTMLElement;

  clonedNode.style.margin = '0';
  clonedNode.style.position = 'static';
  // The target may have other transforms applied. Avoid unintended side effects
  // by zeroing out "translate" rather than applying a value of "none".
  clonedNode.style.transform = 'translate(0, 0) translate3d(0, 0, 0)';

  return clonedNode;
}

const Clone = (props: CloneProps) => {
  const {
    pulse,
    style,
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
      style={style}
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
