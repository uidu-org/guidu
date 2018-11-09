import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { Checkbox } from '@uidu/checkbox';
import { Form, FormSubmit } from '@uidu/form';
import logo from './logo.svg';
import './App.scss';

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "App"
      }, React.createElement("header", {
        className: "App-header"
      }, React.createElement("img", {
        src: logo,
        className: "App-logo",
        alt: "logo"
      }), React.createElement("p", null, "Guidu ", React.createElement("code", null, "src/App.js"), " and save to reload."), React.createElement(Form, {
        handleSubmit: function handleSubmit() {},
        footerRenderer: function footerRenderer(_ref) {
          var canSubmit = _ref.canSubmit;
          return React.createElement(FormSubmit, {
            canSubmit: canSubmit
          });
        }
      }, React.createElement(Checkbox, {
        layout: "elementOnly",
        name: "test",
        label: "test"
      })), React.createElement("a", {
        className: "App-link",
        href: "https://reactjs.org",
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Learn React")));
    }
  }]);

  return App;
}(Component);

export default App;