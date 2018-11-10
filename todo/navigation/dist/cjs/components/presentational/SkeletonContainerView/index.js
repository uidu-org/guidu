"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _theme = require("@atlaskit/theme");

var _Section = _interopRequireDefault(require("../Section"));

var _SkeletonContainerHeader = _interopRequireDefault(require("../SkeletonContainerHeader"));

var _SkeletonItem = _interopRequireDefault(require("../SkeletonItem"));

var gridSize = (0, _theme.gridSize)();

var SkeletonContainerView =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SkeletonContainerView, _Component);

  function SkeletonContainerView() {
    (0, _classCallCheck2.default)(this, SkeletonContainerView);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SkeletonContainerView).apply(this, arguments));
  }

  (0, _createClass2.default)(SkeletonContainerView, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Section.default, null, function (_ref) {
        var css = _ref.css;
        return _react.default.createElement("div", {
          css: (0, _objectSpread2.default)({}, css, {
            paddingTop: gridSize * 2.5,
            paddingBottom: gridSize * 2.5
          })
        }, _react.default.createElement(_SkeletonContainerHeader.default, {
          hasBefore: true
        }));
      }), _react.default.createElement(_Section.default, null, function (_ref2) {
        var className = _ref2.className;
        return _react.default.createElement("div", {
          className: className
        }, _react.default.createElement(_SkeletonItem.default, {
          hasBefore: true
        }), _react.default.createElement(_SkeletonItem.default, {
          hasBefore: true
        }), _react.default.createElement(_SkeletonItem.default, {
          hasBefore: true
        }), _react.default.createElement(_SkeletonItem.default, {
          hasBefore: true
        }), _react.default.createElement(_SkeletonItem.default, {
          hasBefore: true
        }));
      }));
    }
  }]);
  return SkeletonContainerView;
}(_react.Component);

exports.default = SkeletonContainerView;
module.exports = exports.default;