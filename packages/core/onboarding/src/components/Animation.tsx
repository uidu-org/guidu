import React, { ReactNode } from 'react';
import { Transition } from 'react-transition-group';

const duration = 100;

interface Animation {
  [key: string]: { opacity: number };
}

interface Props {
  in: boolean;
  children: (animationStyles: Record<string, any>) => ReactNode;
  onExited?: () => any;
}

export const Fade = ({ in: hasEntered, children, onExited }: Props) => (
  <Transition
    in={hasEntered}
    timeout={duration}
    onExited={onExited}
    unmountOnExit
    appear
  >
    {(status: string) => {
      const base = {
        transition: `opacity ${duration}ms`,
        opacity: 0,
      };
      const anim: Animation = {
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
      };

      const style = { ...base, ...anim[status] };

      return children(style);
    }}
  </Transition>
);
