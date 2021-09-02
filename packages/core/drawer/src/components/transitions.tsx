import { layers } from '@uidu/theme';
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { transitionDurationMs, transitionTimingFunction } from '../constants';
import { DrawerOrigin } from '../types';

// Transitions
// ------------------------------

type TransitionProps = {
  children?: React.ReactNode;
  component?: any;
  onExited?: () => void;
  shouldUnmountOnExit?: boolean;
  origin: DrawerOrigin;
  in: boolean;
  isStacked?: boolean;
};

type HandlerProps = {
  defaultStyles: any;
  transitionProps: {
    appear: boolean;
    mountOnEnter: boolean;
    unmountOnExit: boolean;
  };
  transitionStyles: {
    entering?: any;
    entered?: any;
    exiting?: any;
    exited?: any;
  };
};

const defaultTransitionProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
};

class TransitionHandler extends Component<TransitionProps & HandlerProps> {
  static defaultProps = {
    component: 'div',
    transitionProps: defaultTransitionProps,
  };
  render() {
    const {
      component: Tag = 'div',
      in: inProp,
      onExited,
      defaultStyles,
      transitionStyles,
      transitionProps,
      ...props
    } = this.props;

    const timeout = { enter: 0, exit: transitionDurationMs };

    return (
      <Transition
        in={inProp}
        onExited={onExited}
        timeout={timeout}
        {...transitionProps}
      >
        {(state) => {
          const style = {
            ...defaultStyles,
            ...transitionStyles[state],
          };

          return <Tag style={style} {...props} />;
        }}
      </Transition>
    );
  }
}

export const Fade = ({ isStacked, ...props }: TransitionProps) => (
  <TransitionHandler
    defaultStyles={{
      transition: `opacity ${transitionDurationMs}ms ${transitionTimingFunction}`,
      opacity: 0,
      position: 'fixed',
      zIndex: isStacked ? layers.blanket() + 1 : layers.blanket(),
    }}
    transitionStyles={{
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    }}
    {...props}
  />
);

const getTransform = (origin) => {
  switch (origin) {
    case 'right':
      return 'translate3d(100%,0,0)';
    case 'top':
      return 'translate3d(0,-100%,0)';
    case 'bottom':
      return 'translate3d(0,100%,0)';
    default:
      return 'translate3d(-100%,0,0)';
  }
};

export const Slide = ({
  shouldUnmountOnExit = true,
  ...props
}: TransitionProps) => {
  return (
    <TransitionHandler
      defaultStyles={{
        transition:
          `transform ${transitionDurationMs}ms ${transitionTimingFunction}, ` +
          `width ${transitionDurationMs}ms ${transitionTimingFunction}`,
        transform: getTransform(props.origin),
      }}
      transitionStyles={{
        // Unset transform so we do not create a new stacking context for fixed-position children - NAV-159
        entered: { transform: null },
        exited: { transform: getTransform(props.origin) },
      }}
      transitionProps={{
        ...defaultTransitionProps,
        ...{ unmountOnExit: shouldUnmountOnExit },
      }}
      {...props}
    />
  );
};
