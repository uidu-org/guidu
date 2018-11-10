"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _Group = _interopRequireDefault(require("../../presentational/Group"));

var defaultStyles = {
  minHeight: 64,
  // Remove browser default button styles for rbdnd placeholder
  '& > button': {
    background: 'none',
    border: 'none',
    padding: 'none'
  }
}; // This will automatically be applied for us as part of react-beautiful-dnd v10

var applyDraggingStyles = function applyDraggingStyles(snapshot) {
  return {
    pointerEvents: snapshot.isDraggingOver ? 'none' : undefined
  };
};

var SortableGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SortableGroup, _Component);

  function SortableGroup() {
    (0, _classCallCheck2.default)(this, SortableGroup);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SortableGroup).apply(this, arguments));
  }

  (0, _createClass2.default)(SortableGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          innerStyle = _this$props.innerStyle,
          groupProps = (0, _objectWithoutProperties2.default)(_this$props, ["children", "innerStyle"]);
      return _react.default.createElement(_reactBeautifulDnd.Droppable, {
        droppableId: groupProps.id
      }, function (droppableProvided, snapshot) {
        return _react.default.createElement("div", (0, _extends2.default)({
          ref: droppableProvided.innerRef,
          css: (0, _objectSpread2.default)({}, defaultStyles, innerStyle, applyDraggingStyles(snapshot))
        }, droppableProvided.droppableProps), _react.default.createElement(_Group.default, groupProps, children, droppableProvided.placeholder));
      });
    }
  }]);
  return SortableGroup;
}(_react.Component);

exports.default = SortableGroup;
module.exports = exports.default;