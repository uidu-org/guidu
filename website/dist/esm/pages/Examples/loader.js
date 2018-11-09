import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { isValidElementType } from 'react-is';
import styled from 'styled-components';
import FabricAnalyticsListeners from '@atlaskit/analytics-listeners';
import { colors, gridSize } from '@atlaskit/theme';
import Loadable from '../../components/WrappedLoader';
import qs from 'query-string';
import packageResolver from '../../utils/packageResolver';
import * as fs from '../../utils/fs';
import Loading from '../../components/Loading';
import { sendApdex, sendInitialApdex, initializeGA, observePerformanceMetrics } from '../../components/Analytics/GoogleAnalyticsListener';
var ErrorMessage = styled.div.withConfig({
  displayName: "loader__ErrorMessage",
  componentId: "sc-5yt2o6-0"
})(["\n  background-color: ", ";\n  color: white;\n  font-size: 120%;\n  padding: 1em;\n"], colors.R400);

var ExamplesIFrame =
/*#__PURE__*/
function (_Component) {
  _inherits(ExamplesIFrame, _Component);

  function ExamplesIFrame() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ExamplesIFrame);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ExamplesIFrame)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      packageId: '',
      groupId: '',
      exampleId: ''
    };
    return _this;
  }

  _createClass(ExamplesIFrame, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (window) {
        var _qs$parse = qs.parse(window.location.search),
            packageId = _qs$parse.packageId,
            groupId = _qs$parse.groupId,
            exampleId = _qs$parse.exampleId;

        this.setState({
          packageId: packageId,
          groupId: groupId,
          exampleId: exampleId
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (window.self === window.top) {
        var location = window.location.pathname + window.location.search;
        window.addEventListener('load', function () {
          sendInitialApdex(location);
        }, {
          once: true
        });
        observePerformanceMetrics(location);
      }

      initializeGA();
    }
  }, {
    key: "render",
    value: function render() {
      var _packageResolver = packageResolver(this.state.groupId, this.state.packageId, this.state.exampleId),
          examples = _packageResolver.examples,
          packageId = _packageResolver.packageId,
          exampleId = _packageResolver.exampleId;

      if (examples && exampleId) {
        return React.createElement(ExampleLoader, {
          example: fs.getById(fs.getFiles(examples.children), exampleId)
        });
      }

      return React.createElement(ErrorMessage, null, fs.titleize(packageId), " does not have examples");
    }
  }]);

  return ExamplesIFrame;
}(Component); // Using console.debug instead of console.log to reduce noise.
// Chrome's default logging level excludes debug


export { ExamplesIFrame as default };
var mockClient = {
  sendUIEvent: function sendUIEvent() {
    var _console;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (_console = console).debug.apply(_console, ['UI event'].concat(args));
  },
  sendOperationalEvent: function sendOperationalEvent() {
    var _console2;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (_console2 = console).debug.apply(_console2, ['Operational event'].concat(args));
  },
  sendTrackEvent: function sendTrackEvent() {
    var _console3;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return (_console3 = console).debug.apply(_console3, ['Track event'].concat(args));
  },
  sendScreenEvent: function sendScreenEvent() {
    var _console4;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return (_console4 = console).debug.apply(_console4, ['Screen event'].concat(args));
  }
};

function ExampleLoader(props) {
  var ExampleComponent = Loadable({
    loader: function loader() {
      return props.example.exports();
    },
    loading: Loading,
    render: function render(loaded) {
      var ExampleComp = loaded.default;

      if (!ExampleComp) {
        return React.createElement(ErrorMessage, null, "Example \"", props.example.id, "\" doesn't have default export.");
      }

      var meta = ExampleComp.meta || {};
      return meta.noListener ? React.createElement(ExampleComp, null) : React.createElement(FabricAnalyticsListeners, {
        client: mockClient
      }, React.createElement(ExampleComp, null));
    }
  });
  return React.createElement(ExampleComponent, null);
}