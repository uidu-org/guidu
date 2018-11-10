import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import reactAddonsTextContent from 'react-addons-text-content';
import { Helmet } from 'react-helmet';
import snackeCase from 'snake-case';

function dashcase(children) {
  return snackeCase(reactAddonsTextContent(children)).replace(/_/g, '-');
}

var _default =
/*#__PURE__*/
function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      shouldShowAnchor: false
    };

    _this.handleShowAnchor = function () {
      _this.setState({
        shouldShowAnchor: true
      });
    };

    _this.handleHideAnchor = function () {
      _this.setState({
        shouldShowAnchor: false
      });
    };

    return _this;
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var handleHideAnchor = this.handleHideAnchor,
          handleShowAnchor = this.handleShowAnchor;
      var _this$props = this.props,
          children = _this$props.children,
          level = _this$props.level;
      var shouldShowAnchor = this.state.shouldShowAnchor;
      var Tag = "h".concat(level);
      var id = dashcase(children); // H1 on the documentation specifies the main page title
      // We should implement this using gray-matter to have meta data *title* in markdown
      // Currently gray-matter breaks in IE11, please see https://github.com/jonschlinkert/gray-matter/pull/76 for reference

      return React.createElement(Tag, {
        id: id,
        onMouseEnter: handleShowAnchor,
        onMouseLeave: handleHideAnchor
      }, level === 1 ? React.createElement(Helmet, null, React.createElement("title", null, reactAddonsTextContent(children))) : '', children, shouldShowAnchor ? ' ' : '', shouldShowAnchor ? React.createElement("a", {
        href: "#".concat(id)
      }, "#") : '');
    }
  }]);

  return _default;
}(Component);

export { _default as default };