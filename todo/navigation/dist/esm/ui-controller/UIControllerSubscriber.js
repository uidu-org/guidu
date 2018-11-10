import React from 'react';
import { Subscribe } from 'unstated';
import UIController from './UIController';

var UIControllerSubscriber = function UIControllerSubscriber(_ref) {
  var children = _ref.children;
  return React.createElement(Subscribe, {
    to: [UIController]
  }, children);
};

export default UIControllerSubscriber;