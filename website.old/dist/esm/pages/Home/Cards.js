import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from '../../components/WrappedLink';
import { gridSize, colors, math } from '@atlaskit/theme';
import debounce from 'lodash.debounce';
import { AtlassianIcon } from '@atlaskit/logo';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import BlogIcon from '@atlaskit/icon/glyph/component';
import MediaDocIcon from '@atlaskit/icon/glyph/media-services/document';
import CodeIcon from '@atlaskit/icon/glyph/code';
import rocket from '../../assets/Rocket.png';
import platform from '../../assets/Platform.png';
import multiTool from '../../assets/multiTool.png';
import { MOBILE_BREAKPOINT_MAX, TABLET_BREAKPOINT_MIN, TABLET_BREAKPOINT_MAX } from './config';
var CardIcon = styled.span.withConfig({
  displayName: "Cards__CardIcon",
  componentId: "sc-1np953l-0"
})(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 4px;\n  border: 2px solid ", ";\n  display: flex;\n  height: 24px;\n  justify-content: center;\n  margin-right: 8px;\n  width: 24px;\n"], function (p) {
  return p.color;
}, colors.N0);
var cardVerticalAnimationDistance = math.multiply(gridSize, 7.5);
var loadInAnimation = keyframes(["\n  0% {\n    top: ", "px;\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    top: 0;\n    opacity: 1;\n  }\n"], cardVerticalAnimationDistance);
export var CardsWrapper = styled.div.withConfig({
  displayName: "Cards__CardsWrapper",
  componentId: "sc-1np953l-1"
})(["\n  display: flex;\n  max-width: 980px;\n  justify-content: center;\n  box-sizing: border-box;\n\n  @media (max-width: ", "px) {\n    margin-top: 0;\n  }\n"], MOBILE_BREAKPOINT_MAX);
export var CardColumn = styled.div.withConfig({
  displayName: "Cards__CardColumn",
  componentId: "sc-1np953l-2"
})(["\n  flex: 0 0 0;\n"]);
var BaseCardStyles = css(["\n  display: inline-block;\n  width: 300px;\n  border-radius: 3px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  background-color: ", ";\n  margin: ", "px;\n  background-repeat: no-repeat;\n  opacity: 0;\n  top: ", "px;\n  color: ", ";\n  animation: ", " 0.6s cubic-bezier(0.15, 1, 0.33, 1) forwards;\n  box-sizing: border-box;\n  text-align: left;\n\n  z-index: 100;\n  box-shadow: 0 1px 1px rgba(23, 43, 77, 0.2),\n    0 0 0.5px 0 rgba(23, 43, 77, 0.25);\n  transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);\n\n  @media (max-width: ", "px) {\n    display: block;\n    margin: ", "px ", "px;\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 8px -2px rgba(23, 43, 77, 0.32),\n      0 0 1px rgba(23, 43, 77, 0.25);\n    text-decoration: none;\n    color: ", ";\n  }\n\n  animation-delay: ", "s;\n  background-size: contain;\n  background-position: bottom;\n"], colors.N0, gridSize, cardVerticalAnimationDistance, colors.N900, loadInAnimation, TABLET_BREAKPOINT_MIN, math.multiply(gridSize, 3), gridSize, colors.N900, function (_ref) {
  var _ref$index = _ref.index,
      index = _ref$index === void 0 ? 0 : _ref$index;
  return 0.5 + 0.03 * index;
});
var InternalCard = styled(Link).withConfig({
  displayName: "Cards__InternalCard",
  componentId: "sc-1np953l-3"
})(["\n  ", ";\n"], BaseCardStyles);
var ExternalCard = styled('a').withConfig({
  displayName: "Cards__ExternalCard",
  componentId: "sc-1np953l-4"
})(["\n  ", ";\n"], BaseCardStyles);
var TitleRow = styled.div.withConfig({
  displayName: "Cards__TitleRow",
  componentId: "sc-1np953l-5"
})(["\n  display: flex;\n  align-items: center;\n  font-weight: 500;\n"]);

