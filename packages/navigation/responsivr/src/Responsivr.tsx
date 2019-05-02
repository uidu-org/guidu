import React, { Component } from 'react';
import Media from 'react-media';
import { ResponsivrProps } from './types';

// example
// <Responsivr md={<p>Pippo</p>}><p>Pluto</p></Responsivr>
// means: render Pluto for mobile, over md media query, render Pippo

export default class Responsivr extends Component<ResponsivrProps> {
  static defaultProps = {
    breakpoints: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  };
  render() {
    const { sm, md, lg, xl, children, breakpoints } = this.props;

    return [
      sm && (
        <Media
          query={{ minWidth: breakpoints.sm, maxWidth: breakpoints.md - 0.02 }}
        >
          {matches => (matches ? sm : children)}
        </Media>
      ),
      md && (
        <Media
          query={{ minWidth: breakpoints.md, maxWidth: breakpoints.lg - 0.02 }}
        >
          {matches => (matches ? md : children)}
        </Media>
      ),
      lg && (
        <Media
          query={{ minWidth: breakpoints.lg, maxWidth: breakpoints.xl - 0.02 }}
        >
          {matches => (matches ? lg : children)}
        </Media>
      ),
      xl && (
        <Media query={{ minWidth: breakpoints.xl }}>
          {matches => (matches ? xl : children)}
        </Media>
      ),
    ];
  }
}
