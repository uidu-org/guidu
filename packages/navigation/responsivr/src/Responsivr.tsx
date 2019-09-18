import React, { Component } from 'react';
import Media from 'react-media';
import { ResponsivrProps } from './types';

// example
// <Responsivr md={<p>Pippo</p>}><p>Pluto</p></Responsivr>
// means: render Pluto for mobile, over md media query, render Pippo

export default class Responsivr extends Component<ResponsivrProps> {
  static defaultProps = {
    breakpoints: {
      sm: { minWidth: 576, maxWidth: 767 },
      md: { minWidth: 768, maxWidth: 991 },
      lg: { minWidth: 992, maxWidth: 1199 },
      xl: { minWidth: 1200 },
    },
    targetWindow: window,
  };

  render() {
    const { sm, md, lg, xl, children, breakpoints, targetWindow } = this.props;

    return (
      <Media queries={breakpoints} targetWindow={targetWindow}>
        {matches => {
          if (typeof children === 'function') {
            return children(matches);
          }

          if (matches.sm) {
            return sm || null;
          }
          if (matches.md) {
            return md || null;
          }
          if (matches.lg) {
            return lg || null;
          }
          if (matches.xl) {
            return xl || null;
          }
          return children;
        }}
      </Media>
    );
  }
}
