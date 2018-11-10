"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CardColumn = exports.CardsWrapper = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _WrappedLink = require("../../components/WrappedLink");

var _theme = require("@atlaskit/theme");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _logo = require("@atlaskit/logo");

var _component = _interopRequireDefault(require("@atlaskit/icon/glyph/component"));

var _document = _interopRequireDefault(require("@atlaskit/icon/glyph/media-services/document"));

var _code = _interopRequireDefault(require("@atlaskit/icon/glyph/code"));

var _Rocket = _interopRequireDefault(require("../../assets/Rocket.png"));

var _Platform = _interopRequireDefault(require("../../assets/Platform.png"));

var _multiTool = _interopRequireDefault(require("../../assets/multiTool.png"));

var _config = require("./config");

var CardIcon = _styledComponents.default.span.withConfig({
  displayName: "Cards__CardIcon",
  componentId: "sc-1np953l-0"
})(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 4px;\n  border: 2px solid ", ";\n  display: flex;\n  height: 24px;\n  justify-content: center;\n  margin-right: 8px;\n  width: 24px;\n"], function (p) {
  return p.color;
}, _theme.colors.N0);

var cardVerticalAnimationDistance = _theme.math.multiply(_theme.gridSize, 7.5);

var loadInAnimation = (0, _styledComponents.keyframes)(["\n  0% {\n    top: ", "px;\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    top: 0;\n    opacity: 1;\n  }\n"], cardVerticalAnimationDistance);

var CardsWrapper = _styledComponents.default.div.withConfig({
  displayName: "Cards__CardsWrapper",
  componentId: "sc-1np953l-1"
})(["\n  display: flex;\n  max-width: 980px;\n  justify-content: center;\n  box-sizing: border-box;\n\n  @media (max-width: ", "px) {\n    margin-top: 0;\n  }\n"], _config.MOBILE_BREAKPOINT_MAX);

exports.CardsWrapper = CardsWrapper;

var CardColumn = _styledComponents.default.div.withConfig({
  displayName: "Cards__CardColumn",
  componentId: "sc-1np953l-2"
})(["\n  flex: 0 0 0;\n"]);

exports.CardColumn = CardColumn;
var BaseCardStyles = (0, _styledComponents.css)(["\n  display: inline-block;\n  width: 300px;\n  border-radius: 3px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  background-color: ", ";\n  margin: ", "px;\n  background-repeat: no-repeat;\n  opacity: 0;\n  top: ", "px;\n  color: ", ";\n  animation: ", " 0.6s cubic-bezier(0.15, 1, 0.33, 1) forwards;\n  box-sizing: border-box;\n  text-align: left;\n\n  z-index: 100;\n  box-shadow: 0 1px 1px rgba(23, 43, 77, 0.2),\n    0 0 0.5px 0 rgba(23, 43, 77, 0.25);\n  transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);\n\n  @media (max-width: ", "px) {\n    display: block;\n    margin: ", "px ", "px;\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 8px -2px rgba(23, 43, 77, 0.32),\n      0 0 1px rgba(23, 43, 77, 0.25);\n    text-decoration: none;\n    color: ", ";\n  }\n\n  animation-delay: ", "s;\n  background-size: contain;\n  background-position: bottom;\n"], _theme.colors.N0, _theme.gridSize, cardVerticalAnimationDistance, _theme.colors.N900, loadInAnimation, _config.TABLET_BREAKPOINT_MIN, _theme.math.multiply(_theme.gridSize, 3), _theme.gridSize, _theme.colors.N900, function (_ref) {
  var _ref$index = _ref.index,
      index = _ref$index === void 0 ? 0 : _ref$index;
  return 0.5 + 0.03 * index;
});
var InternalCard = (0, _styledComponents.default)(_WrappedLink.Link).withConfig({
  displayName: "Cards__InternalCard",
  componentId: "sc-1np953l-3"
})(["\n  ", ";\n"], BaseCardStyles);
var ExternalCard = (0, _styledComponents.default)('a').withConfig({
  displayName: "Cards__ExternalCard",
  componentId: "sc-1np953l-4"
})(["\n  ", ";\n"], BaseCardStyles);

var TitleRow = _styledComponents.default.div.withConfig({
  displayName: "Cards__TitleRow",
  componentId: "sc-1np953l-5"
})(["\n  display: flex;\n  align-items: center;\n  font-weight: 500;\n"]);

var Img = function Img(_ref2) {
  var src = _ref2.src,
      _ref2$alt = _ref2.alt,
      alt = _ref2$alt === void 0 ? '' : _ref2$alt;
  return _react.default.createElement("img", {
    alt: alt,
    style: {
      margin: '0 auto 10px auto',
      height: '200px',
      display: 'block'
    },
    src: src
  });
};

var Card =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Card, _Component);

  function Card() {
    (0, _classCallCheck2.default)(this, Card);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(Card).apply(this, arguments));
  }

  (0, _createClass2.default)(Card, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Icon = _this$props.icon,
          text = _this$props.text,
          title = _this$props.title,
          image = _this$props.image,
          alt = _this$props.alt,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["icon", "text", "title", "image", "alt"]);
      var LinkComponent = props.href ? ExternalCard : InternalCard;
      return _react.default.createElement(LinkComponent, props, _react.default.createElement("div", {
        style: {
          padding: '16px 24px',
          marginBottom: 'auto'
        }
      }, _react.default.createElement(TitleRow, null, _react.default.createElement(Icon, null), title), text ? _react.default.createElement("p", null, text) : null), image ? _react.default.createElement(Img, {
        src: image,
        alt: alt
      }) : null);
    }
  }]);
  return Card;
}(_react.Component);

