import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { Subscribe } from 'unstated';
import ViewController from './ViewController';

var ViewControllerSubscriber = function ViewControllerSubscriber(props) {
  return React.createElement(Subscribe, _extends({
    to: [ViewController]
  }, props));
};

export default ViewControllerSubscriber;