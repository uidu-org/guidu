import Portal from '@uidu/portal';
import { layers } from '@uidu/theme';
import { canUseDOM } from 'exenv';
import React from 'react';
import NodeResovler from 'react-node-resolver';
import ScrollLock from 'react-scrolllock';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Fade } from './Animation';
import Clone from './Clone';
import { Props as SpotlightProps } from './Spotlight';
import SpotlightDialog from './SpotlightDialog';
import { SpotlightTransitionConsumer } from './SpotlightTransition';

export type Props = {
  /** the spotlight tagert dom element */
  targetNode: HTMLElement;
  /** Called when the component has been mounted */
  onOpened: () => any;
  /** Called when the component has been unmounted */
  onClosed: () => any;
} & SpotlightProps;

class SpotlightInner extends React.Component<
  Props,
  { replacementElement: HTMLElement | void }
> {
  static defaultProps = {
    dialogWidth: 400,
    pulse: true,
  };

  state = {
    // This is only used when targetReplacement is specified.
    // In this case, we have to render the targetReplacement component,
    // get a dom reference from that component, then render again passing
    // that reference into SpotlightDialog (Popper).
    replacementElement: undefined,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.targetNode !== this.props.targetNode) {
      scrollIntoView(this.props.targetNode, {
        scrollMode: 'if-needed',
      });
    }
  }

  componentDidMount() {
    scrollIntoView(this.props.targetNode, {
      scrollMode: 'if-needed',
    });
    this.props.onOpened();
  }

  componentWillUnmount() {
    this.props.onClosed();
  }

  isPositionFixed = (element: HTMLElement) =>
    window.getComputedStyle(element).position === 'fixed';

  hasPositionFixedParent = (element: HTMLElement) => {
    // Cast to to any - offsetParent should be of type "HTMLElement" instead of "Element"
    const { offsetParent } = element as any;
    if (!offsetParent) {
      return false;
    }

    if (this.isPositionFixed(offsetParent)) {
      return true;
    }

    return this.hasPositionFixedParent(offsetParent);
  };

  getTargetNodeStyle = () => {
    if (!canUseDOM) {
      return {};
    }
    const { targetNode } = this.props;
    const { height, left, top, width } = targetNode.getBoundingClientRect();

    if (
      this.isPositionFixed(targetNode) ||
      this.hasPositionFixedParent(targetNode)
    ) {
      return {
        height,
        left,
        top,
        width,
        // fixed position holds the target in place if overflow/scroll is necessary
        position: 'fixed',
      };
    }

    return {
      height,
      left: left + window.pageXOffset,
      top: top + window.pageYOffset,
      width,
      position: 'absolute',
    };
  };

  render() {
    const {
      pulse,
      target,
      targetNode,
      targetBgColor,
      targetOnClick,
      targetRadius,
      targetReplacement: TargetReplacement,
    } = this.props;
    const { replacementElement } = this.state;

    return (
      <SpotlightTransitionConsumer>
        {({ isOpen, onExited }) => (
          <Portal zIndex={layers.spotlight() + 1}>
            {TargetReplacement ? (
              <NodeResovler
                innerRef={elem => this.setState({ replacementElement: elem })}
              >
                <TargetReplacement {...this.getTargetNodeStyle()} />
              </NodeResovler>
            ) : (
              <Clone
                pulse={pulse}
                target={target}
                style={this.getTargetNodeStyle()}
                targetBgColor={targetBgColor}
                targetNode={targetNode}
                targetOnClick={targetOnClick}
                targetRadius={targetRadius}
              />
            )}
            {TargetReplacement && !replacementElement ? null : (
              <Fade in={isOpen} onExited={onExited}>
                {animationStyles => (
                  <SpotlightDialog
                    {...this.props}
                    targetNode={replacementElement || targetNode}
                    animationStyles={animationStyles}
                  />
                )}
              </Fade>
            )}
            <ScrollLock />
          </Portal>
        )}
      </SpotlightTransitionConsumer>
    );
  }
}

export default SpotlightInner;