var cards = [{
  to: '/docs/getting-started',
  icon: function icon() {
    return _react.default.createElement(CardIcon, {
      color: _theme.colors.R400
    }, _react.default.createElement(_document.default, {
      label: "Get started with Atlaskit!",
      primaryColor: _theme.colors.N0,
      secondaryColor: _theme.colors.R400,
      size: "small"
    }));
  },
  image: _Rocket.default,
  title: 'Get started with Atlaskit!',
  text: 'Everything you need to get up and running.'
}, {
  to: '/packages',
  title: 'Components and APIs',
  image: _Platform.default,
  icon: function icon() {
    return _react.default.createElement(CardIcon, {
      color: _theme.colors.Y400
    }, _react.default.createElement(_component.default, {
      label: "Components and APIs",
      primaryColor: _theme.colors.N0,
      secondaryColor: _theme.colors.Y400,
      size: "small"
    }));
  },
  text: 'Check out the documentation and usage guides for the Atlaskit packages.'
}, {
  href: 'http://atlassian.design',
  title: 'Atlassian Design Guidelines',
  image: _multiTool.default,
  icon: function icon() {
    return _react.default.createElement(CardIcon, {
      color: _theme.colors.B400
    }, _react.default.createElement(_logo.AtlassianIcon, {
      label: "Atlassian Design Guidelines",
      iconColor: _theme.colors.N0,
      iconGradientStart: _theme.colors.B400,
      iconGradientStop: _theme.colors.N0,
      size: "xsmall"
    }));
  },
  text: 'Need some more design guidance? Have a look at the ADG.'
}, {
  to: '/docs/guides/contributing',
  title: 'Make it better',
  icon: function icon() {
    return _react.default.createElement(CardIcon, {
      color: _theme.colors.R400
    }, _react.default.createElement(_document.default, {
      label: "Make it better",
      primaryColor: _theme.colors.N0,
      secondaryColor: _theme.colors.R400,
      size: "small"
    }));
  },
  text: 'Learn how to contribute code, report issues, and review our code of conduct.'
}, {
  href: 'https://bitbucket.org/atlassian/atlaskit-mk-2',
  title: 'Atlaskit Repository',
  icon: function icon() {
    return _react.default.createElement(CardIcon, {
      color: _theme.colors.Y400
    }, _react.default.createElement(_code.default, {
      label: "Atlaskit Repository",
      primaryColor: _theme.colors.N0,
      secondaryColor: _theme.colors.Y400,
      size: "small"
    }));
  },
  text: 'Want to dive straight into the code? Check out our repo on Bitbucket.'
}, {
  href: 'https://developer.atlassian.com/blog/',
  title: 'Atlassian Developer Blog',
  icon: function icon() {
    return _react.default.createElement(CardIcon, {
      color: _theme.colors.N0
    }, _react.default.createElement(_component.default, {
      label: "Atlassian Developer Blog",
      primaryColor: _theme.colors.P400,
      size: "medium"
    }));
  },
  text: 'Keep up to date on the latest in engineering at Atlassian.'
}];
/* eslint-disable react/no-multi-comp */

var Cards =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(Cards, _Component2);

  function Cards() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Cards);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Cards)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      columnCount: 3
    };

    _this.detectColumns = function () {
      var width = window.innerWidth;

      if (width <= _config.MOBILE_BREAKPOINT_MAX) {
        _this.setState({
          columnCount: 1
        });
      } else if (width <= _config.TABLET_BREAKPOINT_MAX) {
        _this.setState({
          columnCount: 2
        });
      } else {
        _this.setState({
          columnCount: 3
        });
      }
    };

    _this.columnIndexes = function () {
      var columnCount = _this.state.columnCount;

      if (columnCount === 1) {
        return [[0, 1, 2, 3, 4, 5]];
      } else if (columnCount === 2) {
        return [[0, 2], [1, 3, 4, 5]];
      }

      return [[0, 3], [1, 4], [2, 5]];
    };

    return _this;
  }

  (0, _createClass2.default)(Cards, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.debouncedDetect = (0, _lodash.default)(this.detectColumns, 500);
      window.addEventListener('resize', this.debouncedDetect);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.debouncedDetect);
    }
  }, {
    key: "render",
    value: function render() {
      var columns = this.columnIndexes();
      return _react.default.createElement(CardsWrapper, {
        innerRef: this.detectColumns
      }, columns.map(function (cardKeys, colIndex) {
        return (
          /* eslint-disable react/no-array-index-key */
          _react.default.createElement(CardColumn, {
            key: colIndex
          }, cardKeys.map(function (cardIndex, index) {
            var props = cards[cardIndex];
            return _react.default.createElement(Card, (0, _extends2.default)({
              index: index,
              key: props.title
            }, props));
          }))
        );
      }));
    }
  }]);
  return Cards;
}(_react.Component);

exports.default = Cards;