// @flow
import React from 'react';
import { layers } from '@atlaskit/theme';
import Portal from '@atlaskit/portal';
import ScrollLock from 'react-scrolllock';
import NodeResovler from 'react-node-resolver';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Fade } from './Animation';
import Clone from './Clone';
import SpotlightDialog from './SpotlightDialog';
import { SpotlightTransitionConsumer } from './SpotlightTransition';
import { type Props as SpotlightProps } from './Spotlight';

export type Props = {
  /** the spotlight tagert dom element */
  targetNode: HTMLElement,
  /** Called when the component has been mounted */
  onOpened: () => any,
  /** Called when the component has been unmounted */
  onClosed: () => any,
} & SpotlightProps;

class SpotlightInner extends React.Component<
  Props,
  { replacementElement: HTMLElement | void },
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
    const { height, left, top, width } = targetNode.getBoundingClientRect();
    const rect = {
      height,
      left: left + window.pageXOffset,
      top: top + window.pageYOffset,
      width,
    };

    return (
      <SpotlightTransitionConsumer>
        {({ isOpen, onExited }) => (
          <Portal zIndex={layers.spotlight() + 1}>
            {TargetReplacement ? (
              <NodeResovler
                innerRef={elem => this.setState({ replacementElement: elem })}
              >
                <TargetReplacement {...rect} />
              </NodeResovler>
            ) : (
              <Clone
                pulse={pulse}
                target={target}
                rect={rect}
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
