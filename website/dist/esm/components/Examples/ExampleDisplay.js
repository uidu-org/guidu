import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react'; // we explicitly do not want to use our wrapped loadable here, as the modal being loaded should
// be handled by the iframe sendApdex

import Loadable from 'react-loadable';
import Loading from '../Loading';
import CodeBlock from '../Code';

var ExampleDisplay =
/*#__PURE__*/
function (_Component) {
  _inherits(ExampleDisplay, _Component);

  function ExampleDisplay(_props) {
    var _this;

    _classCallCheck(this, ExampleDisplay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExampleDisplay).call(this, _props));
    _this.iframeRef = void 0;

    _this.buildExampleComponents = function (props) {
      _this.ExampleCode = Loadable({
        loader: function loader() {
          return props.example.contents();
        },
        loading: Loading,
        render: function render(loaded) {
          return React.createElement(CodeBlock, {
            grammar: "jsx",
            content: loaded.default,
            name: props.name
          });
        }
      });

      _this.Example = function () {
        return React.createElement("iframe", {
          ref: _this.getIframeRef,
          title: "example",
          style: {
            width: '100%',
            height: '100%',
            border: 'none'
          },
          src: props.src
        });
      };
    };

    _this.getIframeRef = function (ref) {
      return _this.iframeRef = ref;
    };

    _this.buildExampleComponents(_props);

    return _this;
  }

  _createClass(ExampleDisplay, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        if (this.iframeRef && typeof this.iframeRef.contentWindow.unmountApp === 'function') {
          this.iframeRef.contentWindow.unmountApp();
        }

        this.buildExampleComponents(nextProps);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.iframeRef && this.iframeRef.contentWindow && typeof this.iframeRef.contentWindow.unmountApp === 'function') {
        this.iframeRef.contentWindow.unmountApp();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.src) {
        console.error('No source url provided for the examples iframe', this.props.src);
        return;
      }

      return this.props.children(this.ExampleCode, this.Example, this.props.displayCode);
    }
  }]);

  return ExampleDisplay;
}(Component);

export { ExampleDisplay as default };