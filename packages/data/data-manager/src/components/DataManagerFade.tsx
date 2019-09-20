import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  height: '100%',
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const DataManagerFade = ({ in: inProp, className = '', children }) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
        className={className}
      >
        {children}
      </div>
    )}
  </Transition>
);

export default DataManagerFade;