var Img = function Img(_ref2) {
  var src = _ref2.src,
      _ref2$alt = _ref2.alt,
      alt = _ref2$alt === void 0 ? '' : _ref2$alt;
  return React.createElement("img", {
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
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _getPrototypeOf(Card).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Icon = _this$props.icon,
          text = _this$props.text,
          title = _this$props.title,
          image = _this$props.image,
          alt = _this$props.alt,
          props = _objectWithoutProperties(_this$props, ["icon", "text", "title", "image", "alt"]);

      var LinkComponent = props.href ? ExternalCard : InternalCard;
      return React.createElement(LinkComponent, props, React.createElement("div", {
        style: {
          padding: '16px 24px',
          marginBottom: 'auto'
        }
      }, React.createElement(TitleRow, null, React.createElement(Icon, null), title), text ? React.createElement("p", null, text) : null), image ? React.createElement(Img, {
        src: image,
        alt: alt
      }) : null);
    }
  }]);

  return Card;
}(Component);

var cards = [{
  to: '/docs/getting-started',
  icon: function icon() {
    return React.createElement(CardIcon, {
      color: colors.R400
    }, React.createElement(MediaDocIcon, {
      label: "Get started with Atlaskit!",
      primaryColor: colors.N0,
      secondaryColor: colors.R400,
      size: "small"
    }));
  },
  image: rocket,
  title: 'Get started with Atlaskit!',
  text: 'Everything you need to get up and running.'
}, {
  to: '/packages',
  title: 'Components and APIs',
  image: platform,
  icon: function icon() {
    return React.createElement(CardIcon, {
      color: colors.Y400
    }, React.createElement(PackagesIcon, {
      label: "Components and APIs",
      primaryColor: colors.N0,
      secondaryColor: colors.Y400,
      size: "small"
    }));
  },
  text: 'Check out the documentation and usage guides for the Atlaskit packages.'
}, {
  href: 'http://atlassian.design',
  title: 'Atlassian Design Guidelines',
  image: multiTool,
  icon: function icon() {
    return React.createElement(CardIcon, {
      color: colors.B400
    }, React.createElement(AtlassianIcon, {
      label: "Atlassian Design Guidelines",
      iconColor: colors.N0,
      iconGradientStart: colors.B400,
      iconGradientStop: colors.N0,
      size: "xsmall"
    }));
  },
  text: 'Need some more design guidance? Have a look at the ADG.'
}, {
  to: '/docs/guides/contributing',
  title: 'Make it better',
  icon: function icon() {
    return React.createElement(CardIcon, {
      color: colors.R400
    }, React.createElement(MediaDocIcon, {
      label: "Make it better",
      primaryColor: colors.N0,
      secondaryColor: colors.R400,
      size: "small"
    }));
  },
  text: 'Learn how to contribute code, report issues, and review our code of conduct.'
}, {
  href: 'https://bitbucket.org/atlassian/atlaskit-mk-2',
  title: 'Atlaskit Repository',
  icon: function icon() {
    return React.createElement(CardIcon, {
      color: colors.Y400
    }, React.createElement(CodeIcon, {
      label: "Atlaskit Repository",
      primaryColor: colors.N0,
      secondaryColor: colors.Y400,
      size: "small"
    }));
  },
  text: 'Want to dive straight into the code? Check out our repo on Bitbucket.'
}, {
  href: 'https://developer.atlassian.com/blog/',
  title: 'Atlassian Developer Blog',
  icon: function icon() {
    return React.createElement(CardIcon, {
      color: colors.N0
    }, React.createElement(BlogIcon, {
      label: "Atlassian Developer Blog",
      primaryColor: colors.P400,
      size: "medium"
    }));
  },
  text: 'Keep up to date on the latest in engineering at Atlassian.'
}];
/* eslint-disable react/no-multi-comp */

var Cards =
/*#__PURE__*/
function (_Component2) {
  _inherits(Cards, _Component2);

  function Cards() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Cards);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Cards)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      columnCount: 3
    };

    _this.detectColumns = function () {
      var width = window.innerWidth;

      if (width <= MOBILE_BREAKPOINT_MAX) {
        _this.setState({
          columnCount: 1
        });
      } else if (width <= TABLET_BREAKPOINT_MAX) {
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

  _createClass(Cards, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.debouncedDetect = debounce(this.detectColumns, 500);
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
      return React.createElement(CardsWrapper, {
        innerRef: this.detectColumns
      }, columns.map(function (cardKeys, colIndex) {
        return (
          /* eslint-disable react/no-array-index-key */
          React.createElement(CardColumn, {
            key: colIndex
          }, cardKeys.map(function (cardIndex, index) {
            var props = cards[cardIndex];
            return React.createElement(Card, _extends({
              index: index,
              key: props.title
            }, props));
          }))
        );
      }));
    }
  }]);

  return Cards;
}(Component);

export { Cards as default };