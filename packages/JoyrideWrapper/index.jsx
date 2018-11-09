import React, { Component } from 'react';
import Joyride from 'react-joyride';

export default class JoyrideWrapper extends Component {
  next = () => {
    this.tour.next();
  };

  back = () => {
    this.tour.back();
  };

  start = () => {
    this.tour.start();
  };

  render() {
    return (
      <Joyride
        locale={{
          back: window.I18n.t('utils.actions.back'),
          close: window.I18n.t('utils.actions.proceed'),
          last: 'Last',
          next: window.I18n.t('utils.actions.proceed'),
          skip: window.I18n.t('utils.actions.skip'),
        }}
        ref={c => {
          this.tour = c;
        }}
        {...this.props}
      />
    );
  }
}
